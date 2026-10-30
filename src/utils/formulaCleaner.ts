/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN GLOBAL FORMULA CLEANER & UNICODE FORMATTER
 * 
 * Rules:
 * 1. REMOVE all $ symbols - NEVER show $ to learners.
 * 2. Clean unicode math:
 *    - F_net / F_{net} -> Fₙₑₜ
 *    - Multiplications: * / \times / \cdot -> ×
 *    - Superscripts: ^2 -> ², ^3 -> ³, ^4 -> ⁴, ^n -> ⁿ, etc.
 *    - Greek: \Delta / Delta -> Δ, \Omega -> Ω, \pi -> π, \theta -> θ
 *    - Fractions: \frac{a}{b} -> ½, ¾ or (a/b)
 *    - Currency: replace $50, $200 with R50, R200 (South African Rand)
 *    - Units: \text{kg} -> kg, \text{m/s}^2 -> m/s², \text{N} -> N
 * 3. Never show LaTeX slop, \ { }, etc.
 */

// Mapping table for common unicode subscripts
const UNICODE_SUBSCRIPTS: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
  'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
  'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
  'v': 'ᵥ', 'x': 'ₓ'
};

// Common word subscripts
const COMMON_WORD_SUBSCRIPTS: Record<string, string> = {
  'net': 'ₙₑₜ',
  'avg': 'ₐᵥ₉',
  'max': 'ₘₐₓ',
  'min': 'ₘᵢₙ',
  'tot': 'ₜₒₜ',
  'total': 'ₜₒₜₐₗ',
  'in': 'ᵢₙ',
  'out': 'ₒᵤₜ',
  'init': 'ᵢₙᵢₜ',
  'fin': '𝒻ᵢₙ',
  'new': 'ₙₑ𝓌'
};

// Unicode superscripts
const UNICODE_SUPERSCRIPTS: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'n': 'ⁿ', 'i': 'ⁱ', 'x': 'ˣ'
};

/**
 * Returns localized formula box title for 11 official South African languages
 */
export function getFormulaLabel(langCode?: string): string {
  const code = (langCode || 'en').toLowerCase().trim();
  switch (code) {
    case 'zu': // isiZulu
    case 'xh': // isiXhosa
    case 'ss': // siSwati
    case 'nr': // isiNdebele
      return '📘 IFOMULA:';
    case 'st': // Sesotho
    case 'nso': // Sepedi
      return '📘 FORMULA:';
    case 'tn': // Setswana
    case 'ts': // Xitsonga
    case 've': // Tshivenda
      return '📘 FOMULA:';
    case 'af': // Afrikaans
      return '📘 FORMULE:';
    case 'en':
    default:
      return '📘 FORMULA:';
  }
}

/**
 * Converts a raw formula snippet into pristine unicode text with zero LaTeX or $ symbols.
 */
