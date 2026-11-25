import { useState } from "react";
import { X } from "./Icons";

// Lets the student type words and press Enter or comma to turn them into chips.
// Used for post tags and profile interests. The list itself lives in the parent.
export default function TagInput({ id, value, onChange, max, placeholder, normalize = (text) => text, prefix = "" }) {
  const [draft, setDraft] = useState("");
  const isFull = value.length >= max;

  function commit() {
    const tag = normalize(draft);
    setDraft("");
    if (!tag || isFull || value.includes(tag)) return;
    onChange([...value, tag]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault(); // stops Enter from submitting the whole form
      commit();
    } else if (event.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="tag-input">
      {value.map((tag) => (
        <span key={tag} className="tag-chip">
          {prefix}
          {tag}
          <button type="button" onClick={() => onChange(value.filter((item) => item !== tag))} aria-label={`Remove ${tag}`}>
            <X size={13} />
          </button>
        </span>
      ))}
      <input
        id={id}
        className="tag-input__field"
        value={draft}
        disabled={isFull}
        placeholder={isFull ? `Limit of ${max} reached` : placeholder}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commit}
      />
    </div>
  );
}
