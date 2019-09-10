import qs from 'qs';

interface SlackInstallUrlOptions {
  slackClientId: string;
  scopes: string;
  redirectUri?: string;
  state?: string;
  team?: string;
};

const ignoreEmptyString = (s: string): string | undefined => {
  return s && s.length ? s : undefined;
}

const createSlackInstallUrl = ({ slackClientId, scopes, redirectUri, state, team }: SlackInstallUrlOptions) => {
  const querystring = qs.stringify({
    "client_id": slackClientId,
    "scope": scopes,
    "redirect_uri": ignoreEmptyString(redirectUri),
    "state": ignoreEmptyString(state),
    "team": ignoreEmptyString(team)
  });
  return `https://slack.com/oauth/authorize?${querystring}`;
}

export default createSlackInstallUrl;
