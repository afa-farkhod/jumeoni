// ============================================================
// Built-in sample documents for the live demo.
// Each sample is an SVG-rendered "document" (data URL)
// plus a hand-crafted prebuilt result, so judges can click
// and see the full UX without configuring an API key.
// ============================================================

function svgToDataUrl(svg) {
  const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

const TAX_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <rect width="600" height="800" fill="#fefdf9"/>
  <rect x="0" y="0" width="600" height="80" fill="#1f3a5f"/>
  <text x="40" y="48" font-family="serif" font-size="24" fill="white" font-weight="700">서울특별시</text>
  <text x="40" y="68" font-family="serif" font-size="13" fill="#b8c8e0">SEOUL METROPOLITAN GOVERNMENT</text>
  <text x="560" y="48" font-family="serif" font-size="14" fill="white" text-anchor="end">고지서 No. 2026-A-3387291</text>
  <text x="300" y="140" font-family="serif" font-size="32" fill="#1f3a5f" text-anchor="middle" font-weight="700">자동차세 납부 고지서</text>
  <line x1="180" y1="160" x2="420" y2="160" stroke="#c93636" stroke-width="2"/>
  <rect x="40" y="200" width="520" height="120" fill="#f5f1e8" stroke="#d3cdbf"/>
  <text x="60" y="230" font-family="sans-serif" font-size="14" fill="#666">납세자 / Taxpayer</text>
  <text x="60" y="258" font-family="sans-serif" font-size="20" fill="#222" font-weight="600">JANE A SMITH</text>
  <text x="60" y="285" font-family="sans-serif" font-size="13" fill="#555">서울특별시 마포구 와우산로 23길 4-101</text>
  <text x="60" y="305" font-family="sans-serif" font-size="13" fill="#555">차량번호: 12가 3456 · 차종: 승용</text>
  <rect x="40" y="350" width="520" height="180" fill="white" stroke="#d3cdbf"/>
  <text x="60" y="385" font-family="serif" font-size="18" fill="#222" font-weight="700">납부 금액</text>
  <text x="60" y="420" font-family="sans-serif" font-size="14" fill="#555">자동차세 본세</text>
  <text x="540" y="420" font-family="sans-serif" font-size="14" fill="#222" text-anchor="end">₩320,000</text>
  <text x="60" y="445" font-family="sans-serif" font-size="14" fill="#555">지방교육세 (30%)</text>
  <text x="540" y="445" font-family="sans-serif" font-size="14" fill="#222" text-anchor="end">₩96,000</text>
  <line x1="60" y1="465" x2="540" y2="465" stroke="#bbb"/>
  <text x="60" y="495" font-family="serif" font-size="20" fill="#c93636" font-weight="700">합계 (TOTAL)</text>
  <text x="540" y="495" font-family="serif" font-size="22" fill="#c93636" text-anchor="end" font-weight="700">₩416,000</text>
  <rect x="40" y="560" width="520" height="80" fill="#fff5f0" stroke="#c93636" stroke-width="2"/>
  <text x="300" y="595" font-family="serif" font-size="18" fill="#c93636" text-anchor="middle" font-weight="700">납부기한: 2026년 12월 31일</text>
  <text x="300" y="620" font-family="sans-serif" font-size="13" fill="#666" text-anchor="middle">기한 후 가산금 3% 부과 (After deadline: 3% penalty added)</text>
  <text x="40" y="690" font-family="sans-serif" font-size="12" fill="#666">납부방법: 가상계좌 110-9999-8888 (KB국민은행) · 토스 · 인터넷지로 (giro.or.kr)</text>
  <text x="40" y="710" font-family="sans-serif" font-size="12" fill="#666">문의: 서울특별시 다산콜센터 ☎ 120 (영어 가능 / English available)</text>
  <text x="540" y="770" font-family="serif" font-size="40" fill="#c93636" text-anchor="end" font-weight="700" opacity="0.3" transform="rotate(-12 540 770)">公印</text>
</svg>`.trim();

const PRESCRIPTION_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
  <rect width="600" height="700" fill="#fefdf9"/>
  <rect x="0" y="0" width="600" height="60" fill="#2e7d4e"/>
  <text x="40" y="40" font-family="sans-serif" font-size="22" fill="white" font-weight="700">행복약국 · Happiness Pharmacy</text>
  <text x="40" y="100" font-family="sans-serif" font-size="13" fill="#666">처방전 No. 2026-11-2847</text>
  <text x="40" y="120" font-family="sans-serif" font-size="13" fill="#666">발행일: 2026-04-26 · 처방의: 김민수 (강남내과의원)</text>
  <text x="40" y="170" font-family="serif" font-size="22" fill="#222" font-weight="700">환자: JANE A SMITH</text>
  <text x="40" y="195" font-family="sans-serif" font-size="14" fill="#666">생년월일: 1995-03-12</text>
  <line x1="40" y1="220" x2="560" y2="220" stroke="#bbb"/>
  <text x="40" y="255" font-family="serif" font-size="20" fill="#222" font-weight="700">처방 의약품 (3종)</text>
  <rect x="40" y="280" width="520" height="80" fill="white" stroke="#d3cdbf"/>
  <text x="55" y="305" font-family="sans-serif" font-size="16" fill="#222" font-weight="700">① 아목시실린 캡슐 500mg</text>
  <text x="55" y="328" font-family="sans-serif" font-size="13" fill="#555">1일 3회, 식후 30분 · 5일분 (총 15캡슐)</text>
  <text x="55" y="348" font-family="sans-serif" font-size="12" fill="#888">Amoxicillin 500mg cap · 3x daily after meals · 5 days</text>
  <rect x="40" y="375" width="520" height="80" fill="white" stroke="#d3cdbf"/>
  <text x="55" y="400" font-family="sans-serif" font-size="16" fill="#222" font-weight="700">② 타이레놀 500mg</text>
  <text x="55" y="423" font-family="sans-serif" font-size="13" fill="#555">통증 시 1정, 4시간 간격 · 최대 1일 4회 · 10정</text>
  <text x="55" y="443" font-family="sans-serif" font-size="12" fill="#888">Acetaminophen 500mg · As needed for pain</text>
  <rect x="40" y="470" width="520" height="80" fill="white" stroke="#d3cdbf"/>
  <text x="55" y="495" font-family="sans-serif" font-size="16" fill="#222" font-weight="700">③ 베아제정 (소화제)</text>
  <text x="55" y="518" font-family="sans-serif" font-size="13" fill="#555">1일 3회, 식후 즉시 · 5일분</text>
  <text x="55" y="538" font-family="sans-serif" font-size="12" fill="#888">Digestive enzyme · 3x daily after meals</text>
  <rect x="40" y="575" width="520" height="80" fill="#fff5f0" stroke="#c93636"/>
  <text x="55" y="600" font-family="sans-serif" font-size="14" fill="#c93636" font-weight="700">⚠ 주의사항</text>
  <text x="55" y="622" font-family="sans-serif" font-size="13" fill="#444">· 복용 중 음주 금지 · 졸음 유발 가능 (운전 주의)</text>
  <text x="55" y="642" font-family="sans-serif" font-size="13" fill="#444">· 알레르기 증상 시 즉시 복용 중단 후 의사 상담</text>
</svg>`.trim();

const KAKAO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 720" width="480" height="720">
  <rect width="480" height="720" fill="#abc1d1"/>
  <rect x="0" y="0" width="480" height="56" fill="#3c1e1e"/>
  <text x="40" y="36" font-family="sans-serif" font-size="18" fill="#ffe812" font-weight="700">← 박집주인 (Landlord Park)</text>
  <text x="240" y="90" font-family="sans-serif" font-size="11" fill="#3c1e1e" text-anchor="middle">2026년 4월 26일 토요일</text>
  <rect x="20" y="115" width="320" height="50" rx="14" fill="white"/>
  <text x="35" y="140" font-family="sans-serif" font-size="14" fill="#222">안녕하세요 제인씨 ㅎㅎ</text>
  <text x="35" y="158" font-family="sans-serif" font-size="14" fill="#222">잘 지내시죠?</text>
  <text x="345" y="170" font-family="sans-serif" font-size="10" fill="#3c1e1e">오전 10:14</text>
  <rect x="20" y="190" width="380" height="105" rx="14" fill="white"/>
  <text x="35" y="215" font-family="sans-serif" font-size="14" fill="#222">다름이 아니라, 다음달부터</text>
  <text x="35" y="235" font-family="sans-serif" font-size="14" fill="#222">관리비가 조금 오를 예정이에요.</text>
  <text x="35" y="258" font-family="sans-serif" font-size="14" fill="#222">월 12만원 → 14만원으로요.</text>
  <text x="35" y="280" font-family="sans-serif" font-size="14" fill="#222">전기료 인상 때문이라네요 ㅠㅠ</text>
  <text x="405" y="300" font-family="sans-serif" font-size="10" fill="#3c1e1e">오전 10:14</text>
  <rect x="20" y="320" width="400" height="135" rx="14" fill="white"/>
  <text x="35" y="345" font-family="sans-serif" font-size="14" fill="#222">그리고 5월 1일에 보일러 점검</text>
  <text x="35" y="365" font-family="sans-serif" font-size="14" fill="#222">기사님 방문하실 거예요.</text>
  <text x="35" y="388" font-family="sans-serif" font-size="14" fill="#222">오후 2시쯤 30분정도 걸려요.</text>
  <text x="35" y="411" font-family="sans-serif" font-size="14" fill="#222">집에 계실 수 있나요?</text>
  <text x="35" y="434" font-family="sans-serif" font-size="14" fill="#222">안되시면 말씀해주세요!</text>
  <text x="425" y="455" font-family="sans-serif" font-size="10" fill="#3c1e1e">오전 10:15</text>
  <rect x="20" y="480" width="220" height="50" rx="14" fill="white"/>
  <text x="35" y="505" font-family="sans-serif" font-size="14" fill="#222">확인 부탁드릴게요 ^^</text>
  <text x="35" y="523" font-family="sans-serif" font-size="14" fill="#222">감사합니다!</text>
  <text x="245" y="535" font-family="sans-serif" font-size="10" fill="#3c1e1e">오전 10:15</text>
  <rect x="0" y="660" width="480" height="60" fill="white"/>
  <text x="240" y="697" font-family="sans-serif" font-size="13" fill="#888" text-anchor="middle">메시지 입력...</text>
</svg>`.trim();

const SAMPLES = {
  tax: {
    filename: 'sample-tax-notice.svg',
    dataUrl: svgToDataUrl(TAX_SVG),
    prebuiltResult: {
      document_type: 'Automobile Tax Notice (자동차세 고지서)',
      title_en: 'Automobile Tax — Second Half 2026',
      issuer: 'Seoul Metropolitan Government',
      urgency: 'high',
      summary: 'This is your semi-annual automobile tax bill from the Seoul city government. You owe ₩416,000, due by December 31, 2026. If you miss the deadline, a 3% penalty is added automatically and can compound. This is a real, legitimate government bill — pay it.',
      key_facts: [
        { label: 'Total due', value: '₩416,000' },
        { label: 'Deadline', value: 'December 31, 2026' },
        { label: 'Vehicle', value: '12가 3456 (passenger car)' },
        { label: 'Bill number', value: '2026-A-3387291' },
        { label: 'Late penalty', value: '+3% after deadline' },
        { label: 'English helpline', value: '☎ 120 (Dasan call center)' },
      ],
      actions: [
        { priority: 'high', text: 'Pay ₩416,000 by Dec 31. Easiest options: open Toss app → 세금/과태료 → scan the bill. Or use giro.or.kr with bill number 2026-A-3387291.' },
        { priority: 'normal', text: 'Add a calendar reminder for Dec 28 so you do not miss the deadline.' },
        { priority: 'normal', text: 'Save the receipt — you may need it for residency renewal or tax filing.' },
      ],
      deadline: 'December 31, 2026',
      amount: '₩416,000',
      line_items: [
        { korean: '자동차세 본세 ₩320,000', explanation: 'The base automobile tax — calculated from your engine size and vehicle age. This is the main component.' },
        { korean: '지방교육세 ₩96,000 (30%)', explanation: 'Local education tax, calculated as 30% of the base auto tax. Standard surcharge — not optional.' },
        { korean: '기한 후 가산금 3% 부과', explanation: 'If you miss the December 31 deadline, 3% is added immediately. After that, an additional 0.75% per month accrues. Do not be late.' },
        { korean: '가상계좌 110-9999-8888', explanation: 'A virtual account number assigned just to your bill. Bank transfer to this account auto-marks your tax as paid — no need to write your name in the memo.' },
      ],
      scam_likelihood: 'low',
      scam_reasoning: 'This matches the standard format for Seoul auto tax notices: official letterhead, bill number, multiple verified payment channels, and the Dasan 120 helpline. Legitimate.',
      can_ignore: false,
    },
  },
  prescription: {
    filename: 'sample-prescription.svg',
    dataUrl: svgToDataUrl(PRESCRIPTION_SVG),
    prebuiltResult: {
      document_type: 'Pharmacy Prescription (처방전)',
      title_en: 'Prescription — 3 medications',
      issuer: 'Happiness Pharmacy (filled by Gangnam Internal Medicine Clinic)',
      urgency: 'medium',
      summary: 'You were prescribed three medications: an antibiotic (amoxicillin), a painkiller (acetaminophen / Tylenol), and a digestive enzyme. The antibiotic must be taken on a strict schedule for the full 5 days, even if you feel better. Critical: do not drink alcohol while on this course, and watch for allergic reactions to the antibiotic.',
      key_facts: [
        { label: 'Antibiotic', value: 'Amoxicillin 500mg · 3x/day · 5 days' },
        { label: 'Painkiller', value: 'Acetaminophen 500mg · as needed' },
        { label: 'Digestive aid', value: 'Berase tab · 3x/day after meals' },
        { label: 'Alcohol', value: '🚫 Do NOT drink' },
        { label: 'Driving', value: '⚠ May cause drowsiness' },
        { label: 'Doctor', value: 'Dr. Kim Min-soo' },
      ],
      actions: [
        { priority: 'high', text: 'Take amoxicillin 3 times per day, 30 minutes after meals, for the FULL 5 days — do not stop early even if symptoms improve.' },
        { priority: 'high', text: 'No alcohol while on this medication. Amoxicillin + alcohol can cause nausea and reduce effectiveness.' },
        { priority: 'normal', text: 'Take acetaminophen only when in pain, with at least 4 hours between doses, max 4 per day.' },
        { priority: 'normal', text: 'If you develop a rash, swelling, or trouble breathing, stop the antibiotic immediately and call 119 or visit any ER. Penicillin allergies are real.' },
      ],
      deadline: 'Take antibiotic for 5 full days',
      amount: null,
      line_items: [
        { korean: '식후 30분', explanation: '30 minutes after a meal. Not on an empty stomach — the antibiotic is gentler on your gut this way.' },
        { korean: '5일분', explanation: '5 days supply. Even if you feel better on day 3, finish all of it. Stopping early breeds antibiotic resistance.' },
        { korean: '복용 중 음주 금지', explanation: 'Do not drink alcohol while taking. This is a hard rule for amoxicillin — alcohol intensifies side effects.' },
        { korean: '졸음 유발 가능', explanation: 'May cause drowsiness. Be careful driving or operating machinery, especially the first day.' },
      ],
      scam_likelihood: 'low',
      scam_reasoning: 'Standard pharmacy prescription format with prescription number, prescribing doctor, and licensed medications. Legitimate.',
      can_ignore: false,
    },
  },
  kakao: {
    filename: 'sample-kakao-message.svg',
    dataUrl: svgToDataUrl(KAKAO_SVG),
    prebuiltResult: {
      document_type: 'KakaoTalk Message (카카오톡 메시지)',
      title_en: 'Landlord — maintenance fee increase + boiler inspection',
      issuer: 'Landlord Park',
      urgency: 'medium',
      summary: 'Your landlord sent two pieces of news in a casual, friendly tone: (1) your monthly building maintenance fee is going up by ₩20,000 starting next month due to electricity rate hikes, and (2) a technician is coming to inspect your boiler on May 1 around 2 PM for about 30 minutes — they need to know if you will be home. The "ㅎㅎ" and "ㅠㅠ" signal a friendly, apologetic tone, not a complaint.',
      key_facts: [
        { label: 'New maintenance fee', value: '₩140,000/month (was ₩120,000)' },
        { label: 'Effective from', value: 'Next month' },
        { label: 'Boiler inspection', value: 'May 1, ~2:00 PM' },
        { label: 'Duration', value: '~30 minutes' },
        { label: 'Action expected', value: 'Reply to confirm availability' },
      ],
      actions: [
        { priority: 'high', text: 'Reply to confirm whether you will be home May 1 at 2 PM. The landlord explicitly asked. Silence here is rude in Korean culture.' },
        { priority: 'normal', text: 'If May 1 does not work, suggest 2-3 alternative times so it does not become a back-and-forth.' },
        { priority: 'normal', text: 'Update your budget: ₩20,000/month more starting next month. Verify next month bill matches the new amount.' },
        { priority: 'normal', text: 'Suggested polite reply (copy and paste): "안녕하세요! 알려주셔서 감사합니다. 5월 1일 오후 2시에 집에 있을 수 있어요. 보일러 점검 부탁드립니다 :)"' },
      ],
      deadline: 'Reply soon — boiler visit is May 1',
      amount: '₩20,000/month increase',
      line_items: [
        { korean: 'ㅎㅎ / ㅠㅠ', explanation: 'Korean texting emoticons. ㅎㅎ is a soft chuckle (friendly tone), ㅠㅠ is a sad/apologetic face. Together they signal the landlord is being warm, not stern.' },
        { korean: '관리비', explanation: 'Building maintenance fee — covers shared electricity, cleaning, security, elevator, etc. Separate from your monthly rent (월세) and utility bills.' },
        { korean: '확인 부탁드릴게요', explanation: 'Literally "please confirm." This is a polite request for a reply — the landlord is waiting for an answer. Not optional.' },
        { korean: '집에 계실 수 있나요?', explanation: 'Honorific form of "will you be home?" Notice the 시 honorific — your landlord speaks to you formally. You can match that tone in your reply.' },
      ],
      scam_likelihood: 'low',
      scam_reasoning: 'Sent from your saved landlord contact, references specific shared context (your apartment, current fee), and asks reasonable questions. No suspicious links or payment requests.',
      can_ignore: false,
    },
  },
};

export function getSampleImage(key) {
  return SAMPLES[key] || null;
}
