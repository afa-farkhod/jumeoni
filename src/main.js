import './style.css';
import { analyzeDocument } from './claudeClient.js';
import { renderResult } from './renderer.js';
import { getSampleImage } from './samples.js';

const state = {
  apiKey: localStorage.getItem('jumeoni_api_key') || '',
  currentFile: null,
};

const $ = (id) => document.getElementById(id);
const els = {
  apiPanel: $('api-panel'),
  apiStatus: $('api-status'),
  apiKeyInput: $('api-key-input'),
  saveKeyBtn: $('save-key-btn'),
  clearKeyBtn: $('clear-key-btn'),
  dropzone: $('dropzone'),
  fileInput: $('file-input'),
  resultPanel: $('result-panel'),
  resultPreview: $('result-preview'),
  resultLoading: $('result-loading'),
  resultError: $('result-error'),
  resultContent: $('result-content'),
  loadingText: $('loading-text'),
  resetBtn: $('reset-btn'),
};

function refreshApiStatus() {
  if (state.apiKey) {
    els.apiStatus.textContent = '✓ API key configured';
    els.apiStatus.classList.add('ok');
    els.apiKeyInput.value = state.apiKey;
  } else {
    els.apiStatus.textContent = '⚙ Configure API key';
    els.apiStatus.classList.remove('ok');
  }
}

els.saveKeyBtn.addEventListener('click', () => {
  const key = els.apiKeyInput.value.trim();
  if (!key) { alert('Please paste an API key first.'); return; }
  if (!key.startsWith('A')) {
    if (!confirm("This doesn't look like an Gemini API key (should start with Alxxx..). Save anyway?")) return;
  }
  state.apiKey = key;
  localStorage.setItem('jumeoni_api_key', key);
  refreshApiStatus();
  alert('Saved. You can now drop a document.');
});

els.clearKeyBtn.addEventListener('click', () => {
  state.apiKey = '';
  localStorage.removeItem('jumeoni_api_key');
  els.apiKeyInput.value = '';
  refreshApiStatus();
});

refreshApiStatus();

els.dropzone.addEventListener('click', (e) => {
  if (e.target.classList.contains('sample-btn')) return;
  els.fileInput.click();
});
els.dropzone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); els.fileInput.click(); }
});
els.dropzone.addEventListener('dragover', (e) => { e.preventDefault(); els.dropzone.classList.add('dragover'); });
els.dropzone.addEventListener('dragleave', () => els.dropzone.classList.remove('dragover'));
els.dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  els.dropzone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});
els.fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) handleFile(file);
});

document.querySelectorAll('.sample-btn').forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const sampleKey = btn.dataset.sample;
    const sample = getSampleImage(sampleKey);
    if (!sample) return;
    const blob = await (await fetch(sample.dataUrl)).blob();
    const file = new File([blob], sample.filename, { type: blob.type });
    handleFile(file, { isSample: true, prebuiltResult: sample.prebuiltResult });
  });
});

els.resetBtn.addEventListener('click', () => {
  els.resultPanel.hidden = true;
  els.resultPreview.innerHTML = '';
  els.resultContent.innerHTML = '';
  els.resultContent.hidden = true;
  els.resultError.hidden = true;
  els.fileInput.value = '';
  state.currentFile = null;
  els.dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

async function handleFile(file, opts = {}) {
  state.currentFile = file;
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'application/pdf'];
  if (!validTypes.includes(file.type)) {
    showError('Please upload a JPG, PNG, WebP, or PDF file.');
    els.resultPanel.hidden = false; return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showError('File is too large. Please upload something under 10 MB.');
    els.resultPanel.hidden = false; return;
  }
  els.resultPanel.hidden = false;
  els.resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  await showPreview(file);

  if (opts.isSample && opts.prebuiltResult) {
    showLoading(true, 'Reading the document…');
    setTimeout(() => {
      showLoading(false);
      els.resultContent.innerHTML = '';
      renderResult(els.resultContent, opts.prebuiltResult);
      els.resultContent.hidden = false;
    }, 900);
    return;
  }

  if (!state.apiKey) {
    showError('No API key configured. Click "Configure API key" above to add one, or click a sample document to see how it works without a key.');
    return;
  }

  showLoading(true, 'Reading the document…');
  try {
    const msgs = ['Reading the document…','Identifying document type…','Extracting deadlines and amounts…','Figuring out what you need to do…'];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % msgs.length;
      els.loadingText.textContent = msgs[msgIdx];
    }, 1800);

    const result = await analyzeDocument(file, state.apiKey);
    clearInterval(msgInterval);
    showLoading(false);
    els.resultContent.innerHTML = '';
    renderResult(els.resultContent, result);
    els.resultContent.hidden = false;
  } catch (err) {
    showLoading(false);
    console.error(err);
    showError(err.message || 'Something went wrong. Check the console for details.');
  }
}

async function showPreview(file) {
  els.resultPreview.innerHTML = '';
  if (file.type === 'application/pdf') {
    els.resultPreview.innerHTML = `
      <div class="pdf-placeholder">
        <div style="font-size:36px;margin-bottom:8px;">📄</div>
        <div style="font-weight:700;">${escapeHtml(file.name)}</div>
        <div style="font-size:13px;color:var(--ink-3);margin-top:4px;">PDF · ${(file.size / 1024).toFixed(1)} KB</div>
      </div>`;
  } else {
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Uploaded document';
    img.onload = () => URL.revokeObjectURL(url);
    els.resultPreview.appendChild(img);
  }
}

function showLoading(loading, text) {
  if (loading) {
    if (text) els.loadingText.textContent = text;
    els.resultLoading.hidden = false;
    els.resultError.hidden = true;
    els.resultContent.hidden = true;
  } else {
    els.resultLoading.hidden = true;
  }
}

function showError(msg) {
  els.resultError.textContent = msg;
  els.resultError.hidden = false;
  els.resultLoading.hidden = true;
  els.resultContent.hidden = true;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
