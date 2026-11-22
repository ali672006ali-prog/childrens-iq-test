import 'dotenv/config';
import dns from 'dns';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

dns.setDefaultResultOrder('ipv4first');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

interface AnalysisPayload {
  childName: string;
  childCode?: string;
  gender: 'male' | 'female';
  chronologicalAgeYears: number;
  chronologicalAgeRemMonths: number;
  chronologicalAgeMonths: number;
  mentalAgeMonths: number;
  mentalAgeLabelAr: string;
  mentalAgeLabelEn: string;
  visualRawScore: number;
  verbalRawScore: number;
  totalRawScore: number;
  iqScore: number;
  classificationAr: string;
  classificationEn: string;
  normNoteAr?: string;
  motorImpairedMode: boolean;
  groupBreakdown: {
    visualGroup1: number;
    visualGroup2: number;
    visualGroup3: number;
    verbalGroup1: number;
    verbalGroup2: number;
    verbalGroup3: number;
  };
  missedItemsSummary: string[];
  passedHighItemsSummary: string[];
  clinicalNotes?: string;
}

const REPORT_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    ar: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        clinicalDiagnosis: { type: Type.STRING },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['summary', 'strengths', 'weaknesses', 'clinicalDiagnosis', 'recommendations'],
    },
    en: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        clinicalDiagnosis: { type: Type.STRING },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['summary', 'strengths', 'weaknesses', 'clinicalDiagnosis', 'recommendations'],
    },
  },
  required: ['ar', 'en'],
};

app.post('/api/report/analyze', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'لم يتم تهيئة مفتاح Gemini API على الخادم. يرجى التحقق من إعدادات البيئة.',
      });
      return;
    }

    const payload = req.body as AnalysisPayload;
    if (!payload || !payload.childName || typeof payload.iqScore !== 'number') {
      res.status(400).json({ error: 'بيانات التقييم غير مكتملة لإجراء التحليل.' });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
        timeout: 45000,
      },
    });

    const systemInstruction = `You are a senior Egyptian Clinical & Educational Psychologist specializing in pediatric psychometric assessment, specifically Dr. Eglal Mohamed Serry's Children's Intelligence Test (اختبار ذكاء الأطفال - د. إجلال محمد سرى، 1988).
Generate a rigorous, empathetic, evidence-based bilingual (Arabic and English) psycho-educational diagnostic report based strictly on the provided child assessment metrics.
Keep each section clear, clinically accurate, actionable for educators and parents, and culturally appropriate for an Egyptian university psychology clinic (Menoufia University).
Ensure the Arabic text uses formal, precise clinical/educational Arabic terminology, and the English text is an accurate, natural clinical counterpart.`;

    const promptText = `Analyze the following pediatric intelligence assessment session and produce a structured bilingual diagnostic report (Arabic and English):

- Child Identifier: ${payload.childName}${payload.childCode ? ` (Code: ${payload.childCode})` : ''}
- Gender: ${payload.gender === 'male' ? 'Male (ذكر)' : 'Female (أنثى)'}
- Chronological Age: ${payload.chronologicalAgeYears} years, ${payload.chronologicalAgeRemMonths} months (${payload.chronologicalAgeMonths} total months)
- Mental Age (Normative Table 2): ${payload.mentalAgeLabelEn} / ${payload.mentalAgeLabelAr} (${payload.mentalAgeMonths} months)
- Visual Subtest Raw Score: ${payload.visualRawScore} / 45
  - Group 1 (Ages 3-5, Items 1-15): ${payload.groupBreakdown.visualGroup1} / 15
  - Group 2 (Ages 5-7, Items 16-30): ${payload.groupBreakdown.visualGroup2} / 15
  - Group 3 (Ages 7-9, Items 31-45): ${payload.groupBreakdown.visualGroup3} / 15
- Verbal Subtest Raw Score: ${payload.verbalRawScore} / 45
  - Group 1 (Ages 3-5, Items 1-15): ${payload.groupBreakdown.verbalGroup1} / 15
  - Group 2 (Ages 5-7, Items 16-30): ${payload.groupBreakdown.verbalGroup2} / 15
  - Group 3 (Ages 7-9, Items 31-45): ${payload.groupBreakdown.verbalGroup3} / 15
- Total Raw Score: ${payload.totalRawScore} / 90
- Calculated IQ Score: ${payload.iqScore}
- Psychometric Classification: ${payload.classificationEn} / ${payload.classificationAr}
${payload.normNoteAr ? `- Normative Note: ${payload.normNoteAr}` : ''}
- Motor-Impaired Accommodation Mode Used: ${payload.motorImpairedMode ? 'Yes' : 'No'}
- Notable Passed Higher-Complexity Items: ${payload.passedHighItemsSummary.length > 0 ? payload.passedHighItemsSummary.join(' | ') : 'None recorded'}
- Notable Missed Items: ${payload.missedItemsSummary.length > 0 ? payload.missedItemsSummary.join(' | ') : 'None recorded'}
- Examiner Clinical Observations: ${payload.clinicalNotes || 'No additional examiner observations recorded.'}

Provide:
1. summary: Concise executive overview of overall cognitive standing and Visual vs. Verbal balance.
2. strengths: 3-4 specific cognitive/perceptual/verbal strengths observed from the subtest and group breakdown.
3. weaknesses: 3-4 specific areas needing developmental support, intervention, or enrichment.
4. clinicalDiagnosis: Detailed psycho-educational clinical interpretation comparing Mental Age vs. Chronological Age, Visual Discrimination vs. Verbal Reasoning, and developmental expectations.
5. recommendations: 3-4 practical home and classroom/special-education recommendations.`;

    const candidateModels: Array<{ model: string; thinkingLevel: ThinkingLevel }> = [
      { model: 'gemini-4-hydrogen', thinkingLevel: ThinkingLevel.MINIMAL },
      { model: 'gemini-3.1-flash-lite', thinkingLevel: ThinkingLevel.MINIMAL },
      { model: 'gemini-4-hydrogen', thinkingLevel: ThinkingLevel.LOW },
    ];

    let rawText = '';
    let lastError: unknown = null;

    for (const candidate of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: candidate.model,
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: REPORT_RESPONSE_SCHEMA,
            maxOutputTokens: 2048,
            thinkingConfig: { thinkingLevel: candidate.thinkingLevel },
          },
        });
        rawText = (response.text ?? '').trim();
        if (rawText) break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!rawText) {
      throw lastError || new Error('لم يتم استلام استجابة تحليلية من نموذج الذكاء الاصطناعي.');
    }

    const parsed = JSON.parse(rawText);
    res.json({
      ar: parsed.ar,
      en: parsed.en,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Gemini report analysis error:', error);
    const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع أثناء توليد التقرير.';
    res.status(500).json({ error: message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
