import React, { useMemo } from 'react';
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Info,
  Lock,
  UserCheck,
} from 'lucide-react';
import {
  calculateChronologicalAge,
  formatMonthsToArabicYearsMonths,
} from '../data/testData';

export interface ChildProfile {
  childName: string;
  childCode: string;
  gender: 'male' | 'female';
  schoolOrNursery: string;
  cityOrVillage: string;
  examinerName: string;
  ageInputMode: 'birthdate' | 'manual';
  birthDate: string;
  manualYears: number;
  manualMonths: number;
  testDate: string;
  motorImpairedMode: boolean;
}

interface ChildInfoPageProps {
  profile: ChildProfile;
  examinerPin: string;
  onChangeExaminerPin: (pin: string) => void;
  onChange: (updated: ChildProfile) => void;
  onBack: () => void;
  onStartTest: () => void;
}

export const ChildInfoPage: React.FC<ChildInfoPageProps> = ({
  profile,
  examinerPin,
  onChangeExaminerPin,
  onChange,
  onBack,
  onStartTest,
}) => {
  const ageResult = useMemo(() => {
    if (profile.ageInputMode === 'birthdate') {
      return calculateChronologicalAge(profile.birthDate, profile.testDate);
    }
    const y = Math.max(0, Math.min(18, Number(profile.manualYears) || 0));
    const m = Math.max(0, Math.min(11, Number(profile.manualMonths) || 0));
    const totalMonths = y * 12 + m;
    if (totalMonths < 12) {
      return {
        years: y,
        months: m,
        days: 0,
        totalMonths,
        isValid: false,
        errorAr: 'يرجى إدخال عمر صالح (يفضل بين ٣ و٩ سنوات).',
      };
    }
    return {
      years: y,
      months: m,
      days: 0,
      totalMonths,
      isValid: true,
    };
  }, [
    profile.ageInputMode,
    profile.birthDate,
    profile.testDate,
    profile.manualYears,
    profile.manualMonths,
  ]);

  const isFormComplete =
    profile.childName.trim().length > 0 &&
    profile.testDate.trim().length > 0 &&
    ageResult.isValid;

  const startsAtItem16 = ageResult.isValid && ageResult.totalMonths >= 72;

  const updateField = <K extends keyof ChildProfile>(key: K, val: ChildProfile[K]) => {
    onChange({ ...profile, [key]: val });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة للغلاف</span>
        </button>

        <div className="text-xs font-medium text-slate-500">
          الخطوة ٢ من ٥ · بيانات الحالة والعمر الزمني
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Intake Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              بيانات الطفل وورقة الإجابة الأساسية
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              أدخل بيانات الحالة وتاريخ الميلاد ليتم حساب العمر الزمني بدقة وتحديد نقطة البدء الإكلينيكية.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                اسم الطفل أو الكود التعريفي *
              </label>
              <input
                type="text"
                value={profile.childName}
                onChange={(e) => updateField('childName', e.target.value)}
                placeholder="مثال: أحمد محمد أو كود CH-2026-01"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#0F4C81] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                كود الخصوصية (اختياري)
              </label>
              <input
                type="text"
                value={profile.childCode}
                onChange={(e) => updateField('childCode', e.target.value)}
                placeholder="مثال: PSY-104"
                className="font-mono-num w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#0F4C81] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                الجنس *
              </label>
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => updateField('gender', 'male')}
                  className={`min-h-[36px] rounded-lg text-xs font-bold transition-colors ${
                    profile.gender === 'male'
                      ? 'bg-white text-[#0F4C81] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ذكر
                </button>
                <button
                  type="button"
                  onClick={() => updateField('gender', 'female')}
                  className={`min-h-[36px] rounded-lg text-xs font-bold transition-colors ${
                    profile.gender === 'female'
                      ? 'bg-white text-[#0F4C81] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  أنثى
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                الحضانة أو المدرسة
              </label>
              <input
                type="text"
                value={profile.schoolOrNursery}
                onChange={(e) => updateField('schoolOrNursery', e.target.value)}
                placeholder="اسم المدرسة أو الحضانة"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#0F4C81] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                المدينة أو القرية
              </label>
              <input
                type="text"
                value={profile.cityOrVillage}
                onChange={(e) => updateField('cityOrVillage', e.target.value)}
                placeholder="مثال: شبين الكوم - المنوفية"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#0F4C81] focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                اسم الفاحص / الأخصائي النفسي
              </label>
              <input
                type="text"
                value={profile.examinerName}
                onChange={(e) => updateField('examinerName', e.target.value)}
                placeholder="اسم الأخصائي أو الباحث القائم بالتطبيق"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#0F4C81] focus:bg-white"
              />
            </div>
          </div>

          {/* Date & Age Calculation Inputs */}
          <div className="space-y-4 border-t border-slate-100 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700">حساب العمر الزمني *</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => updateField('ageInputMode', 'birthdate')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    profile.ageInputMode === 'birthdate'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  تاريخ الميلاد
                </button>
                <button
                  type="button"
                  onClick={() => updateField('ageInputMode', 'manual')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    profile.ageInputMode === 'manual'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  بالسنوات والشهور
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profile.ageInputMode === 'birthdate' ? (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    تاريخ ميلاد الطفل *
                  </label>
                  <input
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                    className="font-mono-num w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-[#0F4C81] focus:bg-white"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      السنوات *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={profile.manualYears}
                      onChange={(e) => updateField('manualYears', Number(e.target.value))}
                      className="font-mono-num w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-[#0F4C81] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      الشهور *
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={11}
                      value={profile.manualMonths}
                      onChange={(e) => updateField('manualMonths', Number(e.target.value))}
                      className="font-mono-num w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-[#0F4C81] focus:bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  تاريخ اليوم (تاريخ تطبيق الاختبار) *
                </label>
                <input
                  type="date"
                  value={profile.testDate}
                  onChange={(e) => updateField('testDate', e.target.value)}
                  className="font-mono-num w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-[#0F4C81] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Motor-impaired clinical option */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={profile.motorImpairedMode}
                onChange={(e) => updateField('motorImpairedMode', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0F4C81] focus:ring-[#0F4C81]"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                  <Accessibility className="h-4 w-4 text-[#0F4C81]" />
                  <span>تفعيل وضع التسهيل لذوي الإعاقة الحركية</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  وفق دليل الاختبار (ص ١٨): يشير الفاحص إلى كل صورة بالتدرج من اليمين إلى اليسار ليسأل الطفل «دي؟» ويكتفي الطفل بالإشارة بالرأس أو قول «نعم».
                </p>
              </div>
            </label>
          </div>

          {/* Examiner Results Lock PIN */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
              <Lock className="h-4 w-4 text-amber-700" />
              <span>رمز قفل النتائج الخاص بالمختبر (لإخفاء النتيجة عن الطالب)</span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={12}
                value={examinerPin}
                onChange={(e) => onChangeExaminerPin(e.target.value.trim() || '1234')}
                placeholder="1234"
                className="font-mono-num w-full sm:w-44 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-[#0F4C81]"
              />
              <p className="text-xs text-amber-900 leading-relaxed">
                سيُطلب هذا الرمز من <strong>المختبر فقط</strong> بعد انتهاء الاختبار لعرض الدرجات ونسبة الذكاء (الافتراضي: <span className="font-mono-num font-bold">1234</span>).
              </p>
            </div>
          </div>
        </div>

        {/* Live Age Result & Start Readiness */}
        <div className="space-y-5 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="h-5 w-5 text-[#0F4C81]" />
              <h2 className="text-base font-bold text-slate-900">
                حساب العمر الزمني التلقائي
              </h2>
            </div>

            {ageResult.isValid ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-center">
                  <p className="text-xs font-semibold text-sky-900">العمر الزمني المحسوب</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#0F4C81]">
                    {formatMonthsToArabicYearsMonths(ageResult.totalMonths)}
                  </p>
                  <p className="font-mono-num mt-1 text-sm font-semibold text-slate-700">
                    {ageResult.totalMonths} شهراً ({ageResult.years} سنة · {ageResult.months} شهر · {ageResult.days} يوم)
                  </p>
                </div>

                {(ageResult.totalMonths < 36 || ageResult.totalMonths > 119) && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      تنبيه: الفئة العمرية المقننة للاختبار هي من ٣ إلى ٩ سنوات (٣٦ إلى ١٠٨ شهراً). يمكنك الاستمرار في التطبيق للأغراض البحثية أو الإكلينيكية.
                    </span>
                  </div>
                )}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <UserCheck className="h-4 w-4 text-teal-700" />
                    <span>قاعدة البدء الإكلينيكية المقررة</span>
                  </div>
                  {startsAtItem16 ? (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      عمر الطفل <strong className="text-slate-900">٦ سنوات فأكثر</strong>: سيبدأ الاختبار آلياً من <strong className="text-[#0F4C81]">البند رقم (١٦)</strong> في المجموعة الثانية. إذا نجح في البنود (١٦–٢٥) تُحتسب له درجات البنود (١–١٥) تلقائياً.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      عمر الطفل <strong className="text-slate-900">أقل من ٦ سنوات</strong>: سيبدأ الاختبار آلياً من <strong className="text-[#0F4C81]">البند رقم (١)</strong> في المجموعة الأولى بعد إتمام الأمثلة التدريبية (أ، ب، ج).
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-sm font-medium text-slate-600">
                  {ageResult.errorAr || 'أدخل تاريخ ميلاد الطفل لحساب العمر الزمني تلقائياً.'}
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>اكتمال اسم الطفل أو الكود</span>
                <span className={profile.childName.trim() ? 'font-bold text-teal-700' : 'text-slate-400'}>
                  {profile.childName.trim() ? 'مكتمل' : 'مطلوب'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>حساب العمر الزمني</span>
                <span className={ageResult.isValid ? 'font-bold text-teal-700' : 'text-slate-400'}>
                  {ageResult.isValid ? 'محسوب' : 'مطلوب'}
                </span>
              </div>

              <button
                type="button"
                disabled={!isFormComplete}
                onClick={onStartTest}
                className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c3d68] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>بدء الاختبار</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