export function cleanFormulaString(raw: string): string {
  if (!raw) return '';
  let str = raw.trim();

  // 1. Remove leading/trailing delimiters ($$, $, \(, \), \[, \])
  str = str.replace(/^\$\$|\$\$$|^\\\[|\\\]$|^\\\(|\\\)$|^\$|\$$/g, '').trim();

  // 2. Handle South African currency: $200 -> R200
  str = str.replace(/\$(\s*\d+(?:[\.,]\d+)?)/g, 'R$1');

  // 3. LaTeX formatting commands: \text{...}, \mathrm{...}, \mathbf{...}
  str = str.replace(/\\(?:text|mathrm|mathbf|mathit|textbf|textbf|mathsf)\{([^{}]+)\}/g, '$1');
  str = str.replace(/\\(?:mathbf|mathrm|text|mathit)\s+([a-zA-Z0-9]+)/g, '$1');

  // 4. Fractions: \frac{a}{b} -> standard fractions or a/b
  str = str.replace(/\\frac\{1\}\{2\}/g, '½');
  str = str.replace(/\\frac\{1\}\{4\}/g, '¼');
  str = str.replace(/\\frac\{3\}\{4\}/g, '¾');
  str = str.replace(/\\frac\{1\}\{3\}/g, '⅓');
  str = str.replace(/\\frac\{2\}\{3\}/g, '⅔');
  str = str.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1 / $2)');

  // 5. Square roots: \sqrt{x} -> √(x)
  str = str.replace(/\\sqrt\{([^{}]+)\}/g, '√($1)');
  str = str.replace(/\\sqrt\s*([a-zA-Z0-9]+)/g, '√$1');

  // 6. Greek & Math symbols
  str = str.replace(/\\(?:Delta|delta)\b/g, 'Δ');
  str = str.replace(/\\(?:Omega|omega)\b/g, 'Ω');
  str = str.replace(/\\(?:theta|Theta)\b/g, 'θ');
  str = str.replace(/\\(?:pi|Pi)\b/g, 'π');
  str = str.replace(/\\(?:alpha|Alpha)\b/g, 'α');
  str = str.replace(/\\(?:beta|Beta)\b/g, 'β');
  str = str.replace(/\\(?:lambda|Lambda)\b/g, 'λ');
  str = str.replace(/\\(?:mu|Mu)\b/g, 'μ');
  str = str.replace(/\\(?:approx)\b/g, '≈');
  str = str.replace(/\\(?:neq|ne)\b/g, '≠');
  str = str.replace(/\\(?:le|leq)\b/g, '≤');
  str = str.replace(/\\(?:ge|geq)\b/g, '≥');
  str = str.replace(/\\(?:pm)\b/g, '±');
  str = str.replace(/\\(?:cdot|times)\b/g, '×');

  // 7. Subscripts (multi-letter known words first)
  for (const [word, sub] of Object.entries(COMMON_WORD_SUBSCRIPTS)) {
    const wordRegex = new RegExp(`_(?:\\{${word}\\}|${word})\\b`, 'gi');
    str = str.replace(wordRegex, sub);
  }

  // General subscripts: _{xyz} or _x
  str = str.replace(/_\{([^{}]+)\}/g, (_, inner) => {
    const chars = inner.split('');
    const converted = chars.map((c: string) => UNICODE_SUBSCRIPTS[c.toLowerCase()] || c).join('');
    return converted;
  });
  str = str.replace(/_([a-zA-Z0-9])/g, (_, char) => {
    return UNICODE_SUBSCRIPTS[char.toLowerCase()] || `(${char})`;
  });

  // 8. Superscripts: ^{2} or ^2
  str = str.replace(/\^\{([^{}]+)\}/g, (_, inner) => {
    const chars = inner.split('');
    const converted = chars.map((c: string) => UNICODE_SUPERSCRIPTS[c] || c).join('');
    return converted;
  });
  str = str.replace(/\^([0-9a-zA-Z+-])/g, (_, char) => {
    return UNICODE_SUPERSCRIPTS[char] || `^${char}`;
  });

  // 9. Standard multiplication signs: replace isolated * or \cdot with ×
  // e.g. "m * a" -> "m × a", "F * \Delta t" -> "F × Δt", "V = I * R" -> "V = I × R"
  str = str.replace(/(\b[a-zA-Z0-9\)]+)\s*\*\s*([a-zA-Z0-9\(]+)/g, '$1 × $2');
  str = str.replace(/\s*\\cdot\s*/g, ' × ');
  str = str.replace(/\s*\\times\s*/g, ' × ');

  // 10. Specific physics momentum & second law cleanups
  str = str.replace(/\bJ\s*=\s*F\s*Δt\b/g, 'J = F × Δt');
  str = str.replace(/\bJ\s*=\s*F\s*\\Delta\s*t\b/g, 'J = F × Δt');
  str = str.replace(/\bp\s*=\s*m\s*v\b/g, 'p = m × v');
  str = str.replace(/\bF\s*=\s*m\s*a\b/g, 'F = m × a');
  str = str.replace(/\bFₙₑₜ\s*=\s*m\s*a\b/g, 'Fₙₑₜ = m × a');
  str = str.replace(/\bV\s*=\s*I\s*R\b/g, 'V = I × R');
  str = str.replace(/\bE\s*=\s*m\s*c[²2]\b/g, 'E = m × c²');
  str = str.replace(/\bW\s*=\s*F\s*s\b/g, 'W = F × s');
  str = str.replace(/\bW\s*=\s*F\s*×\s*\\Delta\s*x\b/g, 'W = F × Δx');

  // 11. Remove spacing commands (\quad, \qquad, \;, \!) and remaining LaTeX markers
  str = str.replace(/\\[quad|qquad|,|;|!|\s]+/g, ' ');
  str = str.replace(/\\text/g, '');
  str = str.replace(/[\$\\]/g, '');
  str = str.replace(/[{}]/g, '');

  // 12. Normalize spaces around operators for readability without breaking hyphenated words (e.g. i-momentum, ka-1200kg)
  str = str.replace(/\s*=\s*/g, ' = ');
  str = str.replace(/\s*×\s*/g, ' × ');
  str = str.replace(/([0-9a-zA-Z\)])\s*\+\s*([0-9a-zA-Z\(])/g, '$1 + $2');
  str = str.replace(/([0-9a-zA-Z\)])\s+-\s+([0-9a-zA-Z\(])/g, '$1 - $2');
  str = str.replace(/([0-9])\s*-\s*([0-9])/g, '$1 - $2');
  str = str.replace(/\s*\/\s*/g, ' / ');

  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Checks whether a text snippet represents an equation or formula statement
 */
