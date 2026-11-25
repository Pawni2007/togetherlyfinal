import { useState } from "react";
import { Check } from "./Icons";
import Modal from "./Modal";
import Avatar from "./Avatar";
import TagInput from "./TagInput";
import students from "../data/students";
import { AVATAR_COLORS, LIMITS, YEARS } from "../utils/constants";

const USERNAME_PATTERN = /^[a-z0-9._]{3,20}$/;

// Checks every field and returns an object of error messages (empty object = valid).
function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const username = values.username.trim().toLowerCase();

  if (!name) errors.name = "Enter your display name.";
  else if (name.length < 2) errors.name = "Your name needs at least 2 characters.";

  if (!username) errors.username = "Choose a username.";
  else if (!USERNAME_PATTERN.test(username))
    errors.username = "Use 3 to 20 letters, numbers, dots or underscores.";
  else if (students.some((student) => student.username === username))
    errors.username = "That username belongs to another student in the demo.";

  if (!values.course.trim()) errors.course = "Enter your course or branch.";
  if (values.bio.length > LIMITS.bio) errors.bio = `Keep your bio under ${LIMITS.bio} characters.`;

  return errors;
}

// The form starts with the current profile. Changes are kept in local state and
// only sent to the shared UserContext when the student presses "Save changes".
export default function EditProfileModal({ profile, onSave, onClose }) {
  const [values, setValues] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
    course: profile.course,
    year: profile.year,
    interests: profile.interests,
    color: profile.color,
  });
  const [errors, setErrors] = useState({});

  // One handler for every text input: the input's name tells us which value to change.
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSave({
      name: values.name.trim(),
      username: values.username.trim().toLowerCase(),
      bio: values.bio.trim(),
      course: values.course.trim(),
      year: values.year,
      interests: values.interests,
      color: values.color,
    });
  }

  const preview = { name: values.name.trim() || "Your name", color: values.color };

  return (
    <Modal title="Edit profile" onClose={onClose}>
      <form className="modal__body form" onSubmit={handleSubmit} noValidate>
        <div className="edit-avatar">
          <Avatar person={preview} size={64} />
          <fieldset className="edit-avatar__picker">
            <legend className="label">Avatar colour</legend>
            <div className="swatches">
              {AVATAR_COLORS.map((color) => (
                <label key={color} className={values.color === color ? "swatch is-selected" : "swatch"} style={{ background: color }}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={values.color === color}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Check size={16} className="swatch__check" aria-hidden="true" />
                  <span className="sr-only">{color}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="field">
          <label htmlFor="ep-name" className="label">Display name</label>
          <input id="ep-name" name="name" className="input" value={values.name} onChange={handleChange}
            aria-invalid={Boolean(errors.name)} aria-describedby="ep-name-error" maxLength={40} />
          <p id="ep-name-error" className="field__error" role="alert">{errors.name}</p>
        </div>

        <div className="field">
          <label htmlFor="ep-username" className="label">Username</label>
          <div className="input-prefix">
            <span aria-hidden="true">@</span>
            <input id="ep-username" name="username" className="input" value={values.username} onChange={handleChange}
              aria-invalid={Boolean(errors.username)} aria-describedby="ep-username-error" autoCapitalize="none" />
          </div>
          <p id="ep-username-error" className="field__error" role="alert">{errors.username}</p>
        </div>

        <div className="field-pair">
          <div className="field">
            <label htmlFor="ep-course" className="label">Course or branch</label>
            <input id="ep-course" name="course" className="input" value={values.course} onChange={handleChange}
              aria-invalid={Boolean(errors.course)} aria-describedby="ep-course-error" />
            <p id="ep-course-error" className="field__error" role="alert">{errors.course}</p>
          </div>
          <div className="field">
            <label htmlFor="ep-year" className="label">Year of study</label>
            <select id="ep-year" name="year" className="select" value={values.year} onChange={handleChange}>
              {YEARS.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="ep-bio" className="label">Bio</label>
          <textarea id="ep-bio" name="bio" className="textarea" rows={3} value={values.bio} onChange={handleChange}
            aria-invalid={Boolean(errors.bio)} aria-describedby="ep-bio-error" />
          <div className="field__meta">
            <p id="ep-bio-error" className="field__error" role="alert">{errors.bio}</p>
            <span className={values.bio.length > LIMITS.bio ? "field__hint field__hint--over" : "field__hint"}>
              {values.bio.length}/{LIMITS.bio}
            </span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="ep-interests" className="label">Interests</label>
          <TagInput
            id="ep-interests"
            value={values.interests}
            onChange={(interests) => setValues((current) => ({ ...current, interests }))}
            max={LIMITS.interests}
            placeholder="Type an interest and press Enter"
            normalize={(text) => text.trim().toLowerCase().slice(0, 24)}
          />
          <p className="field__hint">Up to {LIMITS.interests} interests.</p>
        </div>

        <div className="modal__footer">
          <button type="button" className="btn btn--quiet" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary">Save changes</button>
        </div>
      </form>
    </Modal>
  );
}
