import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  FileText,
  Info,
  XCircle,
} from 'lucide-react';
import {
  VISUAL_ITEMS,
  VERBAL_ITEMS,
  calculateIQAndClassification,
  formatMonthsToArabicYearsMonths,
  formatMonthsToEnglishYearsMonths,
  lookupMentalAgeFromScore,
} from '../data/testData';
import { VisualResponseRecord, VerbalResponseRecord } from '../lib/firebase';
import { ChildProfile } from './ChildInfoPage';

export interface ComputedScoringMetrics {
  visualRawScore: number;
  verbalRawScore: number;
  totalRawScore: number;
  visualAutoCreditedCount: number;
  verbalAutoCreditedCount: number;
  groupBreakdown: {
    visualGroup1: number;
    visualGroup2: number;
    visualGroup3: number;
    verbalGroup1: number;
    verbalGroup2: number;
    verbalGroup3: number;
  };
  mentalAgeMonths: number;
  mentalAgeLabelAr: string;
  mentalAgeLabelEn: string;
  isWithinNormTable: boolean;
  normNoteAr?: string;
  normNoteEn?: string;
  iqScore: number;
  classificationAr: string;
  classificationEn: string;
  classificationDescAr: string;
  tone: 'emerald' | 'sky' | 'amber' | 'rose';
}

export function computeAssessmentMetrics(
  visualResponses: Record<string, VisualResponseRecord>,
  verbalResponses: Record<string, VerbalResponseRecord>,
  chronologicalAgeMonths: number
): ComputedScoringMetrics {
  let visualRawScore = 0;
  let visualAutoCreditedCount = 0;
  let visualGroup1 = 0;
  let visualGroup2 = 0;
  let visualGroup3 = 0;

  for (const item of VISUAL_ITEMS) {
    const rec = visualResponses[item.key];
    if (rec?.isCorrect) {
      visualRawScore += 1;
      if (rec.autoCredited) visualAutoCreditedCount += 1;
      if (item.group === 1) visualGroup1 += 1;
      if (item.group === 2) visualGroup2 += 1;
      if (item.group === 3) visualGroup3 += 1;
    }
  }

  let verbalRawScore = 0;
  let verbalAutoCreditedCount = 0;
  let verbalGroup1 = 0;
  let verbalGroup2 = 0;
  let verbalGroup3 = 0;

  for (const item of VERBAL_ITEMS) {
    const rec = verbalResponses[item.key];
    if (rec?.isCorrect) {
      verbalRawScore += 1;
      if (rec.autoCredited) verbalAutoCreditedCount += 1;
      if (item.group === 1) verbalGroup1 += 1;
      if (item.group === 2) verbalGroup2 += 1;
      if (item.group === 3) verbalGroup3 += 1;
    }
  }

  const totalRawScore = visualRawScore + verbalRawScore;
  const mentalLookup = lookupMentalAgeFromScore(totalRawScore);
  const iqResult = calculateIQAndClassification(
    mentalLookup.mentalAgeMonths,
    chronologicalAgeMonths
  );

  return {
    visualRawScore,
    verbalRawScore,
    totalRawScore,
    visualAutoCreditedCount,
    verbalAutoCreditedCount,
    groupBreakdown: {
      visualGroup1,
      visualGroup2,
      visualGroup3,
      verbalGroup1,
      verbalGroup2,
      verbalGroup3,
    },
    mentalAgeMonths: mentalLookup.mentalAgeMonths,
    mentalAgeLabelAr: formatMonthsToArabicYearsMonths(mentalLookup.mentalAgeMonths),
    mentalAgeLabelEn: formatMonthsToEnglishYearsMonths(mentalLookup.mentalAgeMonths),
    isWithinNormTable: mentalLookup.isWithinNormTable,
    normNoteAr: mentalLookup.normNoteAr,
    normNoteEn: mentalLookup.normNoteEn,
    iqScore: iqResult.iq,
    classificationAr: iqResult.labelAr,
    classificationEn: iqResult.labelEn,
    classificationDescAr: iqResult.descriptionAr,
    tone: iqResult.tone,
  };
}

