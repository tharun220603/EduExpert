"use client";

import React from "react";

interface SimpleMarkdownProps {
  children: string;
}

/**
 * A ultra-lightweight Markdown-to-JSX component to avoid dependency issues.
 * Supports: Headers (#), Bold (**), Lists (* or -), Sub-headers (##), and Line Breaks.
 */
export default function SimpleMarkdown({ children }: SimpleMarkdownProps) {
  if (!children) return null;

  // Split content into blocks by double newlines
  const blocks = children.split(/\n\n+/);

  return (
    <div className="markdown-content">
      {blocks.map((block, bIdx) => {
        const trimmedBlock = block.trim();
        
        // Header 1: # Title
        if (trimmedBlock.startsWith("# ")) {
          return (
            <h1 key={bIdx} style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem", marginTop: "2rem", color: "var(--text-primary)" }}>
              {parseInline(trimmedBlock.substring(2))}
            </h1>
          );
        }

        // Header 2: ## Subtitle
        if (trimmedBlock.startsWith("## ")) {
          return (
            <h2 key={bIdx} style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.2rem", marginTop: "1.8rem", color: "var(--text-primary)" }}>
              {parseInline(trimmedBlock.substring(3))}
            </h2>
          );
        }

        // Header 3: ### Minor Header
        if (trimmedBlock.startsWith("### ")) {
          return (
            <h3 key={bIdx} style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", marginTop: "1.5rem", color: "var(--text-primary)" }}>
              {parseInline(trimmedBlock.substring(4))}
            </h3>
          );
        }

        // Unordered List: * Item or - Item
        if (trimmedBlock.startsWith("* ") || trimmedBlock.startsWith("- ")) {
          const items = trimmedBlock.split("\n").filter(li => li.trim());
          return (
            <ul key={bIdx} style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", listStyleType: "disc" }}>
              {items.map((item, iIdx) => (
                <li key={iIdx} style={{ marginBottom: "0.5rem", color: "var(--text-mid)" }}>
                  {parseInline(item.replace(/^[*|-]\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        // Ordered List: 1. Item
        if (/^\d+\.\s/.test(trimmedBlock)) {
          const items = trimmedBlock.split("\n").filter(li => li.trim());
          return (
            <ol key={bIdx} style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", listStyleType: "decimal" }}>
              {items.map((item, iIdx) => (
                <li key={iIdx} style={{ marginBottom: "0.5rem", color: "var(--text-mid)" }}>
                  {parseInline(item.replace(/^\d+\.\s+/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        // Paragraph
        return (
          <p key={bIdx} style={{ marginBottom: "1.5rem", lineHeight: 1.8, color: "var(--text-mid)" }}>
            {parseInline(trimmedBlock)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Handles bolding (**text**) and basic inline parsing.
 */
function parseInline(text: string) {
  // Bold: **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
