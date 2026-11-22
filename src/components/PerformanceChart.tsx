import React, { useMemo, useState } from 'react';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  VISUAL_ITEMS,
  VERBAL_ITEMS,
  formatMonthsToArabicYearsMonths,
  formatMonthsToEnglishYearsMonths,
  getAgeNormativeProfile,
} from '../data/testData';
import { VisualResponseRecord, VerbalResponseRecord } from '../lib/firebase';
import { ComputedScoringMetrics } from './ScoringPage';

interface PerformanceChartProps {
  chronologicalAgeMonths: number;
  visualResponses: Record<string, VisualResponseRecord>;
  verbalResponses: Record<string, VerbalResponseRecord>;
  metrics: ComputedScoringMetrics;
  langView: 'bilingual' | 'ar' | 'en';
}

type ChartMode = 'progression' | 'groups';

interface ProgressionPoint {
  bandLabel: string;
  bandLabelEn: string;
  rangeAr: string;
  groupNameAr: string;
  groupNameEn: string;
  visualCorrect: number;
  verbalCorrect: number;
  visualPct: number;
  verbalPct: number;
  combinedPct: number;
  ageNormPct: number;
  ageNormItems: number;
}

interface GroupComparisonPoint {
  labelAr: string;
  labelEn: string;
  visualScore: number;
  verbalScore: number;
  maxModality: number;
  visualPct: number;
  verbalPct: number;
  ageNormPct: number;
}

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
function toArabicDigits(num: number): string {
  return String(num).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)] ?? d);
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  chronologicalAgeMonths,
  visualResponses,
  verbalResponses,
  metrics,
  langView,
}) => {
  const [chartMode, setChartMode] = useState<ChartMode>('progression');
  const isEnglishOnly = langView === 'en';

  const normative = useMemo(
    () => getAgeNormativeProfile(chronologicalAgeMonths),
    [chronologicalAgeMonths]
  );

  const progressionData = useMemo<ProgressionPoint[]>(() => {
    return normative.itemBands.map((band) => {
      let visualCorrect = 0;
      let verbalCorrect = 0;

      for (let num = band.startItem; num <= band.endItem; num++) {
        const vItem = VISUAL_ITEMS[num - 1];
        const lItem = VERBAL_ITEMS[num - 1];
        if (vItem && visualResponses[vItem.key]?.isCorrect) {
          visualCorrect += 1;
        }
        if (lItem && verbalResponses[lItem.key]?.isCorrect) {
          verbalCorrect += 1;
        }
      }

      const visualPct = Math.round((visualCorrect / 5) * 100);
      const verbalPct = Math.round((verbalCorrect / 5) * 100);
      const combinedPct = Math.round(((visualCorrect + verbalCorrect) / 10) * 100);

      const groupNameAr =
        band.group === 1
          ? 'المجموعة ١ (٣–٥ سنوات)'
          : band.group === 2
          ? 'المجموعة ٢ (٥–٧ سنوات)'
          : 'المجموعة ٣ (٧–٩ سنوات)';
      const groupNameEn =
        band.group === 1
          ? 'Group 1 (3–5y)'
          : band.group === 2
          ? 'Group 2 (5–7y)'
          : 'Group 3 (7–9y)';

      return {
        bandLabel: `${toArabicDigits(band.startItem)}–${toArabicDigits(band.endItem)}`,
        bandLabelEn: `${band.startItem}–${band.endItem}`,
        rangeAr: `البنود ${toArabicDigits(band.startItem)} إلى ${toArabicDigits(band.endItem)}`,
        groupNameAr,
        groupNameEn,
        visualCorrect,
        verbalCorrect,
        visualPct,
        verbalPct,
        combinedPct,
        ageNormPct: band.expectedPct,
        ageNormItems: band.expectedItemsOutOf5,
      };
    });
  }, [normative, visualResponses, verbalResponses]);

  const groupData = useMemo<GroupComparisonPoint[]>(() => {
    const g = metrics.groupBreakdown;
    return [
      {
        labelAr: 'المجموعة ١ (٣–٥)',
        labelEn: 'Group 1 (3–5y)',
        visualScore: g.visualGroup1,
        verbalScore: g.verbalGroup1,
        maxModality: 15,
        visualPct: Math.round((g.visualGroup1 / 15) * 100),
        verbalPct: Math.round((g.verbalGroup1 / 15) * 100),
        ageNormPct: normative.groupExpectedPct.group1,
      },
      {
        labelAr: 'المجموعة ٢ (٥–٧)',
        labelEn: 'Group 2 (5–7y)',
        visualScore: g.visualGroup2,
        verbalScore: g.verbalGroup2,
        maxModality: 15,
        visualPct: Math.round((g.visualGroup2 / 15) * 100),
        verbalPct: Math.round((g.verbalGroup2 / 15) * 100),
        ageNormPct: normative.groupExpectedPct.group2,
      },
      {
        labelAr: 'المجموعة ٣ (٧–٩)',
        labelEn: 'Group 3 (7–9y)',
        visualScore: g.visualGroup3,
        verbalScore: g.verbalGroup3,
        maxModality: 15,
        visualPct: Math.round((g.visualGroup3 / 15) * 100),
        verbalPct: Math.round((g.verbalGroup3 / 15) * 100),
        ageNormPct: normative.groupExpectedPct.group3,
      },
      {
        labelAr: 'الإجمالي (١–٤٥)',
        labelEn: 'Overall (1–45)',
        visualScore: metrics.visualRawScore,
        verbalScore: metrics.verbalRawScore,
        maxModality: 45,
        visualPct: Math.round((metrics.visualRawScore / 45) * 100),
        verbalPct: Math.round((metrics.verbalRawScore / 45) * 100),
        ageNormPct: normative.groupExpectedPct.total,
      },
    ];
  }, [metrics, normative]);

  const diffFromNorm = Number((metrics.totalRawScore - normative.expectedTotalRaw).toFixed(1));
  const diffStatusAr =
    diffFromNorm > 2
      ? 'أعلى من المتوسط العمري'
      : diffFromNorm < -2
      ? 'أقل من المتوسط العمري'
      : 'مطابق للمتوسط العمري';
  const diffStatusEn =
    diffFromNorm > 2
      ? 'Above Age Average'
      : diffFromNorm < -2
      ? 'Below Age Average'
      : 'At Age Average';

  const diffToneClass =
    diffFromNorm > 2
      ? 'text-teal-800'
      : diffFromNorm < -2
      ? 'text-amber-800'
      : 'text-[#0F4C81]';

  const ageLabelAr = formatMonthsToArabicYearsMonths(chronologicalAgeMonths);
  const ageLabelEn = formatMonthsToEnglishYearsMonths(chronologicalAgeMonths);

  return (
    <section
      className="print-avoid-break rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5"
      dir={isEnglishOnly ? 'ltr' : 'rtl'}
    >
      {/* Header & Mode Switcher */}
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div className="space-y-0.5">
          <h2 className="text-base font-extrabold text-slate-900">
            {isEnglishOnly
              ? 'Item-by-Item Performance Progression vs. Chronological Age Average'
              : 'منحنى تطور أداء الطفل في بنود الاختبار مقارنة بالمتوسط العمري'}
          </h2>
          <p className="text-xs text-slate-500">
            {isEnglishOnly
              ? `Child mastery rate (%) across test items 1–45 benchmarked against Table 2 normative average for age ${ageLabelEn} (IQ = 100).`
              : `مقارنة نسبة إتقان الطفل في بنود الجزأين المصور واللفظي بالمتوسط العمري المعياري لجدول (٢) عند عمر ${ageLabelAr}.`}
          </p>
        </div>

        <div className="no-print inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setChartMode('progression')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              chartMode === 'progression'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{isEnglishOnly ? 'Item Progression' : 'تطور البنود (١–٤٥)'}</span>
          </button>
          <button
            type="button"
            onClick={() => setChartMode('groups')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              chartMode === 'groups'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>{isEnglishOnly ? 'By Age Group' : 'مقارنة المجموعات'}</span>
          </button>
        </div>
      </div>

      {/* Quantitative Benchmark Strip (Clean tabular figures, no nested cards) */}
      <div className="grid grid-cols-1 gap-4 border-b border-slate-100 pb-4 text-xs sm:grid-cols-3">
        <div className="space-y-0.5">
          <span className="text-slate-500">
            {isEnglishOnly ? 'Child Total Raw Score' : 'أداء الطفل الكلي'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-num text-lg font-extrabold text-slate-900">
              {metrics.totalRawScore} / 90
            </span>
            <span className="font-mono-num text-slate-500">
              ({Math.round((metrics.totalRawScore / 90) * 100)}%)
            </span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-slate-500">
            {isEnglishOnly
              ? `Normative Age Average (${ageLabelEn})`
              : `المتوسط العمري المتوقع (${ageLabelAr})`}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-num text-lg font-extrabold text-amber-700">
              {normative.expectedTotalRaw} / 90
            </span>
            <span className="font-mono-num text-slate-500">
              ({normative.groupExpectedPct.total}%)
            </span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-slate-500">
            {isEnglishOnly ? 'Variance vs. Age Norm' : 'الفارق عن المتوسط العمري'}
          </span>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className={`font-mono-num text-lg font-extrabold ${diffToneClass}`} dir="ltr">
              {diffFromNorm > 0 ? `+${diffFromNorm}` : `${diffFromNorm}`}
            </span>
            <span className={`font-bold ${diffToneClass}`}>
              {isEnglishOnly ? diffStatusEn : diffStatusAr}
            </span>
          </div>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-5 rounded-xs bg-[#0F4C81]" aria-hidden="true" />
            <span className="font-semibold text-slate-800">
              {isEnglishOnly ? 'Visual Subtest (%)' : 'الجزء المصور (%)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-5 rounded-xs bg-[#0D9488]" aria-hidden="true" />
            <span className="font-semibold text-slate-800">
              {isEnglishOnly ? 'Verbal Subtest (%)' : 'الجزء اللفظي (%)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-0.5 w-5 border-t-2 border-dashed border-amber-600"
              aria-hidden="true"
            />
            <span className="font-semibold text-amber-800">
              {isEnglishOnly
                ? `Age Normative Average (${ageLabelEn})`
                : `المتوسط العمري المعياري (${ageLabelAr})`}
            </span>
          </div>
        </div>

        {chartMode === 'progression' && (
          <span className="text-[11px] text-slate-500">
            {isEnglishOnly
              ? 'Each point represents a 5-item progression band'
              : 'كل نقطة تمثل شريحة من ٥ بنود متدرجة الصعوبة'}
          </span>
        )}
      </div>

      {/* Recharts Canvas (dir="ltr" prevents SVG axis text inversion in RTL pages) */}
      <div className="h-[310px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {chartMode === 'progression' ? (
            <ComposedChart
              data={progressionData}
              margin={{ top: 14, right: 20, left: 8, bottom: 12 }}
            >
              <defs>
                <linearGradient id="normBandFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey={isEnglishOnly ? 'bandLabelEn' : 'bandLabel'}
                reversed={!isEnglishOnly}
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
                dy={6}
              />
              <YAxis
                orientation={isEnglishOnly ? 'left' : 'right'}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                width={42}
              />
              <ReferenceLine
                x={isEnglishOnly ? '11–15' : '١١–١٥'}
                stroke="#CBD5E1"
                strokeDasharray="4 4"
              />
              <ReferenceLine
                x={isEnglishOnly ? '26–30' : '٢٦–٣٠'}
                stroke="#CBD5E1"
                strokeDasharray="4 4"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const point = payload[0].payload as ProgressionPoint;
                  return (
                    <div
                      dir={isEnglishOnly ? 'ltr' : 'rtl'}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs shadow-md space-y-1.5"
                    >
                      <div className="border-b border-slate-100 pb-1">
                        <p className="font-bold text-slate-900">
                          {isEnglishOnly ? `Items ${point.bandLabelEn}` : point.rangeAr}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {isEnglishOnly ? point.groupNameEn : point.groupNameAr}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-5">
                          <span className="font-semibold text-[#0F4C81]">
                            {isEnglishOnly ? 'Visual:' : 'الجزء المصور:'}
                          </span>
                          <span className="font-mono-num font-bold text-slate-900">
                            {point.visualCorrect}/5 ({point.visualPct}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-5">
                          <span className="font-semibold text-[#0D9488]">
                            {isEnglishOnly ? 'Verbal:' : 'الجزء اللفظي:'}
                          </span>
                          <span className="font-mono-num font-bold text-slate-900">
                            {point.verbalCorrect}/5 ({point.verbalPct}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-5 border-t border-slate-100 pt-1">
                          <span className="font-semibold text-amber-700">
                            {isEnglishOnly ? 'Age Norm Avg:' : 'المتوسط العمري:'}
                          </span>
                          <span className="font-mono-num font-bold text-amber-800">
                            {point.ageNormItems}/5 ({point.ageNormPct}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="ageNormPct"
                stroke="#D97706"
                strokeWidth={2}
                strokeDasharray="6 4"
                fill="url(#normBandFill)"
                dot={false}
                activeDot={{ r: 4, fill: '#D97706', stroke: '#fff', strokeWidth: 1.5 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="visualPct"
                stroke="#0F4C81"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#0F4C81', stroke: '#fff', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#0F4C81', stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="verbalPct"
                stroke="#0D9488"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#0D9488', stroke: '#fff', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#0D9488', stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          ) : (
            <BarChart
              data={groupData}
              margin={{ top: 14, right: 20, left: 8, bottom: 12 }}
              barGap={4}
              barCategoryGap="22%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey={isEnglishOnly ? 'labelEn' : 'labelAr'}
                reversed={!isEnglishOnly}
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
                dy={6}
              />
              <YAxis
                orientation={isEnglishOnly ? 'left' : 'right'}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                width={42}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const point = payload[0].payload as GroupComparisonPoint;
                  return (
                    <div
                      dir={isEnglishOnly ? 'ltr' : 'rtl'}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs shadow-md space-y-1.5"
                    >
                      <p className="border-b border-slate-100 pb-1 font-bold text-slate-900">
                        {isEnglishOnly ? point.labelEn : point.labelAr}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-5">
                          <span className="font-semibold text-[#0F4C81]">
                            {isEnglishOnly ? 'Visual:' : 'الجزء المصور:'}
                          </span>
                          <span className="font-mono-num font-bold text-slate-900">
                            {point.visualScore}/{point.maxModality} ({point.visualPct}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-5">
                          <span className="font-semibold text-[#0D9488]">
                            {isEnglishOnly ? 'Verbal:' : 'الجزء اللفظي:'}
                          </span>
                          <span className="font-mono-num font-bold text-slate-900">
                            {point.verbalScore}/{point.maxModality} ({point.verbalPct}%)
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-5 border-t border-slate-100 pt-1">
                          <span className="font-semibold text-amber-700">
                            {isEnglishOnly ? 'Age Norm Avg:' : 'المتوسط العمري:'}
                          </span>
                          <span className="font-mono-num font-bold text-amber-800">
                            {point.ageNormPct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="visualPct"
                fill="#0F4C81"
                radius={[4, 4, 0, 0]}
                maxBarSize={34}
                isAnimationActive={false}
              />
              <Bar
                dataKey="verbalPct"
                fill="#0D9488"
                radius={[4, 4, 0, 0]}
                maxBarSize={34}
                isAnimationActive={false}
              />
              <Bar
                dataKey="ageNormPct"
                fill="#F59E0B"
                radius={[4, 4, 0, 0]}
                maxBarSize={34}
                isAnimationActive={false}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Stage Axis Context Footer */}
      {chartMode === 'progression' && (
        <div className="grid grid-cols-3 border-t border-slate-100 pt-2.5 text-center text-[11px] font-medium text-slate-500">
          <span>
            {isEnglishOnly ? 'Group 1 · Items 1–15 (Ages 3–5)' : 'المجموعة ١ · بنود ١–١٥ (٣–٥ سنوات)'}
          </span>
          <span>
            {isEnglishOnly ? 'Group 2 · Items 16–30 (Ages 5–7)' : 'المجموعة ٢ · بنود ١٦–٣٠ (٥–٧ سنوات)'}
          </span>
          <span>
            {isEnglishOnly ? 'Group 3 · Items 31–45 (Ages 7–9)' : 'المجموعة ٣ · بنود ٣١–٤٥ (٧–٩ سنوات)'}
          </span>
        </div>
      )}
    </section>
  );
};
