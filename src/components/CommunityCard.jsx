import { Link } from "react-router-dom";
import { Check, Plus } from "./Icons";
import { useSocial } from "../context/SocialContext";
import { communityIcons } from "../utils/icons";
import { formatNumber } from "../utils/format";

// Join / leave button. Used on community cards, the sidebar suggestions and the detail page.
export function JoinButton({ community, size }) {
  const { isJoined, toggleJoin } = useSocial();
  const joined = isJoined(community.id);

  return (
    <button
      type="button"
      className={`btn ${joined ? "btn--joined" : "btn--primary"} ${size === "sm" ? "btn--sm" : ""}`}
      aria-pressed={joined}
      aria-label={joined ? `Leave ${community.name}` : `Join ${community.name}`}
      onClick={() => toggleJoin(community.id)}
    >
      {joined ? (
        <>
          <span className="swap swap--idle"><Check size={16} /> Joined</span>
          <span className="swap swap--hover">Leave</span>
        </>
      ) : (
        <>
          <Plus size={16} /> Join
        </>
      )}
    </button>
  );
}

// variant="compact" is the small row used in the right-hand suggestions.
export default function CommunityCard({ community, variant = "full" }) {
  const { memberCount } = useSocial();
  const Icon = communityIcons[community.icon];
  const members = `${formatNumber(memberCount(community))} members`;

  if (variant === "compact") {
    return (
      <div className="mini-row" style={{ "--c": community.color }}>
        <span className="community-icon community-icon--sm" aria-hidden="true">
          <Icon size={18} />
        </span>
        <div className="mini-row__text">
          <Link to={`/communities/${community.id}`} className="mini-row__title">
            {community.name}
          </Link>
          <span className="mini-row__sub">{members}</span>
        </div>
        <JoinButton community={community} size="sm" />
      </div>
    );
  }

  return (
    <article className="community-card" style={{ "--c": community.color }}>
      <div className="community-card__top">
        <span className="community-icon" aria-hidden="true">
          <Icon size={26} />
        </span>
        <span className="cat-chip">{community.category}</span>
      </div>
      <h3 className="community-card__name">
        <Link to={`/communities/${community.id}`} className="stretched-link">
          {community.name}
        </Link>
      </h3>
      <p className="community-card__desc">{community.description}</p>
      <footer className="community-card__foot">
        <span className="community-card__members">{members}</span>
        <JoinButton community={community} size="sm" />
      </footer>
    </article>
  );
}
