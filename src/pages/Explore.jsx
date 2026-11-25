import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SearchX } from "../components/Icons";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import PostCard from "../components/PostCard";
import StudentCard from "../components/StudentCard";
import CommunityCard from "../components/CommunityCard";
import EmptyState from "../components/EmptyState";
import Tabs from "../components/Tabs";
import PostsGate from "../components/PostsGate";
import useDebounce from "../hooks/useDebounce";
import { useSocial } from "../context/SocialContext";
import usePageTitle from "../hooks/usePageTitle";
import students from "../data/students";
import communities from "../data/communities";
import { CATEGORIES } from "../utils/constants";
import { getTrendingTags } from "../utils/trending";

const SCOPES = [
  { id: "posts", label: "Posts" },
  { id: "students", label: "Students" },
  { id: "communities", label: "Communities" },
];
const POST_SORTS = [
  { id: "popular", label: "Popular" },
  { id: "latest", label: "Newest" },
];
const NOUNS = { posts: ["post", "posts"], students: ["student", "students"], communities: ["community", "communities"] };
const PAGE_SIZE = 6; // posts shown at first and each time "Load more" is pressed
const RELATIONS = [
  { id: "all", label: "Everyone" },
  { id: "following", label: "Following" },
  { id: "not-following", label: "Not following" },
];

// True when every word the student typed appears somewhere in the text.
const matchesText = (text, query) => query.split(/\s+/).every((word) => text.toLowerCase().includes(word));

