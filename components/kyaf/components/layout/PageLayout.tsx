'use client';
/**
 * PageLayout Component
 * Standardized page layout with 6vw gutters and consistent structure
 */

import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  /** Apply top padding for fixed header (default: true) */
  withHeaderPadding?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Standard page wrapper with 6vw gutters
 */
export function PageLayout({ 
  children, 
  withHeaderPadding = true,
  className = '' 
}: PageLayoutProps) {
  return (
    <div 
      className={`
        min-h-screen bg-white
        ${withHeaderPadding ? 'pt-[96px]' : ''}
        ${className}
      `}
    >
      <div className="px-[6vw]">
        {children}
      </div>
    </div>
  );
}

interface TwoColumnSectionProps {
  /** Sticky heading (left column) */
  heading: ReactNode;
  /** Content (right column) */
  children: ReactNode;
  /** Section ID for navigation */
  id?: string;
  /** Bottom margin (default: mb-32 md:mb-40) */
  bottomMargin?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Two-column layout (50/50 split)
 * Left: Sticky heading
 * Right: Content
 */
export function TwoColumnSection({
  heading,
  children,
  id,
  bottomMargin = 'mb-32 md:mb-40',
  className = ''
}: TwoColumnSectionProps) {
  return (
    <section 
      id={id}
      className={`${bottomMargin} ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-8">
        {/* Left Column: Sticky Heading */}
        <div className="md:sticky md:top-32 md:self-start">
          {heading}
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col gap-12 md:gap-16">
          {children}
        </div>
      </div>
    </section>
  );
}

interface ContentGridProps {
  children: ReactNode;
  /** Grid columns (default: 2 mobile, 3 desktop) */
  columns?: '2' | '3' | '4';
  /** Gap size (default: gap-12 md:gap-16) */
  gap?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Content grid for exhibitions, activities, etc.
 */
export function ContentGrid({
  children,
  columns = '3',
  gap = 'gap-12 md:gap-16',
  className = ''
}: ContentGridProps) {
  const columnClass = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-2 md:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-4'
  }[columns];

  return (
    <div className={`grid ${columnClass} ${gap} ${className}`}>
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  children: ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Standard section heading
 */
export function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`text-xl md:text-2xl font-normal ${className}`}>
      {children}
    </h2>
  );
}

interface BilingualTextProps {
  th: string;
  en: string;
  language: 'th' | 'en';
  /** Apply Thai line-height when language is Thai */
  className?: string;
  /** Tag type */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
}

/**
 * Bilingual text component with automatic Thai line-height
 */
export function BilingualText({ 
  th, 
  en, 
  language, 
  className = '',
  as: Tag = 'p'
}: BilingualTextProps) {
  const text = language === 'th' ? th : en;
  const thaiClass = language === 'th' ? 'leading-[1.82em]' : '';
  
  return (
    <Tag className={`${thaiClass} ${className}`}>
      {text}
    </Tag>
  );
}
