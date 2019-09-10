import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config';
import got from 'got';
import { CourierClient } from '@trycourier/courier';
import EnvConfig from '../../env';

const { serverRuntimeConfig: env } = getConfig() as EnvConfig;

interface SlackPendingInstallation {
  code: string;
  state?: string;
}

interface SlackCompletedInstallation {
  "ok": boolean;
  "access_token": string;
  "scope": string;
  "user_id": string;
  "team_name": string;
  "team_id": string;
  "enterprise_id": string | null;
  "incoming_webhook"?: {
    "channel": string;
    "channel_id": string;
    "configuration_url": string;
    "url": string;
  },
  "bot"?: {
    "bot_user_id": string;
    "bot_access_token": string;
  }
};

interface CourierState {
  recipient: string;
}

const sendJson = (res: NextApiResponse, obj: object): void => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(obj, undefined, 2));
}

const sendRedirect = (res: NextApiResponse, path: string, statusCode: number = 302): void => {
  res.setHeader('Location', path);
  res.statusCode = statusCode;
  res.end();
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state }: SlackPendingInstallation = (req.query as unknown) as SlackPendingInstallation;

  const res2 = await got('https://slack.com/api/oauth.access', {
    auth: `${env.SLACK_CLIENT_ID}:${env.SLACK_CLIENT_SECRET}`,
    query: {
      code,
      "redirect_uri": env.SLACK_REDIRECT_URI
    },
    json: true
  })

  const payload: SlackCompletedInstallation = (res2.body as unknown) as SlackCompletedInstallation;

  if (state && state.length && payload && payload.ok) {
    try {
      const courier = CourierClient({ authorizationToken: env.COURIER_AUTH_TOKEN });
      const courierState = JSON.parse(state) as CourierState;
      await courier.mergeProfile({
        recipientId: courierState.recipient,
        profile: {
          slack: payload
        }
      });
    } catch (err) {
      console.error(err);
      if (env.REDIRECT_ERROR && env.REDIRECT_ERROR.length) {
        return sendRedirect(res, env.REDIRECT_ERROR);
      }
    }
  }

  if (payload && payload.ok && env.REDIRECT_SUCCESS && env.REDIRECT_SUCCESS.length) {
    return sendRedirect(res, env.REDIRECT_SUCCESS);
  } else if (env.REDIRECT_ERROR && env.REDIRECT_ERROR.length) {
    return sendRedirect(res, env.REDIRECT_ERROR);
  } else {
    return sendJson(res, {
      query: {
        code,
        state
      },
      payload
    });
  }
};
