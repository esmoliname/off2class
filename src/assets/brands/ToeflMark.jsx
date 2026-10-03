import React from 'react';

/** Abstract TOEFL mark: hexagonal badge with a verification stroke. */
export default function ToeflMark({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 3.2 26.7 9.4v12.4L16 28 5.3 21.8V9.4L16 3.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m11 15.8 3.4 3.4 6.6-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
