/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - SECURE DEVICE FINGERPRINT & STORAGE SERVICE
 * 
 * Generates a stable, high-entropy client device identifier without relying
 * purely on cookies or easily deleted single values.
 * 
 * Used for anti-abuse:
 * - Device fingerprinting
 * - Phone number tracking
 * - 30-day trial abuse prevention
 */

const DEVICE_ID_KEY = 'nexovian_device_id_v2';
const PHONE_NUMBER_KEY = 'nexovian_phone_number';
const TRIAL_USAGE_KEY = 'nexovian_trial_history_v2';
const PAID_STATUS_KEY = 'nexovian_paid_status';

/**
 * Fast 32-bit FNV-1a hash implementation
 */
function fnv1a(str: string): string {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Generates a subtle canvas 2D fingerprint hash
 */
function getCanvasFingerprint(): string {
  try {
    if (typeof document === 'undefined') return 'server_canvas';
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no_ctx';

    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial', sans-serif";
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 200, 40);
    ctx.fillStyle = '#facc15';
    ctx.fillText('NEXOVIAN ZA 2026 ✦', 10, 10);
    ctx.strokeStyle = '#38bdf8';
    ctx.strokeRect(5, 5, 190, 30);

    return fnv1a(canvas.toDataURL());
  } catch {
    return 'fallback_canvas';
  }
}

/**
 * Generates or retrieves the unique device fingerprint for this browser instance.
 */
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'server_device';

  try {
    const existing = localStorage.getItem(DEVICE_ID_KEY);
    if (existing && existing.startsWith('nxdev_') && existing.length >= 16) {
      return existing;
    }
  } catch {
    // Ignore localStorage access failures
  }

  try {
    const nav = window.navigator;
    const scr = window.screen;

    const components = [
      nav.userAgent || '',
      nav.language || '',
      (nav.languages || []).join(','),
      scr.width || 0,
      scr.height || 0,
      scr.colorDepth || 0,
      (scr as any).pixelDepth || 0,
      window.devicePixelRatio || 1,
      new Date().getTimezoneOffset(),
      Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      nav.hardwareConcurrency || 4,
      getCanvasFingerprint()
    ];

    const raw = components.join('|');
    const hash1 = fnv1a(raw);
    const hash2 = fnv1a(raw.split('').reverse().join(''));
    const generatedId = `nxdev_${hash1}${hash2}`;

    try {
      localStorage.setItem(DEVICE_ID_KEY, generatedId);
    } catch {
      // Ignore
    }

    return generatedId;
  } catch (err) {
    const fallback = `nxdev_f_${Date.now().toString(16)}`;
    try {
      localStorage.setItem(DEVICE_ID_KEY, fallback);
    } catch {
      // Ignore
    }
    return fallback;
  }
}

/**
 * Store phone number in localStorage and session
 */
export function saveStoredPhone(phone: string): void {
  if (!phone) return;
  try {
    const cleaned = phone.trim().replace(/[\s\-()]/g, '');
    if (cleaned) {
      localStorage.setItem(PHONE_NUMBER_KEY, cleaned);
    }
  } catch {
    // Ignore
  }
}

/**
 * Get stored phone number if known
 */
export function getStoredPhone(): string | null {
  try {
    return localStorage.getItem(PHONE_NUMBER_KEY);
  } catch {
    return null;
  }
}

/**
 * Format date in standard South African format: e.g. "28 October 2026"
 */
export function formatSouthAfricanDate(dateInput: Date | string | number = new Date()): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
    return d.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return new Date().toLocaleDateString();
  }
}
