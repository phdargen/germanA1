"use client";

import { useMemo, useState } from "react";
import { filterByCategory } from "@/lib/deck";
import {
  getGermanExamples,
  getTranslation,
  getTranslationExamples,
} from "@/lib/wordList";
import type { Theme } from "@/lib/theme";
import type { CategoryId, CategoryInfo, TranslationLang, VocabCard } from "@/lib/types";
import { ALL_CATEGORY_ID } from "@/lib/types";
import { HomeIcon } from "./icons";
import { IconButton } from "./IconButton";
import { SettingsHeader } from "./SettingsHeader";

type WordListScreenProps = {
  cards: VocabCard[];
  categories: CategoryInfo[];
  lang: TranslationLang;
  theme: Theme;
  onLangChange: (lang: TranslationLang) => void;
  onThemeToggle: () => void;
  onHome: () => void;
};

export function WordListScreen({
  cards,
  categories,
  lang,
  theme,
  onLangChange,
  onThemeToggle,
  onHome,
}: WordListScreenProps) {
  const [categoryId, setCategoryId] = useState<CategoryId>(ALL_CATEGORY_ID);

  const rows = useMemo(
    () => filterByCategory(cards, categoryId),
    [cards, categoryId],
  );

  const translationLabel = lang === "zh" ? "中文" : "English";

  return (
    <div className="flex min-h-full flex-col">
      <SettingsHeader
        lang={lang}
        direction="de-to-target"
        theme={theme}
        onLangChange={onLangChange}
        onDirectionChange={() => {}}
        onThemeToggle={onThemeToggle}
        hideDirectionToggle
        left={
          <IconButton label="Back to home" onClick={onHome}>
            <HomeIcon />
          </IconButton>
        }
      />

      <div className="border-b border-sky-100 px-4 py-3 dark:border-slate-800">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-sky-700 dark:text-sky-400">
            Category
          </span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-sky-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-900"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label} ({cat.count})
              </option>
            ))}
          </select>
        </label>
        <p className="mt-2 text-xs tabular-nums text-sky-600/80 dark:text-sky-400/80">
          {rows.length} words
        </p>
      </div>

      <main className="flex-1 overflow-auto px-4 py-4">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 z-[1] bg-sky-50 text-xs font-semibold uppercase tracking-wide text-sky-800 dark:bg-slate-800 dark:text-sky-300">
              <tr>
                <th className="border-b border-sky-100 px-4 py-3 dark:border-slate-700">
                  Deutsch
                </th>
                <th className="border-b border-sky-100 px-4 py-3 dark:border-slate-700">
                  {translationLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((card, i) => (
                <tr
                  key={`${card.word}-${card.category}-${i}`}
                  className="border-b border-sky-50 last:border-0 odd:bg-white even:bg-sky-50/40 dark:border-slate-800 dark:odd:bg-slate-900 dark:even:bg-slate-900/60"
                >
                  <td className="px-4 py-2.5 align-top">
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                      {card.word}
                    </p>
                    {getGermanExamples(card).map((ex, j) => (
                        <p
                          key={j}
                          className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
                        >
                          {ex}
                        </p>
                      ))}
                  </td>
                  <td className="px-4 py-2.5 align-top text-slate-600 dark:text-slate-300">
                    <p>{getTranslation(card, lang)}</p>
                    {getTranslationExamples(card, lang).map((ex, j) => (
                        <p
                          key={j}
                          className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
                        >
                          {ex}
                        </p>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
