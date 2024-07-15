export const languages = {
  ENGLISH: 'ENGLISH',
  SPANISH: 'SPANISH',
  FRENCH: 'FRENCH',
  GERMAN: 'GERMAN',
  ITALIAN: 'ITALIAN',
  PORTUGUESE: 'PORTUGUESE',
  DUTCH: 'DUTCH',
  RUSSIAN: 'RUSSIAN',
  JAPANESE: 'JAPANESE',
  CHINESE: 'CHINESE',
  KOREAN: 'KOREAN',
  ARABIC: 'ARABIC',
  HINDI: 'HINDI',
  BENGALI: 'BENGALI',
  PUNJABI: 'PUNJABI',
  URDU: 'URDU',
  TAMIL: 'TAMIL',
  TELUGU: 'TELUGU',
  MARATHI: 'MARATHI',
  GUJARATI: 'GUJARATI',
  KANNADA: 'KANNADA',
  MALAYALAM: 'MALAYALAM',
  HEBREW: 'HEBREW',
} as const;

export type Language = keyof typeof languages;