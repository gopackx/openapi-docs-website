'use client';

import { useEffect, useRef, useState } from 'react';

const STYLE_ID = 'llm-actions-style';
const CSS = `
.llmact { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.llmact-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 8px;
  border: 1px solid var(--color-fd-border);
  background: var(--color-fd-card, var(--color-fd-background));
  color: var(--color-fd-foreground);
  font-size: 13px; font-weight: 600; line-height: 1.2;
  cursor: pointer; text-decoration: none;
  transition: background .15s ease, border-color .15s ease;
}
.llmact-btn:hover { background: var(--color-fd-accent); border-color: var(--color-fd-accent); }
.llmact-pop { position: relative; }
.llmact-menu {
  position: absolute; top: calc(100% + 6px); left: 0; z-index: 50;
  min-width: 200px; padding: 6px;
  display: flex; flex-direction: column; gap: 2px;
  border-radius: 10px;
  border: 1px solid var(--color-fd-border);
  background: var(--color-fd-popover, var(--color-fd-card));
  color: var(--color-fd-popover-foreground, var(--color-fd-foreground));
  box-shadow: 0 8px 28px rgba(0,0,0,.22);
}
.llmact-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 6px;
  font-size: 13.5px; font-weight: 500; line-height: 1.2;
  color: var(--color-fd-foreground); text-decoration: none;
  cursor: pointer; white-space: nowrap;
}
.llmact-item:hover { background: var(--color-fd-accent); }
.llmact-item svg { color: #f97316; flex-shrink: 0; }
.llmact-chev { transition: transform .15s ease; }
.llmact-chev[data-open="true"] { transform: rotate(180deg); }
`;

function useInjectStyle() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

/**
 * Doc-page actions for LLM consumption.
 *
 * @param markdownUrl  Relative `.mdx` path (e.g. `/docs/foo.mdx`) — used for the
 *                     in-page "Copy" action so it works in any environment.
 * @param shareUrl     Absolute, publicly reachable `.mdx` URL — handed to
 *                     ChatGPT / Claude so they can fetch the page content.
 */
export function LlmActions({
  markdownUrl,
  shareUrl,
}: {
  markdownUrl: string;
  shareUrl: string;
}) {
  useInjectStyle();
  const [copyState, setCopyState] = useState<
    'idle' | 'copying' | 'done' | 'error'
  >('idle');
  const [open, setOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  async function copyMarkdown() {
    setCopyState('copying');
    try {
      const res = await fetch(markdownUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopyState('done');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  }

  const copyLabel =
    copyState === 'copying'
      ? 'Copying…'
      : copyState === 'done'
        ? 'Copied!'
        : copyState === 'error'
          ? 'Failed'
          : 'Copy as Markdown';

  const prompt = `Read ${shareUrl} so I can ask questions about it.`;
  const encoded = encodeURIComponent(prompt);
  const chatgptUrl = `https://chatgpt.com/?q=${encoded}`;
  const claudeUrl = `https://claude.ai/new?q=${encoded}`;

  return (
    <div className="not-prose llmact">
      <button type="button" className="llmact-btn" onClick={copyMarkdown}>
        <Icon name={copyState === 'done' ? 'check' : 'copy'} />
        {copyLabel}
      </button>

      <div className="llmact-pop" ref={popRef}>
        <button
          type="button"
          className="llmact-btn"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          Open in LLM
          <Icon name="chevron" open={open} />
        </button>

        {open && (
          <div className="llmact-menu" role="menu">
            <a
              className="llmact-item"
              role="menuitem"
              href={markdownUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <Icon name="external" />
              View raw Markdown
            </a>
            <a
              className="llmact-item"
              role="menuitem"
              href={chatgptUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <Icon name="external" />
              Open in ChatGPT
            </a>
            <a
              className="llmact-item"
              role="menuitem"
              href={claudeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <Icon name="external" />
              Open in Claude
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Icon({
  name,
  open,
}: {
  name: 'copy' | 'check' | 'external' | 'chevron';
  open?: boolean;
}) {
  const c = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'copy':
      return (
        <svg {...c}>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      );
    case 'check':
      return (
        <svg {...c}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case 'external':
      return (
        <svg {...c}>
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      );
    case 'chevron':
      return (
        <svg {...c} className="llmact-chev" data-open={open ? 'true' : 'false'}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    default:
      return null;
  }
}
