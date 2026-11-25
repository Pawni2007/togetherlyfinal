import { Link } from "react-router-dom";
import { Check, UserPlus } from "./Icons";
import Avatar from "./Avatar";
import { useSocial } from "../context/SocialContext";
import { formatNumber, profilePath } from "../utils/format";

// Follow / unfollow button. The self-follow guard also lives in the context,
// so even if this button were rendered for the demo user it would do nothing.
export function FollowButton({ student, size }) {
  const { isFollowing, toggleFollow } = useSocial();
  const following = isFollowing(student.id);

  return (
    <button
      type="button"
      className={`btn ${following ? "btn--joined" : "btn--outline"} ${size === "sm" ? "btn--sm" : ""}`}
      aria-pressed={following}
      aria-label={following ? `Unfollow ${student.name}` : `Follow ${student.name}`}
      onClick={() => toggleFollow(student.id)}
    >
      {following ? (
        <>
          <span className="swap swap--idle"><Check size={16} /> Following</span>
          <span className="swap swap--hover">Unfollow</span>
        </>
      ) : (
        <>
          <UserPlus size={16} /> Follow
        </>
      )}
    </button>
  );
}

// variant="compact" is the small row used in suggestion lists.
export default function StudentCard({ student, variant = "full" }) {
  const { followerCount } = useSocial();

  if (variant === "compact") {
    return (
      <div className="mini-row">
        <Link to={profilePath(student.id)} aria-label={`View ${student.name}'s profile`}>
          <Avatar person={student} size={38} />
        </Link>
        <div className="mini-row__text">
          <Link to={profilePath(student.id)} className="mini-row__title">
            {student.name}
          </Link>
          <span className="mini-row__sub">{student.course}</span>
        </div>
        <FollowButton student={student} size="sm" />
      </div>
    );
  }

  return (
    <article className="student-card">
      <Link to={profilePath(student.id)} className="student-card__head">
        <Avatar person={student} size={52} />
        <span>
          <span className="student-card__name">{student.name}</span>
          <span className="student-card__handle">@{student.username}</span>
        </span>
      </Link>
      <p className="student-card__course">
        {student.course}, {student.year}
      </p>
      <p className="student-card__bio">{student.bio}</p>
      <ul className="interest-list">
        {student.interests.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
      <footer className="student-card__foot">
        <span>{formatNumber(followerCount(student))} followers</span>
        <FollowButton student={student} size="sm" />
      </footer>
    </article>
  );
}
