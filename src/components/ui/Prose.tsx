'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import React from 'react';

interface ProseProps {
  content: string;
  className?: string;
  customComponents?: Partial<React.ComponentProps<typeof ReactMarkdown>['components']>;
  /** Optional word/phrase to highlight in brand color */
  highlightWord?: string;
}

/**
 * Helper function to highlight specific text within children
 */
function highlightText(children: React.ReactNode, word: string): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      if (child.includes(word)) {
        const parts = child.split(word);
        return parts.reduce<React.ReactNode[]>((acc, part, i) => {
          if (i > 0) {
            acc.push(
              <span key={`highlight-${i}`} className="text-brand-400 font-bold">
                {word}
              </span>
            );
          }
          if (part) {
            acc.push(part);
          }
          return acc;
        }, []);
      }
      return child;
    }
    return child;
  });
}

export function Prose({ content, className, customComponents, highlightWord }: ProseProps) {
  const createParagraph = (children: React.ReactNode) => {
    const processedChildren = highlightWord ? highlightText(children, highlightWord) : children;
    return (
      <p
        className="leading-relaxed text-cream-300 mb-4"
        style={{ fontFamily: 'var(--font-body), "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
      >
        {processedChildren}
      </p>
    );
  };

  const defaultComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold tracking-tight text-cream-200 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold tracking-tight text-cream-200 mb-3 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold text-cream-200 mb-2 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-semibold text-cream-200 mb-2 mt-4">
        {children}
      </h4>
    ),
    p: ({ children }: { children?: React.ReactNode }) => createParagraph(children),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 text-cream-300 mb-4">
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 text-cream-300 mb-4">
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-cream-100">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-cream-200">{children}</em>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a
        href={href}
        className="text-brand-500 hover:text-brand-400 transition-colors underline"
      >
        {children}
      </a>
    ),
  };

  const components = customComponents
    ? { ...defaultComponents, ...customComponents }
    : defaultComponents;

  return (
    <div className={cn('prose prose-invert max-w-none', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
