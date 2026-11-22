import React, { useState } from 'react';
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Lock,
  MessageSquare,
  RotateCcw,
} from 'lucide-react';
import {
  VISUAL_ITEMS,
  VISUAL_TRAINING_ITEMS,
  VERBAL_ITEMS,
  VERBAL_TRAINING_ITEMS,
  VisualItem,
  VerbalItem,
  isVisualOptionCorrect,
  matchesAcceptedVerbalAnswer,
} from '../data/testData';
import { VisualResponseRecord, VerbalResponseRecord } from '../lib/firebase';
import { ChildProfile } from './ChildInfoPage';
import { OriginalPdfPlate } from './OriginalPdfPlate';

export type TestStage =
  | 'visual_training'
  | 'visual'
  | 'break'
  | 'verbal_training'
  | 'verbal'
  | 'completed_student';

interface TestRunnerPageProps {
  profile: ChildProfile;
  chronologicalAgeMonths: number;
  visualResponses: Record<string, VisualResponseRecord>;
  verbalResponses: Record<string, VerbalResponseRecord>;
  onUpdateVisualResponses: (next: Record<string, VisualResponseRecord>) => void;
  onUpdateVerbalResponses: (next: Record<string, VerbalResponseRecord>) => void;
  onBackToChildInfo: () => void;
  onOpenExaminerGate: () => void;
}

const MAX_CONSECUTIVE_FAILURES = 10;

