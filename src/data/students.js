// Fictional demo students. None of these people are real.
// "followers" is the count BEFORE the demo user follows them; the app adds 1
// when the demo user follows, so counts never drift after repeated clicks.

const students = [
  { id: "s1", name: "Ananya Rao", username: "ananya.codes", bio: "Frontend nerd. I turn coffee into reusable components.", course: "B.Tech Computer Science", year: "2nd year", interests: ["react", "css", "open source"], color: "#4452C8", followers: 214, following: 96 },
  { id: "s2", name: "Kabir Malik", username: "kabirmalik", bio: "Hostel committee volunteer. Knows which canteen has the shortest queue.", course: "BBA", year: "3rd year", interests: ["campus events", "debating", "cricket"], color: "#D2492E", followers: 178, following: 120 },
  { id: "s3", name: "Meher Gill", username: "meher.gill", bio: "Placement prep mentor for juniors. Mock interviews are my love language.", course: "B.Tech Information Technology", year: "4th year", interests: ["interviews", "aptitude", "public speaking"], color: "#2F7D3E", followers: 342, following: 88 },
  { id: "s4", name: "Tanvi Joshi", username: "tanvi.frames", bio: "Photography, sketchbooks and early morning light.", course: "B.Des Communication Design", year: "2nd year", interests: ["photography", "sketching", "film"], color: "#C23B73", followers: 256, following: 140 },
  { id: "s5", name: "Ishaan Pillai", username: "ishaanp", bio: "Learning machine learning the slow way, with small datasets.", course: "B.Tech Artificial Intelligence", year: "3rd year", interests: ["python", "ml", "chess"], color: "#0A7C77", followers: 163, following: 75 },
  { id: "s6", name: "Zoya Khan", username: "zoyakhan", bio: "Esports club captain. Strategy games, playlists and group chats.", course: "BCA", year: "2nd year", interests: ["gaming", "music", "streaming"], color: "#8A3FA3", followers: 129, following: 154 },
  { id: "s7", name: "Arnav Bose", username: "arnavbuilds", bio: "Trying to build something hostel students actually want to use.", course: "BBA Entrepreneurship", year: "3rd year", interests: ["startups", "product", "design"], color: "#B45F06", followers: 201, following: 110 },
  { id: "s8", name: "Sara Thomas", username: "sara.sings", bio: "Acoustic sets, open mics and one very out-of-tune ukulele.", course: "BA English Literature", year: "1st year", interests: ["music", "poetry", "theatre"], color: "#46586E", followers: 98, following: 133 },
  { id: "s9", name: "Vikram Nair", username: "vikram.reads", bio: "Two books a month, one reading group, zero free shelves.", course: "M.Sc Data Science", year: "Postgraduate", interests: ["books", "statistics", "ai"], color: "#2F7D3E", followers: 147, following: 61 },
  { id: "s10", name: "Leena D'Souza", username: "leena.notes", bio: "I rewrite notes until they make sense. Happy to share them.", course: "B.Tech Electronics", year: "2nd year", interests: ["notes", "electronics", "internships"], color: "#4452C8", followers: 187, following: 102 },
];

export default students;

// Students the demo user follows when they first open the app.
export const DEFAULT_FOLLOWING = ["s1", "s4", "s7"];
