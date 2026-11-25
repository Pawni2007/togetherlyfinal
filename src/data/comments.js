// Sample comments. postId links each comment to a post in posts.js.
// "hoursAgo" becomes a real timestamp, just like the posts.

const HOUR = 60 * 60 * 1000;
const now = Date.now();

const raw = [
  { id: "c1", postId: "p1", authorId: "s5", text: "Same here. Counting the forwarding components is a great trick.", hoursAgo: 1.5 },
  { id: "c2", postId: "p1", authorId: "s10", text: "Did you split user and theme into separate contexts?", hoursAgo: 1 },
  { id: "c3", postId: "p1", authorId: "s1", text: "Yes! Separate providers so a theme change doesn't re-render everything.", hoursAgo: 0.6 },
  { id: "c4", postId: "p2", authorId: "s3", text: "Can confirm. The window seats near the plug points are gold.", hoursAgo: 2.5 },
  { id: "c5", postId: "p2", authorId: "s9", text: "Thank you, I needed this before Monday.", hoursAgo: 2 },
  { id: "c6", postId: "p3", authorId: "s7", text: "Did they mix verbal and quant, or separate timers?", hoursAgo: 4 },
  { id: "c7", postId: "p3", authorId: "s3", text: "Separate sections, each with its own timer.", hoursAgo: 3.5 },
  { id: "c8", postId: "p4", authorId: "s1", text: "Try shooting RAW and using a mild noise reduction. It makes a big difference.", hoursAgo: 5 },
  { id: "c9", postId: "p5", authorId: "s9", text: "90 photos is a good start. Augmentation might help a lot here.", hoursAgo: 7 },
  { id: "c10", postId: "p8", authorId: "s4", text: "I'd love a five-minute slot. Poetry and one acoustic song.", hoursAgo: 12 },
  { id: "c11", postId: "p8", authorId: "s6", text: "I can help with the sound check if you need hands.", hoursAgo: 11 },
  { id: "c12", postId: "p13", authorId: "s10", text: "The file name tip is painfully accurate.", hoursAgo: 30 },
  { id: "c13", postId: "p18", authorId: "s2", text: "Where to find the right canteen at the right time. Seriously.", hoursAgo: 60 },
  { id: "c14", postId: "p18", authorId: "s9", text: "That the library has a 24-hour reading room during exams.", hoursAgo: 58 },
  { id: "c15", postId: "p24", authorId: "s1", text: "Nice! Try nested routes with an Outlet next, it simplifies layouts.", hoursAgo: 90 },
  { id: "c16", postId: "p12", authorId: "s6", text: "Adding a request for more vegetarian protein options.", hoursAgo: 25 },
];

const comments = raw.map(({ hoursAgo, ...comment }) => ({
  ...comment,
  createdAt: now - hoursAgo * HOUR,
}));

export default comments;
