import { useEffect } from "react";

// Updates the browser tab title whenever a page mounts or its title changes.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Togetherly` : "Togetherly";
  }, [title]);
}
