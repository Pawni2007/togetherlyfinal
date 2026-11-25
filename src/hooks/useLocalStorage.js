import { useEffect, useState } from "react";

// Works like useState, but the value is loaded from and saved to localStorage as JSON.
// If nothing is saved yet (or the saved text is broken) the initial value is used.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem("togetherly-" + key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("togetherly-" + key, JSON.stringify(value));
    } catch {
      // Storage can be full or blocked. The app still works without it.
    }
  }, [key, value]);

  return [value, setValue];
}
