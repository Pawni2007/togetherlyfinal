import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkMinus, Heart, MessageCircle, Pencil, Trash2 } from "./Icons";
import Avatar from "./Avatar";
import CommentSection from "./CommentSection";
import EditPostModal from "./EditPostModal";
import { useSocial } from "../context/SocialContext";
import { CATEGORY_COLORS } from "../utils/constants";
import { formatNumber, profilePath, timeAgo } from "../utils/format";

// One post. All likes, bookmarks and comments go through the shared SocialContext,
// so the same post looks identical on Explore, Profile, Saved and community pages.
// variant="saved" changes the bookmark button into an explicit "Remove" button.
export default function PostCard({ post, variant = "default" }) {
  const {
    getAuthor, getCommunity, isLiked, likeCount, toggleLike,
    isSaved, toggleSave, commentCount, deletePost, updatePost,
  } = useSocial();

  const [showComments, setShowComments] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editing, setEditing] = useState(false);

  const author = getAuthor(post.authorId);
  const community = post.communityId ? getCommunity(post.communityId) : null;
  const liked = isLiked(post.id);
  const saved = isSaved(post.id);
  const comments = commentCount(post.id);
  const isMine = post.authorId === "me";

  return (
    <article className="post" style={{ "--c": CATEGORY_COLORS[post.category] }} aria-labelledby={`title-${post.id}`}>
      <header className="post__head">
        <Link to={profilePath(post.authorId)} className="post__author" aria-label={`View ${author.name}'s profile`}>
          <Avatar person={author} size={42} />
        </Link>
        <div className="post__who">
          <Link to={profilePath(post.authorId)} className="post__name">
            {author.name}
          </Link>
          <span className="post__meta">
            @{author.username} <span aria-hidden="true">·</span> {timeAgo(post.createdAt)}
          </span>
        </div>

        {isMine &&
          (confirmingDelete ? (
            <div className="post__confirm" role="alert">
              <span>Delete this post?</span>
              <button type="button" className="btn btn--danger btn--sm" onClick={() => deletePost(post.id)}>
                Delete
              </button>
              <button type="button" className="btn btn--quiet btn--sm" onClick={() => setConfirmingDelete(false)}>
                Keep
              </button>
            </div>
          ) : (
            <>
            <button
              type="button"
              className="icon-btn icon-btn--sm"
              onClick={() => setEditing(true)}
              aria-label="Edit your post"
              title="Edit your post"
            >
              <Pencil size={17} />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--sm"
              onClick={() => setConfirmingDelete(true)}
              aria-label="Delete your post"
              title="Delete your post"
            >
              <Trash2 size={17} />
            </button>
            </>
          ))}
      </header>

      <div className="post__labels">
        <span className="cat-chip">{post.category}</span>
        {community && (
          <Link to={`/communities/${community.id}`} className="post__community">
            in {community.name}
          </Link>
        )}
      </div>

      {post.title && (
        <h3 id={`title-${post.id}`} className="post__title">
          {post.title}
        </h3>
      )}
      <p className="post__body">{post.content}</p>

      {post.tags.length > 0 && (
        <ul className="post__tags">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link to="/explore" state={{ q: "#" + tag }}>#{tag}</Link>
            </li>
          ))}
        </ul>
      )}

      <footer className="post__actions">
        <button
          type="button"
          className="action action--like"
          aria-pressed={liked}
          onClick={() => toggleLike(post.id)}
          aria-label={liked ? "Unlike this post" : "Like this post"}
        >
          <Heart size={19} fill={liked ? "currentColor" : "none"} />
          <span>{formatNumber(likeCount(post))}</span>
        </button>

        <button
          type="button"
          className="action"
          aria-expanded={showComments}
          onClick={() => setShowComments((open) => !open)}
          aria-label={`${showComments ? "Hide" : "Show"} comments, ${comments} so far`}
        >
          <MessageCircle size={19} />
          <span>{formatNumber(comments)}</span>
        </button>

        <button
          type="button"
          className="action action--save"
          aria-pressed={saved}
          onClick={() => toggleSave(post.id)}
          aria-label={saved ? "Remove from saved posts" : "Save this post"}
        >
          {variant === "saved" ? <BookmarkMinus size={19} /> : <Bookmark size={19} fill={saved ? "currentColor" : "none"} />}
          <span>{variant === "saved" ? "Remove" : saved ? "Saved" : "Save"}</span>
        </button>
      </footer>

      {showComments && <CommentSection postId={post.id} />}

      {editing && (
        <EditPostModal
          post={post}
          onClose={() => setEditing(false)}
          onSave={(changes) => {
            updatePost(post.id, changes);
            setEditing(false);
          }}
        />
      )}
    </article>
  );
}
