const line = ('@line/bot-sdk');
const express = ('express');
const _ = ('lodash');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echoAry = [
    // echo
    {
      type: 'text',
      text: event.message.text
    },
    {
      type: 'text',
      text: 'いい天気だね'
    },
    {
      type: 'text',
      text: 'https://www.youtube.com/watch?v=8ykUX9yyyyY',
    },
    {
      type: 'image',
      text: 'https://pbs.twimg.com/media/C7bRrJMV4AAhujR.jpg',
    },
    {
      type: 'sticker',
      id: '100',
      packageId: '1',
      stickerId: '7',
    },
  ];
  const echo = _.shuffle(echoAry)[0];

  setTimeout(() => {
    console.log("push!!!!");
    client.pushMessage(event.source.userId, {
      type: 'text',
      text: `おはよう ${event.timestamp} ${event.source.type}`
    });

    client.pushMessage(event.source.roomId, {
      type: 'text',
      text: `おはよう ${event.timestamp} ${event.source.type}`
    });
  }, 2000);

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});