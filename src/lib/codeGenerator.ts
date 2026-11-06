/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN 200K AUTO CODE GENERATOR
 * Generates and validates unique one-time unlock codes (NEX-XXXXXX)
 */

export const DEFAULT_INITIAL_CODES = [
  'NEX-100004',
  'NEX-100005',
  'NEX-482910',
  'NEX-739201',
  'NEX-829104',
  'NEX-918273'
];

export function generateNextCode(): string {
  if (typeof window === 'undefined') return 'NEX-100004';

  try {
    const used = JSON.parse(localStorage.getItem('nexovian_used_codes') || '[]');
    let all = JSON.parse(localStorage.getItem('nexovian_all_codes') || '[]');

    if (!Array.isArray(all) || all.length === 0) {
      // Seed initial 200,000 unique random codes
      const generatedSet = new Set<string>(DEFAULT_INITIAL_CODES);
      const targetCount = 200000;
      
      // Batch generate numbers
      while (generatedSet.size < targetCount) {
        const batchSize = Math.min(10000, targetCount - generatedSet.size);
        for (let i = 0; i < batchSize; i++) {
          const num = Math.floor(100000 + Math.random() * 900000);
          generatedSet.add(`NEX-${num}`);
        }
      }
      
      all = Array.from(generatedSet);
      try {
        localStorage.setItem('nexovian_all_codes', JSON.stringify(all));
      } catch (storageErr) {
        // If 200k string exceeds quota, gracefully store a 10,000 code pool
        all = all.slice(0, 10000);
        localStorage.setItem('nexovian_all_codes', JSON.stringify(all));
      }
    }

    const next = all.find((c: string) => !used.includes(c));
    if (!next) return 'NEX-999999';

    used.push(next);
    localStorage.setItem('nexovian_used_codes', JSON.stringify(used));
    localStorage.setItem('nexovian_last_generated_code', next);
    return next;
  } catch (err) {
    console.warn('Code generation error, falling back:', err);
    return 'NEX-100004';
  }
}

export function isValidCodeFormat(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  const clean = code.trim().toUpperCase();
  return clean.startsWith('NEX-') && clean.length === 10 && /^\d{6}$/.test(clean.slice(4));
}
