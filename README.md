# Courier: Slack Registration Handler

This service lets your users connect your Courier account to their Slack account so that you may send them notifications directly to Slack.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Usage

Point users at `<DOMAIN>/api/register?recipient=<RECIPIENT_ID>` to begin the registration process; at the conclusion the provided recipient ID will be reachable via Slack using Courier.

## Running Locally

* Run `yarn install && yarn dev`
* Set up `ngrok` (https://ngrok.com)
* Ensure your `ngrok`-generated URL is whitelisted in your Slack app
* See `env.ts` for a list of environment variables that should be set

## Scopes

* `bot,im:write` (DEFAULT) to Direct Message the user from your App
* `incoming-webhook` to send messages via Webhook to the selected channel

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Courier](https://github.com/trycourier) ([support@trycourier.com](mailto:support@trycourier.com))
