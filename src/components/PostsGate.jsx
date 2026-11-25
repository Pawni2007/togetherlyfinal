import { WifiOff } from "./Icons";
import EmptyState from "./EmptyState";
import { useSocial } from "../context/SocialContext";

// Wrap anything that needs the posts. It shows a loading message while the posts
// are being fetched, an error with a retry button if that failed, and otherwise the page content.
export default function PostsGate({ children }) {
  const { loading, error, loadPosts } = useSocial();

  if (loading) {
    return (
      <p className="loading" role="status">
        <span className="loading__spinner" aria-hidden="true" /> Loading posts...
      </p>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={WifiOff}
        title="Could not load posts"
        text={error}
        action={<button type="button" className="btn btn--primary" onClick={loadPosts}>Try again</button>}
      />
    );
  }

  return children;
}
