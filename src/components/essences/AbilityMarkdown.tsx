import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';

interface AbilityMarkdownProps {
  content: string;
  className?: string;
  searchTerm?: string;
}

export const AbilityMarkdown: React.FC<AbilityMarkdownProps> = ({
  content,
  className = '',
  searchTerm = ''
}) => {
  if (!content) return null;

  // Check if content is solely a spell link (starts with http)
  if (content.trim().startsWith('http')) {
    return (
      <div className={className}>
        <p className="mb-2 text-fog font-body">This ability references an external spell. For detailed information:</p>
        <a
          href={content.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gold hover:text-gold-bright transition-colors font-body"
        >
          <ExternalLink size={14} />
          View spell details
        </a>
      </div>
    );
  }

  // Helper to highlight search term in text nodes
  const highlightSearch = (children: React.ReactNode): React.ReactNode => {
    if (!searchTerm.trim()) return children;

    return React.Children.map(children, child => {
      if (typeof child === 'string') {
        const parts = child.split(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
        if (parts.length === 1) return child;
        return parts.map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={i} className="bg-gold/30 text-gold-bright px-0.5 rounded font-inherit">
              {part}
            </mark>
          ) : (
            part
          )
        );
      }
      return child;
    });
  };

  return (
    <div className={`arcane-markdown text-parchment/90 font-body leading-relaxed text-left ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed last:mb-0">{highlightSearch(children)}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-ivory">{highlightSearch(children)}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-parchment/90">{highlightSearch(children)}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2.5 space-y-1 text-parchment/90">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2.5 space-y-1 text-parchment/90">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{highlightSearch(children)}</li>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded border border-ash/40 bg-obsidian/40">
              <table className="w-full text-sm text-left border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-charcoal/80 text-xs text-gold uppercase tracking-wider border-b border-ash/50 font-display">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-ash/30">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-charcoal/20 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-gold font-medium text-xs tracking-wider">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-parchment/90">{highlightSearch(children)}</td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-bright underline transition-colors inline-flex items-center gap-1"
            >
              {children}
              <ExternalLink size={12} className="inline opacity-70" />
            </a>
          ),
          h4: ({ children }) => (
            <h4 className="font-display text-sm text-gold tracking-wide mt-3 mb-1.5">{highlightSearch(children)}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="font-display text-xs text-gold-dim tracking-wider uppercase mt-2 mb-1">{highlightSearch(children)}</h5>
          ),
          code: ({ children }) => (
            <code className="bg-charcoal/80 px-1.5 py-0.5 rounded text-xs text-gold font-mono border border-ash/40">
              {children}
            </code>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AbilityMarkdown;
