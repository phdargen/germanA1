import { splitExamples } from "./cardContent";
import type { TranslationLang, VocabCard } from "./types";

export function getTranslation(
  card: VocabCard,
  lang: TranslationLang,
): string {
  return lang === "zh" ? card.chineseWord : card.wordEnglish;
}

export function getGermanExamples(card: VocabCard): string[] {
  return splitExamples(card.exampleSentences);
}

export function getTranslationExamples(
  card: VocabCard,
  lang: TranslationLang,
): string[] {
  return lang === "zh"
    ? splitExamples(card.chineseExample)
    : splitExamples(card.exampleSentencesEnglish);
}

