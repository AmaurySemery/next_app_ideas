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
            <h3>Ideas</h3>
            <div className={styles.container}>
                <div className={styles.idea}>
                    <div className={styles['idea-title']}>Create the new Twitter</div>
                    <div className={styles['idea-description']}>
                        As Twitter is dying, it's the perfect moment to create a new one
                    </div>
                </div>
                <div className={styles.idea}>
                    <div className={styles['idea-title']}>Map Browser Extension</div>
                    <div className={styles['idea-description']}>
                        Create a Browser extension that opens a popup displaying a map of the first address appearing in a web page
                    </div>
                </div>
                <div className={styles.idea}>
                    <div className={styles['idea-title']}>Motorbike Site</div>
                    <div className={styles['idea-description']}>
                        Create a website that helps riders to find their new motorbike
                    </div>
                </div>
                <div className={styles.idea}>
                    <div className={styles['idea-title']}>React and Next.js Blog</div>
                    <div className={styles['idea-description']}>
                        Create a Blog devoted to React and Next
                    </div>
                </div>
            </div>
            {/* Va chercher le json à partir de l'api ideas pour l'afficher sur la page */}
            {JSON.stringify(ideas, null, 2)}
        </main>
    )
}