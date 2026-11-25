// Values shared by several pages. Keeping them in one place means the
// Create Post form, the filters and the post cards always agree.

export const CATEGORIES = [
  "Academics",
  "Technology",
  "Campus Life",
  "Career",
  "Entertainment",
  "Hobbies",
  "General Discussion",
];

// Each category gets its own colour. It is used for the coloured edge on a
// post card and for category chips.
export const CATEGORY_COLORS = {
  Academics: "#3F6BDB",
  Technology: "#0A8F88",
  "Campus Life": "#E0702F",
  Career: "#8B5CD6",
  Entertainment: "#D43E7C",
  Hobbies: "#3F9A55",
  "General Discussion": "#6B7A8C",
};

// Predefined avatar colours the student can pick from when editing a profile.
export const AVATAR_COLORS = [
  "#2B66D9",
  "#B45F06",
  "#D2492E",
  "#4452C8",
  "#8A3FA3",
  "#2F7D3E",
  "#C23B73",
  "#46586E",
];

export const YEARS = ["1st year", "2nd year", "3rd year", "4th year", "Postgraduate"];

export const EMOJIS = ["😊", "🎉", "📚", "💻", "🔥", "🎧", "📸", "🙌"];

export const LIMITS = {
  title: 80,
  content: 500,
  comment: 280,
  bio: 160,
  tags: 4,
  interests: 8,
};
