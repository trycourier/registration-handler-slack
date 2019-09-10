import React, { useState } from 'react'
import Head from 'next/head'
import getConfig from 'next/config';
import SlackButton from '../components/slack-button';
import createSlackInstallUrl from "../lib/slack-install-url";
import EnvConfig from '../env';

const { publicRuntimeConfig: env } = getConfig() as EnvConfig;

const Index: React.FC = () => {
  const [recipientId, setRecipientId] = useState<string>('');

  const slackInstallUrl = createSlackInstallUrl({
    slackClientId: env.SLACK_CLIENT_ID,
    scopes: env.SLACK_SCOPES,
    redirectUri: env.SLACK_REDIRECT_URI && env.SLACK_REDIRECT_URI.length ? env.SLACK_REDIRECT_URI : undefined,
    state: recipientId && recipientId.length ? JSON.stringify({
      recipient: recipientId
    }) : undefined
  });

  const onChange = (ev: React.SyntheticEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    setRecipientId(ev.currentTarget.value);
  }

  return (
    <>
      <Head>
        <title>Slack → Courier</title>
      </Head>

      <main>
        <form method="get" action={slackInstallUrl}>
          <input type="text" value={recipientId} onChange={onChange} placeholder="Courier Recipient ID" />
          <SlackButton url={slackInstallUrl} />
        </form>
      </main>

      <style jsx>{`
        main {
          position: fixed;
          width: 100%;
          height: 100%;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        form {
          background-color: #efefef;
          border-radius: .25rem;
          width: 24rem;
          text-align: center;
          padding: 2rem;
        }

        input {
          display: block;
          width: 100%;
          height: 3rem;
          padding: 0 .5rem;
          margin: 0;
          margin-bottom: .5rem;
          font-size: 1.5rem;
          font-family: monospace;
        }
      `}</style>
    </>
  );
};

export default Index
