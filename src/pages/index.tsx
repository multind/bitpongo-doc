import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): ReactNode {
  const logo = useBaseUrl('/img/bitpongo-logo.png');
  const topics = [
    {
      title: <Translate id="homepage.topic.getStarted.title">Get started</Translate>,
      description: (
        <Translate id="homepage.topic.getStarted.description">
          Understand what Bitpongo does and how its automated investment workflow is organized.
        </Translate>
      ),
      to: '/docs/introduction',
    },
    {
      title: <Translate id="homepage.topic.bark.title">Configure Bark</Translate>,
      description: (
        <Translate id="homepage.topic.bark.description">
          Connect secure iOS notifications for trades, strategy events, and operational alerts.
        </Translate>
      ),
      to: '/docs/notifications/bark',
    },
    {
      title: <Translate id="homepage.topic.openSource.title">Open source</Translate>,
      description: (
        <Translate id="homepage.topic.openSource.description">
          Explore the Bitpongo frontend source and contribute on GitHub.
        </Translate>
      ),
      to: 'https://github.com/multind/bitpongo',
    },
  ];

  return (
    <Layout
      title={translate({id: 'homepage.meta.title', message: 'Documentation'})}
      description={translate({
        id: 'homepage.meta.description',
        message:
          'Official documentation for Bitpongo automated investment strategies and notifications.',
      })}>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <img
              className={styles.logo}
              src={logo}
              alt={translate({id: 'homepage.logo.alt', message: 'Bitpongo logo'})}
            />
            <p className={styles.eyebrow}>
              <Translate id="homepage.eyebrow">BITPONGO DOCUMENTATION</Translate>
            </p>
            <Heading as="h1">
              <Translate id="homepage.hero.title">
                Automated investing, explained clearly.
              </Translate>
            </Heading>
            <p className={styles.summary}>
              <Translate id="homepage.hero.description">
                Learn how to configure Bitpongo, connect notification services, and operate
                automated strategies with confidence.
              </Translate>
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/introduction">
                <Translate id="homepage.action.docs">Read the docs</Translate>
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="/docs/notifications/bark">
                <Translate id="homepage.action.bark">Configure Bark</Translate>
              </Link>
            </div>
          </div>
        </section>
        <section
          className={styles.topics}
          aria-label={translate({
            id: 'homepage.topics.ariaLabel',
            message: 'Documentation topics',
          })}>
          {topics.map((topic) => (
            <Link className={styles.topicCard} to={topic.to} key={topic.to}>
              <Heading as="h2">{topic.title}</Heading>
              <p>{topic.description}</p>
              <span>
                <Translate id="homepage.topic.explore">Explore →</Translate>
              </span>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
