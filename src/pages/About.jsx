import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const problems = [
  ["Campus is split into silos", "Your department, hostel and clubs each have their own group chat. Good ideas stay inside them."],
  ["Questions get buried", "Useful answers vanish in a chat scroll. A post with comments is easy to find and easy to save."],
  ["New students don't know where to start", "Seniors know which reading room is quiet and which interview round is hard. That knowledge should be easy to reach."],
  ["Shy interests stay hidden", "Plenty of people want to talk about photography, chess or startups. They just need to find each other."],
];

const steps = [
  ["Follow people", "Follow students whose posts you enjoy. Their updates collect in your Following feed."],
  ["Join communities", "Pick the groups that match your interests. Each has its own posts, topics and meet-up notes."],
  ["Share something", "Post a question, a project or a tip. Others can like it, save it and reply."],
];

export default function About() {
  usePageTitle("About");

  return (
    <div className="page-wide about">
      <header className="about__hero">
        <h1 className="about__statement">A place on campus where students find each other through what they care about.</h1>
        <p className="lede">
          Togetherly is a student community platform. People share posts, join interest-based communities
          and follow classmates, seniors and juniors they would not otherwise meet.
        </p>
      </header>

      <section className="about__section" aria-labelledby="why">
        <h2 id="why" className="about__heading">Why it exists</h2>
        <dl className="problem-list">
          {problems.map(([title, text]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="about__section" aria-labelledby="how">
        <h2 id="how" className="about__heading">How students connect</h2>
        <ol className="steps">
          {steps.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about__section" aria-labelledby="communities">
        <h2 id="communities" className="about__heading">Why communities matter</h2>
        <p className="about__prose">
          A feed shows you what is popular. A community shows you what is relevant. When a group has its own
          rules, topics and regular meet-ups, strangers become a team: a pair-programming session, a
          photowalk, a mock interview partner. Togetherly is built around that second idea.
        </p>
      </section>

      <section className="about__mission" aria-labelledby="mission">
        <h2 id="mission" className="about__heading">Our mission</h2>
        <p className="about__quote">Make every student feel like they have a group on campus that fits them.</p>
      </section>

      <section className="note" aria-labelledby="demo">
        <h2 id="demo" className="note__title">About this demo</h2>
        <p>
          This version of Togetherly is a front-end project. All students, posts and communities are
          fictional sample data, and everything you do (likes, comments, follows, posts and profile edits)
          is saved only in this browser using localStorage. There is no server, database or real sign-in,
          and nothing you do is visible to other people.
        </p>
        <p>
          Ready to try it? <Link to="/explore">Explore</Link> or <Link to="/create">write a post</Link>.
        </p>
      </section>
    </div>
  );
}
