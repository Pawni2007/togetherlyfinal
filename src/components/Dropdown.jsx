import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "./Icons";

// A custom dropdown menu. options = [{ value, label, disabled }].
export default function Dropdown({ id, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  // Close the menu when the student clicks anywhere outside of it.
  useEffect(() => {
    function handleClick(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const choose = useCallback(
    (optionValue) => {
      onChange(optionValue);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className="dropdown" ref={wrapRef} onKeyDown={(event) => event.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        id={id}
        className="input dropdown__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span>{selected ? selected.label : "Choose"}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>

      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                className={option.value === value ? "dropdown__item is-selected" : "dropdown__item"}
                disabled={option.disabled}
                onClick={() => choose(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
