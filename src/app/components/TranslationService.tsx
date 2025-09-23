//connect to GoogleAPI or OpenAPI
export const translateText = async (
  text: string,
  fromLang: string,
  toLang: string
): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock translations for demonstration
  const mockTranslations: Record<string, Record<string, string>> = {
    en: {
      es: "Hola, esta es una traducción simulada.",
      fr: "Bonjour, ceci est une traduction simulée.",
      de: "Hallo, das ist eine simulierte Übersetzung.",
      it: "Ciao, questa è una traduzione simulata.",
    },
  };

  // Simple mock: if we have a predefined translation, use it
  if (mockTranslations[fromLang] && mockTranslations[fromLang][toLang]) {
    return mockTranslations[fromLang][toLang];
  }

  // Otherwise, return a generic mock translation
  return `[Mock Translation] ${text} → ${toLang.toUpperCase()}`;
};

export const getLanguageName = (code: string): string => {
  const names: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
  };
  return names[code] || code;
};
