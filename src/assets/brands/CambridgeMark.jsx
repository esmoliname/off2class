import React from 'react';

/** Abstract Cambridge mark: open book with a crest spine. */
export default function CambridgeMark({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 9.5C13.4 7.4 10.2 6.6 6 6.9v15.4c4.2-.3 7.4.5 10 2.6 2.6-2.1 5.8-2.9 10-2.6V6.9c-4.2-.3-7.4.5-10 2.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M16 9.5v15.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M9.4 11.6c1.4-.2 2.7 0 3.8.6M18.8 12.2c1.1-.6 2.4-.8 3.8-.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
