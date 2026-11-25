import { Link } from "react-router-dom";
import { Bookmark } from "../components/Icons";
import PostCard from "../components/PostCard";
import EmptyState from "../components/EmptyState";
import PostsGate from "../components/PostsGate";
import { useSocial } from "../context/SocialContext";
import usePageTitle from "../hooks/usePageTitle";
import { pluralize } from "../utils/format";

export default function SavedPosts() {
  usePageTitle("Saved posts");
  const { savedPosts } = useSocial();

  return (
    <div className="page-narrow">
      <header className="page-head">
        <h1 className="display">Saved posts</h1>
        <p className="lede">
          {savedPosts.length === 0
            ? "Posts you save will be kept here, on this device."
            : `${pluralize(savedPosts.length, "post")} saved, newest first.`}
        </p>
      </header>

      <PostsGate>
      {savedPosts.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          text="Tap Save on any post to find it again here. Tutorials, event details and good advice all belong."
          action={
            <Link to="/explore" className="btn btn--primary">Explore posts</Link>
          }
        />
      ) : (
        <div className="feed">
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} variant="saved" />
          ))}
        </div>
      )}
      </PostsGate>
    </div>
  );
}
