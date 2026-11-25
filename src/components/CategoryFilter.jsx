import { CATEGORY_COLORS } from "../utils/constants";

// A row of filter chips. "All" is represented by an empty string.
export default function CategoryFilter({ categories, selected, onSelect, label = "Filter by category" }) {
  return (
    <div className="chip-row" role="group" aria-label={label}>
      <button
        type="button"
        className="filter-chip"
        aria-pressed={selected === ""}
        onClick={() => onSelect("")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="filter-chip"
          style={{ "--c": CATEGORY_COLORS[category] }}
          aria-pressed={selected === category}
          onClick={() => onSelect(selected === category ? "" : category)}
        >
          <span className="filter-chip__dot" aria-hidden="true" />
          {category}
        </button>
      ))}
    </div>
  );
}