export default function Explore() {
  usePageTitle("Explore");
  const { posts, getAuthor, getCommunity, likeCount, commentCount, isFollowing, memberCount } = useSocial();

  // The scope (posts / students / communities) is a route param: /explore/students.
  // The search text and filters are ordinary state.
  const { scope: scopeParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const scope = SCOPES.some((s) => s.id === scopeParam) ? scopeParam : "posts";

  const [rawQuery, setRawQuery] = useState(location.state?.q ?? "");
  const [category, setCategory] = useState("");
  const [postSort, setPostSort] = useState("popular");
  const [relation, setRelation] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Clicking a #tag on a post sends the tag here through the link's state.
  useEffect(() => {
    if (location.state?.q) {
      setRawQuery(location.state.q);
      setVisible(PAGE_SIZE);
    }
  }, [location.state]);

  // The results use the debounced text, so they update 0.4s after typing stops.
  const debouncedQuery = useDebounce(rawQuery, 400);

  function changeSearch(value) {
    setRawQuery(value);
    setVisible(PAGE_SIZE);
  }
  function changeCategory(value) {
    setCategory(value);
    setVisible(PAGE_SIZE);
  }
  function changeSort(value) {
    setPostSort(value);
    setVisible(PAGE_SIZE);
  }
  function changeScope(id) {
    setCategory("");
    setRelation("all");
    setVisible(PAGE_SIZE);
    navigate(id === "posts" ? "/explore" : `/explore/${id}`);
  }
  function clearFilters() {
    setRawQuery("");
    setCategory("");
    setRelation("all");
    setVisible(PAGE_SIZE);
  }

  const query = debouncedQuery.trim().toLowerCase();
  const isTagSearch = query.startsWith("#");
  const textQuery = isTagSearch ? query.slice(1) : query;
  const hasFilters = Boolean(query || category || relation !== "all");

  // ---------- filter the real data for the selected scope ----------
  const postResults = posts
    .filter((post) => !category || post.category === category)
    .filter((post) => {
      if (!query) return true;
      if (isTagSearch) return post.tags.includes(textQuery);
      const author = getAuthor(post.authorId);
      const community = post.communityId ? getCommunity(post.communityId) : null;
      const haystack = [post.title, post.content, post.category, post.tags.join(" "), author.name, author.username, community?.name ?? ""].join(" ");
      return matchesText(haystack, textQuery);
    })
    .sort((a, b) =>
      postSort === "latest"
        ? b.createdAt - a.createdAt
        : likeCount(b) + commentCount(b.id) * 2 - (likeCount(a) + commentCount(a.id) * 2)
    );

  const studentResults = students
    .filter((s) => relation === "all" || (relation === "following") === isFollowing(s.id))
    .filter((s) => !query || matchesText([s.name, s.username, s.course, s.bio, s.interests.join(" ")].join(" "), textQuery));

  const communityResults = communities
    .filter((c) => !category || c.category === category)
    .filter((c) => !query || matchesText([c.name, c.description, c.category, c.topics.join(" ")].join(" "), textQuery))
    .sort((a, b) => memberCount(b) - memberCount(a));

  const counts = { posts: postResults.length, students: studentResults.length, communities: communityResults.length };
  const trending = getTrendingTags(posts, 8);

  // Category chips make sense for posts and communities only.
  const communityCategories = CATEGORIES.filter((cat) => communities.some((c) => c.category === cat));

  const placeholders = {
    posts: "Search posts, tags or #hashtags",
    students: "Search students by name, course or interest",
    communities: "Search communities by name or topic",
  };

  // The results bar plus the list. Only the Posts tab has to wait for the fetched posts.
  const resultsView = (
    <>
        <div className="results-bar" aria-live="polite">
          <p>
            {counts[scope]} {counts[scope] === 1 ? NOUNS[scope][0] : NOUNS[scope][1]}
            {scope === "posts" && !hasFilters && " · most popular first"}
            {query && <> matching <strong>{rawQuery.trim()}</strong></>}
          </p>
          {hasFilters && (
            <button type="button" className="btn btn--quiet btn--sm" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        {counts[scope] === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No results found"
            text="Check the spelling, try a shorter search, or remove a filter."
            action={
              <button type="button" className="btn btn--outline" onClick={clearFilters}>
                Clear all filters
              </button>
            }
          />
        ) : scope === "posts" ? (
          <>
            <div className="feed">
              {postResults.slice(0, visible).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {visible < postResults.length && (
              <div className="load-more">
                <button type="button" className="btn btn--outline" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                  Load more posts ({postResults.length - visible} left)
                </button>
              </div>
            )}
          </>
        ) : scope === "students" ? (
          <div className="card-grid">
            {studentResults.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
        ) : (
          <div className="card-grid">
            {communityResults.map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        )}

    </>
  );

  return (
    <div className="page-wide">
      <div className="page-main">
        <header className="page-head">
          <h1 className="display">Explore</h1>
          <p className="lede">Find posts, people and communities that match what you care about.</p>
        </header>

        <SearchBar
          large
          label="Search Togetherly"
          value={rawQuery}
          onChange={changeSearch}
          placeholder={placeholders[scope]}
        />

        <div className="explore-controls">
          <Tabs
            label="What to search"
            active={scope}
            onChange={changeScope}
            tabs={SCOPES.map((s) => ({ ...s, count: counts[s.id] }))}
          />

          {scope === "posts" && (
            <div className="trend-chips" aria-label="Trending topics">
              <span className="trend-chips__label">Trending</span>
              {trending.map(({ tag }) => (
                <button
                  key={tag}
                  type="button"
                  className="filter-chip"
                  aria-pressed={query === `#${tag}`}
                  onClick={() => changeSearch(query === `#${tag}` ? "" : `#${tag}`)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <div className="feed-controls__row">
            {scope !== "students" ? (
              <CategoryFilter
                categories={scope === "posts" ? CATEGORIES : communityCategories}
                selected={category}
                onSelect={changeCategory}
              />
            ) : (
              <Tabs tabs={RELATIONS} active={relation} onChange={(id) => setRelation(id)} label="Filter students" variant="segment" />
            )}
            {scope === "posts" && (
              <Tabs tabs={POST_SORTS} active={postSort} onChange={changeSort} label="Sort posts" variant="segment" />
            )}
          </div>
        </div>

        {scope === "posts" ? <PostsGate>{resultsView}</PostsGate> : resultsView}

        {scope === "posts" && counts.posts > 0 && (
          <p className="page-foot">
            Looking for a group instead? <Link to="/communities">Browse communities</Link>.
          </p>
        )}
      </div>

    </div>
  );
}
