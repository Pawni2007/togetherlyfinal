import { Link } from "react-router-dom";
import { ArrowRight, Compass, PenLine, Sparkles, UserPlus, Users } from "../components/Icons";
import Navbar from "../components/Navbar";
import HeroArt from "../components/HeroArt";
import Avatar from "../components/Avatar";
import usePageTitle from "../hooks/usePageTitle";
import students from "../data/students";
import communities from "../data/communities";
import { useSocial } from "../context/SocialContext";
import { getTrendingTags } from "../utils/trending";
import { pluralize } from "../utils/format";

// Sample reviews. They are written for this demo and use the fictional students.
const reviews = [
  { studentId: "s3", text: "Mock interview partners and resume tips used to live in five different chats. Now I can point juniors to one community." },
  { studentId: "s5", text: "I posted my first classifier results, failures included, and got useful suggestions within a day. It felt friendly, not competitive." },
  { studentId: "s8", text: "I found people for our open mic through the Music and Art community. A lot of campus friendships start with a shared interest, and this made that easier." },
];

export default function Landing() {
  usePageTitle("");
  const { posts } = useSocial();

  // These numbers come from the sample data itself, so they are always accurate for the demo.
  const topTag = getTrendingTags(posts, 1)[0];
  const explore = [
    { to: "/communities", icon: Users, title: "Communities", text: "Join groups for coding, photography, placements, music and more.", meta: `${communities.length} communities to join` },
    { to: "/explore", icon: Compass, title: "Explore", text: "Search posts, students and communities, or follow what is trending.", meta: topTag ? `#${topTag.tag} is trending` : "Find something new" },
    { to: "/explore/students", icon: UserPlus, title: "Find students", text: "Follow classmates and seniors who share your interests.", meta: `${pluralize(students.length, "student")} to follow` },
    { to: "/create", icon: PenLine, title: "Create a post", text: "Ask a question, share a win or tell people what you are building.", meta: "Takes under a minute" },
  ];

  return (
    <div className="lp">
      <Navbar />

      <main id="main">
        <section className="lp-hero" aria-labelledby="hero-title">
          <div className="lp-hero__text">
            <p className="lp-badge">
              <Sparkles size={15} aria-hidden="true" /> A community made for students
            </p>
            <h1 id="hero-title" className="lp-hero__title">Welcome to Togetherly</h1>
            <p className="lp-hero__tagline">Your campus, connected.</p>
            <p className="lp-hero__lede">
              Share what you are learning, join communities that fit your interests and meet people
              who care about the same things you do.
            </p>
            <div className="lp-hero__actions">
              <Link to="/explore" className="btn btn--primary lp-btn">
                Get started <ArrowRight size={18} />
              </Link>
              <Link to="/communities" className="btn btn--outline lp-btn">
                Browse communities
              </Link>
            </div>
          </div>
          <div className="lp-hero__art">
            <HeroArt />
          </div>
        </section>

        <section className="lp-section lp-about" aria-labelledby="about-title">
          <h2 id="about-title" className="lp-h2">About us</h2>
          <div className="lp-about__body">
            <p>
              Togetherly is a student-run space for everything that happens between lectures: questions,
              projects, events and the people behind them. We built it because good advice and good
              friendships shouldn't depend on which group chat you happen to be in.
            </p>
            <ul className="lp-about__list">
              <li><strong>Share</strong> posts about studies, careers and campus life.</li>
              <li><strong>Belong</strong> to communities with their own topics and meet-ups.</li>
              <li><strong>Connect</strong> with students across courses and years.</li>
            </ul>
          </div>
          <Link to="/about" className="lp-link">
            Read our story <ArrowRight size={16} />
          </Link>
        </section>

        <section className="lp-section" aria-labelledby="explore-title">
          <h2 id="explore-title" className="lp-h2">Start exploring</h2>
          <p className="lp-sub">Pick a place to begin. Everything is a click away.</p>
          <ul className="lp-explore">
            {explore.map(({ to, icon: Icon, title, text, meta }) => (
              <li key={title}>
                <Link to={to} className="lp-card">
                  <span className="lp-card__icon" aria-hidden="true"><Icon size={22} /></span>
                  <span className="lp-card__title">{title}</span>
                  <span className="lp-card__text">{text}</span>
                  <span className="lp-card__meta">{meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="lp-section" aria-labelledby="reviews-title">
          <h2 id="reviews-title" className="lp-h2">What students say</h2>
          <p className="lp-sub">Sample feedback from the fictional students in this demo.</p>
          <ul className="lp-reviews">
            {reviews.map(({ studentId, text }) => {
              const student = students.find((s) => s.id === studentId);
              return (
                <li key={studentId}>
                  <figure className="lp-review">
                    <blockquote>{text}</blockquote>
                    <figcaption>
                      <Avatar person={student} size={40} />
                      <span>
                        <strong>{student.name}</strong>
                        <span>{student.course}, {student.year}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <footer className="lp-footer">
        <p>Togetherly is a front-end demo. All people and posts are fictional and stay in your browser.</p>
      </footer>
    </div>
  );
}
