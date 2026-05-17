import type { PracticeDirection, TranslationLang, VocabCard } from "./types";

export type CardFace = {
  word: string;
  examples: string[];
};

export function splitExamples(text: string): string[] {
  if (!text.trim()) return [];
  return text.split(" | ").map((s) => s.trim()).filter(Boolean);
}

function targetFace(card: VocabCard, lang: TranslationLang): CardFace {
  if (lang === "zh") {
    return {
      word: card.chineseWord,
      examples: splitExamples(card.chineseExample),
    };
  }
  return {
    word: card.wordEnglish,
    examples: splitExamples(card.exampleSentencesEnglish),
  };
}

function germanFace(card: VocabCard): CardFace {
  return {
    word: card.word,
    examples: splitExamples(card.exampleSentences),
  };
}

export function getCardFaces(
  card: VocabCard,
  lang: TranslationLang,
  direction: PracticeDirection,
): { front: CardFace; back: CardFace } {
  const german = germanFace(card);
  const target = targetFace(card, lang);

  if (direction === "de-to-target") {
    return { front: german, back: target };
  }
  return { front: target, back: german };
}
