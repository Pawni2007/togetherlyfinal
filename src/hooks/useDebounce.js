import { useEffect, useState } from "react";

// Returns the value only after it has stopped changing for "delay" milliseconds.
// Used so the search does not re-filter on every single key press.
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
