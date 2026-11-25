# Togetherly – Viva Questions and Answers

All answers describe the code in this project.

**What is Togetherly?**
A student social networking website. Students can post, comment, like, save posts, follow other students and join communities. It is a front-end project using sample data.

**What problem does it solve?**
Students' conversations are scattered across group chats. Togetherly puts posts, communities and people in one searchable place, so advice is easier to find and students with shared interests can connect.

**Why was React used?**
The UI is made of repeated pieces (posts, cards, forms). React lets us build each piece once as a component and re-render it automatically when state changes. Example: one `PostCard` is used on five pages.

**What is JSX?**
A syntax that lets us write HTML-like markup inside JavaScript. Vite compiles it into normal JavaScript. We use `{}` to insert values, e.g. `{post.title}`.

**What is a component?**
A JavaScript function that returns JSX. Examples: `Avatar`, `PostCard`, `Modal`. Components are reusable and can contain other components.

**What are props?**
Inputs passed from a parent to a child, like function arguments. `<PostCard post={post} variant="saved" />` gives the card its data and display mode. Props are read-only.

**What is useState?**
A hook that gives a component a value plus a setter. When the setter is called, React re-renders. We use it for form values, whether comments are open, the selected tab, modal visibility and so on. We update objects and arrays immutably, e.g. `setValues(current => ({ ...current, [name]: value }))`.

**What is useEffect?**
A hook for side effects that happen after rendering. We use it to save state to localStorage (`useLocalStorage`), set `data-theme` on the page, update the document title, scroll to top when the route changes, and listen for Escape in `Modal` (with cleanup when it closes). We avoid it for things that can be calculated during render, such as filtered lists.

**What is Context API?**
A way to share data with many components without passing props down level by level. A provider holds the data; components read it with `useContext`.

**Why did we use Context API?**
Likes, saves, comments, follows and memberships are needed by many unrelated components (PostCard, Profile, Saved page, Explore). Context keeps that data in one place, so every page shows the same state. We have three contexts: `ThemeContext`, `UserContext`, `SocialContext`. Form text stays in local state because only that form needs it.

**What is prop drilling?**
Passing props through components that do not use them just to reach a deeper component. Without context, the liked/saved/comment functions would have to pass through every page and list.

**What is React Router?**
A library for navigation without full page reloads. `Routes` and `Route` map URLs to pages, `NavLink` shows the active link, `useParams` reads `:communityId`, `useNavigate` moves to another page in code, and `useSearchParams` reads and writes `?q=react` on Explore.

**What are controlled components?**
Form inputs whose value is stored in React state (`value={values.title}` and `onChange={handleChange}`). React is the single source of truth, which makes validation, counters and the live preview easy.

**How is form validation implemented?**
Each form has a `validate(values)` function that returns an object of error messages. Errors show beside a field after the user leaves it (`touched`) or tries to submit. In `handleSubmit` we call `event.preventDefault()`, mark all fields touched and stop if errors exist. Values are trimmed. Create Post needs a title (5+ chars), content (10 to 500 chars) and a category. Edit Profile needs a name, a valid unique username and a course.

**How does localStorage work?**
It stores strings in the browser under keys, and persists after refresh. We save JSON with `JSON.stringify` and read with `JSON.parse` inside `try/catch`. `useLocalStorage` wraps this. If data is missing, broken or the wrong shape, the default is used.

**How does the like feature work?**
`SocialContext` keeps `likedIds`, a list of post ids the user liked. `toggleLike(id)` adds or removes the id. The displayed count is `post.likes + (liked ? 1 : 0)`, so repeated clicking can never drift. The list is saved to localStorage.

**How are comments connected to posts?**
Each comment has a `postId`. `commentsFor(postId)` filters the shared comments array, and the comment count is the length of that result, so the number always matches what is shown. `addComment` trims text, rejects empty text and adds a comment with a unique id and `authorId: "me"`. Only comments with `authorId: "me"` can be deleted.

**How does the bookmark feature work?**
`savedIds` stores post ids. `toggleSave(id)` adds or removes the id. The Saved page looks up each id in the combined posts list, so there are never duplicate copies. Explore, Profile and Saved all read the same list, so they stay in sync.

**How is the profile edited?**
"Edit profile" opens `EditProfileModal`, prefilled from `UserContext`. Changes are held in the modal's local state. On Save, the form is validated and `updateProfile` updates context, which re-renders the sidebar, posts, comments and profile and saves to localStorage. Cancel closes the modal without saving. The avatar is the person's initials on a colour chosen from a predefined list.

**How does the follow feature work?**
`followingIds` lists followed student ids. `toggleFollow(id)` adds or removes an id (never twice, and it ignores `"me"`, so you cannot follow yourself). A student's follower count is `student.followers + (following ? 1 : 0)`; "Following" on your profile is `followingIds.length`.

**What happens when a community is joined?**
`toggleJoin(id)` updates `joinedIds`. The button changes to "Joined", the member count shows `members + 1`, the community appears in the Joined tab and the "My communities" feed, and you can post to it from Create Post. The Communities page and the detail page read the same state, so they agree.

**How do community detail pages work?**
The route `/communities/:communityId` gives us an id with `useParams`. We find the community in the data and show its posts (`postsIn(id)`). If no community matches, the page shows a not-found message with a link back.

**How do Explore search and filters work?**
Search text, scope (posts, students, communities), category and sort are stored in the URL. On each render we filter the real arrays: text matches names, content, tags and so on, `#tag` searches tags, and category and sort are applied. If nothing matches, an empty state appears with a clear-filters button.

**How is the theme implemented?**
`ThemeContext` stores `"light"` or `"dark"` (saved in localStorage) and sets `data-theme` on `<html>`. CSS variables in `global.css` change under `[data-theme="dark"]`. A small script in `index.html` applies the saved theme before React loads to avoid a flash.

**How is the site responsive?**
CSS media queries in `responsive.css`: every page is a single column; at 820px and below spacing tightens, headers stack, and dialogs become bottom sheets. The `Navbar` turns into a menu button below 860px (rule in `landing.css`).

**Why is there no backend?**
This is a front-end evaluation. We simulate the app using React state, Context and localStorage. Nothing is sent to a server.

**What are the limitations of the project?**
Data exists only in one browser, there is no real login, no real other users, sample data is fictional, and posts or comments cannot be edited (only deleted).

**What new features were added in Evaluation II?**
Context API, edit profile, comments, improved create-post form, saved posts page, follow/unfollow, community detail pages, better layouts and navigation, persistence with localStorage, and improved search and filtering.

**How is the welcome page organised?**
`Landing.jsx` is the page at `/`. It uses the same `Navbar` component as every other page. Its sections are the hero, About us, "Start exploring" cards and sample reviews. The explore cards and reviews are built by looping over small arrays with `.map()`. The phone menu uses one `useState` value (`open`) to show or hide the links. The numbers on the cards (for example "10 communities to join") are calculated from the sample data files, so they are always accurate for the demo. Posts are browsed on `/explore`.
