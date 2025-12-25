import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as React from "react";

const MultiWords: React.FC<MultiWordsProps> = ({
  defaultWords = [],
  onChange,
  placeholder,
  label = "Keywords",
  clearAll,
}) => {
  const [keywords, setKeywords] = React.useState<string[]>(defaultWords);
  const [inputValue, setInputValue] = React.useState("");

  // keep in sync with parent
  React.useEffect(() => {
    setKeywords(defaultWords);
  }, [defaultWords]);

  const addKeywords = async (value: string) => {
    await setKeywords(generateMultiWords(defaultWords, value));
    setInputValue("");
    onChange?.(generateMultiWords(defaultWords, value));
  };

  const removeKeyword = (index: number) => {
    const updated = keywords.filter((_, i) => i !== index);
    setKeywords(updated);
    onChange?.(updated);
  };

  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label
            htmlFor={label.toLowerCase()}
            className="block text-sm font-medium text-muted-foreground"
          >
            {label}
          </Label>
          <Tooltip>
            <TooltipTrigger tabIndex={-1}>
              <Icons.info className="h-3 w-3 text-muted-foreground cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              align="end"
              className="max-w-55 text-xs leading-relaxed bg-background text-foreground p-3 rounded-lg shadow-md"
            >
              <div className="space-y-1.5">
                <p className="font-medium text-foreground">
                  How to enter keywords:
                </p>
                <ul className="list-disc pl-4 text-muted-foreground">
                  <li>
                    Type a single word and press <b>Enter</b>
                  </li>
                  <li>Or enter multiple words separated by commas</li>
                </ul>
                <p className="text-muted-foreground/80 italic mt-1">
                  Example: marketing, seo, web-development
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        {keywords.length > 0 && (
          <Button
            onClick={clearAll}
            size="icon-xs"
            variant="outline-destructive"
            className="rounded-full"
            type="button"
            tabIndex={-1}
            title="Clear all keywords"
          >
            <Icons.trash2 className="h-3 w-3 text-destructive/70" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center bg-muted rounded px-2 py-0.5 group relative"
            >
              <span className="text-sm text-muted-foreground">{keyword}</span>
              <button
                tabIndex={-1}
                onClick={() => removeKeyword(index)}
                className="ml-2 opacity-70 cursor-pointer group-hover:opacity-100 text-foreground group-hover:text-red-500 transition-opacity"
                title="Remove keyword"
                type="button"
              >
                <Icons.x size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* 💡 Wrap input inside a form to make mobile "Enter" work */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addKeywords(inputValue);
              }
            }}
            className="text-sm flex-1"
            placeholder={`${placeholder} (press Enter)`}
          />
          {/* Optional mobile trigger button */}
          <Button
            disabled={!inputValue}
            type="button"
            onClick={() => addKeywords(inputValue)}
            aria-label="Add word"
            className="py-2 px-3 rounded transition transform ease-in-out md:hidden"
            title="Add word"
            variant="primary"
            size="icon"
          >
            <Icons.cornerDownLeft size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiWords;

/**
 * Merges existing keywords (array) with a new comma-separated string.
 * - Works even if `values` is empty or undefined
 * - Cleans spaces, removes empties
 * - Ensures case-insensitive uniqueness
 * - Preserves original casing of first occurrence
 *
 * @example
 * generateMultiWords([], "React, Next.js, SEO")
 * // -> ["React", "Next.js", "SEO"]
 *
 * generateMultiWords(["React", "Next.js"], "react, Branding, seo")
 * // -> ["React", "Next.js", "Branding", "seo"]
 */
export function generateMultiWords(
  values: string[] = [],
  value: string
): string[] {
  // Step 1: Parse and clean the new string
  const newParts = (value || "")
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  // Step 2: Merge with previous array (even if empty)
  const merged = [...values, ...newParts];

  // Step 3: Remove duplicates (case-insensitive, preserve first casing)
  const unique = Array.from(
    new Map(merged.map((v) => [v.toLowerCase(), v])).values()
  );

  return unique;
}
