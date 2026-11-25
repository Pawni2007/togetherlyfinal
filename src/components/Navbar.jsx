import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "./Icons";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useUser } from "../context/UserContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/communities", label: "Communities" },
  { to: "/explore", label: "Explore" },
  { to: "/profile", label: "Profile" },
  { to: "/create", label: "Create Post" },
];

// The one navigation bar used on EVERY page (welcome page and all app pages).
// It is a centred, floating bar. Nothing sits in the
// page corners: the logo, links and theme toggle all live inside this one bar.
export default function Navbar() {
  const [open, setOpen] = useState(false); // only used by the phone menu
  const { isLoggedIn, logout } = useUser();

  return (
    <header className="lp-nav-wrap">
      <nav className="lp-nav" aria-label="Main navigation">
        <NavLink to="/" className="lp-nav__brand" aria-label="Togetherly home" onClick={() => setOpen(false)}>
          <Logo size={28} />
          <span>togetherly</span>
        </NavLink>

        <ul className={open ? "lp-nav__links is-open" : "lp-nav__links"}>
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className="lp-nav__link" onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="lp-nav__tools">
          {isLoggedIn ? (
            <button type="button" className="btn btn--outline btn--sm lp-nav__auth" onClick={logout}>Log out</button>
          ) : (
            <Link to="/login" className="btn btn--primary btn--sm lp-nav__auth">Log in</Link>
          )}
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn lp-nav__menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
