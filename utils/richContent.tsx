'use client';
import React from 'react';

/** Decode HTML entities so WP-encoded content renders correctly. */
function decodeCodePoint(value: string, radix: number): string {
  const codePoint = parseInt(value, radix);
  return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
    ? String.fromCodePoint(codePoint)
    : '';
}

function decodeEntities(str: string): string {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => decodeCodePoint(hex, 16))
    .replace(/&#([0-9]+);/g, (_, dec) => decodeCodePoint(dec, 10))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Strip layout wrapper divs that WP sometimes saves around content,
 * leaving only the inner semantic HTML (p, a, strong, etc.).
 * Handles patterns like: <div class="md:col-span-6 ..."><div ...><p>text</p></div></div>
 */
export function stripWrapperDivs(html: string): string {
  let result = html.trim();
  // Repeatedly unwrap outermost <div ...>...</div> if it contains no sibling elements
  const divPattern = /^<div[^>]*>([\s\S]*)<\/div>\s*$/i;
  for (let i = 0; i < 10; i++) {
    const match = result.match(divPattern);
    if (!match) break;
    const inner = match[1].trim();
    // Only unwrap if the inner content doesn't start with multiple sibling divs
    // (i.e. this div is purely a wrapper, not a layout container with siblings)
    result = inner;
  }
  return result;
}

/**
 * Auto-link bare URLs in text content.
 */
export function autoLink(text: string): string {
  return text.replace(
    /(https?:\/\/[^\s<>"']+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">$1</a>'
  );
}

/** Link URLs in HTML text nodes without rewriting media or link attributes. */
function autoLinkHtml(html: string): string {
  let insideAnchor = false;

  return html.split(/(<[^>]+>)/g).map((part) => {
    if (part.startsWith('<')) {
      if (/^<\/a\b/i.test(part)) insideAnchor = false;
      else if (/^<a\b/i.test(part)) insideAnchor = true;
      return part;
    }

    return insideAnchor ? part : autoLink(part);
  }).join('');
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

  const decoded = decodeEntities(content);
  const isHtml = /<[a-z][\s\S]*>/i.test(decoded);

  if (isHtml) {
    const linked = autoLinkHtml(decoded);
    return (
      <div
        className={`rich-content ${bold ? '[&_a]:font-bold' : ''} ${className}`}
        dangerouslySetInnerHTML={{ __html: linked }}
      />
    );
  }

  // Plain text — split on double newlines into paragraphs
  const paragraphs = decoded
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
