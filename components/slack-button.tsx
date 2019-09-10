import React from 'react'

const SlackButton: React.FC<{
  url: string;
}> = ({ url }) => {
  return (
    <>
      <a href={url}><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
      <style jsx>{`
        a {
          display: inline-block;
        }
      `}</style>
    </>
  );
}

export default SlackButton
