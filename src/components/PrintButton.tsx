"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-sm text-neutral-400 transition-opacity hover:opacity-50"
    >
      save as pdf
    </button>
  );
}
