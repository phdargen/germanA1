"use client";

import { useCallback, useEffect, useState } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { SessionScreen } from "@/components/SessionScreen";
import { WordListScreen } from "@/components/WordListScreen";
import { buildCategories, parseVocabCsv } from "@/lib/csv";
import { buildSessionDeck } from "@/lib/deck";
import { applyTheme, persistTheme, type Theme } from "@/lib/theme";
import type {
  CategoryId,
  CategoryInfo,
  PracticeDirection,
  TranslationLang,
  VocabCard,
} from "@/lib/types";

type View = "home" | "session" | "list";

export default function Home() {
  const [cards, setCards] = useState<VocabCard[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [view, setView] = useState<View>("home");
  const [deck, setDeck] = useState<VocabCard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [lang, setLang] = useState<TranslationLang>("en");
  const [direction, setDirection] = useState<PracticeDirection>("de-to-target");
  const [loadToken, setLoadToken] = useState(0);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      applyTheme(next);
      persistTheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/A1_SD1_Wortliste_translated.csv")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load vocabulary.");
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        const parsed = parseVocabCsv(text);
        setCards(parsed);
        setCategories(buildCategories(parsed));
        setError(null);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Could not load vocabulary.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [loadToken]);

  const retryLoad = useCallback(() => {
    setLoading(true);
    setError(null);
    setLoadToken((t) => t + 1);
  }, []);

  const goHome = useCallback(() => {
    setView("home");
    setDeck([]);
    setIndex(0);
    setFlipped(false);
  }, []);

  const startSession = useCallback(
    (categoryId: CategoryId) => {
      const sessionDeck = buildSessionDeck(cards, categoryId);
      if (sessionDeck.length === 0) return;
      setDeck(sessionDeck);
      setIndex(0);
      setFlipped(false);
      setView("session");
    },
    [cards],
  );

  const handlePrev = useCallback(() => {
    if (index <= 0) return;
    setIndex((i) => i - 1);
    setFlipped(false);
  }, [index]);

  const handleNext = useCallback(() => {
    if (index >= deck.length - 1) {
      goHome();
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
  }, [deck.length, goHome, index]);

  if (loading) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-sky-200 dark:bg-sky-800" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-slate-500">{error}</p>
        <button
          type="button"
          onClick={retryLoad}
          className="rounded-lg border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800"
        >
          Retry
        </button>
      </div>
    );
  }

  if (view === "list") {
    return (
      <WordListScreen
        cards={cards}
        categories={categories}
        lang={lang}
        theme={theme}
        onLangChange={setLang}
        onThemeToggle={toggleTheme}
        onHome={goHome}
      />
    );
  }

  if (view === "session" && deck.length > 0) {
    return (
      <SessionScreen
        deck={deck}
        index={index}
        flipped={flipped}
        lang={lang}
        direction={direction}
        theme={theme}
        onLangChange={setLang}
        onDirectionChange={setDirection}
        onThemeToggle={toggleTheme}
        onFlip={() => setFlipped((f) => !f)}
        onPrev={handlePrev}
        onNext={handleNext}
        onHome={goHome}
      />
    );
  }

  return (
    <HomeScreen
      categories={categories}
      lang={lang}
      direction={direction}
      theme={theme}
      onLangChange={setLang}
      onDirectionChange={setDirection}
      onThemeToggle={toggleTheme}
      onSelectCategory={startSession}
      onOpenWordList={() => setView("list")}
    />
  );
}
