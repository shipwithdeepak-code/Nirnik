import React, { useState } from 'react';
import { X, Shield, Trash2, Database, CheckCircle, ExternalLink } from 'lucide-react';
import { deleteLocalData } from '../integrity/disclosures';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataDeleted?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onDataDeleted,
}) => {
  const [deletedNotice, setDeletedNotice] = useState(false);

  if (!isOpen) return null;

  const handleDeleteAll = () => {
    if (window.confirm('Delete all decisions and history stored on this device? This cannot be undone.')) {
      deleteLocalData();
      setDeletedNotice(true);
      setTimeout(() => {
        setDeletedNotice(false);
        onDataDeleted?.();
        onClose();
      }, 1200);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#E5E7E2] rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7E2]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#174A3A]" />
            <h2 id="settings-modal-title" className="text-sm font-semibold text-[#171A18]">
              Workspace Settings & Device Storage
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#8A908A] hover:text-[#171A18] hover:bg-[#F2F3EF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Local Storage Architecture */}
        <div className="space-y-2 text-xs">
          <div className="font-semibold text-[#171A18] flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#626862]" />
            <span>Local IndexedDB Persistence</span>
          </div>
          <p className="text-[#626862] leading-relaxed">
            All decisions, versions, and claims are stored exclusively in your browser&apos;s local IndexedDB. Nothing is written to any external user account or remote database.
          </p>
        </div>

        {/* Standing Invariants Note */}
        <div className="p-3.5 rounded-lg bg-[#F7F7F4] border border-[#E5E7E2] text-xs space-y-1.5">
          <div className="font-semibold text-[#171A18]">Standing Non-Negotiable Invariants</div>
          <ul className="list-disc pl-4 space-y-1 text-[#626862]">
            <li>Nirnik sees one frame of your product and none of your users.</li>
            <li>Confidence scores are an upper bound set by the evidence, not a guarantee.</li>
            <li>The human PM is always the sole final decision-maker.</li>
          </ul>
        </div>

        {/* Delete Local Data */}
        <div className="pt-3 border-t border-[#E5E7E2] space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-[#B54747] block">Clear Device Data</span>
              <span className="text-[#8A908A] text-[11px]">
                Permanently purge all saved decisions and cached spines.
              </span>
            </div>
            <button
              type="button"
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#B54747] bg-[#FAF0F0] hover:bg-[#F4D0D0] border border-[#F4D0D0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B54747]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete data</span>
            </button>
          </div>

          {deletedNotice && (
            <div className="p-2 rounded-md bg-[#DDEBE4] text-[#174A3A] text-xs font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Device storage cleared successfully.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-[#171A18] bg-[#F2F3EF] hover:bg-[#E5E7E2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174A3A]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
