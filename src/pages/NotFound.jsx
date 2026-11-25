import { Link } from "react-router-dom";
import { Compass } from "../components/Icons";
import EmptyState from "../components/EmptyState";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="page-wide">
      <EmptyState
        icon={Compass}
        title="This page doesn't exist"
        text="The link may be mistyped or the page may have moved. Head back to Explore or look around Communities."
        action={
          <div className="empty__buttons">
            <Link to="/" className="btn btn--primary">Go home</Link>
            <Link to="/explore" className="btn btn--outline">Explore</Link>
          </div>
        }
      />
    </div>
  );
}
