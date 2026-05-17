import { getCardFaces } from "@/lib/cardContent";
import type {
  PracticeDirection,
  TranslationLang,
  VocabCard,
} from "@/lib/types";
import { Flashcard } from "./Flashcard";
import { FlipIcon, HomeIcon, NextIcon } from "./icons";
import { IconButton } from "./IconButton";
import { SettingsHeader } from "./SettingsHeader";

type SessionScreenProps = {
  deck: VocabCard[];
  index: number;
  flipped: boolean;
  lang: TranslationLang;
  direction: PracticeDirection;
  onLangChange: (lang: TranslationLang) => void;
  onDirectionChange: (direction: PracticeDirection) => void;
  onFlip: () => void;
  onNext: () => void;
  onHome: () => void;
};

export function SessionScreen({
  deck,
  index,
  flipped,
  lang,
  direction,
  onLangChange,
  onDirectionChange,
  onFlip,
  onNext,
  onHome,
}: SessionScreenProps) {
  const card = deck[index];
  const { front, back } = getCardFaces(card, lang, direction);

  return (
    <div className="flex min-h-full flex-col">
      <SettingsHeader
        lang={lang}
        direction={direction}
        onLangChange={onLangChange}
        onDirectionChange={onDirectionChange}
        left={
          <IconButton label="Back to categories" onClick={onHome}>
            <HomeIcon />
          </IconButton>
        }
      />
      <div className="px-4 pt-2 text-center text-xs tabular-nums text-sky-600/70 dark:text-sky-400/80">
        {index + 1} / {deck.length}
      </div>
      <Flashcard
        front={front}
        back={back}
        flipped={flipped}
        cardKey={index}
      />
      <div className="flex justify-end gap-2 px-4 pb-6 pt-2">
        <IconButton label="Flip card" onClick={onFlip}>
          <FlipIcon />
        </IconButton>
        <IconButton label="Next card" variant="accent" onClick={onNext}>
          <NextIcon />
        </IconButton>
      </div>
    </div>
  );
}
