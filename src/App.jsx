import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { SocialProvider } from "./context/SocialContext";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Explore from "./pages/Explore";
import Communities from "./pages/Communities";
import CommunityDetail from "./pages/CommunityDetail";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import SavedPosts from "./pages/SavedPosts";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastContainer from "./components/ToastContainer";

// Provider order matters: SocialProvider reads the profile from UserProvider,
// so UserProvider has to wrap it.
export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <SocialProvider>
          <BrowserRouter>
            <Routes>
              {/* The welcome page has its own navbar, so it sits outside the app Layout. */}
              <Route index element={<Landing />} />
              <Route element={<Layout />}>
                {/* :scope? is optional, so /explore and /explore/students both work. */}
                <Route path="explore/:scope?" element={<Explore />} />
                {/* Nested routes: /communities and /communities/:communityId share one parent. */}
                <Route path="communities">
                  <Route index element={<Communities />} />
                  <Route path=":communityId" element={<CommunityDetail />} />
                </Route>
                <Route path="students/:studentId" element={<Profile />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                {/* Protected routes: these pages need a login. */}
                <Route element={<ProtectedRoute />}>
                  <Route path="create/:communityId?" element={<CreatePost />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="saved" element={<SavedPosts />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </SocialProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
