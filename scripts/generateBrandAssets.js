import fs from 'fs';
import zlib from 'zlib';
import { execSync } from 'child_process';

function createPNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const toCrc = Buffer.concat([typeBuf, data]);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdr);

  const scanlines = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    scanlines[y * (1 + width * 4)] = 0;
    const srcStart = y * width * 4;
    rgbaBuffer.copy(scanlines, y * (1 + width * 4) + 1, srcStart, srcStart + width * 4);
  }

  const idatChunk = makeChunk('IDAT', zlib.deflateSync(scanlines));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

/**
 * Pixel drawing canvas
 */
class Canvas {
  constructor(width, height, bg = [10, 15, 31, 255]) {
    this.width = width;
    this.height = height;
    this.buffer = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      this.buffer[i * 4] = bg[0];
      this.buffer[i * 4 + 1] = bg[1];
      this.buffer[i * 4 + 2] = bg[2];
      this.buffer[i * 4 + 3] = bg[3];
    }
  }

  setPixel(x, y, r, g, b, a = 255) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const idx = (y * this.width + x) * 4;
    const srcA = a / 255;
    const dstA = this.buffer[idx + 3] / 255;
    const outA = srcA + dstA * (1 - srcA);

    if (outA > 0) {
      this.buffer[idx] = Math.round((r * srcA + this.buffer[idx] * dstA * (1 - srcA)) / outA);
      this.buffer[idx + 1] = Math.round((g * srcA + this.buffer[idx + 1] * dstA * (1 - srcA)) / outA);
      this.buffer[idx + 2] = Math.round((b * srcA + this.buffer[idx + 2] * dstA * (1 - srcA)) / outA);
      this.buffer[idx + 3] = Math.round(outA * 255);
    }
  }

  drawLine(x0, y0, x1, y1, r, g, b, a = 255, thickness = 1) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const steps = Math.max(dx, dy) * 2;
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t;
      this.fillCircle(x, y, thickness / 2, r, g, b, a);
    }
  }

  fillCircle(cx, cy, radius, r, g, b, a = 255) {
    const r2 = radius * radius;
    const minX = Math.max(0, Math.floor(cx - radius - 1));
    const maxX = Math.min(this.width - 1, Math.ceil(cx + radius + 1));
    const minY = Math.max(0, Math.floor(cy - radius - 1));
    const maxY = Math.min(this.height - 1, Math.ceil(cy + radius + 1));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        if (d2 <= r2) {
          const edgeDist = radius - Math.sqrt(d2);
          const alpha = edgeDist < 1 ? a * Math.max(0, edgeDist) : a;
          this.setPixel(x, y, r, g, b, alpha);
        }
      }
    }
  }

  drawGlowLine(x0, y0, x1, y1, r, g, b, baseAlpha, thickness, glowRadius) {
    // Outer glows
    for (let rad = glowRadius; rad >= thickness; rad -= 1.5) {
      const glowA = (baseAlpha * 0.12 * (thickness / rad));
      this.drawLine(x0, y0, x1, y1, r, g, b, glowA, rad);
    }
    // Core line
    this.drawLine(x0, y0, x1, y1, r, g, b, baseAlpha, thickness);
  }

  toPNG() {
    return createPNG(this.width, this.height, this.buffer);
  }
}

/**
 * Renders the NEXOVIA glowing N logo icon into a Canvas
 */
