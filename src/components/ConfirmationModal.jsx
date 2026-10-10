import React from 'react';
import { Phone, AlertCircle, X } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Call",
  cancelText = "Cancel",
  isDanger = false,
  isPhoneCall = false,
  phoneNumber = "",
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-full ${isDanger ? 'bg-red-100 text-red-600' : isPhoneCall ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'}`}>
              {isPhoneCall ? <Phone className="w-6 h-6 animate-bounce" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mt-4">
            {title}
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {message}
          </p>

          {isPhoneCall && phoneNumber && (
            <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between">
              <span className="text-xs text-teal-800 font-medium">Phone Number</span>
              <span className="text-base font-bold text-teal-900 font-mono tracking-wider">{phoneNumber}</span>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-md transition flex items-center gap-2 ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                : 'bg-teal-700 hover:bg-teal-800 shadow-teal-200'
            }`}
          >
            {isPhoneCall && <Phone className="w-4 h-4" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
