import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Lock, PlusCircle, ShieldCheck } from 'lucide-react';
import {
  AssessmentSessionRecord,
  BilingualAIReport,
  VisualResponseRecord,
  VerbalResponseRecord,
  listExaminerAssessments,
  saveAssessmentSession,
  testFirestoreConnection,
} from './lib/firebase';
import { calculateChronologicalAge } from './data/testData';
import {
  CoverPage,
  DEFAULT_INSTITUTIONAL_LOGOS,
} from './components/CoverPage';
import { ChildInfoPage, ChildProfile } from './components/ChildInfoPage';
import { TestRunnerPage } from './components/TestRunnerPage';
import { ScoringPage, computeAssessmentMetrics } from './components/ScoringPage';
import { ReportPage } from './components/ReportPage';
import { ArchiveView } from './components/ArchiveView';

type AppView = 'cover' | 'childInfo' | 'test' | 'scoring' | 'report' | 'archive';

const PIN_STORAGE_KEY = 'eglal_serry_examiner_pin_v1';

function getTodayIsoDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function createEmptyProfile(): ChildProfile {
  return {
    childName: '',
    childCode: '',
    gender: 'male',
    schoolOrNursery: '',
    cityOrVillage: '',
    examinerName: '',
    ageInputMode: 'birthdate',
    birthDate: '',
    manualYears: 6,
    manualMonths: 0,
    testDate: getTodayIsoDate(),
    motorImpairedMode: false,
  };
}

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [view, setView] = useState<AppView>('cover');
  const [savedCount, setSavedCount] = useState(0);

  // Examiner-only password/PIN gate (no Google Sign-In needed!)
  const [examinerPin, setExaminerPin] = useState<string>(() => {
    try {
      return window.localStorage.getItem(PIN_STORAGE_KEY) || '1234';
    } catch {
      return '1234';
    }
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [researcherUnlocked, setResearcherUnlocked] = useState(false);

  const handleChangeExaminerPin = useCallback((nextPin: string) => {
    const clean = nextPin.trim() || '1234';
    setExaminerPin(clean);
    try {
      window.localStorage.setItem(PIN_STORAGE_KEY, clean);
    } catch {
      // ignore storage errors
    }
  }, []);

  const logos = DEFAULT_INSTITUTIONAL_LOGOS;

  const [sessionId, setSessionId] = useState<string>(() => generateSessionId());
  const [isSavedInDb, setIsSavedInDb] = useState(false);
  const [profile, setProfile] = useState<ChildProfile>(() => createEmptyProfile());
  const [visualResponses, setVisualResponses] = useState<Record<string, VisualResponseRecord>>({});
  const [verbalResponses, setVerbalResponses] = useState<Record<string, VerbalResponseRecord>>({});
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [aiReport, setAiReport] = useState<BilingualAIReport | null>(null);

  useEffect(() => {
    testFirestoreConnection();
    listExaminerAssessments()
      .then((items) => setSavedCount(items.length))
      .catch(() => {
        // Non-blocking on initial boot
      });
  }, []);

  const chronologicalAgeMonths = useMemo(() => {
    if (profile.ageInputMode === 'birthdate') {
      const res = calculateChronologicalAge(profile.birthDate, profile.testDate);
      return res.isValid ? res.totalMonths : 0;
    }
    const y = Math.max(0, Math.min(18, Number(profile.manualYears) || 0));
    const m = Math.max(0, Math.min(11, Number(profile.manualMonths) || 0));
    const total = y * 12 + m;
    return total >= 12 ? total : 0;
  }, [
    profile.ageInputMode,
    profile.birthDate,
    profile.testDate,
    profile.manualYears,
    profile.manualMonths,
  ]);

  const isChildInfoValid =
    profile.childName.trim().length > 0 &&
    profile.testDate.trim().length > 0 &&
    chronologicalAgeMonths >= 12;

  const handleStartNewSession = useCallback(() => {
    setSessionId(generateSessionId());
    setIsSavedInDb(false);
    setResearcherUnlocked(false);
    setPinInput('');
    setPinError(null);
    setProfile(createEmptyProfile());
    setVisualResponses({});
    setVerbalResponses({});
    setClinicalNotes('');
    setAiReport(null);
    setView('childInfo');
  }, []);

  const handleVerifyExaminerPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === examinerPin.trim()) {
      setPinError(null);
      setPinInput('');
      setResearcherUnlocked(true);
    } else {
      setPinError('كلمة مرور المختبر غير صحيحة. هذا القسم مخصص للمختبر فقط.');
    }
  };

  const handleSaveSession = useCallback(
    async (
      status: 'in_progress' | 'completed',
      overrideReport?: BilingualAIReport
    ): Promise<boolean> => {
      if (!isChildInfoValid) return false;

      const metrics = computeAssessmentMetrics(
        visualResponses,
        verbalResponses,
        chronologicalAgeMonths
      );

      const cleanVisual: Record<string, VisualResponseRecord> = {};
      for (const [k, v] of Object.entries(visualResponses)) {
        if (k.startsWith('v_')) cleanVisual[k] = v;
      }
      const cleanVerbal: Record<string, VerbalResponseRecord> = {};
      for (const [k, v] of Object.entries(verbalResponses)) {
        if (k.startsWith('l_')) cleanVerbal[k] = v;
      }

      const reportToSave = overrideReport ?? aiReport ?? undefined;

      await saveAssessmentSession(
        'shared_examiner',
        {
          id: sessionId,
          childName: profile.childName,
          childCode: profile.childCode || undefined,
          gender: profile.gender,
          schoolOrNursery: profile.schoolOrNursery || undefined,
          cityOrVillage: profile.cityOrVillage || undefined,
          examinerName: profile.examinerName || undefined,
          birthDate: profile.ageInputMode === 'birthdate' ? profile.birthDate : undefined,
          testDate: profile.testDate,
          chronologicalAgeMonths,
          chronologicalAgeYears: Math.max(1, Math.floor(chronologicalAgeMonths / 12)),
          chronologicalAgeRemMonths: chronologicalAgeMonths % 12,
          visualRawScore: metrics.visualRawScore,
          verbalRawScore: metrics.verbalRawScore,
          totalRawScore: metrics.totalRawScore,
          mentalAgeMonths: metrics.mentalAgeMonths,
          iqScore: metrics.iqScore,
          classificationAr: metrics.classificationAr,
          classificationEn: metrics.classificationEn,
          motorImpairedMode: profile.motorImpairedMode,
          clinicalNotes: clinicalNotes || undefined,
          visualResponses: cleanVisual,
          verbalResponses: cleanVerbal,
          aiReport: reportToSave,
          status,
        },
        isSavedInDb
      );

      if (!isSavedInDb) {
        setSavedCount((c) => c + 1);
      }
      setIsSavedInDb(true);
      return true;
    },
    [
      isChildInfoValid,
      visualResponses,
      verbalResponses,
      chronologicalAgeMonths,
      aiReport,
      sessionId,
      profile,
      clinicalNotes,
      isSavedInDb,
    ]
  );

  const handleOpenSavedRecord = useCallback(
    (record: AssessmentSessionRecord, target: 'scoring' | 'report') => {
      setSessionId(record.id);
      setIsSavedInDb(true);
      setResearcherUnlocked(true);
      setProfile({
        childName: record.childName,
        childCode: record.childCode || '',
        gender: record.gender,
        schoolOrNursery: record.schoolOrNursery || '',
        cityOrVillage: record.cityOrVillage || '',
        examinerName: record.examinerName || '',
        ageInputMode: record.birthDate ? 'birthdate' : 'manual',
        birthDate: record.birthDate || '',
        manualYears:
          record.chronologicalAgeYears ?? Math.floor(record.chronologicalAgeMonths / 12),
        manualMonths:
          record.chronologicalAgeRemMonths ?? record.chronologicalAgeMonths % 12,
        testDate: record.testDate,
        motorImpairedMode: record.motorImpairedMode,
      });
      setVisualResponses(record.visualResponses || {});
      setVerbalResponses(record.verbalResponses || {});
      setClinicalNotes(record.clinicalNotes || '');
      setAiReport(record.aiReport || null);
      setView(target);
    },
    []
  );

  // While student is actively taking the test, hide Results/Report/Archive links completely from the top bar
  const isStudentTestMode = view === 'test';
  const isExaminerProtectedView =
    view === 'scoring' || view === 'report' || view === 'archive';

  const navItems: { id: AppView; label: string; disabled?: boolean; researcherOnly?: boolean }[] =
    isStudentTestMode
      ? [
          { id: 'cover', label: 'الغلاف' },
          { id: 'childInfo', label: 'بيانات الحالة' },
          { id: 'test', label: 'الاختبار', disabled: !isChildInfoValid },
        ]
      : [
          { id: 'cover', label: 'الغلاف' },
          { id: 'childInfo', label: 'بيانات الحالة' },
          { id: 'test', label: 'الاختبار', disabled: !isChildInfoValid },
          {
            id: 'scoring',
            label: 'الدرجات (للمختبر)',
            disabled: !isChildInfoValid,
            researcherOnly: true,
          },
          {
            id: 'report',
            label: 'التقرير (للمختبر)',
            disabled: !isChildInfoValid,
            researcherOnly: true,
          },
          { id: 'archive', label: 'السجل المشترك', researcherOnly: true },
        ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* 3-Zone Top Navigation Bar (Hidden when printing) */}
      <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Zone 1: Brand Title */}
          <button
            type="button"
            onClick={() => setView('cover')}
            className="flex items-center gap-2.5 text-right whitespace-nowrap shrink-0"
          >
            <img
              src={logos.universityLogo}
              alt="جامعة المنوفية"
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="text-sm font-extrabold text-[#0F4C81] sm:text-base">
              اختبار ذكاء الأطفال
            </span>
            <span className="hidden text-xs font-medium text-slate-400 sm:inline">
              · د. إجلال سرى
            </span>
          </button>

          {/* Zone 2: Concise Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  setPinError(null);
                  setView(item.id);
                }}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  view === item.id
                    ? 'bg-[#0F4C81] text-white'
                    : item.disabled
                    ? 'cursor-not-allowed text-slate-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.researcherOnly && !researcherUnlocked && !item.disabled && (
                  <Lock className="h-3 w-3 opacity-70" />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Zone 3: Action Controls (No Google Sign-In button) */}
          <div className="flex items-center gap-2 shrink-0">
            {isChildInfoValid && view !== 'cover' && !isStudentTestMode && (
              <button
                type="button"
                onClick={handleStartNewSession}
                title="بدء جلسة لطفل جديد"
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
              >
                <PlusCircle className="h-3.5 w-3.5 text-[#0F4C81]" />
                <span className="hidden sm:inline">حالة جديدة</span>
              </button>
            )}

            {!isStudentTestMode && (
              researcherUnlocked ? (
                <button
                  type="button"
                  onClick={() => {
                    setResearcherUnlocked(false);
                    if (isExaminerProtectedView) setView('cover');
                  }}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-950 hover:bg-amber-100 whitespace-nowrap shrink-0"
                >
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>قفل المختبر</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPinError(null);
                    setView('archive');
                  }}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#0F4C81] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0c3d68] whitespace-nowrap shrink-0"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>دخول المختبر</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Mobile Compact Nav */}
        <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => {
                setPinError(null);
                setView(item.id);
              }}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0 ${
                view === item.id
                  ? 'bg-[#0F4C81] text-white'
                  : item.disabled
                  ? 'text-slate-300'
                  : 'text-slate-600'
              }`}
            >
              {item.researcherOnly && !researcherUnlocked && !item.disabled && (
                <Lock className="h-3 w-3 opacity-70" />
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="pb-12">
        {view === 'cover' && (
          <CoverPage
            logos={logos}
            onStartSession={() => setView('childInfo')}
            onOpenArchive={() => {
              setPinError(null);
              setView('archive');
            }}
            savedCount={savedCount}
          />
        )}

        {view === 'childInfo' && (
          <ChildInfoPage
            profile={profile}
            examinerPin={examinerPin}
            onChangeExaminerPin={handleChangeExaminerPin}
            onChange={(updated) => {
              setProfile(updated);
              if (aiReport) setAiReport(null);
            }}
            onBack={() => setView('cover')}
            onStartTest={() => {
              setResearcherUnlocked(false);
              setPinInput('');
              setPinError(null);
              setView('test');
            }}
          />
        )}

        {view === 'test' && isChildInfoValid && (
          <TestRunnerPage
            profile={profile}
            chronologicalAgeMonths={chronologicalAgeMonths}
            visualResponses={visualResponses}
            verbalResponses={verbalResponses}
            onUpdateVisualResponses={(next) => {
              setVisualResponses(next);
              if (aiReport) setAiReport(null);
            }}
            onUpdateVerbalResponses={(next) => {
              setVerbalResponses(next);
              if (aiReport) setAiReport(null);
            }}
            onBackToChildInfo={() => setView('childInfo')}
            onOpenExaminerGate={() => {
              setPinInput('');
              setPinError(null);
              setResearcherUnlocked(false);
              setView('scoring');
            }}
          />
        )}

        {/* EXAMINER PASSWORD GATE — Protects Scoring, Report, AND Shared Archive (No Google account needed!) */}
        {isExaminerProtectedView && !researcherUnlocked && (
          <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 text-center shadow-xs space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">
                  <Lock className="h-3.5 w-3.5" />
                  <span>قسم خاص بالمختبر فقط</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {view === 'archive'
                    ? 'أدخل كلمة مرور المختبر لعرض قاعدة البيانات المشتركة'
                    : 'نتيجة الاختبار تظهر للمختبر فقط'}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  أدخل كلمة مرور المختبر لفتح النتائج والتقارير وقاعدة البيانات المحفوظة مباشرةً (بدون الحاجة لحساب Google).
                </p>
              </div>

              <form onSubmit={handleVerifyExaminerPin} className="space-y-4 text-right">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    كلمة مرور المختبر
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    autoFocus
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError(null);
                    }}
                    placeholder="أدخل كلمة المرور..."
                    className="font-mono-num w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-center text-lg font-bold tracking-widest text-slate-900 outline-none focus:border-[#0F4C81] focus:bg-white"
                  />
                  {pinError && (
                    <p className="mt-2 text-center text-xs font-semibold text-rose-700">
                      {pinError}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setView(isChildInfoValid ? 'test' : 'cover')}
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <span>رجوع</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0c3d68]"
                  >
                    <Eye className="h-4 w-4" />
                    <span>دخول المختبر</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Examiner Privacy Banner when viewing Scoring, Report, or Archive */}
        {isExaminerProtectedView && researcherUnlocked && (
          <div className="no-print mx-auto mt-4 max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-2.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0" />
                <span>
                  وضع المختبر مفعّل: النتائج وقاعدة البيانات المشتركة مفتوحة للمختبر فقط.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResearcherUnlocked(false);
                  setView(isChildInfoValid ? 'test' : 'cover');
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1 font-bold text-amber-950 hover:bg-amber-100 shrink-0"
              >
                <EyeOff className="h-3.5 w-3.5" />
                <span>قفل وإخفاء فوراً</span>
              </button>
            </div>
          </div>
        )}

        {view === 'scoring' && isChildInfoValid && researcherUnlocked && (
          <ScoringPage
            profile={profile}
            chronologicalAgeMonths={chronologicalAgeMonths}
            visualResponses={visualResponses}
            verbalResponses={verbalResponses}
            onUpdateVerbalResponses={(next) => {
              setVerbalResponses(next);
              if (aiReport) setAiReport(null);
            }}
            clinicalNotes={clinicalNotes}
            onChangeClinicalNotes={setClinicalNotes}
            isSavedInDb={isSavedInDb}
            onSaveSession={handleSaveSession}
            onBackToTest={() => {
              setResearcherUnlocked(false);
              setView('test');
            }}
            onGenerateReport={() => setView('report')}
          />
        )}

        {view === 'report' && isChildInfoValid && researcherUnlocked && (
          <ReportPage
            profile={profile}
            chronologicalAgeMonths={chronologicalAgeMonths}
            visualResponses={visualResponses}
            verbalResponses={verbalResponses}
            clinicalNotes={clinicalNotes}
            aiReport={aiReport}
            onUpdateAiReport={(report) => setAiReport(report)}
            logos={logos}
            isSavedInDb={isSavedInDb}
            onSaveSession={handleSaveSession}
            onBackToScoring={() => setView('scoring')}
          />
        )}

        {view === 'archive' && researcherUnlocked && (
          <ArchiveView
            onBack={() => setView('cover')}
            onOpenRecord={handleOpenSavedRecord}
            onCountChange={setSavedCount}
          />
        )}
      </main>
    </div>
  );
}
