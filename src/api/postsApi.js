// Loads the sample posts with the fetch API. The posts live in public/data/posts.json,
// so this works like calling a small REST endpoint.

const HOUR = 60 * 60 * 1000;

// A Promise that waits a little. It makes the loading message visible, like a slow network.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getPosts() {
  await wait(600);
  const response = await fetch("/data/posts.json");
  if (!response.ok) {
    throw new Error(`The server answered with status ${response.status}.`);
  }
  const list = await response.json();
  const now = Date.now();
  // "hoursAgo" in the file becomes a real timestamp, so posts show "5h ago".
  return list.map((post) => ({ ...post, createdAt: now - post.hoursAgo * HOUR }));
}

// Tries up to "attempts" times before giving up (retry handling).
export async function fetchPosts(attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await getPosts();
    } catch (error) {
      lastError = error;
      await wait(400);
    }
  }
  throw new Error(lastError?.message || "Could not load posts.");
}
