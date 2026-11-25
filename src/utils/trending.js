// Counts how many posts use each tag and returns the busiest ones.
// Ties are broken by total likes so the list is stable and meaningful.
export function getTrendingTags(posts, limit = 6) {
  const tally = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tally[tag] = tally[tag] || { tag, posts: 0, likes: 0 };
      tally[tag].posts += 1;
      tally[tag].likes += post.likes;
    });
  });
  return Object.values(tally)
    .sort((a, b) => b.posts - a.posts || b.likes - a.likes)
    .slice(0, limit);
}
