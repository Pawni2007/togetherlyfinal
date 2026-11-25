import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "../components/Icons";
import TagInput from "../components/TagInput";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { useSocial } from "../context/SocialContext";
import usePageTitle from "../hooks/usePageTitle";
import communities from "../data/communities";
import { CATEGORIES, EMOJIS, LIMITS } from "../utils/constants";

const EMPTY_FORM = { title: "", content: "", category: "", communityId: "", tags: [] };

// Returns an object of error messages. An empty object means the form is valid.
function validate(values) {
  const errors = {};
  const title = values.title.trim();
  const content = values.content.trim();

  if (!title) errors.title = "Give your post a title.";
  else if (title.length < 5) errors.title = "The title needs at least 5 characters.";

  if (!content) errors.content = "Write something before you publish.";
  else if (content.length < 10) errors.content = "Say a little more. Posts need at least 10 characters.";
  else if (content.length > LIMITS.content) errors.content = `Keep it under ${LIMITS.content} characters.`;

  if (!values.category) errors.category = "Choose a category so people can find your post.";
  return errors;
}

export default function CreatePost() {
  usePageTitle("Create post");
  const navigate = useNavigate();
  const { communityId } = useParams(); // /create/coding-club starts with that community selected
  const { addPost, isJoined, getCommunity } = useSocial();

  // If we arrived from a community page, start with it selected.
  const presetCommunity = getCommunity(communityId);
  const startingValues = presetCommunity && isJoined(presetCommunity.id)
    ? { ...EMPTY_FORM, communityId: presetCommunity.id, category: presetCommunity.category }
    : EMPTY_FORM;

  // Controlled form: every input's value comes from "values" and every change goes through setValues.
  const [values, setValues] = useState(startingValues);
  const [touched, setTouched] = useState({});
  const [published, setPublished] = useState(false);

  const errors = validate(values);
  const showError = (field) => touched[field] && errors[field];
  const selectedCommunity = getCommunity(values.communityId);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  // Picking a community also suggests its category, but only if no category is chosen yet.
  function handleCommunityChange(communityValue) {
    const community = getCommunity(communityValue);
    const category = values.category || (community ? community.category : "");
    setValues({ ...values, communityId: communityValue, category });
  }

  function handleBlur(event) {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
  }

  function addEmoji(emoji) {
    if (values.content.length + emoji.length > LIMITS.content) return;
    setValues({ ...values, content: values.content + emoji });
  }

  function handleReset() {
    setValues(EMPTY_FORM);
    setTouched({});
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    setTouched({ title: true, content: true, category: true });
    if (Object.keys(errors).length > 0) return; // do not publish an invalid post
    addPost(values);
    setPublished(true);
  }

  if (published) {
    return (
      <div className="page-narrow">
        <section className="success" role="status">
          <CheckCircle2 size={44} className="success__icon" aria-hidden="true" />
          <h1 className="display display--sm">Published</h1>
          <p className="lede">
            Your post is now live
            {selectedCommunity ? ` and in ${selectedCommunity.name}` : ""}, and on your profile.
          </p>
          <div className="success__actions">
            <button type="button" className="btn btn--primary" onClick={() => navigate("/explore")}>View in Explore</button>
            <button type="button" className="btn btn--outline" onClick={() => navigate("/profile")}>Go to profile</button>
            <button type="button" className="btn btn--quiet" onClick={() => { handleReset(); setPublished(false); }}>
              Write another
            </button>
          </div>
        </section>
      </div>
    );
  }

  const contentLength = values.content.length;
  const counterClass = contentLength >= LIMITS.content ? "field__hint field__hint--over" : contentLength >= LIMITS.content - 50 ? "field__hint field__hint--warn" : "field__hint";

  return (
    <div className="page-narrow">
      <header className="page-head">
        <h1 className="display">Create a post</h1>
        <p className="lede">Share a question, a win or something you learned. Your post is saved in this browser.</p>
      </header>

      <div className="create-grid">
        <form className="panel form" onSubmit={handleSubmit} noValidate>
          <Input id="cp-title" name="title" label="Title" value={values.title} maxLength={LIMITS.title}
            placeholder="A short headline for your post" onChange={handleChange} onBlur={handleBlur}
            error={showError("title")} hint={`${values.title.length}/${LIMITS.title}`} />

          <div className="field">
            <label htmlFor="cp-content" className="label">What do you want to say?</label>
            <textarea id="cp-content" name="content" className="textarea" rows={7} value={values.content}
              maxLength={LIMITS.content} placeholder="Ask a question, share a tip, or tell people what you are working on."
              onChange={handleChange} onBlur={handleBlur}
              aria-invalid={Boolean(showError("content"))} aria-describedby="cp-content-error" />
            <div className="emoji-row" role="group" aria-label="Add an emoji">
              {EMOJIS.map((emoji) => (
                <button key={emoji} type="button" className="emoji-btn" onClick={() => addEmoji(emoji)} aria-label={`Add ${emoji}`}>
                  {emoji}
                </button>
              ))}
            </div>
            <div className="field__meta">
              <p id="cp-content-error" className="field__error" role="alert">{showError("content")}</p>
              <span className={counterClass}>{contentLength}/{LIMITS.content}</span>
            </div>
          </div>

          <div className="field-pair">
            <div className="field">
              <label htmlFor="cp-category" className="label">Category</label>
              <select id="cp-category" name="category" className="select" value={values.category}
                onChange={handleChange} onBlur={handleBlur}
                aria-invalid={Boolean(showError("category"))} aria-describedby="cp-category-error">
                <option value="">Choose a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <p id="cp-category-error" className="field__error" role="alert">{showError("category")}</p>
            </div>

            <div className="field">
              <label htmlFor="cp-community" className="label">Post to</label>
              <Dropdown
                id="cp-community"
                value={values.communityId}
                onChange={handleCommunityChange}
                options={[
                  { value: "", label: "My profile" },
                  ...communities.map((c) => ({
                    value: c.id,
                    label: c.name + (isJoined(c.id) ? "" : " (join first)"),
                    disabled: !isJoined(c.id),
                  })),
                ]}
              />
              <p className="field__hint">You can post to communities you have joined.</p>
            </div>
          </div>

          <div className="field">
            <label htmlFor="cp-tags" className="label">Tags <span className="label__opt">optional</span></label>
            <TagInput
              id="cp-tags"
              value={values.tags}
              onChange={(tags) => setValues({ ...values, tags })}
              max={LIMITS.tags}
              prefix="#"
              placeholder="Type a tag and press Enter"
              normalize={(text) => text.trim().replace(/^#/, "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20)}
            />
            <p className="field__hint">Up to {LIMITS.tags} tags. Letters and numbers only.</p>
          </div>

          <div className="form__actions">
            <button type="submit" className="btn btn--primary">Publish post</button>
            <button type="button" className="btn btn--quiet" onClick={handleReset}>Reset form</button>
            <Link to="/explore" className="btn btn--quiet">Cancel</Link>
          </div>
        </form>

      </div>
    </div>
  );
}
