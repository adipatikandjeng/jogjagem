'use client';

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationId: string;
  onReport: (reason: string, details: string) => Promise<void>;
}

export default function ReportModal({ isOpen, onClose, destinationId, onReport }: ReportModalProps) {
  const { t } = useLocale();
  
  const reasonKeys = [
    'inappropriate_image',
    'copyright',
    'inappropriate_content',
    'low_quality',
    'other'
  ] as const;

  const [reason, setReason] = useState(reasonKeys[0]);
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onReport(t(`report.reasons.${reason}`), details);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-red-100 rounded-full text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-royal-950">{t('report.title')}</h2>
        </div>

        <div className="space-y-3 mb-6">
          {reasonKeys.map((key) => (
            <label key={key} className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 cursor-pointer hover:bg-stone-50">
              <input type="radio" name="reason" value={key} checked={reason === key} onChange={(e) => setReason(e.target.value as any)} className="text-gold-500 focus:ring-gold-500" />
              <span className="text-sm text-stone-700">{t(`report.reasons.${key}`)}</span>
            </label>
          ))}
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={t('report.details_placeholder')}
            className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-gold-500"
            rows={3}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3 rounded-2xl bg-royal-950 hover:bg-royal-900 text-white font-semibold transition-all disabled:opacity-50"
        >
          {submitting ? t('report.submitting') : t('report.submit')}
        </button>
      </div>
    </div>
  );
}
