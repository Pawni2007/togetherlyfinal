import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PenLine, SearchX } from "../components/Icons";
import { JoinButton } from "../components/CommunityCard";
import PostCard from "../components/PostCard";
import EmptyState from "../components/EmptyState";
import Tabs from "../components/Tabs";
import PostsGate from "../components/PostsGate";
import { useSocial } from "../context/SocialContext";
import usePageTitle from "../hooks/usePageTitle";
import { communityIcons } from "../utils/icons";
import { pluralize } from "../utils/format";

export default function CommunityDetail() {
  // The :communityId part of the URL tells us which community to show.
  const { communityId } = useParams();
  const { getCommunity, postsIn, memberCount, likeCount, commentCount } = useSocial();
  const [view, setView] = useState("latest");

  const community = getCommunity(communityId);
  usePageTitle(community ? community.name : "Community not found");

  if (!community) {
    return (
      <div className="page-wide">
        <EmptyState
          icon={SearchX}
          title="We couldn't find that community"
          text="The link may be wrong, or the community may have been removed."
          action={
            <Link to="/communities" className="btn btn--primary">
              Back to communities
            </Link>
          }
        />
      </div>
    );
  }

  const Icon = communityIcons[community.icon];
  const communityPosts = postsIn(community.id);
  const engagement = (post) => likeCount(post) + commentCount(post.id) * 2;
  const shown =
    view === "popular"
      ? [...communityPosts].sort((a, b) => engagement(b) - engagement(a))
      : communityPosts;

  return (
    <div className="page-wide">
      <Link to="/communities" className="back-link">
        <ArrowLeft size={17} /> All communities
      </Link>

      <header className="cd-hero" style={{ "--c": community.color }}>
        <span className="cd-hero__icon" aria-hidden="true">
          <Icon size={38} />
        </span>
        <div className="cd-hero__text">
          <h1 className="cd-hero__name">{community.name}</h1>
          <p className="cd-hero__desc">{community.description}</p>
          <p className="cd-hero__meta">
            <span className="cd-hero__cat">{community.category}</span>
            <span>{pluralize(memberCount(community), "member")}</span>
            <span>{pluralize(communityPosts.length, "post")}</span>
          </p>
        </div>
        <div className="cd-hero__actions">
          <JoinButton community={community} />
        </div>
      </header>

      <div className="detail-grid">
        <section aria-label={`${community.name} posts`}>
          <div className="detail-bar">
            <Tabs
              label="Community posts"
              active={view}
              onChange={setView}
              tabs={[
                { id: "latest", label: "Latest posts" },
                { id: "popular", label: "Popular discussions" },
              ]}
            />
            <Link to={`/create/${community.id}`} className="btn btn--outline btn--sm">
              <PenLine size={16} /> Post here
            </Link>
          </div>

          <PostsGate>
          {shown.length === 0 ? (
            <EmptyState
              icon={PenLine}
              title="No posts here yet"
              text="Start the first conversation in this community."
              action={
                <Link to={`/create/${community.id}`} className="btn btn--primary">
                  Write a post
                </Link>
              }
            />
          ) : (
            <div className="feed">
              {shown.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          </PostsGate>
        </section>

      </div>
    </div>
  );
}
