import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({ children, ...props }: ButtonHTMLAttributes<{ children: ReactNode }>) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
}
