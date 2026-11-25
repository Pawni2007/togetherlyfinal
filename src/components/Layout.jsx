import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

// The frame around every app page: the shared top navbar, the page itself
// (<Outlet />) and a small footer. There is no sidebar, so each page is one
// simple page that scrolls from top to bottom.
export default function Layout() {
  const { pathname } = useLocation();

  // A new page should start at the top, like a normal website would.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="lp">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="main">
        <Outlet />
      </main>
      <footer className="lp-footer">
        <p>
          <Link to="/saved">Saved posts</Link> · <Link to="/about">About Togetherly</Link>
        </p>
        <p>Togetherly is a front-end demo. All people and posts are fictional and stay in your browser.</p>
      </footer>
    </div>
  );
}
