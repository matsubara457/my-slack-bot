import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>My Slack Bot</h1>
        <p>AI-powered Slack bot built with Chat SDK + AI SDK + Next.js</p>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://chat-sdk.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat SDK Docs
          </a>
          <a
            className={styles.secondary}
            href="https://chat-sdk.dev/docs/guides/slack-nextjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Slack Guide
          </a>
        </div>
      </main>
    </div>
  );
}