function renderLogoIcon(size) {
  const canvas = new Canvas(size, size, [10, 15, 31, 255]); // #0A0F1F
  const s = size / 40; // Scale relative to 40x40 coordinate space

  // Rounded rect border glow
  const borderPad = 1 * s;
  const radius = 10 * s;

  // Draw ambient center glow
  const center = size / 2;
  const glowRad = 16 * s;
  for (let r = glowRad; r > 0; r -= 2) {
    const a = (1 - r / glowRad) * 45;
    canvas.fillCircle(center, center, r, 0, 255, 255, a);
  }

  // Draw Rounded Rect border in cyan
  const strokeW = 1.2 * s;
  // Border corners and lines
  const bx0 = borderPad, by0 = borderPad, bx1 = size - borderPad, by1 = size - borderPad;
  canvas.drawLine(bx0 + radius, by0, bx1 - radius, by0, 0, 255, 255, 90, strokeW);
  canvas.drawLine(bx0 + radius, by1, bx1 - radius, by1, 0, 255, 255, 90, strokeW);
  canvas.drawLine(bx0, by0 + radius, bx0, by1 - radius, 0, 255, 255, 90, strokeW);
  canvas.drawLine(bx1, by0 + radius, bx1, by1 - radius, 0, 255, 255, 90, strokeW);

  // Core N Geometry coordinates (based on 40x40 grid)
  const leftX = 12.5 * s;
  const rightX = 27.5 * s;
  const topY = 9.5 * s;
  const botY = 30.5 * s;

  // Outer N Stem Glows and Strokes
  const nStroke = 2.4 * s;
  const glowR = 6 * s;

  // Left Vertical Stem
  canvas.drawGlowLine(leftX, topY, leftX, botY, 0, 255, 255, 255, nStroke, glowR);
  // Diagonal
  canvas.drawGlowLine(leftX, topY, rightX, botY, 0, 255, 255, 255, nStroke, glowR);
  // Right Vertical Stem
  canvas.drawGlowLine(rightX, topY, rightX, botY, 0, 255, 255, 255, nStroke, glowR);

  // Brain Icon at top left of N (near leftX, topY)
  const brainX = leftX;
  const brainY = topY + 3 * s;
  // Brain lobe circles and synapse links
  canvas.fillCircle(brainX - 1.2 * s, brainY, 1.6 * s, 0, 255, 255, 220);
  canvas.fillCircle(brainX + 1.2 * s, brainY, 1.6 * s, 56, 189, 248, 220);
  canvas.fillCircle(brainX, brainY + 1.8 * s, 1.4 * s, 168, 85, 247, 240);
  canvas.drawLine(brainX - 1.2 * s, brainY, brainX, brainY + 1.8 * s, 0, 255, 255, 220, 0.8 * s);
  canvas.drawLine(brainX + 1.2 * s, brainY, brainX, brainY + 1.8 * s, 168, 85, 247, 220, 0.8 * s);

  // Circuit board traces and nodes inside N
  // Left stem circuit trace
  canvas.drawLine(leftX, brainY + 2.5 * s, leftX, botY - 2 * s, 0, 255, 255, 200, 1 * s);
  canvas.drawLine(leftX, topY + 12 * s, leftX + 3 * s, topY + 12 * s, 56, 189, 248, 220, 0.9 * s);
  canvas.fillCircle(leftX + 3 * s, topY + 12 * s, 1.3 * s, 0, 255, 255, 255);

  // Diagonal circuit branch
  const diagMidX = (leftX + rightX) / 2;
  const diagMidY = (topY + botY) / 2;
  canvas.drawLine(diagMidX - 2 * s, diagMidY - 1 * s, diagMidX + 3 * s, diagMidY - 3 * s, 56, 189, 248, 220, 0.9 * s);
  canvas.fillCircle(diagMidX + 3 * s, diagMidY - 3 * s, 1.3 * s, 168, 85, 247, 255);

  // Right stem circuit trace
  canvas.drawLine(rightX, topY + 3 * s, rightX, botY - 2 * s, 168, 85, 247, 200, 1 * s);
  canvas.drawLine(rightX, topY + 8 * s, rightX - 3 * s, topY + 8 * s, 0, 255, 255, 220, 0.9 * s);
  canvas.fillCircle(rightX - 3 * s, topY + 8 * s, 1.3 * s, 0, 255, 255, 255);

  // Circuit terminal dots
  canvas.fillCircle(leftX, botY, 2 * s, 0, 255, 255, 255);
  canvas.fillCircle(rightX, topY, 2 * s, 168, 85, 247, 255);
  canvas.fillCircle(rightX, botY, 2 * s, 0, 255, 255, 255);

  return canvas.toPNG();
}

/**
 * Renders the Splash Screen (1080x1920)
 * Dark background #0A0F1F with glowing N centered
 */
