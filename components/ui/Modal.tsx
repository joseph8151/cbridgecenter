"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-card border border-line bg-white p-6 shadow-lift">
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-lg font-bold text-ink">{title}</h3>}
          <button
            onClick={onClose}
            className="ml-auto rounded-full p-1 text-ink-soft hover:bg-purple-50 hover:text-purple-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
