/**
 * @file WizardStep — step shell with progress bar and navigation
 * @description Reusable wrapper for each wizard step with progress indicator, title,
 * and back/next buttons.
 * 📖 Progress bar animates smoothly between steps.
 * 📖 Back button is optional (hidden on first step).
 *
 * @functions
 *   WizardStep → step container with progress bar, title, content slot, and navigation
 *
 * @exports WizardStep
 */

interface Props {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export function WizardStep({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Next →",
  nextDisabled = false,
}: Props) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>Step {step} of {totalSteps}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="mb-1 text-xl font-bold">{title}</h2>
      {subtitle && <p className="mb-6 text-[var(--color-text-muted)]">{subtitle}</p>}

      <div className="mb-8">{children}</div>

      <div className="flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm hover:bg-[var(--color-surface)]"
          >
            ← Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-lg bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
