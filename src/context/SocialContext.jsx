import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUser } from "./UserContext";
import { makeId } from "../utils/format";
import { fetchPosts } from "../api/postsApi";
import { useToastStore } from "../store/toastStore";
import sampleComments from "../data/comments";
import students, { DEFAULT_FOLLOWING } from "../data/students";
import communities, { DEFAULT_JOINED } from "../data/communities";

const SocialContext = createContext(null);

// Adds the id to the list if missing, removes it if present.
const toggleInList = (list, id) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

// All social data lives here: posts, likes, comments, bookmarks, follows and
// community memberships. Components read it through useSocial() instead of
// receiving it through many layers of props.
export function SocialProvider({ children }) {
  const { profile } = useUser();
  const showToast = useToastStore((state) => state.showToast);

  // The sample posts are loaded with fetch(), so they have loading and error states.
  const [samplePosts, setSamplePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setSamplePosts(await fetchPosts());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Only the NEW things the student creates are stored. Sample posts always come
  // from the fetched file, so they never get duplicated or overwritten.
  const [userPosts, setUserPosts] = useLocalStorage("userPosts", []);
  const [comments, setComments] = useLocalStorage("comments", sampleComments);
  const [likedIds, setLikedIds] = useLocalStorage("likedIds", []);
  const [savedIds, setSavedIds] = useLocalStorage("savedIds", []);
  const [followingIds, setFollowingIds] = useLocalStorage("followingIds", DEFAULT_FOLLOWING);
  const [joinedIds, setJoinedIds] = useLocalStorage("joinedIds", DEFAULT_JOINED);

  // One combined, newest-first list that every page reads from.
  const posts = useMemo(
    () => [...userPosts, ...samplePosts].sort((a, b) => b.createdAt - a.createdAt),
    [userPosts, samplePosts]
  );

  // ---------- lookups ----------
  const getAuthor = (authorId) =>
    authorId === "me" ? profile : students.find((student) => student.id === authorId);
  const getCommunity = (communityId) => communities.find((community) => community.id === communityId);

  // ---------- likes ----------
  const isLiked = (postId) => likedIds.includes(postId);
  const likeCount = (post) => post.likes + (isLiked(post.id) ? 1 : 0);
  const toggleLike = (postId) => setLikedIds((current) => toggleInList(current, postId));

  // ---------- bookmarks ----------
  const isSaved = (postId) => savedIds.includes(postId);
  function toggleSave(postId) {
    showToast(isSaved(postId) ? "Removed from saved posts" : "Post saved");
    setSavedIds((current) => toggleInList(current, postId));
  }

  // Most recently saved first. Looking posts up by id means there is never a duplicate copy.
  const idsToPosts = (ids) =>
    [...ids].reverse().map((id) => posts.find((post) => post.id === id)).filter(Boolean);
  const savedPosts = idsToPosts(savedIds);
  const likedPosts = idsToPosts(likedIds);

  // ---------- comments ----------
  const commentsFor = (postId) =>
    comments.filter((comment) => comment.postId === postId).sort((a, b) => a.createdAt - b.createdAt);
  const commentCount = (postId) => comments.filter((comment) => comment.postId === postId).length;

  function addComment(postId, text) {
    const clean = text.trim();
    if (!clean) return false;
    const comment = { id: makeId("c"), postId, authorId: "me", text: clean, createdAt: Date.now() };
    setComments((current) => [...current, comment]);
    return true;
  }

  function deleteComment(commentId) {
    // The demo user can only delete their own comments.
    setComments((current) => current.filter((c) => !(c.id === commentId && c.authorId === "me")));
  }

  // ---------- posts ----------
  function addPost({ title, content, category, tags, communityId }) {
    const post = {
      id: makeId("u"),
      authorId: "me",
      communityId: communityId || null,
      category,
      title: title.trim(),
      content: content.trim(),
      tags,
      likes: 0,
      createdAt: Date.now(),
    };
    setUserPosts((current) => [post, ...current]);
    showToast("Your post is published");
    return post;
  }

  // The "U" in CRUD: change the title and text of one of your own posts.
  function updatePost(postId, { title, content }) {
    setUserPosts((current) =>
      current.map((post) => (post.id === postId ? { ...post, title: title.trim(), content: content.trim() } : post))
    );
    showToast("Post updated");
  }

  function deletePost(postId) {
    // Only posts created in the app can be deleted; sample posts are not in userPosts.
    setUserPosts((current) => current.filter((post) => post.id !== postId));
    setComments((current) => current.filter((comment) => comment.postId !== postId));
    setSavedIds((current) => current.filter((id) => id !== postId));
    setLikedIds((current) => current.filter((id) => id !== postId));
    showToast("Post deleted");
  }

  const postsBy = (authorId) => posts.filter((post) => post.authorId === authorId);
  const postsIn = (communityId) => posts.filter((post) => post.communityId === communityId);

  // ---------- follows ----------
  const isFollowing = (studentId) => followingIds.includes(studentId);
  const followerCount = (student) => student.followers + (isFollowing(student.id) ? 1 : 0);

  function toggleFollow(studentId) {
    if (studentId === "me") return; // you cannot follow yourself
    if (!students.some((student) => student.id === studentId)) return;
    showToast(isFollowing(studentId) ? "Unfollowed" : "You are now following them");
    setFollowingIds((current) => toggleInList(current, studentId));
  }

  // ---------- communities ----------
  const isJoined = (communityId) => joinedIds.includes(communityId);
  const memberCount = (community) => community.members + (isJoined(community.id) ? 1 : 0);

  function toggleJoin(communityId) {
    if (!communities.some((community) => community.id === communityId)) return;
    showToast(isJoined(communityId) ? "You left the community" : "You joined the community");
    setJoinedIds((current) => toggleInList(current, communityId));
  }

  const value = {
    posts, loading, error, loadPosts, postsBy, postsIn,
    getAuthor, getCommunity,
    isLiked, likeCount, toggleLike,
    isSaved, toggleSave, savedPosts, likedPosts,
    commentsFor, commentCount, addComment, deleteComment,
    addPost, updatePost, deletePost,
    followingIds, isFollowing, followerCount, toggleFollow,
    joinedIds, isJoined, memberCount, toggleJoin,
  };

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (!context) throw new Error("useSocial must be used inside <SocialProvider>");
  return context;
}
