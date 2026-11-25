import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchX } from "../components/Icons";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import CommunityCard from "../components/CommunityCard";
import EmptyState from "../components/EmptyState";
import Tabs from "../components/Tabs";
import { useSocial } from "../context/SocialContext";
import usePageTitle from "../hooks/usePageTitle";
import communities from "../data/communities";
import { CATEGORIES } from "../utils/constants";

const SORTS = [
  { id: "members", label: "Most members" },
  { id: "name", label: "A to Z" },
];

export default function Communities() {
  usePageTitle("Communities");
  const { joinedIds, memberCount } = useSocial();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [view, setView] = useState("all");
  const [sort, setSort] = useState("members");

  const text = query.trim().toLowerCase();
  const categories = CATEGORIES.filter((cat) => communities.some((c) => c.category === cat));

  const results = communities
    .filter((c) => view === "all" || joinedIds.includes(c.id))
    .filter((c) => !category || c.category === category)
    .filter((c) => !text || [c.name, c.description, c.category, c.topics.join(" ")].join(" ").toLowerCase().includes(text))
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : memberCount(b) - memberCount(a)));

  const hasFilters = Boolean(text || category);

  return (
    <div className="page-wide">
      <header className="page-head">
        <h1 className="display">Communities</h1>
        <p className="lede">
          Join the groups that fit your interests. You have joined {joinedIds.length} of {communities.length}.
        </p>
      </header>

      <div className="communities-controls">
        <SearchBar label="Search communities" value={query} onChange={setQuery} placeholder="Search by name, topic or description" />
        <Tabs
          label="Show communities"
          active={view}
          onChange={setView}
          tabs={[
            { id: "all", label: "All" },
            { id: "joined", label: "Joined", count: joinedIds.length },
          ]}
        />
        <div className="feed-controls__row">
          <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
          <Tabs tabs={SORTS} active={sort} onChange={setSort} label="Sort communities" variant="segment" />
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={view === "joined" && !hasFilters ? "You have not joined any communities" : "No communities match"}
          text={
            view === "joined" && !hasFilters
              ? "Join one to post there and follow its conversations."
              : "Try a different word or remove the category filter."
          }
          action={
            view === "joined" && !hasFilters ? (
              <button type="button" className="btn btn--primary" onClick={() => setView("all")}>
                Browse all communities
              </button>
            ) : (
              <button type="button" className="btn btn--outline" onClick={() => { setQuery(""); setCategory(""); }}>
                Clear filters
              </button>
            )
          }
        />
      ) : (
        <div className="card-grid card-grid--communities">
          {results.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}

      <p className="page-foot">
        Want something that is not here? <Link to="/create">Post about it</Link> and see who responds.
      </p>
    </div>
  );
}
