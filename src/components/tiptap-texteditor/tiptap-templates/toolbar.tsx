import { ToolbarGroup, ToolbarSeparator } from "../tiptap-ui-primitive/toolbar";
import { BlockquoteButton } from "../tiptap-ui/blockquote-button";
import { CodeBlockButton } from "../tiptap-ui/code-block-button";
import { HeadingDropdownMenu } from "../tiptap-ui/heading-dropdown-menu";
import { ListDropdownMenu } from "../tiptap-ui/list-dropdown-menu";
import { UndoRedoButton } from "../tiptap-ui/undo-redo-button";
import {
  LinkPopover,
  LinkButton,
} from "@/components/tiptap-texteditor/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-texteditor/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-texteditor/tiptap-ui/text-align-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-texteditor/tiptap-ui/color-highlight-popover";

export const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: MainToolbarProps) => {
  return (
    <>
      {/* <Spacer /> */}
      <ToolbarGroup
        className="overflow-hidden flex flex-1 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <UndoRedoButton action="undo" tabIndex={-1} />
        <UndoRedoButton action="redo" tabIndex={-1} />
        <ToolbarSeparator />
        <HeadingDropdownMenu
          tabIndex={-1}
          levels={[1, 2, 3, 4, 5, 6]}
          portal={isMobile}
        />
        <ListDropdownMenu
          tabIndex={-1}
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton tabIndex={-1} />
        <CodeBlockButton tabIndex={-1} />
        <ToolbarSeparator />
        <MarkButton type="bold" tabIndex={-1} />
        <MarkButton type="italic" tabIndex={-1} />
        <MarkButton type="strike" tabIndex={-1} />
        <MarkButton type="code" tabIndex={-1} />
        <MarkButton type="underline" tabIndex={-1} />
        {!isMobile ? (
          <ColorHighlightPopover tabIndex={-1} />
        ) : (
          <ColorHighlightPopoverButton
            tabIndex={-1}
            onClick={onHighlighterClick}
          />
        )}

        {!isMobile ? (
          <LinkPopover tabIndex={-1} />
        ) : (
          <LinkButton onClick={onLinkClick} tabIndex={-1} />
        )}
        <ToolbarSeparator />
        <MarkButton type="superscript" tabIndex={-1} />
        <MarkButton type="subscript" tabIndex={-1} />
        <ToolbarSeparator />
        <TextAlignButton align="left" tabIndex={-1} />
        <TextAlignButton align="center" tabIndex={-1} />
        <TextAlignButton align="right" tabIndex={-1} />
        <TextAlignButton align="justify" tabIndex={-1} />
        <ToolbarSeparator />
      </ToolbarGroup>
    </>
  );
};
