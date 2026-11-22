import React, { useEffect } from 'react';
import { VisualItem } from '../data/testData';

interface OriginalPdfPlateProps {
  item: VisualItem;
  nextItem?: VisualItem;
  selectedPosition: number | null | undefined;
  scannedPosition?: number | null;
  onSelectPosition: (position: number) => void;
}

export const OriginalPdfPlate: React.FC<OriginalPdfPlateProps> = ({
  item,
  nextItem,
  selectedPosition,
  scannedPosition,
  onSelectPosition,
}) => {
  const optionCount = item.options.length;
  const imageSrc = `/assets/plates/${item.key}.png`;

  // Preload next original plate image in browser cache for instant navigation
  useEffect(() => {
    if (nextItem) {
      const img = new Image();
      img.src = `/assets/plates/${nextItem.key}.png`;
    }
  }, [nextItem]);

  return (
    <div className="space-y-4">
      {/* Exact Untouched Original Black-and-White Plate Image from the Book PDF */}
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white p-2 sm:p-4">
        <div className="relative mx-auto w-full bg-white" dir="rtl">
          <img
            key={item.key}
            src={imageSrc}
            alt=""
            className="block h-auto w-full select-none object-contain"
            draggable={false}
          />

          {/* Transparent clickable areas directly over each figure (Right = 1 .. Left = N), zero color overlay */}
          <div
            className="absolute inset-0 grid h-full w-full"
            style={{
              gridTemplateColumns: `repeat(${optionCount}, minmax(0, 1fr))`,
            }}
          >
            {item.options.map((opt) => (
              <button
                key={opt.position}
                type="button"
                aria-label={`اختيار ${opt.position}`}
                onClick={() => onSelectPosition(opt.position)}
                className="h-full w-full cursor-pointer bg-transparent focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Minimalist Neutral Monochrome Number Buttons Below (No words, no hints, no colors) */}
      <div
        className="mx-auto grid max-w-4xl gap-2.5"
        style={{
          gridTemplateColumns: `repeat(${optionCount}, minmax(0, 1fr))`,
        }}
        dir="rtl"
      >
        {item.options.map((opt) => {
          const isSelected = selectedPosition === opt.position;
          const isScanned = scannedPosition === opt.position;

          return (
            <button
              key={opt.position}
              type="button"
              onClick={() => onSelectPosition(opt.position)}
              className={`font-mono-num flex h-11 items-center justify-center rounded-xl border-2 text-sm font-bold transition-colors ${
                isSelected
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : isScanned
                  ? 'border-slate-700 bg-slate-100 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400'
              }`}
            >
              {opt.position}
            </button>
          );
        })}
      </div>
    </div>
  );
};
