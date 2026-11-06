import { LanguageCapabilityMap, VoiceCapability } from './types';
import { SALanguageCode } from '../../types';

/**
 * Official South African Language Voice & Audio Capability Matrix.
 * 
 * IMPORTANT:
 * - Text explanations are supported across all 11 official languages.
 * - Speech-to-Text (STT) is supported in English & Afrikaans, and via Gemini Audio Multimodal
 *   and Web Speech API for South African dialects (en-ZA, af-ZA, zu-ZA, xh-ZA, etc.).
 * - Text-to-Speech (TTS) audio narration is ONLY enabled where actual voice synthesis
 *   models exist (English & Afrikaans). Browser speech synthesizers typically lack
 *   isiZulu/isiXhosa/siSwati/etc. voice packs; we explicitly state "Text translation provided"
 *   and do not pretend voice output is working when it is not.
 */
export const SA_LANGUAGE_CAPABILITIES: LanguageCapabilityMap = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    text: true,
    speechToText: true,
    textToSpeech: true,
    sttDialect: 'en-ZA',
    ttsVoiceAvailable: true,
    ttsVoiceName: 'English (South Africa)',
    notes: 'Full voice learning supported. Learner can speak in English (ZA) and listen to synthesized audio.'
  },
  af: {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
    text: true,
    speechToText: true,
    textToSpeech: true,
    sttDialect: 'af-ZA',
    ttsVoiceAvailable: true,
    ttsVoiceName: 'Afrikaans (Suid-Afrika)',
    notes: 'Volledige stemleer ondersteun. Leerder kan in Afrikaans praat en na stemvoorlesing luister.'
  },
  zu: {
    code: 'zu',
    name: 'isiZulu',
    nativeName: 'isiZulu',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'zu-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported (you can speak in isiZulu). Voice audio output is not supported by standard operating system voice synthesizers; clear text explanations are displayed on screen.'
  },
  xh: {
    code: 'xh',
    name: 'isiXhosa',
    nativeName: 'isiXhosa',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'xh-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported (you can speak in isiXhosa). Voice audio output is not supported by standard operating system voice synthesizers; clear text explanations are displayed on screen.'
  },
  nr: {
    code: 'nr',
    name: 'isiNdebele',
    nativeName: 'isiNdebele',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'nr-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported via Gemini AI transcription. Audio playback unavailable on standard OS engines; text explanations are shown.'
  },
  ss: {
    code: 'ss',
    name: 'siSwati',
    nativeName: 'siSwati',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'ss-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported via Gemini AI transcription. Audio playback unavailable on standard OS engines; text explanations are shown.'
  },
  nso: {
    code: 'nso',
    name: 'Sepedi',
    nativeName: 'Sesotho sa Leboa',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'nso-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported via Gemini AI transcription. Audio playback unavailable on standard OS engines; text explanations are shown.'
  },
  st: {
    code: 'st',
    name: 'Sesotho',
    nativeName: 'Sesotho',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'st-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported (STT available). Audio playback unavailable on standard OS engines; text explanations are shown.'
  },
  tn: {
    code: 'tn',
    name: 'Setswana',
    nativeName: 'Setswana',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'tn-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported (STT available). Audio playback unavailable on standard OS engines; text explanations are shown.'
  },
  ve: {
    code: 've',
    name: 'Tshivenda',
    nativeName: 'Tshivenḓa',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 've-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported via Gemini AI transcription. Audio playback unavailable on standard OS engines; text explanations are shown.'
  },
  ts: {
    code: 'ts',
    name: 'XiTsonga',
    nativeName: 'Xitsonga',
    text: true,
    speechToText: true,
    textToSpeech: false,
    sttDialect: 'ts-ZA',
    ttsVoiceAvailable: false,
    notes: 'Speech recognition supported via Gemini AI transcription. Audio playback unavailable on standard OS engines; text explanations are shown.'
  },
  sasl: {
    code: 'sasl',
    name: 'SASL 🤟 (Sign Language)',
    nativeName: 'SASL 🤟',
    text: true,
    speechToText: false,
    textToSpeech: false,
    sttDialect: 'en-ZA',
    ttsVoiceAvailable: false,
    notes: 'South African Sign Language visual learning resources, videos, and dictionary supported.'
  }
};

export function getLanguageCapability(code: SALanguageCode): VoiceCapability {
  return (
    SA_LANGUAGE_CAPABILITIES[code] || {
      code,
      name: code,
      nativeName: code,
      text: true,
      speechToText: false,
      textToSpeech: false,
      sttDialect: 'en-ZA',
      ttsVoiceAvailable: false,
      notes: 'Standard text learning available.'
    }
  );
}

export function isTtsSupportedForLanguage(code: SALanguageCode): boolean {
  return SA_LANGUAGE_CAPABILITIES[code]?.textToSpeech ?? false;
}

export function isSttSupportedForLanguage(code: SALanguageCode): boolean {
  return SA_LANGUAGE_CAPABILITIES[code]?.speechToText ?? false;
}

export function getSttLocale(code: SALanguageCode): string {
  return SA_LANGUAGE_CAPABILITIES[code]?.sttDialect || 'en-ZA';
}
