import { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import { LIMITS } from "../utils/constants";

// The "Update" part of create / read / update / delete: edit the title and text of your own post.
export default function EditPostModal({ post, onSave, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [submitted, setSubmitted] = useState(false);

  const errors = {};
  if (title.trim().length < 5) errors.title = "The title needs at least 5 characters.";
  if (content.trim().length < 10) errors.content = "Posts need at least 10 characters.";

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    onSave({ title, content });
  }

  return (
    <Modal title="Edit your post" onClose={onClose}>
      <form className="modal__body form" onSubmit={handleSubmit} noValidate>
        <Input id="ep-title" label="Title" value={title} maxLength={LIMITS.title}
          onChange={(event) => setTitle(event.target.value)} error={submitted ? errors.title : ""} />

        <div className="field">
          <label htmlFor="ep-content" className="label">Post</label>
          <textarea id="ep-content" className="textarea" rows={6} value={content} maxLength={LIMITS.content}
            onChange={(event) => setContent(event.target.value)} aria-invalid={Boolean(submitted && errors.content)} />
          <p className="field__error" role="alert">{submitted ? errors.content : ""}</p>
        </div>

        <div className="modal__footer">
          <button type="button" className="btn btn--quiet" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary">Save changes</button>
        </div>
      </form>
    </Modal>
  );
}
