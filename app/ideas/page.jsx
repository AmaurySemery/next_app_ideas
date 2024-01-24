import styles from './ideas.module.css';

async function fetchIdeas() {
    const res = await fetch(`http://localhost:3000/api/ideas`);
    const ideas = await res.json();
    return ideas;
}

export default async function Ideas() {
    const ideas = await fetchIdeas();
    // console.log( ideas );
    return (
        <main className="main">
            <div className={styles.container}>
            {ideas.length && ideas.map((idea) => (
                <div className={styles.idea} key={idea.id}>
                    <div className={styles['idea-title']}>{idea.title}</div>
                    <div className={styles['idea-description']}>{idea.description}</div>
                </div>
            ))}
            </div>
        </main>
    )
}