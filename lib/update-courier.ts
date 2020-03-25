import getConfig from "next/config";
import { CourierClient } from "@trycourier/courier";
import EnvConfig from "../env";
import { SlackCompletedInstallation } from "./slack-types";
import parseCourierState from "./parse-courier-state";

const { serverRuntimeConfig: env } = getConfig() as EnvConfig;

const updateCourier = async function({
  payload,
  state
}: {
  payload: SlackCompletedInstallation;
  state?: string;
}) {
  if (!state || !state.length || !payload || !payload.ok) {
    return;
  }

  const courierClient = CourierClient();
  const courierState = parseCourierState(state);

  await courierClient.mergeProfile({
    recipientId: courierState.recipient,
    profile: {
      slack: payload
    }
  });
};

export default updateCourier;
