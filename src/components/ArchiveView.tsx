import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Download,
  FileText,
  FolderArchive,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import {
  AssessmentSessionRecord,
  buildAssessmentsBackupPayload,
  deleteAssessmentRecord,
  listExaminerAssessments,
} from '../lib/firebase';
import { formatMonthsToArabicYearsMonths } from '../data/testData';

interface ArchiveViewProps {
  onBack: () => void;
  onOpenRecord: (record: AssessmentSessionRecord, target: 'scoring' | 'report') => void;
  onCountChange?: (count: number) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  onBack,
  onOpenRecord,
  onCountChange,
}) => {
  const [records, setRecords] = useState<AssessmentSessionRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await listExaminerAssessments();
      setRecords(items);
      onCountChange?.(items.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تحميل سجل الحالات المحفوظة.');
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) =>
        r.childName.toLowerCase().includes(q) ||
        (r.childCode && r.childCode.toLowerCase().includes(q)) ||
        (r.examinerName && r.examinerName.toLowerCase().includes(q)) ||
        r.classificationAr.toLowerCase().includes(q)
    );
  }, [records, searchQuery]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError(null);
    try {
      await deleteAssessmentRecord(id);
      const next = records.filter((r) => r.id !== id);
      setRecords(next);
      onCountChange?.(next.length);
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر حذف السجل.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportJsonBackup = async (onlyFiltered: boolean) => {
    setExporting(true);
    setError(null);
    setExportNotice(null);
    try {
      let targetRecords = onlyFiltered ? filtered : records;
      if (!onlyFiltered) {
        const freshRecords = await listExaminerAssessments();
        setRecords(freshRecords);
        onCountChange?.(freshRecords.length);
        targetRecords = freshRecords;
      }

      if (targetRecords.length === 0) {
        setError('لا توجد سجلات محفوظة لتصديرها في نسخة احتياطية حالياً.');
        return;
      }

      const payload = buildAssessmentsBackupPayload(
        targetRecords,
        onlyFiltered ? searchQuery : null
      );
      const jsonString = JSON.stringify(payload, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const dateStamp = new Date().toISOString().slice(0, 10);
      const suffix = onlyFiltered ? 'filtered' : 'full';
      const filename = `eglal-serry-assessments-${suffix}-backup-${dateStamp}.json`;

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportNotice(
        `تم تصدير ${targetRecords.length} سجل إلى الملف المحلي (${filename}) بنجاح.`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر إنشاء ملف النسخة الاحتياطية JSON.'
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة للغلاف</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={fetchRecords}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>تحديث السجل</span>
          </button>

          {searchQuery.trim().length > 0 && filtered.length > 0 && (
            <button
              type="button"
              disabled={exporting || loading}
              onClick={() => handleExportJsonBackup(true)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5 text-[#0F4C81]" />
              <span>تصدير نتائج البحث ({filtered.length})</span>
            </button>
          )}

          <button
            type="button"
            disabled={exporting || loading || records.length === 0}
            onClick={() => handleExportJsonBackup(false)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#0F4C81] px-4 py-2 text-xs font-bold text-white hover:bg-[#0c3d68] disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>
              {exporting
                ? 'جاري تجهيز النسخة...'
                : `تصدير نسخة احتياطية JSON (${records.length})`}
            </span>
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[#0F4C81]">
              <FolderArchive className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  قاعدة البيانات المشتركة لجميع المختبرين
                </h1>
                <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-[#0F4C81] border border-sky-200">
                  <Users className="h-3 w-3" />
                  <span>سجل موحد للمختبرين</span>
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                تظهر هنا جميع حالات الأطفال ونتائج الاختبارات المحفوظة لجميع المختبرين فور إدخال كلمة مرور المختبر.
              </p>
            </div>
          </div>

          {records.length > 0 && (
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث باسم الطفل أو الكود أو المختبر..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-9 pl-3 text-xs text-slate-900 outline-none focus:border-[#0F4C81] focus:bg-white"
              />
            </div>
          )}
        </div>

        {exportNotice && (
          <div className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-xs font-semibold text-teal-900">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-700" />
            <span>{exportNotice}</span>
          </div>
        )}

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
            {error}
          </div>
        ) : loading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            جاري تحميل السجلات من قاعدة البيانات المشتركة...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center space-y-2">
            <p className="text-sm font-bold text-slate-700">
              {records.length === 0
                ? 'لا توجد جلسات محفوظة حتى الآن'
                : 'لا توجد نتائج مطابقة للبحث'}
            </p>
            <p className="text-xs text-slate-500">
              عند إتمام جلسة اختبار وحفظها في قاعدة البيانات ستظهر الحالة هنا لجميع المختبرين للمتابعة والطباعة.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((rec) => (
              <div
                key={rec.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-slate-300 sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{rec.childName}</h3>
                    {rec.childCode && (
                      <span className="font-mono-num text-xs text-slate-500">
                        ({rec.childCode})
                      </span>
                    )}
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-num text-xs text-slate-600">{rec.testDate}</span>
                    {rec.examinerName && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-xs font-semibold text-[#0F4C81]">
                          المختبر: {rec.examinerName}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span>
                      العمر الزمني: {formatMonthsToArabicYearsMonths(rec.chronologicalAgeMonths)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      الدرجة الخام: <strong className="font-mono-num">{rec.totalRawScore}/90</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      نسبة الذكاء:{' '}
                      <strong className="font-mono-num text-[#0F4C81]">{rec.iqScore}</strong> (
                      {rec.classificationAr})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenRecord(rec, 'scoring')}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                  >
                    <Calculator className="h-3.5 w-3.5" />
                    <span>الدرجات</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenRecord(rec, 'report')}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#0F4C81] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0c3d68] whitespace-nowrap"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>التقرير والطباعة</span>
                  </button>

                  {confirmDeleteId === rec.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={deletingId === rec.id}
                        onClick={() => handleDelete(rec.id)}
                        className="inline-flex min-h-[36px] items-center rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-rose-700"
                      >
                        تأكيد
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
                      >
                        إلغاء
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(rec.id)}
                      title="حذف السجل"
                      className="inline-flex min-h-[36px] items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
