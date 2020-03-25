import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import got from "got";
import EnvConfig from "../../env";
import { sendJson, sendRedirect } from "../../lib/res-utils";
import {
  SlackCompletedInstallation,
  SlackPendingInstallation
} from "../../lib/slack-types";
import updateCourier from "../../lib/update-courier";

const { serverRuntimeConfig: env } = getConfig() as EnvConfig;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    code,
    state
  }: SlackPendingInstallation = (req.query as unknown) as SlackPendingInstallation;

  const payload: SlackCompletedInstallation = await got(
    "https://slack.com/api/oauth.access",
    {
      username: env.SLACK_CLIENT_ID,
      password: env.SLACK_CLIENT_SECRET,
      searchParams: {
        code,
        redirect_uri:
          env.SLACK_REDIRECT_URI && env.SLACK_REDIRECT_URI.length
            ? env.SLACK_REDIRECT_URI
            : undefined
      }
    }
  ).json();

  try {
    await updateCourier({
      payload,
      state
    });
  } catch (err) {
    console.error(err);
    if (env.REDIRECT_ERROR && env.REDIRECT_ERROR.length) {
      return sendRedirect(res, env.REDIRECT_ERROR);
    }
  }

  if (
    payload &&
    payload.ok &&
    env.REDIRECT_SUCCESS &&
    env.REDIRECT_SUCCESS.length
  ) {
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
