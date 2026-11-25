import { useState } from "react";
import { Send, Trash2 } from "./Icons";
import Avatar from "./Avatar";
import { useSocial } from "../context/SocialContext";
import { LIMITS } from "../utils/constants";
import { timeAgo } from "../utils/format";

// The expandable comment thread under a post. The thread comes from shared state;
// only the text being typed is local to this component.
export default function CommentSection({ postId }) {
  const { commentsFor, addComment, deleteComment, getAuthor } = useSocial();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const thread = commentsFor(postId);
  const me = getAuthor("me");

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) {
      setError("Write something before posting your comment.");
      return;
    }
    addComment(postId, text);
    setText("");
    setError("");
  }

  function handleKeyDown(event) {
    // Ctrl/Cmd + Enter posts the comment without reaching for the button.
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) handleSubmit(event);
  }

  return (
    <section className="comments" aria-label="Comments">
      {thread.length === 0 ? (
        <p className="comments__empty">No comments yet. Be the first to reply.</p>
      ) : (
        <ul className="comments__list">
          {thread.map((comment) => {
            const author = getAuthor(comment.authorId);
            return (
              <li key={comment.id} className="comment">
                <Avatar person={author} size={32} />
                <div className="comment__bubble">
                  <div className="comment__top">
                    <span className="comment__name">{author.name}</span>
                    <span className="comment__time">{timeAgo(comment.createdAt)}</span>
                    {comment.authorId === "me" && (
                      <button
                        type="button"
                        className="icon-btn icon-btn--sm comment__delete"
                        onClick={() => deleteComment(comment.id)}
                        aria-label="Delete your comment"
                        title="Delete your comment"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                  <p className="comment__text">{comment.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <form className="comment-form" onSubmit={handleSubmit} noValidate>
        <Avatar person={me} size={32} />
        <div className="comment-form__field">
          <label htmlFor={`comment-${postId}`} className="sr-only">
            Write a comment
          </label>
          <textarea
            id={`comment-${postId}`}
            className="textarea textarea--compact"
            rows={2}
            value={text}
            maxLength={LIMITS.comment}
            placeholder="Add a comment"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `comment-error-${postId}` : undefined}
            onChange={(event) => {
              setText(event.target.value);
              if (error) setError("");
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="comment-form__row">
            <span id={`comment-error-${postId}`} className="field__error" role="alert">
              {error}
            </span>
            <span className="field__hint">
              {text.length}/{LIMITS.comment}
            </span>
            <button type="submit" className="btn btn--primary btn--sm">
              <Send size={15} /> Comment
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
