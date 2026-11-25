# Togetherly

A student social networking website built with **React, React Router, Context API and localStorage**.
This is the **Evaluation II** version: it keeps every Evaluation I feature and adds shared state,
comments, editable profiles, saved posts, following, community pages and persistent data.

> **Important:** Togetherly is a front-end project. All students, posts, comments and communities are
> **fictional sample data**. Everything you do is stored only in your own browser (localStorage).
> There is **no backend, database, real login or real-time networking**.

## Problem statement

College students are spread across hostels, departments and group chats. Useful advice gets buried,
new students do not know where to look, and people with the same interests rarely find each other.

## Objectives

- Give students one place to share posts and discover content.
- Let them join interest-based communities and follow other students.
- Demonstrate core React concepts: components, props, state, effects, context, routing and forms.

## Features from Evaluation I

| Feature | Where |
| --- | --- |
| Welcome page at `/` | `pages/Landing.jsx`, `components/Navbar.jsx`, `components/HeroArt.jsx`, `styles/landing.css` |
| Posts with categories, tags, likes, bookmarks, comments (browse them on Explore) | `pages/Explore.jsx`, `components/PostCard.jsx` |
| Trending topics and suggested communities / students | `components/RightRail.jsx` |
| Explore page: search, category filters, popular posts, suggestions | `pages/Explore.jsx` |
| Communities page with Join / Joined toggle | `pages/Communities.jsx` |
| Create post form | `pages/CreatePost.jsx` |
| Profile page (avatar, bio, course, interests, counts, tabs) | `pages/Profile.jsx` |
| About page | `pages/About.jsx` |
| Light / dark theme, remembered after refresh | `context/ThemeContext.jsx` |
| Navigation with active state | `components/Navbar.jsx` (one top navbar on every page) |

## New in Evaluation II

1. **Context API** – `ThemeContext`, `UserContext`, `SocialContext`.
2. **Edit profile** – modal with validation, avatar colour picker, saved to localStorage.
3. **Comments** – expandable thread under every post, add / delete your own, counts always match.
4. **Improved create-post form** – controlled inputs, validation, tags, emoji, character counter, live preview, success state.
5. **Saved posts page** – synchronised with bookmarks everywhere.
6. **Follow students** – follow / unfollow, counts update, no duplicates, no self-follow.
7. **Community detail pages** – `/communities/:communityId`, posts, popular discussions, rules, not-found state.
8. **Layouts and navigation** – one shared top navbar and a flat single-page layout on every page (no sidebar), a menu button on phones, and a 404 page.
9. **Persistent state** – theme, profile, new posts, likes, bookmarks, comments, follows, joined communities.
10. **Search and filtering** – Explore searches posts / students / communities; filters, sorting, clear-filters and empty states.

## Technologies

HTML5, CSS3 (plain CSS with custom properties), JavaScript ES6+, React 19, React Router DOM 7,
Vite and Zustand (the only extra library). Icons are small inline SVG components in `components/Icons.jsx`. No Redux, no backend, no CSS framework.

## Run the project

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173). For a production build use `npm run build`.
The page fonts load from Google Fonts; offline, the browser falls back to system fonts.

## Folder structure

