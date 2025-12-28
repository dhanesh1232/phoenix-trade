"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-texteditor/tiptap-ui-primitive/button";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-texteditor/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { HorizontalRule } from "@/components/tiptap-texteditor/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-texteditor/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-texteditor/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-texteditor/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-texteditor/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-texteditor/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-texteditor/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-texteditor/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { LinkContent } from "@/components/tiptap-texteditor/tiptap-ui/link-popover";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-texteditor/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-texteditor/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-texteditor/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";

// --- Styles ---
import "@/components/tiptap-texteditor/tiptap-templates/simple/simple-editor.scss";

import { MainToolbarContent } from "../toolbar";
// import { textEditorKeyHandle } from "@/lib/editor";

const MobileToolbarContent = ({ type, onBack }: MobileToolbarContentProps) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "link" && <LinkContent />}
  </>
);

export function TextEditor({ content, onChange }: RichTextEditorProps) {
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
      // handleKeyDown: (_view, event) => textEditorKeyHandle(event),
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content,
    onUpdate: ({ editor, transaction }) => {
      if (!transaction.docChanged) return;
      const html = editor.getJSON();
      onChange?.(html);
    },
  });

  React.useEffect(() => {
    if (!editor || !content) return;

    const currentJson = editor.getJSON();
    const isSameContent =
      JSON.stringify(currentJson) === JSON.stringify(content);

    if (isSameContent) return; // Prevent loop on identical content

    // Preserve cursor position
    const { from, to } = editor.state.selection;
    editor.commands.setContent(content, { emitUpdate: false });
    editor.commands.setTextSelection({ from, to });
  }, [content, editor]);

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <>
      <div className="simple-editor-wrapper border rounded">
        <EditorContext.Provider value={{ editor }}>
          <Toolbar
            tabIndex={-1}
            ref={toolbarRef}
            className="justify-self-start justify-start flex flex-1 py-1.5 px-0"
          >
            {mobileView === "main" ? (
              <MainToolbarContent
                onHighlighterClick={() => setMobileView("highlighter")}
                onLinkClick={() => setMobileView("link")}
                isMobile={isMobile}
              />
            ) : (
              <MobileToolbarContent
                type={mobileView === "highlighter" ? "highlighter" : "link"}
                onBack={() => setMobileView("main")}
              />
            )}
          </Toolbar>

          <div className={`simple-editor-content min-h-[30vh] max-h-[35vh]`}>
            <EditorContent
              editor={editor}
              role="presentation"
              style={{
                marginLeft: 0,
                marginRight: 0,
              }}
              className="overflow-auto"
            />
          </div>
        </EditorContext.Provider>
      </div>
    </>
  );
}
