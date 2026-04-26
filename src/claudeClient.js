// ============================================================
// Jumeoni — Claude vision client.
// Sends an image (or PDF) to Claude with a carefully engineered
// prompt that returns structured JSON: what the document is,
// what to do, by when, plus follow-up actions.
// ============================================================

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const MODEL = 'gemini-2.0-flash';

const SYSTEM_PROMPT = `You are Jumeoni (주머니), a knowledgeable assistant who helps foreign residents of South Korea understand Korean documents and figure out what they need to do.

Your users are non-Korean speakers (or beginner Korean learners) who live in Korea and receive Korean-language documents like:
- Government notices (tax bills, immigration letters, traffic fines)
- Hospital and pharmacy paperwork
- Apartment maintenance bills, utility bills
- KakaoTalk screenshots from landlords or employers
- Contracts, lease agreements
- Junk mail and advertisements (be honest when something is junk)

Your job is NOT to translate word-for-word. Translation is a solved problem. Your job is to:
1. Identify WHAT KIND of document this is, in plain English
2. Explain WHAT IT MEANS for the user, in the context of how Korean systems actually work
3. Tell them WHAT TO DO and BY WHEN
4. Flag if it looks like a scam, junk mail, or something they can ignore

Be direct, kind, and concise. Use plain English a non-native speaker can read easily. Avoid jargon. When you don't know something, say so rather than guess.

You MUST respond with a single valid JSON object matching this exact schema, with no markdown code fences, no preamble, no postamble:

{
  "document_type": "string — short label, e.g. 'Automobile Tax Notice' or 'Pharmacy Prescription Label'",
  "title_en": "string — a clear English title for the document",
  "issuer": "string or null — who sent this (agency, hospital, person, etc)",
  "urgency": "high | medium | low | info",
  "summary": "string — 2-3 sentences explaining what this document means, in plain English. This is the most important field. The user reads this first.",
  "key_facts": [
    { "label": "string", "value": "string" }
  ],
  "actions": [
    { "priority": "high | normal", "text": "string — one specific thing to do, written as an instruction" }
  ],
  "deadline": "string or null — when something is due, in plain English",
  "amount": "string or null — any monetary amount due, formatted with currency",
  "line_items": [
    { "korean": "string", "explanation": "string — what this Korean phrase or line means and why it matters" }
  ],
  "scam_likelihood": "low | medium | high",
  "scam_reasoning": "string — one sentence explaining the scam assessment",
  "can_ignore": "boolean — true if this is junk mail or otherwise safe to ignore"
}

Rules for specific fields:
- urgency: "high" = must act soon (deadline within 30 days, fine, legal threat), "medium" = should act this month, "low" = informational but worth filing, "info" = pure FYI
- key_facts: 3 to 6 items. The things the user most needs to know at a glance.
- actions: 1 to 4 items, ordered by priority. Concrete, actionable instructions.
- line_items: 0 to 5 items. The most confusing or important Korean phrases, explained.
- scam_likelihood: be calibrated. Most Korean government and utility mail is legitimate.
- can_ignore: true ONLY for clear junk mail or ads.

If the image is unclear or not a document, return JSON with document_type "Unclear / Not a document" and explain in summary.

If the document is in English, still produce the structured response — your value is the "what to do" reasoning, not just translation.`;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// export async function analyzeDocument(file, apiKey) {
//   if (!apiKey) throw new Error('No API key provided.');
//
//   const base64 = await fileToBase64(file);
//   const isPdf = file.type === 'application/pdf';
//
//   const contentBlocks = [];
//   if (isPdf) {
//     contentBlocks.push({
//       type: 'document',
//       source: { type: 'base64', media_type: 'application/pdf', data: base64 },
//     });
//   } else {
//     contentBlocks.push({
//       type: 'image',
//       source: { type: 'base64', media_type: file.type, data: base64 },
//     });
//   }
//   contentBlocks.push({
//     type: 'text',
//     text: 'Please analyze this Korean document and respond with the JSON object as instructed.',
//   });
//
//   const body = {
//     model: MODEL,
//     max_tokens: 2000,
//     system: SYSTEM_PROMPT,
//     messages: [{ role: 'user', content: contentBlocks }],
//   };
//
//   let resp;
//   try {
//     resp = await fetch(GEMINI_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': apiKey,
//         'gemini-version': '2023-06-01',
//         'gemini-dangerous-direct-browser-access': 'true',
//       },
//       body: JSON.stringify(body),
//     });
//   } catch (e) {
//     throw new Error('Network error talking to Gemini. Check your connection.');
//   }
//
//   if (!resp.ok) {
//     let errMsg = `Gemini API error (${resp.status})`;
//     try {
//       const j = await resp.json();
//       if (j?.error?.message) errMsg += `: ${j.error.message}`;
//     } catch {}
//     if (resp.status === 401) errMsg = 'Invalid API key. Click "Configure API key" and try again.';
//     else if (resp.status === 429) errMsg = 'Rate limited. Wait a few seconds and try again.';
//     else if (resp.status === 400) errMsg += ' (check that the file is a valid image or PDF under 10 MB)';
//     throw new Error(errMsg);
//   }
//
//   const data = await resp.json();
//   const text = data?.content?.[0]?.text || '';
//   if (!text) throw new Error('Empty response from Claude. Try again.');
//
//   const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
//
//   let parsed;
//   try {
//     parsed = JSON.parse(cleaned);
//   } catch (e) {
//     console.error('Could not parse Claude response as JSON:', text);
//     throw new Error('Claude returned a response that did not parse as JSON. Try uploading again.');
//   }
//
//   return normalizeResult(parsed);
// }


