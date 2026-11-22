import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration (client is offline).');
      return false;
    }
    return true;
  }
}

export async function signInExaminerWithGoogle(): Promise<User> {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export async function signOutExaminer(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export interface ExaminerSettings {
  ownerId: string;
  examinerName: string;
  institutionName: string;
  universityLogo?: string;
  specificEducationLogo?: string;
  artsFacultyLogo?: string;
}

export interface VisualResponseRecord {
  selectedOption: number | null;
  isCorrect: boolean;
  autoCredited: boolean;
}

export interface VerbalResponseRecord {
  childAnswerText: string;
  isCorrect: boolean;
  autoCredited: boolean;
}

export interface BilingualReportSection {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  clinicalDiagnosis: string;
  recommendations: string[];
}

export interface BilingualAIReport {
  ar: BilingualReportSection;
  en: BilingualReportSection;
  generatedAt: string;
}

export interface AssessmentSessionRecord {
  id: string;
  ownerId: string;
  childName: string;
  childCode?: string;
  gender: 'male' | 'female';
  schoolOrNursery?: string;
  cityOrVillage?: string;
  examinerName?: string;
  birthDate?: string;
  testDate: string;
  chronologicalAgeMonths: number;
  chronologicalAgeYears?: number;
  chronologicalAgeRemMonths?: number;
  visualRawScore: number;
  verbalRawScore: number;
  totalRawScore: number;
  mentalAgeMonths: number;
  iqScore: number;
  classificationAr: string;
  classificationEn: string;
  motorImpairedMode: boolean;
  clinicalNotes?: string;
  visualResponses?: Record<string, VisualResponseRecord>;
  verbalResponses?: Record<string, VerbalResponseRecord>;
  aiReport?: BilingualAIReport;
  status: 'in_progress' | 'completed';
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
}

export async function loadExaminerSettings(uid: string): Promise<ExaminerSettings | null> {
  const path = `examinerSettings/${uid}`;
  try {
    const snap = await getDoc(doc(db, 'examinerSettings', uid));
    if (!snap.exists()) return null;
    return snap.data() as ExaminerSettings;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveExaminerSettings(
  uid: string,
  settings: Omit<ExaminerSettings, 'ownerId'>
): Promise<void> {
  const path = `examinerSettings/${uid}`;
  const cleanPayload: Record<string, unknown> = {
    ownerId: uid,
    examinerName: settings.examinerName.slice(0, 120),
    institutionName: settings.institutionName.slice(0, 180),
    updatedAt: serverTimestamp(),
  };
  if (settings.universityLogo) cleanPayload.universityLogo = settings.universityLogo.slice(0, 250000);
  if (settings.specificEducationLogo)
    cleanPayload.specificEducationLogo = settings.specificEducationLogo.slice(0, 250000);
  if (settings.artsFacultyLogo) cleanPayload.artsFacultyLogo = settings.artsFacultyLogo.slice(0, 250000);

  try {
    await setDoc(doc(db, 'examinerSettings', uid), cleanPayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveAssessmentSession(
  uid: string,
  session: Omit<AssessmentSessionRecord, 'ownerId' | 'createdAt' | 'updatedAt'>,
  isExisting: boolean
): Promise<string> {
  const docId = session.id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
  const path = `assessments/${docId}`;

  const payload: Record<string, unknown> = {
    ownerId: uid,
    childName: session.childName.trim().slice(0, 120),
    gender: session.gender,
    testDate: session.testDate.slice(0, 20),
    chronologicalAgeMonths: Math.max(12, Math.min(240, Math.round(session.chronologicalAgeMonths))),
    visualRawScore: Math.max(0, Math.min(45, Math.round(session.visualRawScore))),
    verbalRawScore: Math.max(0, Math.min(45, Math.round(session.verbalRawScore))),
    totalRawScore: Math.max(0, Math.min(90, Math.round(session.totalRawScore))),
    mentalAgeMonths: Math.max(12, Math.min(240, Math.round(session.mentalAgeMonths))),
    iqScore: Math.max(10, Math.min(250, Math.round(session.iqScore))),
    classificationAr: session.classificationAr.slice(0, 80),
    classificationEn: session.classificationEn.slice(0, 80),
    motorImpairedMode: Boolean(session.motorImpairedMode),
    status: session.status,
    updatedAt: serverTimestamp(),
  };

  if (session.childCode) payload.childCode = session.childCode.trim().slice(0, 60);
  if (session.schoolOrNursery) payload.schoolOrNursery = session.schoolOrNursery.trim().slice(0, 150);
  if (session.cityOrVillage) payload.cityOrVillage = session.cityOrVillage.trim().slice(0, 120);
  if (session.examinerName) payload.examinerName = session.examinerName.trim().slice(0, 120);
  if (session.birthDate) payload.birthDate = session.birthDate.slice(0, 20);
  if (typeof session.chronologicalAgeYears === 'number')
    payload.chronologicalAgeYears = session.chronologicalAgeYears;
  if (typeof session.chronologicalAgeRemMonths === 'number')
    payload.chronologicalAgeRemMonths = session.chronologicalAgeRemMonths;
  if (session.clinicalNotes) payload.clinicalNotes = session.clinicalNotes.trim().slice(0, 2000);
  if (session.visualResponses) payload.visualResponses = session.visualResponses;
  if (session.verbalResponses) payload.verbalResponses = session.verbalResponses;
  if (session.aiReport) payload.aiReport = session.aiReport;

  try {
    if (isExisting) {
      const existingSnap = await getDoc(doc(db, 'assessments', docId));
      if (existingSnap.exists()) {
        const existingData = existingSnap.data();
        if (existingData.status === 'completed') {
          await updateDoc(doc(db, 'assessments', docId), {
            clinicalNotes: payload.clinicalNotes ?? existingData.clinicalNotes ?? '',
            ...(session.aiReport ? { aiReport: session.aiReport } : {}),
            updatedAt: serverTimestamp(),
          });
        } else {
          await updateDoc(doc(db, 'assessments', docId), payload);
        }
        return docId;
      }
    }
    payload.createdAt = serverTimestamp();
    await setDoc(doc(db, 'assessments', docId), payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, isExisting ? OperationType.UPDATE : OperationType.CREATE, path);
  }
}

export async function listExaminerAssessments(): Promise<AssessmentSessionRecord[]> {
  const path = 'assessments';
  try {
    const [completedSnap, inProgressSnap] = await Promise.all([
      getDocs(query(collection(db, 'assessments'), where('status', '==', 'completed'))),
      getDocs(query(collection(db, 'assessments'), where('status', '==', 'in_progress'))),
    ]);
    const byId = new Map<string, AssessmentSessionRecord>();
    completedSnap.forEach((docSnap) => {
      byId.set(docSnap.id, {
        id: docSnap.id,
        ...(docSnap.data() as Omit<AssessmentSessionRecord, 'id'>),
      });
    });
    inProgressSnap.forEach((docSnap) => {
      byId.set(docSnap.id, {
        id: docSnap.id,
        ...(docSnap.data() as Omit<AssessmentSessionRecord, 'id'>),
      });
    });
    const items = Array.from(byId.values());
    items.sort((a, b) => {
      const tA = a.updatedAt instanceof Timestamp ? a.updatedAt.toMillis() : 0;
      const tB = b.updatedAt instanceof Timestamp ? b.updatedAt.toMillis() : 0;
      return tB - tA;
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function deleteAssessmentRecord(id: string): Promise<void> {
  const path = `assessments/${id}`;
  try {
    await deleteDoc(doc(db, 'assessments', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

function serializeTimestampValue(value: Timestamp | string | undefined): string | null {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === 'object' && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    return (value as Timestamp).toDate().toISOString();
  }
  return String(value);
}

export interface AssessmentsBackupDocument {
  backupMeta: {
    application: string;
    exportedAt: string;
    schemaVersion: string;
    totalRecords: number;
    filterApplied: string | null;
  };
  assessments: Array<
    Omit<AssessmentSessionRecord, 'createdAt' | 'updatedAt'> & {
      createdAt: string | null;
      updatedAt: string | null;
    }
  >;
}

export function buildAssessmentsBackupPayload(
  records: AssessmentSessionRecord[],
  filterApplied: string | null = null
): AssessmentsBackupDocument {
  return {
    backupMeta: {
      application: 'اختبار ذكاء الأطفال — د. إجلال محمد سرى (1988)',
      exportedAt: new Date().toISOString(),
      schemaVersion: '1.0',
      totalRecords: records.length,
      filterApplied: filterApplied && filterApplied.trim().length > 0 ? filterApplied.trim() : null,
    },
    assessments: records.map((rec) => ({
      ...rec,
      createdAt: serializeTimestampValue(rec.createdAt),
      updatedAt: serializeTimestampValue(rec.updatedAt),
    })),
  };
}

export function compressLogoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 320;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/png');
        if (dataUrl.length > 240000) {
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => reject(new Error('تعذر قراءة ملف الصورة.'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('تعذر تحميل ملف الصورة.'));
    reader.readAsDataURL(file);
  });
}
