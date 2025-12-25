/**
 * Handles the Enter key in forms and moves focus to the next focusable element.
 * Shift + Enter will allow line breaks, so it is ignored.
 *
 * @param e - The keyboard event triggered on key press
 */
export const textEditorKeyHandle = (e: KeyboardEvent) => {
  if (e.key === "Enter" && e.shiftKey) {
    e.preventDefault();

    const focusable = Array.from(
      document.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLElement
      >('input, textarea, [contenteditable="true"], select, button')
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    const activeElement = document.activeElement as HTMLElement;
    const index = focusable.indexOf(activeElement);
    const next = focusable[index + 1];
    if (next) next.focus();

    return true;
  }
  return false;
};
