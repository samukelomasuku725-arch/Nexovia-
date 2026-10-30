/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SERVER-SIDE FORMULA CLEANER & SANITIZER
 * Removes all $ signs, LaTeX slop, and formats formulas into clean unicode for Grade 4-12 SA learners.
 */

const UNICODE_SUBSCRIPTS: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
  'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
  'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
  'v': 'ᵥ', 'x': 'ₓ'
};

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

const UNICODE_SUPERSCRIPTS: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'n': 'ⁿ', 'i': 'ⁱ', 'x': 'ˣ'
};

export function cleanFormulaString(raw: string): string {
  if (!raw) return '';
  let str = raw.trim();

  // 1. Remove leading/trailing delimiters ($$, $, \(, \), \[, \])
  str = str.replace(/^\$\$|\$\$$|^\\\[|\\\]$|^\\\(|\\\)$|^\$|\$$/g, '').trim();

  // 2. Handle South African currency: $200 -> R200
  str = str.replace(/\$(\s*\d+(?:[\.,]\d+)?)/g, 'R$1');

  // 3. LaTeX formatting commands: \text{...}, \mathrm{...}, \mathbf{...}
  str = str.replace(/\\(?:text|mathrm|mathbf|mathit|textbf|mathsf)\{([^{}]+)\}/g, '$1');
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

  // 7. Subscripts
  for (const [word, sub] of Object.entries(COMMON_WORD_SUBSCRIPTS)) {
    const wordRegex = new RegExp(`_(?:\\{${word}\\}|${word})\\b`, 'gi');
    str = str.replace(wordRegex, sub);
  }

  str = str.replace(/_\{([^{}]+)\}/g, (_, inner) => {
    return inner.split('').map((c: string) => UNICODE_SUBSCRIPTS[c.toLowerCase()] || c).join('');
  });
  str = str.replace(/_([a-zA-Z0-9])/g, (_, char) => {
    return UNICODE_SUBSCRIPTS[char.toLowerCase()] || `(${char})`;
  });

  // 8. Superscripts
  str = str.replace(/\^\{([^{}]+)\}/g, (_, inner) => {
    return inner.split('').map((c: string) => UNICODE_SUPERSCRIPTS[c] || c).join('');
  });
  str = str.replace(/\^([0-9a-zA-Z+-])/g, (_, char) => {
    return UNICODE_SUPERSCRIPTS[char] || `^${char}`;
  });

  // 9. Standard multiplication signs: replace * with ×
  str = str.replace(/(\b[a-zA-Z0-9\)]+)\s*\*\s*([a-zA-Z0-9\(]+)/g, '$1 × $2');
  str = str.replace(/\s*\\cdot\s*/g, ' × ');
  str = str.replace(/\s*\\times\s*/g, ' × ');

  // 10. Specific formula standardizations
  str = str.replace(/\bJ\s*=\s*F\s*Δt\b/g, 'J = F × Δt');
  str = str.replace(/\bJ\s*=\s*F\s*\\Delta\s*t\b/g, 'J = F × Δt');
  str = str.replace(/\bp\s*=\s*m\s*v\b/g, 'p = m × v');
  str = str.replace(/\bF\s*=\s*m\s*a\b/g, 'F = m × a');
  str = str.replace(/\bFₙₑₜ\s*=\s*m\s*a\b/g, 'Fₙₑₜ = m × a');
  str = str.replace(/\bV\s*=\s*I\s*R\b/g, 'V = I × R');
  str = str.replace(/\bE\s*=\s*m\s*c[²2]\b/g, 'E = m × c²');
  str = str.replace(/\bW\s*=\s*F\s*s\b/g, 'W = F × s');
  str = str.replace(/\bW\s*=\s*F\s*×\s*\\Delta\s*x\b/g, 'W = F × Δx');

  // 11. Remove spacing commands and stray LaTeX
  str = str.replace(/\\[quad|qquad|,|;|!|\s]+/g, ' ');
  str = str.replace(/\\text/g, '');
  str = str.replace(/[\$\\]/g, '');
  str = str.replace(/[{}]/g, '');

  // 12. Normalize spaces around operators without breaking hyphenated words
  str = str.replace(/\s*=\s*/g, ' = ');
  str = str.replace(/\s*×\s*/g, ' × ');
  str = str.replace(/([0-9a-zA-Z\)])\s*\+\s*([0-9a-zA-Z\(])/g, '$1 + $2');
  str = str.replace(/([0-9a-zA-Z\)])\s+-\s+([0-9a-zA-Z\(])/g, '$1 - $2');
  str = str.replace(/([0-9])\s*-\s*([0-9])/g, '$1 - $2');
  str = str.replace(/\s*\/\s*/g, ' / ');

  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Strips all $ math signs from any AI-generated response text and cleans inline math
 */
export function sanitizeTextFormulas(text: string): string {
  if (!text) return '';

  let out = text;

  // 1. Handle currency: $50 -> R50, $200 -> R200
  out = out.replace(/\$(\s*\d+(?:[\.,]\d+)?)/g, 'R$1');

  // 2. Replace block math ($$...$$)
  out = out.replace(/\$\$([\s\S]+?)\$\$/g, (_, inner) => {
    return `\n${cleanFormulaString(inner)}\n`;
  });

  // 3. Replace parenthesized inline math: e.g. "($F_{net} = ma$)" -> "Fₙₑₜ = m × a"
  out = out.replace(/\(\s*\$([^\$]+?)\$\s*\)/g, (_, inner) => {
    return cleanFormulaString(inner);
  });

  // 4. Replace inline math ($...$)
  out = out.replace(/\$([^\$\n]+?)\$/g, (_, inner) => {
    return cleanFormulaString(inner);
  });

  // 5. Remove any leftover isolated $ symbols
  out = out.replace(/\$/g, '');

  return out;
}
