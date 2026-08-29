import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const topics = [
  {
    title: 'Get started',
    description:
      'Understand what Bitpongo does and how its automated investment workflow is organized.',
    to: '/docs/introduction',
  },
  {
    title: 'Configure Bark',
    description:
      'Connect secure iOS notifications for trades, strategy events, and operational alerts.',
    to: '/docs/notifications/bark',
  },
  {
    title: 'Open source',
    description:
      'Review the documentation source, report improvements, and contribute on GitHub.',
    to: 'https://github.com/multind/bitpongo-doc',
  },
];

export default function Home(): ReactNode {
  const logo = useBaseUrl('/img/bitpongo-logo.png');

  return (
    <Layout
      title="Documentation"
      description="Official documentation for Bitpongo automated investment strategies and notifications.">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <img className={styles.logo} src={logo} alt="Bitpongo logo" />
            <p className={styles.eyebrow}>BITPONGO DOCUMENTATION</p>
            <Heading as="h1">Automated investing, explained clearly.</Heading>
            <p className={styles.summary}>
              Learn how to configure Bitpongo, connect notification services,
              and operate automated strategies with confidence.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/introduction">
                Read the docs
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="/docs/notifications/bark">
                Configure Bark
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.topics} aria-label="Documentation topics">
          {topics.map((topic) => (
            <Link className={styles.topicCard} to={topic.to} key={topic.title}>
              <Heading as="h2">{topic.title}</Heading>
              <p>{topic.description}</p>
              <span>Explore →</span>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
