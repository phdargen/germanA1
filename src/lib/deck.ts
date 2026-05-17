import type { CategoryId, VocabCard } from "./types";
import { ALL_CATEGORY_ID } from "./types";

export function filterByCategory(
  cards: VocabCard[],
  categoryId: CategoryId,
): VocabCard[] {
  if (categoryId === ALL_CATEGORY_ID) return [...cards];
  return cards.filter((c) => c.category === categoryId);
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function buildSessionDeck(
  cards: VocabCard[],
  categoryId: CategoryId,
): VocabCard[] {
  return shuffle(filterByCategory(cards, categoryId));
}
