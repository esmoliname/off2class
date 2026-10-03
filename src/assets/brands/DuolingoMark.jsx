import React from 'react';

/** Abstract Duolingo-style mark: rounded owl face built from simple geometry. */
export default function DuolingoMark({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 4c6.1 0 11 4.5 11 10.5S22.1 25 16 25c-1.6 0-3.1-.3-4.5-.9L6 27l1.6-5.1C5.6 20.3 5 18 5 14.5 5 8.5 9.9 4 16 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="13.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m16 17 1.8 2.6h-3.6L16 17Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
