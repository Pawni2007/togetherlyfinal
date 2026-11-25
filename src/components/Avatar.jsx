import { getInitials } from "../utils/format";

// A round avatar made from the person's initials on their chosen colour.
// The name is always shown next to it, so the avatar itself is hidden from screen readers.
export default function Avatar({ person, size = 40 }) {
  return (
    <span
      className="avatar"
      style={{ "--size": `${size}px`, background: person.color }}
      aria-hidden="true"
    >
      {getInitials(person.name)}
    </span>
  );
}
