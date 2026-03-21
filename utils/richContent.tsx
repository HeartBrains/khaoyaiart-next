'use client';
import React from 'react';

/**
 * Auto-link bare URLs in text content.
 */
export function autoLink(text: string): string {
  return text.replace(
    /(https?:\/\/[^\s<>"']+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">$1</a>'
  );
}

/**
 * Render content with double paragraph spacing and auto-linked URLs.
 * Handles both plain text (\n\n separated) and HTML (<p> tagged) content.
 */
export function RichContent({
  content,
  className = '',
  bold = false,
}: {
  content: string;
  className?: string;
  bold?: boolean;
}) {
  if (!content) return null;

  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    const linked = autoLink(content);
    return (
      <div
        className={`rich-content ${bold ? '[&_a]:font-bold' : ''} ${className}`}
        dangerouslySetInnerHTML={{ __html: linked }}
      />
    );
  }

  // Plain text — split on double newlines into paragraphs
  const paragraphs = content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <div className={`rich-content ${className}`}>
      {paragraphs.map((para, i) => {
        const linked = autoLink(para.replace(/\n/g, '<br/>'));
        return (
          <p
            key={i}
            className={bold ? '[&_a]:font-bold' : ''}
            dangerouslySetInnerHTML={{ __html: linked }}
          />
        );
      })}
    </div>
  );
}
