export interface SlackPendingInstallation {
  code: string;
  state?: string;
}

export interface SlackCompletedInstallation {
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