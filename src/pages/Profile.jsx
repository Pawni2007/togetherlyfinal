import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Bookmark, Heart, PenLine, Pencil, SearchX, UserPlus } from "../components/Icons";
import Avatar from "../components/Avatar";
import PostCard from "../components/PostCard";
import StudentCard, { FollowButton } from "../components/StudentCard";
import EditProfileModal from "../components/EditProfileModal";
import EmptyState from "../components/EmptyState";
import Tabs from "../components/Tabs";
import PostsGate from "../components/PostsGate";
import { useToastStore } from "../store/toastStore";
import { useSocial } from "../context/SocialContext";
import { useUser } from "../context/UserContext";
import usePageTitle from "../hooks/usePageTitle";
import students from "../data/students";
import { formatNumber } from "../utils/format";

// One page for both /profile (the demo user) and /students/:studentId (anyone else).
export default function Profile() {
  const { studentId } = useParams();
  const { profile, updateProfile } = useUser();
  const { postsBy, likedPosts, savedPosts, followingIds, followerCount } = useSocial();

  const [activeTab, setActiveTab] = useState("posts");
  const [editing, setEditing] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const isMe = !studentId;
  const person = isMe ? profile : students.find((student) => student.id === studentId);
  usePageTitle(person ? person.name : "Profile not found");

  if (studentId === "me") return <Navigate to="/profile" replace />;

  if (!person) {
    return (
      <div className="page-wide">
        <EmptyState
          icon={SearchX}
          title="We couldn't find that student"
          text="The profile link may be wrong."
          action={<Link to="/explore/students" className="btn btn--primary">Browse students</Link>}
        />
      </div>
    );
  }

  const myPosts = postsBy(person.id);
  const followedStudents = students.filter((student) => followingIds.includes(student.id));
  const followers = isMe ? profile.followers : followerCount(person);
  const following = isMe ? followingIds.length : person.following;

  const tabs = isMe
    ? [
        { id: "posts", label: "Posts", count: myPosts.length },
        { id: "liked", label: "Liked", count: likedPosts.length },
        { id: "saved", label: "Saved", count: savedPosts.length },
        { id: "following", label: "Following", count: followedStudents.length },
      ]
    : [{ id: "posts", label: "Posts", count: myPosts.length }];

  // If the remembered tab does not exist on this profile (e.g. "saved" on someone else's), show Posts.
  const tab = tabs.some((t) => t.id === activeTab) ? activeTab : "posts";

  function handleSave(changes) {
    updateProfile(changes);
    showToast("Profile updated");
    setEditing(false);
  }

  function renderPosts(list, empty) {
    if (list.length === 0) return <EmptyState icon={empty.icon} title={empty.title} text={empty.text} action={empty.action} />;
    return (
      <div className="feed">
        {list.map((post) => (
          <PostCard key={post.id} post={post} variant={tab === "saved" ? "saved" : "default"} />
        ))}
      </div>
    );
  }

  return (
    <div className="page-wide">
      <header className="profile-head" style={{ "--c": person.color }}>
        <Avatar person={person} size={104} />
        <div className="profile-head__info">
          <h1 className="display display--sm">{person.name}</h1>
          <p className="profile-head__handle">@{person.username}</p>
          <p className="profile-head__course">{person.course} · {person.year}</p>
          <p className="profile-head__bio">{person.bio || "No bio yet."}</p>
          {person.interests.length > 0 && (
            <ul className="interest-list" aria-label="Interests">
              {person.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          )}
          <dl className="stats">
            <div><dt>Posts</dt><dd>{formatNumber(myPosts.length)}</dd></div>
            <div><dt>Followers</dt><dd>{formatNumber(followers)}</dd></div>
            <div><dt>Following</dt><dd>{formatNumber(following)}</dd></div>
          </dl>
        </div>
        <div className="profile-head__action">
          {isMe ? (
            <button type="button" className="btn btn--outline" onClick={() => setEditing(true)}>
              <Pencil size={16} /> Edit profile
            </button>
          ) : (
            <FollowButton student={person} />
          )}
        </div>
      </header>

      <div className="profile-body">
        <Tabs tabs={tabs} active={tab} onChange={setActiveTab} label="Profile sections" />

        <PostsGate>

        {tab === "posts" &&
          renderPosts(myPosts, {
            icon: PenLine,
            title: "No posts yet",
            text: isMe ? "Your posts will show up here." : `${person.name} hasn't posted yet.`,
            action: isMe && <Link to="/create" className="btn btn--primary">Create your first post</Link>,
          })}

        {tab === "liked" &&
          renderPosts(likedPosts, {
            icon: Heart,
            title: "Nothing liked yet",
            text: "Posts you like will collect here.",
            action: <Link to="/explore" className="btn btn--outline">Explore posts</Link>,
          })}

        {tab === "saved" &&
          renderPosts(savedPosts, {
            icon: Bookmark,
            title: "No saved posts",
            text: "Tap Save on a post to keep it for later.",
            action: <Link to="/explore" className="btn btn--outline">Explore posts</Link>,
          })}

        {tab === "following" &&
          (followedStudents.length === 0 ? (
            <EmptyState
              icon={UserPlus}
              title="You are not following anyone"
              text="Follow students to see their posts in your Following feed."
              action={<Link to="/explore/students" className="btn btn--primary">Find students</Link>}
            />
          ) : (
            <div className="card-grid">
              {followedStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ))}
        </PostsGate>
      </div>

      {editing && <EditProfileModal profile={profile} onSave={handleSave} onClose={() => setEditing(false)} />}
    </div>
  );
}
