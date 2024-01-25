import Idea from "../components/Idea";
import styles from "./ideas.module.css";

async function fetchIdeas() {
  const res = await fetch(`http://localhost:3000/api/ideas`);
  const ideas = await res.json();

  if (process.env.APP_ENV === "dev") {
    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  return ideas;
}

export default async function Ideas() {
  const ideas = await fetchIdeas();
  // console.log( ideas );
  return (
    <main className="main">
      <div className={styles.container}>
        {ideas.length && ideas.map((idea) => <Idea data={idea} />)}
      </div>
    </main>
  );
}