function getConsecutiveFailures<T extends { isCorrect: boolean; autoCredited: boolean }>(
  items: { key: string; itemNumber: number | null }[],
  responses: Record<string, T>,
  upToIndex: number
): number {
  let streak = 0;
  for (let i = upToIndex; i >= 0; i--) {
    const rec = responses[items[i].key];
    if (!rec) break;
    if (rec.autoCredited) break;
    if (!rec.isCorrect) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

function findNextUnansweredIndex<T>(
  items: { key: string }[],
  responses: Record<string, T>,
  fromIndex: number
): number {
  for (let i = fromIndex; i < items.length; i++) {
    if (!responses[items[i].key]) return i;
  }
  return items.length - 1;
}

export const TestRunnerPage: React.FC<TestRunnerPageProps> = ({
  profile,
  chronologicalAgeMonths,
  visualResponses,
  verbalResponses,
  onUpdateVisualResponses,
  onUpdateVerbalResponses,
  onBackToChildInfo,
  onOpenExaminerGate,
}) => {
  const startsAtItem16 = chronologicalAgeMonths >= 72;
  const initialFormalIndex = startsAtItem16 ? 15 : 0;

  const [stage, setStage] = useState<TestStage>(() => {
    const hasVisual = Object.keys(visualResponses).length > 0;
    const hasVerbal = Object.keys(verbalResponses).length > 0;
    if (hasVerbal) return 'verbal';
    if (hasVisual) return 'visual';
    return 'visual_training';
  });

  const [trainingIndex, setTrainingIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(initialFormalIndex);
  const [verbalIndex, setVerbalIndex] = useState(initialFormalIndex);

  // Motor-impaired visual scanning pointer (1-based position on current card)
  const [scanPosition, setScanPosition] = useState<number>(1);
  // Training selection state (unscored practice)
  const [trainingSelectedPos, setTrainingSelectedPos] = useState<number | null>(null);
  const [trainingVerbalText, setTrainingVerbalText] = useState('');

  const currentVisualItem: VisualItem | undefined =
    stage === 'visual_training'
      ? VISUAL_TRAINING_ITEMS[trainingIndex]
      : stage === 'visual'
      ? VISUAL_ITEMS[visualIndex]
      : undefined;

  const nextVisualItem: VisualItem | undefined =
    stage === 'visual_training'
      ? VISUAL_TRAINING_ITEMS[trainingIndex + 1] ?? VISUAL_ITEMS[initialFormalIndex]
      : stage === 'visual'
      ? VISUAL_ITEMS[visualIndex + 1]
      : undefined;

  const currentVerbalItem: VerbalItem | undefined =
    stage === 'verbal_training'
      ? VERBAL_TRAINING_ITEMS[trainingIndex]
      : stage === 'verbal'
      ? VERBAL_ITEMS[verbalIndex]
      : undefined;

  // Silent clinical routing (basal & ceiling rules from Dr. Serry's manual — never exposes pass/fail to student)
  const applyBasalAndRoute = <
    T extends { isCorrect: boolean; autoCredited: boolean }
  >(
    items: { key: string; itemNumber: number | null }[],
    currentIndex: number,
    updatedMap: Record<string, T>,
    makeAutoCredit: () => T
  ): { nextMap: Record<string, T>; nextIndex: number; ceilingHit: boolean } => {
    const nextMap = { ...updatedMap };
    let nextIndex = Math.min(items.length - 1, currentIndex + 1);

    if (startsAtItem16) {
      const window16to25 = items.slice(15, 25);
      const all16to25Answered = window16to25.every((it) => Boolean(nextMap[it.key]));
      const any16to25Failed = window16to25.some((it) => nextMap[it.key] && !nextMap[it.key].isCorrect);

      if (currentIndex >= 15 && currentIndex <= 24) {
        if (all16to25Answered && !any16to25Failed) {
          for (let i = 0; i < 15; i++) {
            if (!nextMap[items[i].key] || nextMap[items[i].key].autoCredited) {
              nextMap[items[i].key] = makeAutoCredit();
            }
          }
          nextIndex = 25;
        } else if (any16to25Failed && currentIndex === 24) {
          const window11to15 = items.slice(10, 15);
          const all11to15Answered = window11to15.every((it) => Boolean(nextMap[it.key]));
          if (!all11to15Answered) {
            nextIndex = 10;
          }
        }
      } else if (currentIndex >= 10 && currentIndex <= 14) {
        const window11to15 = items.slice(10, 15);
        const all11to15Answered = window11to15.every((it) => Boolean(nextMap[it.key]));
        const any11to15Failed = window11to15.some(
          (it) => nextMap[it.key] && !nextMap[it.key].isCorrect
        );

        if (all11to15Answered && !any11to15Failed) {
          for (let i = 0; i < 10; i++) {
            if (!nextMap[items[i].key] || nextMap[items[i].key].autoCredited) {
              nextMap[items[i].key] = makeAutoCredit();
            }
          }
          nextIndex = findNextUnansweredIndex(items, nextMap, 25);
        } else if (any11to15Failed && currentIndex === 14) {
          nextIndex = 0;
        }
      } else if (currentIndex >= 0 && currentIndex <= 9 && currentIndex === 9) {
        const window1to10 = items.slice(0, 10);
        const all1to10Failed = window1to10.every(
          (it) => nextMap[it.key] && !nextMap[it.key].isCorrect
        );
        if (all1to10Failed) {
          return { nextMap, nextIndex: currentIndex, ceilingHit: true };
        }
        nextIndex = findNextUnansweredIndex(items, nextMap, 25);
      }
    }

    const streak = getConsecutiveFailures(items, nextMap, currentIndex);
    const basalPending =
      startsAtItem16 &&
      currentIndex <= 24 &&
      !items.slice(0, 10).some((it) => Boolean(nextMap[it.key]));

    const ceilingHit = !basalPending && streak >= MAX_CONSECUTIVE_FAILURES;

    return { nextMap, nextIndex, ceilingHit };
  };

  const handleSelectVisualOption = (optionPosition: number) => {
    if (!currentVisualItem) return;
    if (stage === 'visual_training') {
      setTrainingSelectedPos(optionPosition);
      return;
    }

    const isCorrect = isVisualOptionCorrect(currentVisualItem, optionPosition);
    const updated: Record<string, VisualResponseRecord> = {
      ...visualResponses,
      [currentVisualItem.key]: {
        selectedOption: optionPosition,
        isCorrect,
        autoCredited: false,
      },
    };
    onUpdateVisualResponses(updated);
    setScanPosition(1);
  };

  const handleVisualNext = () => {
    if (stage === 'visual_training') {
      setTrainingSelectedPos(null);
      setScanPosition(1);
      if (trainingIndex < VISUAL_TRAINING_ITEMS.length - 1) {
        setTrainingIndex((i) => i + 1);
      } else {
        setStage('visual');
        setVisualIndex(initialFormalIndex);
      }
      return;
    }

    const result = applyBasalAndRoute(
      VISUAL_ITEMS,
      visualIndex,
      visualResponses,
      () => ({
        selectedOption: null,
        isCorrect: true,
        autoCredited: true,
      })
    );

    if (result.nextMap !== visualResponses) {
      onUpdateVisualResponses(result.nextMap);
    }

    // Automatically advance smoothly to break if ceiling reached or last item finished (no failure warning shown to student)
    if (result.ceilingHit || visualIndex >= VISUAL_ITEMS.length - 1) {
      setStage('break');
      return;
    }

    setScanPosition(1);
    setVisualIndex(result.nextIndex);
  };

  const handleVisualPrev = () => {
    setScanPosition(1);
    if (stage === 'visual_training') {
      setTrainingSelectedPos(null);
      if (trainingIndex > 0) setTrainingIndex((i) => i - 1);
      return;
    }
    if (visualIndex > 0) {
      setVisualIndex((i) => i - 1);
    } else {
      setStage('visual_training');
      setTrainingIndex(VISUAL_TRAINING_ITEMS.length - 1);
    }
  };

  const handleVerbalTextChange = (value: string) => {
    if (!currentVerbalItem) return;
    if (stage === 'verbal_training') {
      setTrainingVerbalText(value);
      return;
    }
    const autoCorrect = matchesAcceptedVerbalAnswer(value, currentVerbalItem.acceptedAnswers);
    onUpdateVerbalResponses({
      ...verbalResponses,
      [currentVerbalItem.key]: {
        childAnswerText: value,
        isCorrect: autoCorrect,
        autoCredited: false,
      },
    });
  };

  const handleVerbalNext = () => {
    if (stage === 'verbal_training') {
      setTrainingVerbalText('');
      if (trainingIndex < VERBAL_TRAINING_ITEMS.length - 1) {
        setTrainingIndex((i) => i + 1);
      } else {
        setStage('verbal');
        setVerbalIndex(initialFormalIndex);
      }
      return;
    }

    const result = applyBasalAndRoute(
      VERBAL_ITEMS,
      verbalIndex,
      verbalResponses,
      () => ({
        childAnswerText: 'محتسب تلقائياً (قاعدة البدء)',
        isCorrect: true,
        autoCredited: true,
      })
    );

    if (result.nextMap !== verbalResponses) {
      onUpdateVerbalResponses(result.nextMap);
    }

    if (result.ceilingHit || verbalIndex >= VERBAL_ITEMS.length - 1) {
      setStage('completed_student');
      return;
    }

    setVerbalIndex(result.nextIndex);
  };

  const handleVerbalPrev = () => {
    if (stage === 'verbal_training') {
      setTrainingVerbalText('');
      if (trainingIndex > 0) setTrainingIndex((i) => i - 1);
      else setStage('break');
      return;
    }
    if (verbalIndex > 0) {
      setVerbalIndex((i) => i - 1);
    } else {
      setStage('verbal_training');
      setTrainingIndex(VERBAL_TRAINING_ITEMS.length - 1);
    }
  };

  const answeredVisualCount = Object.keys(visualResponses).length;
  const answeredVerbalCount = Object.keys(verbalResponses).length;
  const totalAnswered = answeredVisualCount + answeredVerbalCount;
  const progressPercent = Math.round((totalAnswered / 90) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6">
      {/* Minimal Clean Student Session Header (Zero scores, zero answer keys, zero examiner toggles) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-bold text-slate-900 text-sm">{profile.childName}</span>
            {profile.motorImpairedMode && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                  <Accessibility className="h-3.5 w-3.5" />
                  تسهيل الإعاقة الحركية
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onBackToChildInfo}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>بيانات الحالة</span>
            </button>

            <button
              type="button"
              onClick={() => setStage('completed_student')}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#0F4C81] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0c3d68] whitespace-nowrap shrink-0"
            >
              <span>إنهاء الاختبار</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Stage Switcher + Simple Progress Bar */}
        <div className="grid grid-cols-1 items-center gap-4 border-t border-slate-100 pt-3 lg:grid-cols-12">
          <div className="flex flex-wrap items-center gap-1.5 lg:col-span-7">
            <button
              type="button"
              onClick={() => {
                setStage('visual_training');
                setTrainingIndex(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                stage === 'visual_training'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              تدريب المصور
            </button>
            <button
              type="button"
              onClick={() => setStage('visual')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                stage === 'visual'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الجزء المصور
            </button>
            <button
              type="button"
              onClick={() => {
                setStage('verbal_training');
                setTrainingIndex(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                stage === 'verbal_training'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              تدريب اللفظي
            </button>
            <button
              type="button"
              onClick={() => setStage('verbal')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                stage === 'verbal'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الجزء اللفظي
            </button>
          </div>

          <div className="space-y-1.5 lg:col-span-5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>التقدم في الأسئلة</span>
              <span className="font-mono-num font-bold text-slate-700">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-800 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Break Screen Between Part 1 and Part 2 (No score shown) */}
      {stage === 'break' && (
        <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
            <Coffee className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              أحسنت! انتهى الجزء الأول
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              يمكنك أخذ استراحة قصيرة الآن أو الانتقال مباشرة إلى الجزء الثاني.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStage('visual')}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ArrowRight className="h-4 w-4" />
              <span>العودة للجزء الأول</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStage('verbal_training');
                setTrainingIndex(0);
              }}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              <span>بدء الجزء الثاني</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* STUDENT COMPLETION SCREEN — Zero scores shown; discreet Examiner-Only Lock Gate */}
      {stage === 'completed_student' && (
        <section className="mx-auto max-w-xl space-y-6 py-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              أحسنت يا {profile.childName}!
            </h2>
            <p className="mx-auto max-w-sm text-sm text-slate-600 leading-relaxed">
              تم إتمام الاختبار وتسليم جميع إجاباتك بنجاح. شكراً لمشاركتك.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStage('verbal')}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                <span>العودة للأسئلة</span>
              </button>

              <button
                type="button"
                onClick={onOpenExaminerGate}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>خاص بالمختبر فقط (النتائج)</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* VISUAL TRAINING & FORMAL VISUAL STAGE — Clean Untouched Original PDF Plate Only */}
      {(stage === 'visual_training' || stage === 'visual') && currentVisualItem && (
        <section className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 space-y-6">
            {/* Simple Item Number Header Only (No hints, no cues, no answer keys) */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-600">
                {stage === 'visual_training'
                  ? currentVisualItem.ageRangeAr
                  : `السؤال ${currentVisualItem.itemNumber} من ٤٥`}
              </span>
            </div>

            {/* EXACT ORIGINAL PDF PLATE (NO COLORS, NO TEXT UNDER IMAGES, NO HINTS) */}
            <OriginalPdfPlate
              item={currentVisualItem}
              nextItem={nextVisualItem}
              selectedPosition={
                stage === 'visual_training'
                  ? trainingSelectedPos
                  : visualResponses[currentVisualItem.key]?.selectedOption
              }
              scannedPosition={profile.motorImpairedMode ? scanPosition : null}
              onSelectPosition={handleSelectVisualOption}
            />

            {/* Motor-Impaired Scanner Controls (only if explicitly enabled for motor-impaired child) */}
            {profile.motorImpairedMode && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Accessibility className="h-4 w-4 text-slate-700" />
                  <span>الاختيار المؤشر عليه حالياً: ({scanPosition})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setScanPosition((p) =>
                        p >= currentVisualItem.options.length ? 1 : p + 1
                      )
                    }
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-100"
                  >
                    <span>التالي</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectVisualOption(scanPosition)}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    <span>تأكيد ({scanPosition})</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={handleVisualPrev}
                disabled={stage === 'visual_training' && trainingIndex === 0}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
                <span>السابق</span>
              </button>

              {stage === 'visual' && (
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...visualResponses };
                    delete next[currentVisualItem.key];
                    onUpdateVisualResponses(next);
                  }}
                  className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>مسح</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleVisualNext}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-slate-900 px-6 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                <span>
                  {stage === 'visual_training'
                    ? trainingIndex === VISUAL_TRAINING_ITEMS.length - 1
                      ? 'بدء الجزء المصور'
                      : 'التالي'
                    : visualIndex === VISUAL_ITEMS.length - 1
                    ? 'إنهاء الجزء المصور'
                    : 'التالي'}
                </span>
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Neutral Monochrome Item Navigator Strip (Zero right/wrong colors) */}
          {stage === 'visual' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5">
              <div className="text-xs font-bold text-slate-700">الأسئلة (١ – ٤٥)</div>
              <div className="grid grid-cols-9 gap-1.5 sm:grid-cols-15">
                {VISUAL_ITEMS.map((item, idx) => {
                  const rec = visualResponses[item.key];
                  const isCurrent = idx === visualIndex;
                  let cls = 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50';
                  if (rec) {
                    cls = 'border-slate-400 bg-slate-100 text-slate-900 font-semibold';
                  }
                  if (isCurrent) {
                    cls = 'border-slate-900 bg-slate-900 text-white font-bold';
                  }
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setScanPosition(1);
                        setVisualIndex(idx);
                      }}
                      className={`font-mono-num h-8 rounded-lg border text-xs transition-colors ${cls}`}
                    >
                      {item.itemNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* VERBAL TRAINING & FORMAL VERBAL STAGE — Zero hints, zero accepted answers, zero right/wrong feedback */}
      {(stage === 'verbal_training' || stage === 'verbal') && currentVerbalItem && (
        <section className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-600">
                {stage === 'verbal_training'
                  ? currentVerbalItem.ageRangeAr
                  : `السؤال اللفظي ${currentVerbalItem.itemNumber} من ٤٥`}
              </span>
            </div>

            {/* Prompt Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 text-center space-y-3">
              <div className="mx-auto inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <MessageSquare className="h-4 w-4 text-slate-700" />
                <span>أكمل الجملة</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl leading-relaxed">
                «{currentVerbalItem.promptAr}»
              </p>
            </div>

            {/* Clean Answer Input (Scored silently in background; examiner can also review & adjust in ScoringPage) */}
            <div className="mx-auto max-w-xl space-y-2">
              <label className="block text-xs font-bold text-slate-700">الإجابة</label>
              <input
                type="text"
                value={
                  stage === 'verbal_training'
                    ? trainingVerbalText
                    : verbalResponses[currentVerbalItem.key]?.childAnswerText ?? ''
                }
                onChange={(e) => handleVerbalTextChange(e.target.value)}
                placeholder="اكتب الإجابة هنا..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition-colors focus:border-slate-900"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={handleVerbalPrev}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <ChevronRight className="h-4 w-4" />
                <span>السابق</span>
              </button>

              {stage === 'verbal' && (
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...verbalResponses };
                    delete next[currentVerbalItem.key];
                    onUpdateVerbalResponses(next);
                  }}
                  className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>مسح</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleVerbalNext}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-slate-900 px-6 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                <span>
                  {stage === 'verbal_training'
                    ? trainingIndex === VERBAL_TRAINING_ITEMS.length - 1
                      ? 'بدء الجزء اللفظي'
                      : 'التالي'
                    : verbalIndex === VERBAL_ITEMS.length - 1
                    ? 'إنهاء الاختبار'
                    : 'التالي'}
                </span>
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Neutral Monochrome Item Navigator Strip (Zero right/wrong colors) */}
          {stage === 'verbal' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5">
              <div className="text-xs font-bold text-slate-700">الأسئلة اللفظية (١ – ٤٥)</div>
              <div className="grid grid-cols-9 gap-1.5 sm:grid-cols-15">
                {VERBAL_ITEMS.map((item, idx) => {
                  const rec = verbalResponses[item.key];
                  const isCurrent = idx === verbalIndex;
                  let cls = 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50';
                  if (rec) {
                    cls = 'border-slate-400 bg-slate-100 text-slate-900 font-semibold';
                  }
                  if (isCurrent) {
                    cls = 'border-slate-900 bg-slate-900 text-white font-bold';
                  }
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setVerbalIndex(idx)}
                      className={`font-mono-num h-8 rounded-lg border text-xs transition-colors ${cls}`}
                    >
                      {item.itemNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
