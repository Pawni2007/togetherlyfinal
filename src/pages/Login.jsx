import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useUser } from "../context/UserContext";
import usePageTitle from "../hooks/usePageTitle";

// Returns an object of error messages. An empty object means the form is valid.
function validate({ email, password }) {
  const errors = {};
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = "Enter a valid email address.";
  if (password.length < 6) errors.password = "The password needs at least 6 characters.";
  return errors;
}

export default function Login() {
  usePageTitle("Log in");
  const { isLoggedIn, login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});

  // Where to go after logging in: the page the visitor originally wanted.
  const goBackTo = location.state?.from || "/profile";
  if (isLoggedIn) return <Navigate to={goBackTo} replace />;

  const errors = validate(values);
  const showError = (field) => (touched[field] ? errors[field] : "");

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleBlur(event) {
    setTouched({ ...touched, [event.target.name]: true });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length > 0) return;
    login();
    navigate(goBackTo, { replace: true });
  }

  return (
    <div className="page-narrow">
      <header className="page-head">
        <h1 className="display">Log in</h1>
        <p className="lede">
          {location.state?.from ? "Please log in to open that page. " : ""}
          This is a demo login. Any valid email and a password of 6+ characters will work.
        </p>
      </header>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <Input id="login-email" name="email" type="email" label="Email" value={values.email}
          placeholder="you@college.edu" onChange={handleChange} onBlur={handleBlur} error={showError("email")} />
        <Input id="login-password" name="password" type="password" label="Password" value={values.password}
          placeholder="At least 6 characters" onChange={handleChange} onBlur={handleBlur} error={showError("password")} />
        <div className="form__actions">
          <button type="submit" className="btn btn--primary">Log in</button>
        </div>
      </form>
    </div>
  );
}
