import type { CategoryInfo, CategoryId, PracticeDirection, TranslationLang } from "@/lib/types";
import { ALL_CATEGORY_ID } from "@/lib/types";
import { ListIcon } from "./icons";
import { SettingsHeader } from "./SettingsHeader";

type HomeScreenProps = {
  categories: CategoryInfo[];
  lang: TranslationLang;
  direction: PracticeDirection;
  onLangChange: (lang: TranslationLang) => void;
  onDirectionChange: (direction: PracticeDirection) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onOpenWordList: () => void;
};

export function HomeScreen({
  categories,
  lang,
  direction,
  onLangChange,
  onDirectionChange,
  onSelectCategory,
  onOpenWordList,
}: HomeScreenProps) {
  return (
    <div className="flex min-h-full flex-col">
      <SettingsHeader
        lang={lang}
        direction={direction}
        onLangChange={onLangChange}
        onDirectionChange={onDirectionChange}
      />
      <main className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto mb-4 max-w-3xl">
          <button
            type="button"
            onClick={onOpenWordList}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white py-3 text-sm font-medium text-sky-700 shadow-sm transition-colors hover:border-sky-300 hover:bg-sky-50 active:scale-[0.99] dark:border-sky-800 dark:bg-slate-900 dark:text-sky-300 dark:hover:border-sky-700 dark:hover:bg-slate-800"
          >
            <ListIcon />
            Word list
          </button>
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => {
            const isAll = cat.id === ALL_CATEGORY_ID;
            const disabled = cat.count === 0;
            return (
              <button
                key={cat.id}
                type="button"
                disabled={disabled}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex min-h-[5.5rem] flex-col items-start justify-between rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:border-sky-200 hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 dark:bg-slate-900 dark:hover:border-sky-700 ${
                  isAll
                    ? "border-sky-300 ring-1 ring-sky-200/80 dark:border-sky-600 dark:ring-sky-800/50"
                    : "border-sky-100 dark:border-slate-800"
                }`}
              >
                <span className="text-sm font-medium leading-snug text-slate-800 dark:text-slate-100">
                  {cat.label}
                </span>
                <span className="mt-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs tabular-nums text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
