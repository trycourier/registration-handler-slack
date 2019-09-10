import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config';
import EnvConfig from '../../env';
import { sendRedirect } from '../../lib/res-utils';
import createSlackInstallUrl from "../../lib/slack-install-url";

const { serverRuntimeConfig: env } = getConfig() as EnvConfig;

interface RedirectQuery {
  recipient: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const q = (req.query as unknown) as RedirectQuery;

  const url = createSlackInstallUrl({
    slackClientId: env.SLACK_CLIENT_ID,
    scopes: env.SLACK_SCOPES,
    redirectUri: env.SLACK_REDIRECT_URI,
    state: JSON.stringify(q)
  });

  sendRedirect(res, url);
}