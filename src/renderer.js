const URGENCY_LABELS = {
  high: { label: '⚠ Action needed', cls: 'urgency-high' },
  medium: { label: '⏰ Should act soon', cls: 'urgency-medium' },
  low: { label: '✓ Low priority', cls: 'urgency-low' },
  info: { label: 'ℹ For your info', cls: 'urgency-info' },
};

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

export function renderResult(container, r) {
  const urgency = URGENCY_LABELS[r.urgency] || URGENCY_LABELS.info;
  const html = `
    <div class="result-card">
      <div class="result-header">
        <span class="urgency-badge ${urgency.cls}">${urgency.label}</span>
        <div class="result-title-block">
          <h3>${escapeHtml(r.title_en)}</h3>
          <p class="result-doctype">${escapeHtml(r.document_type)}${r.issuer ? ` · from ${escapeHtml(r.issuer)}` : ''}</p>
        </div>
      </div>
      <div class="result-section">
        <h4>What this is</h4>
        <p class="summary-text">${escapeHtml(r.summary)}</p>
      </div>
      ${r.can_ignore ? renderIgnoreBanner() : ''}
      ${r.key_facts.length > 0 || r.deadline || r.amount ? renderKeyFacts(r) : ''}
      ${r.actions.length > 0 ? renderActions(r.actions) : ''}
      ${r.line_items.length > 0 ? renderLineItems(r.line_items) : ''}
      ${renderScamMeter(r.scam_likelihood, r.scam_reasoning)}
    </div>
  `;
  container.innerHTML = html;
}

function renderIgnoreBanner() {
  return `
    <div class="result-section">
      <div style="background: rgba(46, 125, 78, 0.06); border-left: 3px solid var(--ok); padding: 14px 16px; border-radius: 0 6px 6px 0;">
        <strong style="color: var(--ok);">✓ You can ignore this.</strong>
        <span style="color: var(--ink-2); font-size: 14px;"> This looks like junk mail or a non-actionable advertisement.</span>
      </div>
    </div>
  `;
}

function renderKeyFacts(r) {
  const facts = [...(r.key_facts || [])];
  if (r.deadline && !facts.some((f) => /due|deadline|by/i.test(f.label))) facts.unshift({ label: 'Deadline', value: r.deadline });
  if (r.amount && !facts.some((f) => /amount|due|pay/i.test(f.label))) facts.unshift({ label: 'Amount', value: r.amount });
  if (facts.length === 0) return '';
  return `
    <div class="result-section">
      <h4>Key facts</h4>
      <div class="key-facts">
        ${facts.map((f) => `
          <div class="key-fact">
            <div class="key-fact-label">${escapeHtml(f.label)}</div>
            <div class="key-fact-value">${escapeHtml(f.value)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderActions(actions) {
  return `
    <div class="result-section">
      <h4>What to do</h4>
      <ul class="action-list">
        ${actions.map((a, i) => `
          <li class="action-item ${a.priority === 'high' ? 'priority' : ''}">
            <span class="action-bullet">${i + 1}</span>
            <span>${escapeHtml(a.text)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

function renderLineItems(items) {
  return `
    <div class="result-section">
      <h4>Line by line</h4>
      <div class="line-items">
        ${items.map((item) => `
          <details>
            <summary>${escapeHtml(item.korean)}</summary>
            <div class="line-items-body">${escapeHtml(item.explanation)}</div>
          </details>
        `).join('')}
      </div>
    </div>
  `;
}

function renderScamMeter(level, reasoning) {
  const widths = { low: 15, medium: 55, high: 90 };
  const labels = { low: 'Looks legitimate', medium: 'Some red flags', high: 'Likely scam' };
  return `
    <div class="result-section">
      <h4>Legitimacy check</h4>
      <div class="scam-meter scam-${level}">
        <div class="scam-meter-bar">
          <div class="scam-meter-fill" style="width: ${widths[level]}%"></div>
        </div>
        <span class="scam-label">${labels[level]}</span>
      </div>
      ${reasoning ? `<p style="font-size:13px;color:var(--ink-3);margin:8px 0 0;">${escapeHtml(reasoning)}</p>` : ''}
    </div>
  `;
}
