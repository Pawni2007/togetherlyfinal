// A flat illustration of three students working together. It is plain SVG, so it
// scales cleanly and picks up the light/dark colours from the CSS variables.
export default function HeroArt() {
  return (
    <svg viewBox="0 0 560 420" role="img" aria-label="Three students collaborating on laptops" className="hero-art">
      {/* SVG fills cannot use CSS gradients, so the gradient is defined here with theme colours. */}
      <defs>
        <linearGradient id="hero-art-bg" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" style={{ stopColor: "var(--art-bg-from)" }} />
          <stop offset="1" style={{ stopColor: "var(--art-bg-to)" }} />
        </linearGradient>
      </defs>
      <rect width="560" height="420" rx="24" fill="url(#hero-art-bg)" />

      {/* window panes behind the group */}
      {[40, 150, 260, 370].map((x) => (
        <rect key={x} x={x} y="30" width="100" height="130" rx="8" fill="var(--art-pane)" />
      ))}

      {/* floating cards: chat, like, saved */}
      <g>
        <rect x="46" y="64" width="132" height="50" rx="12" fill="var(--surface)" />
        <circle cx="72" cy="89" r="12" fill="var(--accent)" />
        <rect x="92" y="78" width="70" height="7" rx="3.5" fill="var(--line-strong)" />
        <rect x="92" y="93" width="48" height="7" rx="3.5" fill="var(--line)" />

        <rect x="392" y="52" width="104" height="44" rx="12" fill="var(--surface)" />
        <path d="M425 84c-9-6-14-10-14-16a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 6-5 10-14 16z" fill="var(--like)" />
        <rect x="446" y="68" width="36" height="7" rx="3.5" fill="var(--line-strong)" />

        <rect x="404" y="112" width="84" height="38" rx="12" fill="var(--surface)" />
        <path d="M424 124h14v22l-7-5-7 5z" fill="var(--mark)" />
        <rect x="446" y="131" width="30" height="7" rx="3.5" fill="var(--line)" />
      </g>

      {/* left student */}
      <path d="M62 340c0-62 28-96 72-96s72 34 72 96z" fill="#5a86d6" />
      <circle cx="134" cy="196" r="30" fill="#e9b894" />
      <path d="M103 196c-4-34 18-52 40-48 24 4 28 28 22 50-8-14-22-22-42-20-10 1-16 8-20 18z" fill="#3b2a2a" />
      <path d="M100 190a36 36 0 0 1 68-8" fill="none" stroke="#1f3b78" strokeWidth="7" strokeLinecap="round" />

      {/* right student */}
      <path d="M354 340c0-62 28-96 72-96s72 34 72 96z" fill="var(--mark)" />
      <circle cx="426" cy="196" r="30" fill="#8a5a3c" />
      <path d="M394 200c-6-40 20-58 44-52 26 6 30 30 22 52-6-12-14-18-30-18-14 0-26 6-36 18z" fill="#1d1414" />

      {/* centre student */}
      <path d="M208 340c0-70 30-110 72-110s72 40 72 110z" fill="#2b66d9" />
      <circle cx="280" cy="176" r="32" fill="#f0c3a1" />
      <path d="M248 172c-2-34 20-48 38-46 22 2 30 24 26 44-10-14-22-20-36-18-12 2-22 8-28 20z" fill="#2a1d18" />

      {/* laptops */}
      <g fill="var(--art-laptop)">
        <path d="M70 330l16-44h104l14 44z" />
        <path d="M222 336l14-52h88l14 52z" />
        <path d="M364 330l14-44h104l16 44z" />
      </g>
      <g fill="var(--accent)" opacity="0.85">
        <rect x="244" y="292" width="72" height="36" rx="3" />
      </g>

      {/* desk */}
      <rect y="338" width="560" height="82" fill="var(--art-desk)" />
      <rect y="338" width="560" height="6" fill="var(--art-desk-edge)" />
    </svg>
  );
}