function renderSplashScreen() {
  const width = 1080;
  const height = 1920;
  const canvas = new Canvas(width, height, [10, 15, 31, 255]); // #0A0F1F

  const cx = width / 2;
  const cy = height / 2 - 60;

  // Deep ambient radial glow
  for (let r = 450; r > 0; r -= 10) {
    const t = 1 - r / 450;
    const a = t * t * 70;
    canvas.fillCircle(cx, cy, r, 0, 255, 255, a);
  }
  for (let r = 250; r > 0; r -= 6) {
    const t = 1 - r / 250;
    const a = t * 60;
    canvas.fillCircle(cx, cy, r, 168, 85, 247, a);
  }

  // Synapse rays in background
  canvas.drawGlowLine(180, cy - 250, cx, cy, 0, 255, 255, 45, 2, 8);
  canvas.drawGlowLine(900, cy - 250, cx, cy, 168, 85, 247, 45, 2, 8);
  canvas.drawGlowLine(180, cy + 250, cx, cy, 0, 255, 255, 45, 2, 8);
  canvas.drawGlowLine(900, cy + 250, cx, cy, 168, 85, 247, 45, 2, 8);
  canvas.fillCircle(180, cy - 250, 6, 0, 255, 255, 120);
  canvas.fillCircle(900, cy - 250, 6, 168, 85, 247, 120);
  canvas.fillCircle(180, cy + 250, 6, 0, 255, 255, 120);
  canvas.fillCircle(900, cy + 250, 6, 168, 85, 247, 120);

  // Centered N geometry (scale = 7x relative to 40x40 -> ~280px tall)
  const s = 7;
  const leftX = cx - 55 * s / 3.5;
  const rightX = cx + 55 * s / 3.5;
  const topY = cy - 75 * s / 3.5;
  const botY = cy + 75 * s / 3.5;

  const nStroke = 16;
  const glowR = 48;

  // N Stems with intense neon cyan glow
  canvas.drawGlowLine(leftX, topY, leftX, botY, 0, 255, 255, 255, nStroke, glowR);
  canvas.drawGlowLine(leftX, topY, rightX, botY, 0, 255, 255, 255, nStroke, glowR);
  canvas.drawGlowLine(rightX, topY, rightX, botY, 0, 255, 255, 255, nStroke, glowR);

  // Brain Icon at top left of N
  const brainX = leftX;
  const brainY = topY + 22;
  canvas.fillCircle(brainX - 9, brainY, 12, 0, 255, 255, 240);
  canvas.fillCircle(brainX + 9, brainY, 12, 56, 189, 248, 240);
  canvas.fillCircle(brainX, brainY + 14, 10, 168, 85, 247, 255);
  canvas.drawLine(brainX - 9, brainY, brainX, brainY + 14, 0, 255, 255, 230, 4);
  canvas.drawLine(brainX + 9, brainY, brainX, brainY + 14, 168, 85, 247, 230, 4);

  // Circuit board traces inside N
  canvas.drawLine(leftX, brainY + 20, leftX, botY - 15, 0, 255, 255, 220, 6);
  canvas.drawLine(leftX, topY + 80, leftX + 22, topY + 80, 56, 189, 248, 240, 5);
  canvas.fillCircle(leftX + 22, topY + 80, 9, 0, 255, 255, 255);

  canvas.drawLine(cx - 15, cy - 8, cx + 25, cy - 25, 56, 189, 248, 240, 5);
  canvas.fillCircle(cx + 25, cy - 25, 9, 168, 85, 247, 255);

  canvas.drawLine(rightX, topY + 22, rightX, botY - 15, 168, 85, 247, 220, 6);
  canvas.drawLine(rightX, topY + 60, rightX - 22, topY + 60, 0, 255, 255, 240, 5);
  canvas.fillCircle(rightX - 22, topY + 60, 9, 0, 255, 255, 255);

  // Synapse terminal nodes
  canvas.fillCircle(leftX, topY, 14, 0, 255, 255, 255);
  canvas.fillCircle(leftX, botY, 14, 0, 255, 255, 255);
  canvas.fillCircle(rightX, topY, 14, 168, 85, 247, 255);
  canvas.fillCircle(rightX, botY, 14, 0, 255, 255, 255);

  return canvas.toPNG();
}

console.log('Generating brand assets with dark background #0A0F1F and glowing N...');

// 1. Generate 512x512 logo.png and icon-512.png
const png512 = renderLogoIcon(512);
fs.writeFileSync('public/logo.png', png512);
fs.writeFileSync('public/icon-512.png', png512);
console.log('✓ Created public/logo.png & public/icon-512.png (512x512)');

// 2. Generate 192x192 icon-192.png
const png192 = renderLogoIcon(192);
fs.writeFileSync('public/icon-192.png', png192);
console.log('✓ Created public/icon-192.png (192x192)');

// 3. Generate 32x32 for favicon.ico
const png32 = renderLogoIcon(32);
fs.writeFileSync('/tmp/favicon32.png', png32);
try {
  execSync('convert /tmp/favicon32.png public/favicon.ico');
  console.log('✓ Created public/favicon.ico (multi-size ICO)');
} catch (e) {
  fs.writeFileSync('public/favicon.ico', png32);
  console.log('✓ Saved public/favicon.ico (PNG-encoded ICO fallback)');
}

// 4. Generate 1080x1920 splash.png
console.log('Rendering splash screen (1080x1920) on dark #0A0F1F...');
const splashPng = renderSplashScreen();
fs.writeFileSync('public/splash.png', splashPng);
console.log('✓ Created public/splash.png (1080x1920)');

console.log('All brand raster assets successfully generated!');