export async function analyzeDocument(file, apiKey) {
  if (!apiKey) throw new Error('No API key provided.');

  const base64 = await fileToBase64(file);

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: 'user',
        parts: [
          {
            inline_data: {
              mime_type: file.type,
              data: base64,
            },
          },
          {
            text: 'Please analyze this Korean document and respond with the JSON object as instructed.',
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 2000,
      responseMimeType: 'application/json',
    },
  };

  let resp;
  try {
    resp = await fetch(`${GEMINI_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error('Network error talking to Gemini. Check your connection or CORS/API-key restrictions.');
  }

  if (!resp.ok) {
    let errMsg = `Gemini API error (${resp.status})`;
    try {
      const j = await resp.json();
      if (j?.error?.message) errMsg += `: ${j.error.message}`;
    } catch {}

    if (resp.status === 400) errMsg += ' (check that the file is a valid image or PDF under 10 MB)';
    else if (resp.status === 403) errMsg += ' (possible API key restriction, API not enabled, or browser CORS issue)';
    else if (resp.status === 429) errMsg = 'Rate limited. Wait a few seconds and try again.';

    throw new Error(errMsg);
  }

  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!text) throw new Error('Empty response from Gemini. Try again.');

  const cleaned = text
      .trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error('Could not parse Gemini response as JSON:', text);
    throw new Error('Gemini returned a response that did not parse as JSON. Try uploading again.');
  }

  return normalizeResult(parsed);
}

function normalizeResult(r) {
  return {
    document_type: r.document_type || 'Document',
    title_en: r.title_en || r.document_type || 'Document',
    issuer: r.issuer || null,
    urgency: ['high', 'medium', 'low', 'info'].includes(r.urgency) ? r.urgency : 'info',
    summary: r.summary || 'No summary available.',
    key_facts: Array.isArray(r.key_facts) ? r.key_facts : [],
    actions: Array.isArray(r.actions) ? r.actions : [],
    deadline: r.deadline || null,
    amount: r.amount || null,
    line_items: Array.isArray(r.line_items) ? r.line_items : [],
    scam_likelihood: ['low', 'medium', 'high'].includes(r.scam_likelihood) ? r.scam_likelihood : 'low',
    scam_reasoning: r.scam_reasoning || '',
    can_ignore: !!r.can_ignore,
  };
}