interface ScoringPageProps {
  profile: ChildProfile;
  chronologicalAgeMonths: number;
  visualResponses: Record<string, VisualResponseRecord>;
  verbalResponses: Record<string, VerbalResponseRecord>;
  onUpdateVerbalResponses: (next: Record<string, VerbalResponseRecord>) => void;
  clinicalNotes: string;
  onChangeClinicalNotes: (notes: string) => void;
  isSavedInDb: boolean;
  onSaveSession: (status: 'in_progress' | 'completed') => Promise<boolean>;
  onBackToTest: () => void;
  onGenerateReport: () => void;
}

export const ScoringPage: React.FC<ScoringPageProps> = ({
  profile,
  chronologicalAgeMonths,
  visualResponses,
  verbalResponses,
  onUpdateVerbalResponses,
  clinicalNotes,
  onChangeClinicalNotes,
  isSavedInDb,
  onSaveSession,
  onBackToTest,
  onGenerateReport,
}) => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showVerbalReview, setShowVerbalReview] = useState(false);

  const metrics = useMemo(
    () => computeAssessmentMetrics(visualResponses, verbalResponses, chronologicalAgeMonths),
    [visualResponses, verbalResponses, chronologicalAgeMonths]
  );

  const toneBadgeClass =
    metrics.tone === 'emerald'
      ? 'border-teal-300 bg-teal-50 text-teal-900'
      : metrics.tone === 'sky'
      ? 'border-sky-300 bg-sky-50 text-sky-900'
      : metrics.tone === 'amber'
      ? 'border-amber-300 bg-amber-50 text-amber-900'
      : 'border-rose-300 bg-rose-50 text-rose-900';

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      const ok = await onSaveSession('completed');
      if (ok) {
        setSaveMessage('تم حفظ سجل الطفل والدرجات في قاعدة البيانات بنجاح.');
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'تعذر حفظ الجلسة.');
    } finally {
      setSaving(false);
    }
  };

  const groups = [
    {
      label: 'المجموعة الأولى (٣–٥ سنوات)',
      visual: metrics.groupBreakdown.visualGroup1,
      verbal: metrics.groupBreakdown.verbalGroup1,
    },
    {
      label: 'المجموعة الثانية (٥–٧ سنوات)',
      visual: metrics.groupBreakdown.visualGroup2,
      verbal: metrics.groupBreakdown.verbalGroup2,
    },
    {
      label: 'المجموعة الثالثة (٧–٩ سنوات)',
      visual: metrics.groupBreakdown.visualGroup3,
      verbal: metrics.groupBreakdown.verbalGroup3,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToTest}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة لمراجعة البنود</span>
        </button>

        <div className="text-xs font-medium text-slate-500">
          الخطوة ٤ من ٥ · معالجة الدرجات واستخراج نسبة الذكاء
        </div>
      </div>

      {/* Primary IQ & Normative Hero */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              ملخص النتائج السيكومترية · {profile.childName}
              {profile.childCode ? ` (${profile.childCode})` : ''}
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
              الدرجات الخام وحساب نسبة الذكاء
            </h1>
          </div>

          <div className={`rounded-xl border px-4 py-2.5 text-center ${toneBadgeClass}`}>
            <p className="text-xs font-semibold">التصنيف اللفظي المعتمد</p>
            <p className="text-base font-extrabold">{metrics.classificationAr}</p>
            <p className="font-en text-[11px] opacity-80">{metrics.classificationEn}</p>
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-1">
            <p className="text-xs font-semibold text-slate-500">الدرجة الخام الكلية</p>
            <p className="font-mono-num text-3xl font-extrabold text-slate-900">
              {metrics.totalRawScore} <span className="text-base font-semibold text-slate-400">/ 90</span>
            </p>
            <p className="font-mono-num text-xs text-slate-600">
              مصور {metrics.visualRawScore}/45 + لفظي {metrics.verbalRawScore}/45
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-1">
            <p className="text-xs font-semibold text-slate-500">العمر العقلي (جدول ٢)</p>
            <p className="font-mono-num text-3xl font-extrabold text-[#0F4C81]">
              {metrics.mentalAgeMonths} <span className="text-base font-semibold">شهراً</span>
            </p>
            <p className="text-xs text-slate-600">{metrics.mentalAgeLabelAr}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-1">
            <p className="text-xs font-semibold text-slate-500">العمر الزمني الفعلي</p>
            <p className="font-mono-num text-3xl font-extrabold text-slate-900">
              {chronologicalAgeMonths} <span className="text-base font-semibold">شهراً</span>
            </p>
            <p className="text-xs text-slate-600">
              {formatMonthsToArabicYearsMonths(chronologicalAgeMonths)}
            </p>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-5 space-y-1">
            <p className="text-xs font-bold text-sky-900">نسبة الذكاء (IQ)</p>
            <p className="font-mono-num text-4xl font-extrabold text-[#0F4C81]">
              {metrics.iqScore}
            </p>
            <p className="text-xs text-sky-900">{metrics.classificationDescAr}</p>
          </div>
        </div>

        {/* Formula Transparency Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-semibold">
            <Calculator className="h-4 w-4 text-[#0F4C81]" />
            <span>المعادلة المعتمدة (دليل الاختبار ص ٢٤):</span>
          </div>
          <div className="font-mono-num font-bold text-slate-900" dir="ltr">
            IQ = ({metrics.mentalAgeMonths} ÷ {chronologicalAgeMonths}) × 100 = {metrics.iqScore}
          </div>
        </div>

        {!metrics.isWithinNormTable && metrics.normNoteAr && (
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <span>{metrics.normNoteAr}</span>
          </div>
        )}
      </section>

      {/* Group Breakdown + Clinical Notes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Group Breakdown Table */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              تحليل الأداء حسب المجموعات العمرية
            </h2>
            <span className="text-xs text-slate-500">١٥ بنداً لكل مجموعة</span>
          </div>

          <div className="space-y-4">
            {groups.map((grp) => (
              <div
                key={grp.label}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{grp.label}</span>
                  <span className="font-mono-num text-slate-600">
                    المجموع: {grp.visual + grp.verbal} / 30
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">التمييز البصري (مصور)</span>
                      <span className="font-mono-num font-bold text-[#0F4C81]">
                        {grp.visual} / 15
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#0F4C81]"
                        style={{ width: `${Math.round((grp.visual / 15) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">الاستدلال اللفظي (لفظي)</span>
                      <span className="font-mono-num font-bold text-[#0D9488]">
                        {grp.verbal} / 15
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#0D9488]"
                        style={{ width: `${Math.round((grp.verbal / 15) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(metrics.visualAutoCreditedCount > 0 || metrics.verbalAutoCreditedCount > 0) && (
            <p className="text-xs text-slate-500">
              ملاحظة إكلينيكية: تتضمن الدرجات احتساباً تلقائياً لبنود القاعدة وفق قاعدة البدء من البند (١٦):{' '}
              <span className="font-mono-num font-semibold text-slate-700">
                {metrics.visualAutoCreditedCount} مصور · {metrics.verbalAutoCreditedCount} لفظي
              </span>
              .
            </p>
          )}
        </section>

        {/* Examiner Notes + Save + Proceed to AI Report */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 lg:col-span-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="h-5 w-5 text-[#0F4C81]" />
            <h2 className="text-base font-bold text-slate-900">
              ملاحظات الفاحص والحفظ السحابي
            </h2>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              الملاحظات السلوكية والإكلينيكية أثناء الجلسة
            </label>
            <textarea
              rows={5}
              maxLength={2000}
              value={clinicalNotes}
              onChange={(e) => onChangeClinicalNotes(e.target.value)}
              placeholder="مثال: تعاون الطفل بهدوء، أبدى تردداً في البنود المجردة، احتاج لتكرار التعليمات في الجزء اللفظي..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#0F4C81] focus:bg-white"
            />
            <p className="text-[11px] text-slate-400">
              تُدمج هذه الملاحظات مباشرة في التحليل الذكي وتُطبع ضمن التقرير النهائي.
            </p>
          </div>

          {/* Save to Firestore directly (no Google login required) */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-100 disabled:opacity-60"
            >
              <Database className="h-4 w-4 text-[#0F4C81]" />
              <span>
                {saving
                  ? 'جاري الحفظ...'
                  : isSavedInDb
                  ? 'تحديث الجلسة في قاعدة البيانات المشتركة'
                  : 'حفظ الجلسة في قاعدة البيانات المشتركة'}
              </span>
            </button>
            {saveMessage && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{saveMessage}</span>
              </p>
            )}
            {saveError && <p className="text-xs font-semibold text-rose-700">{saveError}</p>}
          </div>

          <button
            type="button"
            onClick={onGenerateReport}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c3d68]"
          >
            <BrainCircuit className="h-4 w-4" />
            <span>إنشاء التقرير التشخيصي بالذكاء الاصطناعي</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
        </section>
      </div>

      {/* Examiner-Only Verbal Responses Review & Manual Clinical Scoring */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <button
          type="button"
          onClick={() => setShowVerbalReview((v) => !v)}
          className="flex w-full items-center justify-between text-right"
        >
          <div>
            <h2 className="text-base font-bold text-slate-900">
              مراجعة وتصحيح إجابات الجزء اللفظي (للمختبر فقط)
            </h2>
            <p className="text-xs text-slate-500">
              يمكن للمختبر مراجعة إجابات الطالب النصية وتعديل تقييم أي بند (صحيح ١ / خطأ ٠) وفق المعنى الإكلينيكي ودليل جدول (١).
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 shrink-0">
            <span>{showVerbalReview ? 'إخفاء القائمة' : 'فتح مراجعة الإجابات'}</span>
            {showVerbalReview ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        </button>

        {showVerbalReview && (
          <div className="space-y-2.5 border-t border-slate-100 pt-4">
            {VERBAL_ITEMS.map((item) => {
              const rec = verbalResponses[item.key];
              if (!rec) return null;
              return (
                <div
                  key={item.key}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 sm:flex-row sm:items-center"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono-num font-bold text-[#0F4C81]">
                        بند {item.itemNumber}
                      </span>
                      <span className="font-bold text-slate-900">{item.promptAr}</span>
                    </div>
                    <p className="text-xs text-slate-700">
                      إجابة الطفل:{' '}
                      <strong className="text-slate-900">
                        {rec.childAnswerText || '—'}
                      </strong>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      المفتاح المقبول: {item.acceptedAnswers.join(' / ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateVerbalResponses({
                          ...verbalResponses,
                          [item.key]: {
                            ...rec,
                            isCorrect: true,
                            autoCredited: false,
                          },
                        })
                      }
                      className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                        rec.isCorrect
                          ? 'border-teal-600 bg-teal-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-teal-50'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>صحيح (١)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateVerbalResponses({
                          ...verbalResponses,
                          [item.key]: {
                            ...rec,
                            isCorrect: false,
                            autoCredited: false,
                          },
                        })
                      }
                      className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                        !rec.isCorrect
                          ? 'border-rose-600 bg-rose-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-rose-50'
                      }`}
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>خطأ (٠)</span>
                    </button>
                  </div>
                </div>
              );
            })}
            {Object.keys(verbalResponses).length === 0 && (
              <p className="py-4 text-center text-xs text-slate-500">
                لم يتم تسجيل إجابات في الجزء اللفظي بعد.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
