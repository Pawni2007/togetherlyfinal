// A reusable text field: label + input + error message. Login and Create Post both use it.
export default function Input({ id, label, error, hint, ...inputProps }) {
  return (
    <div className="field">
      <label htmlFor={id} className="label">{label}</label>
      <input id={id} className="input" aria-invalid={Boolean(error)} aria-describedby={`${id}-msg`} {...inputProps} />
      <p id={`${id}-msg`} className={error ? "field__error" : "field__hint"} role={error ? "alert" : undefined}>
        {error || hint}
      </p>
    </div>
  );
}
