import { Search, X } from "./Icons";

// A controlled search box. The parent owns the text; this component only displays it.
export default function SearchBar({ value, onChange, placeholder, label, large = false }) {
  return (
    <div className={large ? "search search--large" : "search"}>
      <label htmlFor="search-input" className="sr-only">
        {label}
      </label>
      <Search size={large ? 22 : 18} className="search__icon" aria-hidden="true" />
      <input
        id="search-input"
        type="search"
        className="search__input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {value && (
        <button type="button" className="search__clear" onClick={() => onChange("")} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
