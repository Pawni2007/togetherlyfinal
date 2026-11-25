import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

// Pages inside this route need a login. Visitors who are not logged in are sent to
// /login, and after logging in they come back to the page they wanted.
export default function ProtectedRoute() {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
