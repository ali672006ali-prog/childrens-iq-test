import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Database,
  FolderArchive,
  GraduationCap,
} from 'lucide-react';

export interface InstitutionalLogos {
  universityLogo: string;
  specificEducationLogo: string;
  artsFacultyLogo: string;
}

export const DEFAULT_INSTITUTIONAL_LOGOS: InstitutionalLogos = {
  universityLogo: '/assets/aistudio/IMG-20261115-WA0079_815498e2.jpg',
  specificEducationLogo: '/assets/aistudio/IMG-20261115-WA0080_c457ec4f.jpg',
  artsFacultyLogo: '/assets/aistudio/______70d03a69.jpeg',
};

interface CoverPageProps {
  logos?: InstitutionalLogos;
  onStartSession: () => void;
  onOpenArchive: () => void;
  savedCount: number;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  logos = DEFAULT_INSTITUTIONAL_LOGOS,
  onStartSession,
  onOpenArchive,
  savedCount,
}) => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
      {/* Top Fixed Official Institutional Logos Banner */}
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 sm:px-10 sm:py-6">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3">
          {/* Right (RTL first): Specific Education / Special Needs Computer Dept */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xs sm:h-28 sm:w-28">
              <img
                src={logos.specificEducationLogo}
                alt="شعار كلية التربية النوعية - قسم معلم حاسب آلي لذوي الاحتياجات الخاصة"
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="mt-2.5 text-sm font-extrabold text-slate-900">
              كلية التربية النوعية
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-[#0F4C81]">
              قسم الحاسب الآلي لذوي الاحتياجات الخاصة
            </p>
          </div>

          {/* Center: Menoufia University */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xs sm:h-32 sm:w-32">
              <img
                src={logos.universityLogo}
                alt="شعار جامعة المنوفية"
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="mt-2.5 text-base font-extrabold text-slate-900">
              جامعة المنوفية
            </h2>
            <p className="font-en mt-0.5 text-xs font-semibold text-slate-500">
              Menoufia University
            </p>
          </div>

          {/* Left (RTL third): Faculty of Arts */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xs sm:h-28 sm:w-28">
              <img
                src={logos.artsFacultyLogo}
                alt="شعار كلية الآداب - جامعة المنوفية"
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="mt-2.5 text-sm font-extrabold text-slate-900">
              كلية الآداب
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-[#0D9488]">
              قسم علم النفس
            </p>
          </div>
        </div>
      </section>

      {/* Main Hero & Intellectual Property Attribution */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span>مقياس نفسي مقنن للأطفال (٣ - ٩ سنوات)</span>
              <span aria-hidden="true">·</span>
              <span>٩٠ بنداً (٤٥ مصوراً + ٤٥ لفظياً)</span>
              <span aria-hidden="true">·</span>
              <span>الطبعة الثانية ١٩٨٨</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl [text-wrap:balance]">
                اختبار ذكاء الأطفال
              </h1>
              <p className="font-en text-base font-medium text-slate-500">
                Children&apos;s Intelligence Test — Digital Clinical Edition
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-900">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>توثيق الملكية الفكرية والمؤلف الأصلي</span>
              </div>
              <p className="text-lg font-bold text-slate-900">
                تأليف: الدكتورة إجلال محمد سرى
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                أستاذ الصحة النفسية المساعد — كلية الدراسات الإنسانية، جامعة الأزهر.
                <br />
                الناشر: عالم الكتب — القاهرة (١٩٨٨). تم تحويل الوحدات ومعايير الأعمار العقلية رقمياً بأمانة علمية كاملة.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onStartSession}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c3d68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C81] whitespace-nowrap shrink-0"
              >
                <span>ابدأ الجلسة</span>
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenArchive}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                <FolderArchive className="h-4 w-4 text-slate-500" />
                <span>السجل المشترك للمختبرين</span>
                {savedCount > 0 && (
                  <span className="font-mono-num text-xs font-semibold text-sky-800">
                    ({savedCount})
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Academic Dedication & Collaboration Panel */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-5">
              <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
                <GraduationCap className="h-5 w-5 text-[#0F4C81]" />
                <h2 className="text-base font-bold text-slate-900">
                  التعاون الأكاديمي والإهداء العلمي
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold text-slate-500">إهداء مقدم من</p>
                  <p className="mt-1 text-sm font-bold text-slate-900 leading-snug">
                    كلية التربية النوعية — قسم الحاسب الآلي لذوي الاحتياجات الخاصة
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold text-slate-500">موجه إلى</p>
                  <p className="mt-1 text-sm font-bold text-slate-900 leading-snug">
                    كلية الآداب — قسم علم النفس
                  </p>
                </div>
              </div>

              {/* Shared Database Ready Status (No Google Sign-In Required) */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center gap-3 rounded-lg border border-teal-200 bg-teal-50/60 px-3.5 py-2.5">
                  <Database className="h-4 w-4 shrink-0 text-teal-700" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-teal-900">
                      قاعدة البيانات المشتركة مفعّلة للمختبرين
                    </p>
                    <p className="text-[11px] text-teal-700">
                      حفظ وعرض النتائج برمز المختبر فقط بدون الحاجة لتسجيل حساب Google.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
