import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './QuantityStepper.css';

type QuantityStepperProps = {
  value: number;
  options: readonly number[];
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  /** Accessible name of the value button; the caller passes an already-translated string. */
  label: string;
};

const defaultFormat = (value: number) => `×${value}`;

/**
 * Compact value picker: ◀ value ▶. The arrows step through `options`; tapping the
 * value opens a popover listing every option. Purely presentational — it owns no
 * game state, only reflects `value` and reports changes through `onChange`.
 */
export function QuantityStepper({
  value,
  options,
  onChange,
  formatValue = defaultFormat,
  label,
}: QuantityStepperProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentIndex = Math.max(0, options.indexOf(value));
  const atStart = currentIndex <= 0;
  const atEnd = currentIndex >= options.length - 1;

  const goPrev = () => {
    if (!atStart) {
      onChange(options[currentIndex - 1]);
    }
  };

  const goNext = () => {
    if (!atEnd) {
      onChange(options[currentIndex + 1]);
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="quantity-stepper" ref={rootRef}>
      <button
        type="button"
        className="quantity-stepper__arrow glass-btn"
        onClick={goPrev}
        disabled={atStart}
        aria-label={t('stepper.less')}
      >
        ◀
      </button>

      <button
        type="button"
        className="quantity-stepper__value glass-btn"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        {formatValue(value)}
      </button>

      <button
        type="button"
        className="quantity-stepper__arrow glass-btn"
        onClick={goNext}
        disabled={atEnd}
        aria-label={t('stepper.more')}
      >
        ▶
      </button>

      {open && (
        <ul className="quantity-stepper__popover glass" role="listbox">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                className={
                  option === value
                    ? 'quantity-stepper__option quantity-stepper__option--active'
                    : 'quantity-stepper__option'
                }
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {formatValue(option)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
