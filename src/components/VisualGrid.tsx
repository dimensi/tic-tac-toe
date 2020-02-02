import React from 'react';

export function VisualGrid({ size, ...props }: { size: number }) {
  return (
    <svg className="visualGrid" {...props}>
      <defs>
        <pattern id="smallGrid" width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="#000" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#smallGrid)"></rect>
    </svg>
  );
}
