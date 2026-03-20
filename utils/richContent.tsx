'use client';
import React from 'react';

/**
 * Auto-link bare URLs in plain text content.
 * Also converts \n\n into paragraph breaks.
 */
export function autoLink(text: string): string {
  // Linkify http/https URLs
  return text.replace(
    /(https?:\/\/[^\s<>"']+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-70">$1</a>'
  );
}

/**
 * Render plain-text content with double paragraph spacing and auto-linked URLs.
 * For HTML content (contains tags), just adds paragraph spacing + auto-links.
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
    // Already HTML — just auto-link and add paragraph spacing
    const linked = autoLink(content);
    return (
      <div
        className={`[&>p]:mb-8 [&_a]:underline [&_a]:hover:opacity-70 ${bold ? '[&_a]:font-bold' : ''} ${className}`}
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
    <div className={className}>
      {paragraphs.map((para, i) => {
        const linked = autoLink(para.replace(/\n/g, '<br/>'));
        return (
          <p
            key={i}
            className={`mb-8 ${bold ? '[&_a]:font-bold' : ''}`}
            dangerouslySetInnerHTML={{ __html: linked }}
          />
        );
      })}
    </div>
  );
}
