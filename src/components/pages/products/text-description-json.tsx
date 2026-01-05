// ./src/components/pages/products/text-description-json.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Add this import if not already present

const HEADING_COMPONENTS: Record<number, React.ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

const LIST_COMPONENTS: Record<string, React.ElementType> = {
  bulletList: "ul",
  orderedList: "ol",
} as const;

export function RichTextRenderer({ content }: { content: any }) {
  if (!content?.content) return null;

  return content.content.map((block: any, i: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={i} className="mb-4 leading-relaxed">
            {renderInlineContent(block.content)}
          </p>
        );

      case "heading":
        const level = Math.min(Math.max(block.attrs?.level || 2, 1), 6);
        const HeadingTag = HEADING_COMPONENTS[level]!;
        return (
          <HeadingTag
            key={i}
            className={cn(
              "font-bold mt-8 mb-4",
              level === 1 && "text-4xl lg:text-5xl",
              level === 2 && "text-3xl lg:text-4xl",
              level === 3 && "text-2xl",
              level === 4 && "text-xl font-semibold",
              level === 5 && "text-lg font-semibold",
              level === 6 && "text-base font-semibold"
            )}
          >
            {renderInlineContent(block.content)}
          </HeadingTag>
        );

      case "bulletList":
      case "orderedList":
        const ListTag =
          LIST_COMPONENTS[block.type as keyof typeof LIST_COMPONENTS]!;
        return (
          <ListTag
            key={i}
            className={cn(
              "space-y-2 my-6 pl-6",
              block.type === "orderedList" && "list-decimal list-inside"
            )}
          >
            {block.content?.map((item: any, j: number) => (
              <li key={j} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0 flex flex-col items-center" />
                <span className="leading-relaxed">
                  {renderInlineContent(item.content)}
                </span>
              </li>
            ))}
          </ListTag>
        );

      case "listItem":
        return null; // Handled by bulletList/orderedList

      case "blockquote":
        return (
          <blockquote
            key={i}
            className="border-l-4 border-primary/20 bg-muted/50 pl-6 py-4 my-6 italic"
          >
            {renderInlineContent(block.content)}
          </blockquote>
        );

      case "codeBlock":
        return (
          <pre
            key={i}
            className="bg-muted/50 border rounded-lg p-6 my-6 overflow-x-auto font-mono text-sm"
          >
            <code>{renderInlineContent(block.content)}</code>
          </pre>
        );

      case "horizontalRule":
        return <hr key={i} className="my-12 border-border/30" />;

      case "image":
        return (
          <figure key={i} className="my-8 text-center">
            <img
              src={block.attrs?.src}
              alt={block.attrs?.alt || ""}
              className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
            />
            {block.attrs?.title && (
              <figcaption className="mt-2 text-sm text-muted-foreground italic">
                {block.attrs.title}
              </figcaption>
            )}
          </figure>
        );

      case "hardBreak":
        return <br key={i} />;

      default:
        return null;
    }
  });
}

// Helper function to render inline content (text, links, bold, etc.)
function renderInlineContent(content: any[]): React.ReactNode {
  if (!content || !Array.isArray(content)) return null;

  return content.map((node: any, idx: number) => {
    if (!node) return null;

    switch (node.type) {
      case "text":
        return node.text || "";

      case "hardBreak":
        return <br key={idx} />;

      case "em":
      case "italic":
        return (
          <em key={idx} className="font-light italic">
            {renderInlineContent(node.content || [])}
          </em>
        );

      case "strong":
      case "bold":
        return (
          <strong key={idx} className="font-bold">
            {renderInlineContent(node.content || [])}
          </strong>
        );

      case "link":
        return (
          <a
            key={idx}
            href={node.attrs?.href}
            className="text-primary hover:underline font-medium underline underline-offset-2"
            target={node.attrs?.target || "_self"}
            rel={
              node.attrs?.href?.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
          >
            {renderInlineContent(node.content || [])}
          </a>
        );

      case "code":
        return (
          <code
            key={idx}
            className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono"
          >
            {renderInlineContent(node.content || [])}
          </code>
        );

      case "underline":
        return (
          <span
            key={idx}
            className="underline underline-offset-2 decoration-primary/50"
          >
            {renderInlineContent(node.content || [])}
          </span>
        );

      case "strike":
        return (
          <del key={idx} className="line-through decoration-muted-foreground">
            {renderInlineContent(node.content || [])}
          </del>
        );

      case "superscript":
        return (
          <sup key={idx} className="text-xs">
            {renderInlineContent(node.content || [])}
          </sup>
        );

      case "subscript":
        return (
          <sub key={idx} className="text-xs">
            {renderInlineContent(node.content || [])}
          </sub>
        );

      default:
        // Recursively render nested content
        return renderInlineContent(node.content || []);
    }
  });
}
