export type TranslationLang = "en" | "zh";
export type PracticeDirection = "de-to-target" | "target-to-de";
export type CategoryId = string;

export type VocabCard = {
  letter: string;
  word: string;
  category: string;
  exampleSentences: string;
  chineseWord: string;
  chineseExample: string;
  wordEnglish: string;
  exampleSentencesEnglish: string;
};

export type CategoryInfo = {
  id: CategoryId;
  label: string;
  count: number;
};

export const ALL_CATEGORY_ID = "__all__";