export function isLikelyFormula(snippet: string): boolean {
  if (!snippet) return false;
  const s = snippet.trim();
  // Formula characteristics: has '=', or known physics/math formula tokens
  if (s.includes('=') && s.length < 120 && !s.includes('\n')) return true;
  if (/^(?:Fₙₑₜ|F_net|p|J|E|V|I|R|a|v|W)\s*=/i.test(s)) return true;
  if (/^(?:[a-zA-Z]\s*=\s*[^=]+)$/.test(s)) return true;
  return false;
}

export interface TextBlockItem {
  type: 'text' | 'formula_box' | 'formula_banner' | 'practice_box';
  content: string;
  formulas?: string[];
  label?: string;
}

/**
 * Scans an entire markdown or plain text string, strips all $ marks, extracts
 * formula patterns into clean formulas, and splits into rich renderable blocks.
 */
export function parseAndCleanContent(rawText: string, langCode: string = 'en'): TextBlockItem[] {
  if (!rawText) return [];
  const label = getFormulaLabel(langCode);

  // 1. Remove hidden ---CACHE--- block if present
  let text = rawText.split('---CACHE---')[0].trim();

  // 2. Handle South African currency conversion globally: $200 -> R200
  text = text.replace(/\$(\s*\d+(?:[\.,]\d+)?)/g, 'R$1');

  const blocks: TextBlockItem[] = [];

  // 3. Check for explicit "SIMPLE FORMULA TO REMEMBER:" or "IFOMULA:" sections
  const formulaHeaderRegex = /(?:SIMPLE FORMULA TO REMEMBER|IFOMULA|FORMULA TO REMEMBER|FOMULA)\s*:?/i;

  // Split lines while preserving markdown paragraphs
  const paragraphs = text.split(/\n\s*\n/);

  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;

    // Check if paragraph is QUICK PRACTICE:
    if (/^QUICK PRACTICE\s*:?/i.test(trimmedPara)) {
      const practiceText = trimmedPara.replace(/^QUICK PRACTICE\s*:?/i, '').trim();
      blocks.push({
        type: 'practice_box',
        content: cleanFormulaString(practiceText)
      });
      continue;
    }

    // A. Check if paragraph is an explicit formula section header or callout
    if (formulaHeaderRegex.test(trimmedPara)) {
      const lines = trimmedPara.split('\n');
      const formulasExtracted: string[] = [];
      const textLines: string[] = [];
      const practiceLines: string[] = [];
      let inPracticeMode = false;

      for (const line of lines) {
        const cleanLine = line.replace(/^[>#*\-\s]+/, '').trim();
        if (formulaHeaderRegex.test(cleanLine)) {
          continue; // skip the raw header text since the box will have its own badge
        }
        if (/^QUICK PRACTICE\s*:?/i.test(cleanLine)) {
          inPracticeMode = true;
          const pSub = cleanLine.replace(/^QUICK PRACTICE\s*:?/i, '').trim();
          if (pSub) practiceLines.push(pSub);
          continue;
        }

        if (inPracticeMode) {
          if (cleanLine) practiceLines.push(cleanLine);
        } else if (cleanLine.includes('=') || isLikelyFormula(cleanLine)) {
          formulasExtracted.push(cleanFormulaString(cleanLine));
        } else if (cleanLine) {
          textLines.push(cleanFormulaString(cleanLine));
        }
      }

      if (formulasExtracted.length > 0) {
        blocks.push({
          type: 'formula_box',
          content: formulasExtracted.join('\n'),
          formulas: formulasExtracted,
          label
        });
      }
      if (textLines.length > 0) {
        blocks.push({
          type: 'text',
          content: textLines.join('\n')
        });
      }
      if (practiceLines.length > 0) {
        blocks.push({
          type: 'practice_box',
          content: cleanFormulaString(practiceLines.join('\n'))
        });
      }
      if (formulasExtracted.length > 0 || practiceLines.length > 0 || textLines.length > 0) {
        continue;
      }
    }

    // B. Check for block math ($$...$$)
    if (trimmedPara.startsWith('$$') && trimmedPara.endsWith('$$')) {
      const cleanEq = cleanFormulaString(trimmedPara);
      blocks.push({
        type: 'formula_box',
        content: cleanEq,
        formulas: [cleanEq],
        label
      });
      continue;
    }

    // C. Process inline formulas inside prose:
    // e.g. "Second Law ($F_{net} = ma$) kanye ne-Momentum ($p = mv$)"
    // or standalone formula lines like "$F_{net} = ma$"
    const mathMatch = trimmedPara.match(/\$(.+?)\$/g);
    if (mathMatch && mathMatch.length > 0) {
      const extractedFormulas: string[] = [];
      let cleanedParagraph = trimmedPara;

      for (const m of mathMatch) {
        const inner = m.slice(1, -1).trim();
        // Check if this is an actual formula equation with '=' or physics variable relation
        if (inner.includes('=') || isLikelyFormula(inner) || inner.includes('\\times') || inner.includes('\\frac')) {
          const cleanedFormula = cleanFormulaString(inner);
          extractedFormulas.push(cleanedFormula);

          // Remove the parenthesized formula from prose: e.g. "($F_{net} = ma$)" -> ""
          // or replace inline `$p = mv$` with natural phrase
          cleanedParagraph = cleanedParagraph
            .replace(new RegExp(`\\(\\s*\\$${inner.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\$\\s*\\)`, 'g'), '')
            .replace(new RegExp(`\\$${inner.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\$`, 'g'), '');
        } else {
          // Inline simple variable like $x$ or $2\text{ m/s}^2$ -> clean unicode inline
          const cleanedVar = cleanFormulaString(inner);
          cleanedParagraph = cleanedParagraph.replace(m, cleanedVar);
        }
      }

      // Normalize any remaining double spaces created by removal
      cleanedParagraph = cleanedParagraph.replace(/\s{2,}/g, ' ').replace(/\s+([,\.!\?])/g, '$1').trim();

      if (cleanedParagraph) {
        blocks.push({
          type: 'text',
          content: cleanedParagraph
        });
      }

      if (extractedFormulas.length > 0) {
        blocks.push({
          type: 'formula_box',
          content: extractedFormulas.join('\n'),
          formulas: extractedFormulas,
          label
        });
      }
      continue;
    }

    // D. Standard text paragraph: Clean any stray $ or LaTeX artifacts
    const cleanedText = cleanFormulaString(trimmedPara);
    blocks.push({
      type: 'text',
      content: cleanedText
    });
  }

  return blocks;
}

/**
 * Cleans an entire string into pure plain-text without markdown boxes (useful for TTS or exports)
 */
export function cleanTextGlobally(text: string): string {
  if (!text) return '';
  return text
    // Replace $...$ math with clean formula text
    .replace(/\$(.+?)\$/g, (_, inner) => cleanFormulaString(inner))
    // Replace $$...$$ math
    .replace(/\$\$(.+?)\$\$/g, (_, inner) => cleanFormulaString(inner))
    // Replace currency $200 -> R200
    .replace(/\$(\s*\d+(?:[\.,]\d+)?)/g, 'R$1')
    // Remove all remaining stray $
    .replace(/\$/g, '');
}