```
src/
  main.jsx            entry point, loads the CSS
  App.jsx             providers + routes
  components/         reusable UI (PostCard, CommentSection, Modal, Navbar ...)
  pages/              one file per route
  context/            ThemeContext, UserContext, SocialContext
  data/               sample students, communities, posts, comments (kept out of the UI code)
  hooks/              useLocalStorage, usePageTitle
  utils/              constants, formatting helpers, trending-tag calculation, icon map
  styles/             global.css (tokens + shell), components.css, pages.css, responsive.css
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Welcome page (top navbar, hero, About us, explore cards, sample reviews) |
| `/explore` | Explore (`?q=`, `scope=`, `cat=`, `sort=`, `rel=` are read from the URL) |
| `/communities` | Community discovery |
| `/communities/:communityId` | Community detail (or not-found state) |
| `/create` | Create post (`?community=` pre-selects a joined community) |
| `/profile` | Your profile |
| `/students/:studentId` | Another student's profile |
| `/saved` | Saved posts (linked from the footer and the Profile tabs) |
| `/about` | About |
| `*` | Not-found page |

## Components in short

- **Navbar** – the one top navigation bar (Home, Communities, Explore, Profile, Create Post, theme toggle). It collapses into a menu button on phones.
- **Layout** – the frame for app pages: `Navbar`, the page (`<Outlet />`) and a footer with links to Saved posts and About.
- **PostCard** – one post with like, comment toggle, save, delete (own posts). Reused on Explore, Profile, Saved and community pages.
- **CommentSection** – thread plus controlled comment form.
- **CommunityCard / StudentCard** – full and compact variants; they also export `JoinButton` and `FollowButton`.
- **Modal** – accessible dialog (Escape to close, focus handling, scroll lock) that sits on top of the page with `position: fixed`.
- **TagInput, Tabs, SearchBar, CategoryFilter, EmptyState** – small reusable controls.

## Context API

| Context | Holds |
| --- | --- |
| `ThemeContext` | `theme`, `toggleTheme` |
| `UserContext` | `profile`, `updateProfile` |
| `SocialContext` | posts, likes, saved posts, comments, follows, joined communities, and the functions that change them |

Any component calls `useSocial()` instead of receiving data through many layers of props. Because a post's
like, save and comment state lives in one place, it is identical on every page. Local things such as the
text being typed in a form stay in the component's own `useState`.

## Hooks and routing

- **useState** – form values, open/closed comment sections, modal visibility, selected tabs and filters.
- **useEffect** – saving to localStorage (`useLocalStorage`), applying the theme attribute, page titles, scroll to top on navigation, Escape key and scroll lock inside `Modal`.
- **useContext** – read shared theme, user and social data.
- **React Router** – `BrowserRouter`, `Routes`, nested layout route, `NavLink` (active state), `useParams`, `useNavigate`, `useSearchParams`, `Navigate`.

## Forms and validation

Forms are **controlled components**: each input's `value` comes from state and `onChange` updates it.
`validate(values)` returns an object of messages; errors appear next to the field after it is touched or
after a submit attempt. `onSubmit` calls `event.preventDefault()` so the page does not reload, and nothing
is saved when errors exist. Text is trimmed before saving. Limits: title 80, post 500, comment 280, bio 160 characters.

## localStorage

`useLocalStorage(key, initial, isValid)` works like `useState` but loads and saves JSON under keys that start with
`togetherly:v1:`. If the stored value is missing, broken JSON, or fails `isValid`, the default is used, so the
app never crashes on bad data. Only things the student changes are stored: theme, profile, new posts, likes,
saved ids, comments, followed ids and joined community ids. Sample posts always come from the data files, so they are never duplicated.

Counts are never stored as numbers that can drift. For example, a post shows `post.likes + (liked ? 1 : 0)`,
and a community shows `members + (joined ? 1 : 0)`.

To reset the demo, clear this site's localStorage in the browser dev tools.

## Limitations

- No backend, database, real accounts or multi-user behaviour. Other "students" never react to what you do.
- Data lives in one browser; clearing site data removes it.
- Sample times such as "2h ago" are calculated relative to when the page loads.
- Likes of sample posts and follower counts are demo numbers, not real activity.
- You can delete your own posts and comments, but not edit them.

## Future scope (not implemented)

Real authentication and backend, image uploads, editing posts, notifications, direct messages,
reporting and moderation tools, and a post detail page.


## Syllabus additions (v3)

| Syllabus topic | Where it is used |
| --- | --- |
| fetch API, Promises, async/await, loading / error / retry | `api/postsApi.js`, `context/SocialContext.jsx`, `components/PostsGate.jsx` |
| Pagination ("Load more") and debounce | `pages/Explore.jsx`, `hooks/useDebounce.js` |
| CRUD (create, read, update, delete posts) | `pages/CreatePost.jsx`, `components/EditPostModal.jsx`, `components/PostCard.jsx` |
| Zustand (global store) + toast notifications | `store/toastStore.js`, `components/ToastContainer.jsx` |
| Protected routes, nested routes, route params | `App.jsx`, `components/ProtectedRoute.jsx`, `pages/Login.jsx` |
| useState forms, useCallback | `pages/CreatePost.jsx`, `context/SocialContext.jsx`, `components/Dropdown.jsx` |
| Reusable input + custom dropdown | `components/Input.jsx`, `components/Dropdown.jsx` |

Run `npm install` once after unzipping, because Zustand was added.
"# togetherlyfinal" 
