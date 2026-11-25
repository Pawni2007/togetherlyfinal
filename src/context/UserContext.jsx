import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToastStore } from "../store/toastStore";

const UserContext = createContext(null);

// The demo student. The login is fake: any valid email and a password of 6+ characters works.
export const DEFAULT_PROFILE = {
  id: "me",
  name: "Dev Malhotra",
  username: "dev.malhotra",
  bio: "Third-year CS student. Building small projects and learning in public.",
  course: "B.Tech Computer Science",
  year: "3rd year",
  interests: ["react", "web design", "chess"],
  color: "#2B66D9",
  followers: 48,
};

export function UserProvider({ children }) {
  const [savedProfile, setSavedProfile] = useLocalStorage("profile", DEFAULT_PROFILE);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("loggedIn", false);
  const showToast = useToastStore((state) => state.showToast);

  // Merging with the defaults means old saved data with a missing field still works.
  const profile = { ...DEFAULT_PROFILE, ...savedProfile, id: "me" };

  function updateProfile(changes) {
    setSavedProfile((current) => ({ ...current, ...changes }));
  }

  function login() {
    setIsLoggedIn(true);
    showToast("Welcome back, " + profile.name.split(" ")[0] + "!");
  }

  function logout() {
    setIsLoggedIn(false);
    showToast("You have been logged out.");
  }

  return (
    <UserContext.Provider value={{ profile, updateProfile, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside <UserProvider>");
  return context;
}
