type Option<T extends string> = { value: T; label: string };

type SegmentedToggleProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
};

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-lg border border-sky-200 bg-sky-100/80 p-0.5 dark:border-sky-900 dark:bg-sky-950/60"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`min-w-[2.25rem] rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              active
                ? "bg-sky-600 text-white shadow-sm dark:bg-sky-500 dark:text-slate-950"
                : "text-sky-700/80 hover:text-sky-800 dark:text-sky-300/80 dark:hover:text-sky-200"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
