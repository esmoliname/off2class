import React from 'react';
import { cn } from '../../utils/cn';

/** Consistent horizontal rhythm for every page section. */
export default function PageContainer({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('max-w-7xl mx-auto px-4 sm:px-6', className)} {...rest}>
      {children}
    </Tag>
  );
}
