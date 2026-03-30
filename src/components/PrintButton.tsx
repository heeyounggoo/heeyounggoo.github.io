"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-lg bg-neutral-900 px-6 py-2 text-sm text-white transition-colors hover:bg-neutral-700"
    >
      PDF로 저장
    </button>
  );
}
