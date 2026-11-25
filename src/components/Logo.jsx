// Togetherly mark: two overlapping circles, one for each person in "together".
export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo-mark">
      <rect width="32" height="32" rx="9" fill="var(--accent)" />
      <circle cx="12.5" cy="16" r="7" fill="var(--on-accent)" fillOpacity="0.92" />
      <circle cx="19.5" cy="16" r="7" fill="var(--mark)" fillOpacity="0.95" />
    </svg>
  );
}
