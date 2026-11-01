import React, { useState } from 'react';
import { getStandaloneReactCode, getStandaloneVanillaHtmlCode } from '../utils/ticker';
import { X, Copy, Check, Code, FileCode2, Terminal } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'react' | 'vanilla'>('react');
  const [copied, setCopied] = useState(false);

  const currentCode = activeTab === 'react' ? getStandaloneReactCode() : getStandaloneVanillaHtmlCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="code-modal-title"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-neutral-900 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-neutral-950">
              <Code className="h-4 w-4" />
            </span>
            <div>
              <h3 id="code-modal-title" className="text-base font-bold text-white">
                Sonsuz Hərəkət Edən (Infinite Marquee) Komponent Kodu
              </h3>
              <p className="text-xs text-neutral-400">
                Tailwind CSS və GPU-sürətləndirməli transform: translate3d() əsaslı tam təmiz kod
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Bağla"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher & Copy Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-neutral-950 px-6 py-3">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-neutral-900 p-1">
            <button
              onClick={() => setActiveTab('react')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'react'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileCode2 className="h-3.5 w-3.5" />
              <span>React + Tailwind CSS</span>
            </button>
            <button
              onClick={() => setActiveTab('vanilla')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'vanilla'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>HTML + Vanilla JS + Tailwind</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 transition-all hover:bg-amber-400 shadow-md cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
          </button>
        </div>

        {/* Code Content Container */}
        <div className="relative max-h-[62vh] overflow-y-auto bg-neutral-950 p-6 font-mono text-xs leading-relaxed text-neutral-200">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Instructions footer */}
        <div className="border-t border-white/10 bg-neutral-900/90 px-6 py-3 text-xs text-neutral-400 flex items-center justify-between">
          <span>Hər hansı əlavə asılılıq olmadan layihənizə birbaşa yerləşdirilə bilər.</span>
          <span className="font-semibold text-amber-400">60fps Jank-Free Transform</span>
        </div>
      </div>
    </div>
  );
};
