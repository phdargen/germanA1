import type { CardFace } from "@/lib/cardContent";

type FlashcardProps = {
  front: CardFace;
  back: CardFace;
  flipped: boolean;
  cardKey: number;
};

function FaceContent({ face }: { face: CardFace }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-8 text-center">
      <p className="text-2xl font-semibold leading-snug text-slate-800 dark:text-slate-50">
        {face.word}
      </p>
      {face.examples.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          {face.examples.map((ex, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-slate-500 dark:text-slate-400"
            >
              {ex}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function Flashcard({ front, back, flipped, cardKey }: FlashcardProps) {
  return (
    <div
      key={cardKey}
      className="card-enter flex flex-1 items-center justify-center px-4"
    >
      <div className="flashcard-scene w-full max-w-lg">
        <div
          className={`flashcard-inner ${flipped ? "is-flipped" : ""}`}
        >
          <div className="flashcard-face flashcard-front">
            <FaceContent face={front} />
          </div>
          <div className="flashcard-face flashcard-back">
            <FaceContent face={back} />
          </div>
        </div>
      </div>
    </div>
  );
}
