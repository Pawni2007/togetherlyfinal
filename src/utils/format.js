// Small formatting helpers used across components.

export function timeAgo(timestamp) {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function formatNumber(n) {
  return n.toLocaleString("en-US");
}

export function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function firstName(name) {
  return name.trim().split(/\s+/)[0] || "there";
}

export function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function greeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Still up";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function pluralize(count, word) {
  return `${formatNumber(count)} ${word}${count === 1 ? "" : "s"}`;
}

// Where a student's profile lives. The demo user's own profile is /profile.
export function profilePath(authorId) {
  return authorId === "me" ? "/profile" : `/students/${authorId}`;
}
