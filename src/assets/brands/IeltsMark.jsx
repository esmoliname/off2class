import React from 'react';

/** Abstract IELTS mark: globe meridians + ascending score bars. */
export default function IeltsMark({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="14" cy="13" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 13h17M14 4.5c2.6 2.4 4 5.4 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.4-4-8.5s1.4-6.1 4-8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M20.5 27.5h6M20.5 23.5h6M20.5 19.5h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
