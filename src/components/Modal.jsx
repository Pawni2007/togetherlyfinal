import { useEffect, useRef } from "react";
import { X } from "./Icons";

// A dialog rendered on top of the page. It closes on Escape or a click on the
// dark backdrop, and it stops the page behind it from scrolling.
export default function Modal({ title, onClose, children }) {
  const dialogRef = useRef(null);

  // Runs once when the dialog opens: lock page scrolling and move focus into the dialog.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    // When the dialog closes, undo both changes.
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // Close the dialog when the Escape key is pressed.
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <header className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
