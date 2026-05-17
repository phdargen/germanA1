import type { ReactNode } from "react";
import type { Theme } from "@/lib/theme";
import type { PracticeDirection, TranslationLang } from "@/lib/types";
import { MoonIcon, SunIcon } from "./icons";
import { IconButton } from "./IconButton";
import { SegmentedToggle } from "./SegmentedToggle";

type SettingsHeaderProps = {
  lang: TranslationLang;
  direction: PracticeDirection;
  theme: Theme;
  onLangChange: (lang: TranslationLang) => void;
  onDirectionChange: (direction: PracticeDirection) => void;
  onThemeToggle: () => void;
  left?: ReactNode;
  hideDirectionToggle?: boolean;
};

export function SettingsHeader({
  lang,
  direction,
  onLangChange,
  onDirectionChange,
  theme,
  onThemeToggle,
  left,
  hideDirectionToggle = false,
}: SettingsHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-sky-200/80 bg-sky-50/90 px-4 py-3 backdrop-blur-sm dark:border-sky-900/80 dark:bg-slate-950/90">
      <div className="min-w-[2.75rem]">{left}</div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <SegmentedToggle
          ariaLabel="Translation language"
          value={lang}
          onChange={onLangChange}
          options={[
            { value: "en", label: "EN" },
            { value: "zh", label: "中" },
          ]}
        />
        {!hideDirectionToggle && (
          <SegmentedToggle
            ariaLabel="Practice direction"
            value={direction}
            onChange={onDirectionChange}
            options={[
              { value: "de-to-target", label: "DE →" },
              { value: "target-to-de", label: "→ DE" },
            ]}
          />
        )}
        <IconButton
          label={theme === "dark" ? "Light mode" : "Dark mode"}
          onClick={onThemeToggle}
          className="h-9 w-9"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </div>
    </header>
  );
}
