import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Database,
  Printer,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  VISUAL_ITEMS,
  VERBAL_ITEMS,
  formatMonthsToArabicYearsMonths,
  formatMonthsToEnglishYearsMonths,
} from '../data/testData';
import {
  BilingualAIReport,
  VisualResponseRecord,
  VerbalResponseRecord,
} from '../lib/firebase';
import { ChildProfile } from './ChildInfoPage';
import { InstitutionalLogos } from './CoverPage';
import { computeAssessmentMetrics } from './ScoringPage';
import { PerformanceChart } from './PerformanceChart';

interface ReportPageProps {
  profile: ChildProfile;
  chronologicalAgeMonths: number;
  visualResponses: Record<string, VisualResponseRecord>;
  verbalResponses: Record<string, VerbalResponseRecord>;
  clinicalNotes: string;
  aiReport: BilingualAIReport | null;
  onUpdateAiReport: (report: BilingualAIReport) => void;
  logos: InstitutionalLogos;
  isSavedInDb: boolean;
  onSaveSession: (status: 'in_progress' | 'completed', overrideReport?: BilingualAIReport) => Promise<boolean>;
  onBackToScoring: () => void;
}

type ReportLanguageView = 'bilingual' | 'ar' | 'en';

export const ReportPage: React.FC<ReportPageProps> = ({
  profile,
  chronologicalAgeMonths,
  visualResponses,
  verbalResponses,
  clinicalNotes,
  aiReport,
  onUpdateAiReport,
  logos,
  isSavedInDb,
  onSaveSession,
  onBackToScoring,
}) => {
  const [langView, setLangView] = useState<ReportLanguageView>('bilingual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const autoTriggeredRef = useRef(false);

  const metrics = useMemo(
    () => computeAssessmentMetrics(visualResponses, verbalResponses, chronologicalAgeMonths),
    [visualResponses, verbalResponses, chronologicalAgeMonths]
  );

  const generateReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSaveNotice(null);

    try {
      const missedItemsSummary: string[] = [];
      const passedHighItemsSummary: string[] = [];

      for (const item of VISUAL_ITEMS) {
        const rec = visualResponses[item.key];
        if (!rec) continue;
        if (!rec.isCorrect && missedItemsSummary.length < 10) {
          const correctOpt = item.options.find((o) => o.position === item.correctPosition);
          missedItemsSummary.push(
            `Visual #${item.itemNumber} (${correctOpt?.labelEn || 'Shape'})`
          );
        } else if (
          rec.isCorrect &&
          !rec.autoCredited &&
          (item.itemNumber ?? 0) >= 26 &&
          passedHighItemsSummary.length < 8
        ) {
          passedHighItemsSummary.push(`Visual #${item.itemNumber}`);
        }
      }

      for (const item of VERBAL_ITEMS) {
        const rec = verbalResponses[item.key];
        if (!rec) continue;
        if (!rec.isCorrect && missedItemsSummary.length < 16) {
          missedItemsSummary.push(`Verbal #${item.itemNumber}: ${item.promptEn}`);
        } else if (
          rec.isCorrect &&
          !rec.autoCredited &&
          (item.itemNumber ?? 0) >= 26 &&
          passedHighItemsSummary.length < 14
        ) {
          passedHighItemsSummary.push(`Verbal #${item.itemNumber}: ${item.promptEn}`);
        }
      }

      const payload = {
        childName: profile.childName,
        childCode: profile.childCode || undefined,
        gender: profile.gender,
        chronologicalAgeYears: Math.floor(chronologicalAgeMonths / 12),
        chronologicalAgeRemMonths: chronologicalAgeMonths % 12,
        chronologicalAgeMonths,
        mentalAgeMonths: metrics.mentalAgeMonths,
        mentalAgeLabelAr: metrics.mentalAgeLabelAr,
        mentalAgeLabelEn: metrics.mentalAgeLabelEn,
        visualRawScore: metrics.visualRawScore,
        verbalRawScore: metrics.verbalRawScore,
        totalRawScore: metrics.totalRawScore,
        iqScore: metrics.iqScore,
        classificationAr: metrics.classificationAr,
        classificationEn: metrics.classificationEn,
        normNoteAr: metrics.normNoteAr,
        motorImpairedMode: profile.motorImpairedMode,
        groupBreakdown: metrics.groupBreakdown,
        missedItemsSummary,
        passedHighItemsSummary,
        clinicalNotes: clinicalNotes || undefined,
      };

      const res = await fetch('/api/report/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const rawBody = await res.text();
      let data: Partial<BilingualAIReport> & { error?: string } = {};
      try {
        data = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        throw new Error('استغرق الخادم وقتاً أطول من المتوقع. يرجى الضغط على «إعادة المحاولة».');
      }

      if (!res.ok || !data.ar || !data.en) {
        throw new Error(data?.error || 'فشل توليد التقرير التشخيصي من الخادم.');
      }

      const reportResult = data as BilingualAIReport;
      onUpdateAiReport(reportResult);

      try {
        await onSaveSession('completed', reportResult);
        setSaveNotice('تم حفظ التقرير المولد تلقائياً في قاعدة البيانات المشتركة.');
      } catch {
        // Non-blocking notice if auto-save fails
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'تعذر الاتصال بخدمة التحليل الذكي حالياً.'
      );
    } finally {
      setLoading(false);
    }
  }, [
    profile,
    chronologicalAgeMonths,
    visualResponses,
    verbalResponses,
    clinicalNotes,
    metrics,
    onUpdateAiReport,
    onSaveSession,
  ]);

  useEffect(() => {
    if (!aiReport && !autoTriggeredRef.current) {
      autoTriggeredRef.current = true;
      generateReport();
    }
  }, [aiReport, generateReport]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      {/* Toolbar (hidden on print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onBackToScoring}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة للدرجات</span>
          </button>

          <div className="inline-flex rounded-lg bg-slate-100 p-1">
            {(
              [
                { id: 'bilingual', label: 'ثنائي اللغة' },
                { id: 'ar', label: 'عربي فقط' },
                { id: 'en', label: 'English' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLangView(opt.id)}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  langView === opt.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={generateReport}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{aiReport ? 'إعادة توليد التحليل' : 'توليد التحليل'}</span>
          </button>

          {!isSavedInDb && aiReport && (
            <button
              type="button"
              onClick={() => onSaveSession('completed')}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-teal-300 bg-teal-50 px-3.5 py-2 text-xs font-bold text-teal-900 hover:bg-teal-100 whitespace-nowrap shrink-0"
            >
              <Database className="h-3.5 w-3.5" />
              <span>حفظ في السجل</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#0F4C81] px-4 py-2 text-xs font-bold text-white hover:bg-[#0c3d68] whitespace-nowrap shrink-0"
          >
            <Printer className="h-4 w-4" />
            <span>طباعة / تصدير PDF</span>
          </button>
        </div>
      </div>

      {saveNotice && (
        <div className="no-print rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-900">
          {saveNotice}
        </div>
      )}

      {/* Printable Report Sheet */}
      <article className="print-container rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 space-y-7">
        {/* Institutional Header with Fixed Official Logos */}
        <header className="print-avoid-break border-b-2 border-slate-200 pb-6 space-y-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="flex flex-col items-center text-center">
              <img
                src={logos.specificEducationLogo}
                alt="شعار كلية التربية النوعية - قسم الحاسب الآلي لذوي الاحتياجات الخاصة"
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
              <span className="mt-1.5 text-[11px] font-bold text-slate-900">
                كلية التربية النوعية
              </span>
              <span className="text-[10px] font-semibold text-[#0F4C81]">
                قسم الحاسب الآلي لذوي الاحتياجات الخاصة
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src={logos.universityLogo}
                alt="شعار جامعة المنوفية"
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              />
              <span className="mt-1.5 text-xs font-extrabold text-slate-900">
                جامعة المنوفية
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src={logos.artsFacultyLogo}
                alt="شعار كلية الآداب - جامعة المنوفية"
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
              <span className="mt-1.5 text-[11px] font-bold text-slate-900">
                كلية الآداب
              </span>
              <span className="text-[10px] font-semibold text-[#0D9488]">
                قسم علم النفس
              </span>
            </div>
          </div>

          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-extrabold text-slate-900">
              التقرير التشخيصي النفسي التربوي — اختبار ذكاء الأطفال
            </h1>
            <p className="font-en text-xs font-semibold text-slate-500">
              Psycho-Educational Diagnostic Report · Dr. Eglal Mohamed Serry Children&apos;s Intelligence Test (1988)
            </p>
            <p className="text-xs text-slate-600">
              إهداء مقدم من: <strong>كلية التربية النوعية - قسم الحاسب الآلي لذوي الاحتياجات الخاصة</strong> إلى:{' '}
              <strong>كلية الآداب - قسم علم النفس</strong>
            </p>
          </div>
        </header>

        {/* Demographics & Psychometric Summary Grid */}
        <section className="print-avoid-break grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs">
            <h2 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-1.5">
              بيانات الحالة / Child Profile
            </h2>
            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
              <span className="text-slate-500">الاسم / الكود:</span>
              <span className="font-bold text-slate-900">
                {profile.childName} {profile.childCode ? `(${profile.childCode})` : ''}
              </span>

              <span className="text-slate-500">الجنس:</span>
              <span className="font-semibold text-slate-800">
                {profile.gender === 'male' ? 'ذكر / Male' : 'أنثى / Female'}
              </span>

              <span className="text-slate-500">تاريخ التطبيق:</span>
              <span className="font-mono-num font-semibold text-slate-800">{profile.testDate}</span>

              <span className="text-slate-500">العمر الزمني:</span>
              <span className="font-mono-num font-bold text-slate-900">
                {formatMonthsToArabicYearsMonths(chronologicalAgeMonths)} ({chronologicalAgeMonths}m)
              </span>

              {profile.schoolOrNursery && (
                <>
                  <span className="text-slate-500">المدرسة / الحضانة:</span>
                  <span className="font-semibold text-slate-800">{profile.schoolOrNursery}</span>
                </>
              )}

              {profile.examinerName && (
                <>
                  <span className="text-slate-500">الفاحص النفسي:</span>
                  <span className="font-semibold text-slate-800">{profile.examinerName}</span>
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 space-y-2 text-xs">
            <h2 className="font-bold text-[#0F4C81] text-sm border-b border-sky-200 pb-1.5">
              النتائج السيكومترية / Psychometric Metrics
            </h2>
            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
              <span className="text-slate-600">الدرجة الخام الكلية:</span>
              <span className="font-mono-num font-extrabold text-slate-900">
                {metrics.totalRawScore} / 90 (مصور {metrics.visualRawScore} + لفظي {metrics.verbalRawScore})
              </span>

              <span className="text-slate-600">العمر العقلي (جدول ٢):</span>
              <span className="font-mono-num font-bold text-[#0F4C81]">
                {metrics.mentalAgeLabelAr} ({formatMonthsToEnglishYearsMonths(metrics.mentalAgeMonths)})
              </span>

              <span className="text-slate-600">نسبة الذكاء (IQ):</span>
              <span className="font-mono-num text-base font-extrabold text-[#0F4C81]">
                {metrics.iqScore}
              </span>

              <span className="text-slate-600">التصنيف العربي:</span>
              <span className="font-bold text-slate-900">{metrics.classificationAr}</span>

              <span className="text-slate-600">English Classification:</span>
              <span className="font-en font-bold text-slate-800">{metrics.classificationEn}</span>
            </div>
          </div>
        </section>

        {/* Compact Group Table */}
        <section className="print-avoid-break overflow-x-auto">
          <table className="w-full border-collapse rounded-xl border border-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="border border-slate-200 px-3 py-2 text-right font-bold">
                  المجموعة العمرية / Age Group
                </th>
                <th className="border border-slate-200 px-3 py-2 text-center font-bold">
                  الجزء المصور (من ١٥)
                </th>
                <th className="border border-slate-200 px-3 py-2 text-center font-bold">
                  الجزء اللفظي (من ١٥)
                </th>
                <th className="border border-slate-200 px-3 py-2 text-center font-bold">
                  المجموع (من ٣٠)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 px-3 py-2 font-semibold">
                  المجموعة الأولى (٣–٥ سنوات · بنود ١–١٥)
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold">
                  {metrics.groupBreakdown.visualGroup1} / 15
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold">
                  {metrics.groupBreakdown.verbalGroup1} / 15
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold text-[#0F4C81]">
                  {metrics.groupBreakdown.visualGroup1 + metrics.groupBreakdown.verbalGroup1} / 30
                </td>
              </tr>
              <tr>
                <td className="border border-slate-200 px-3 py-2 font-semibold">
                  المجموعة الثانية (٥–٧ سنوات · بنود ١٦–٣٠)
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold">
                  {metrics.groupBreakdown.visualGroup2} / 15
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold">
                  {metrics.groupBreakdown.verbalGroup2} / 15
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold text-[#0F4C81]">
                  {metrics.groupBreakdown.visualGroup2 + metrics.groupBreakdown.verbalGroup2} / 30
                </td>
              </tr>
              <tr>
                <td className="border border-slate-200 px-3 py-2 font-semibold">
                  المجموعة الثالثة (٧–٩ سنوات · بنود ٣١–٤٥)
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold">
                  {metrics.groupBreakdown.visualGroup3} / 15
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold">
                  {metrics.groupBreakdown.verbalGroup3} / 15
                </td>
                <td className="font-mono-num border border-slate-200 px-3 py-2 text-center font-bold text-[#0F4C81]">
                  {metrics.groupBreakdown.visualGroup3 + metrics.groupBreakdown.verbalGroup3} / 30
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Recharts Performance Progression vs. Age-Group Normative Average */}
        <PerformanceChart
          chronologicalAgeMonths={chronologicalAgeMonths}
          visualResponses={visualResponses}
          verbalResponses={verbalResponses}
          metrics={metrics}
          langView={langView}
        />

        {/* AI Diagnostic Content */}
        {loading && (
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center space-y-3">
            <Sparkles className="mx-auto h-7 w-7 animate-pulse text-[#0F4C81]" />
            <p className="text-sm font-bold text-slate-900">
              جاري إعداد التحليل النفسي التربوي ثنائي اللغة بالذكاء الاصطناعي...
            </p>
            <p className="text-xs text-slate-500">
              يتم تحليل التوازن بين التمييز البصري والاستدلال اللفظي واستخلاص نقاط القوة والتوصيات.
            </p>
          </section>
        )}

        {error && !loading && (
          <section className="rounded-xl border border-rose-200 bg-rose-50 p-6 space-y-3">
            <div className="flex items-start gap-2.5 text-rose-900">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold">تعذر إتمام التحليل الذكي</h3>
                <p className="text-xs leading-relaxed">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={generateReport}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-800"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>إعادة المحاولة</span>
            </button>
          </section>
        )}

        {aiReport && !loading && (
          <div className="space-y-6">
            {/* Arabic Section */}
            {(langView === 'bilingual' || langView === 'ar') && (
              <section className="space-y-4" dir="rtl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h2 className="text-lg font-extrabold text-[#0F4C81]">
                    أولاً: التقرير الإكلينيكي باللغة العربية
                  </h2>
                </div>

                <div className="print-avoid-break rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-700">الملخص التنفيذي</h3>
                  <p className="text-sm text-slate-800 leading-relaxed">{aiReport.ar.summary}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="print-avoid-break rounded-xl border border-teal-200 bg-teal-50/40 p-4 space-y-2">
                    <h3 className="text-xs font-bold text-teal-900">نقاط القوة (Strengths)</h3>
                    <ul className="list-disc space-y-1.5 pr-4 text-xs text-slate-800 leading-relaxed">
                      {aiReport.ar.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="print-avoid-break rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-2">
                    <h3 className="text-xs font-bold text-amber-900">
                      جوانب الضعف والاحتياج للدعم (Areas for Growth)
                    </h3>
                    <ul className="list-disc space-y-1.5 pr-4 text-xs text-slate-800 leading-relaxed">
                      {aiReport.ar.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="print-avoid-break rounded-xl border border-slate-200 bg-white p-4 space-y-1.5">
                  <h3 className="text-xs font-bold text-[#0F4C81]">التشخيص النفسي التربوي</h3>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {aiReport.ar.clinicalDiagnosis}
                  </p>
                </div>

                <div className="print-avoid-break rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                  <h3 className="text-xs font-bold text-slate-800">
                    التوصيات التربوية والأسرية المقترحة
                  </h3>
                  <ul className="list-disc space-y-1.5 pr-4 text-xs text-slate-800 leading-relaxed">
                    {aiReport.ar.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* English Section */}
            {(langView === 'bilingual' || langView === 'en') && (
              <section
                className={`font-en space-y-4 ${
                  langView === 'bilingual' ? 'border-t-2 border-slate-200 pt-6' : ''
                }`}
                dir="ltr"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h2 className="text-lg font-bold text-[#0F4C81]">
                    {langView === 'bilingual'
                      ? 'Part II: English Clinical Report'
                      : 'English Clinical Report'}
                  </h2>
                </div>

                <div className="print-avoid-break rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-700">Executive Summary</h3>
                  <p className="text-sm text-slate-800 leading-relaxed">{aiReport.en.summary}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="print-avoid-break rounded-xl border border-teal-200 bg-teal-50/40 p-4 space-y-2">
                    <h3 className="text-xs font-bold text-teal-900">Cognitive Strengths</h3>
                    <ul className="list-disc space-y-1.5 pl-4 text-xs text-slate-800 leading-relaxed">
                      {aiReport.en.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="print-avoid-break rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-2">
                    <h3 className="text-xs font-bold text-amber-900">
                      Areas for Growth & Support
                    </h3>
                    <ul className="list-disc space-y-1.5 pl-4 text-xs text-slate-800 leading-relaxed">
                      {aiReport.en.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="print-avoid-break rounded-xl border border-slate-200 bg-white p-4 space-y-1.5">
                  <h3 className="text-xs font-bold text-[#0F4C81]">
                    Psycho-Educational Clinical Diagnosis
                  </h3>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {aiReport.en.clinicalDiagnosis}
                  </p>
                </div>

                <div className="print-avoid-break rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                  <h3 className="text-xs font-bold text-slate-800">
                    Intervention & Educational Recommendations
                  </h3>
                  <ul className="list-disc space-y-1.5 pl-4 text-xs text-slate-800 leading-relaxed">
                    {aiReport.en.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>
        )}

        {/* Examiner Notes + Signatures */}
        {clinicalNotes.trim().length > 0 && (
          <section className="print-avoid-break rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-700">
              ملاحظات الفاحص الإكلينيكية / Examiner Observations
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
              {clinicalNotes}
            </p>
          </section>
        )}

        <footer className="print-avoid-break grid grid-cols-2 gap-8 border-t border-slate-200 pt-8 text-xs text-slate-600">
          <div className="text-center space-y-8">
            <p className="font-bold text-slate-800">توقيع الأخصائي / الفاحص النفسي</p>
            <p className="border-t border-dashed border-slate-300 pt-2">
              {profile.examinerName || '........................................'}
            </p>
          </div>
          <div className="text-center space-y-8">
            <p className="font-bold text-slate-800">اعتماد قسم علم النفس — كلية الآداب</p>
            <p className="border-t border-dashed border-slate-300 pt-2">
              ........................................
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
};
