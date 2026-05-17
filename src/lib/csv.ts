import type { CategoryInfo, VocabCard } from "./types";
import { ALL_CATEGORY_ID } from "./types";

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}

export function parseVocabCsv(text: string): VocabCard[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const cards: VocabCard[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseCsvLine(lines[i]);
    if (row.length < 8) continue;

    cards.push({
      letter: row[0],
      word: row[1],
      category: row[2],
      exampleSentences: row[3],
      chineseWord: row[4],
      chineseExample: row[5],
      wordEnglish: row[6],
      exampleSentencesEnglish: row[7],
    });
  }
  return cards;
}

export function buildCategories(cards: VocabCard[]): CategoryInfo[] {
  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card.category, (counts.get(card.category) ?? 0) + 1);
  }

  const categories: CategoryInfo[] = [
    {
      id: ALL_CATEGORY_ID,
      label: "A–Z",
      count: cards.length,
    },
    ...[...counts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([id, count]) => ({ id, label: id, count })),
  ];

  return categories;
}
