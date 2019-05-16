const request = require('request');

function chatbase(key, platform = 'Any') {

logMessage = (bot, message, type) => {

  // map bot as user if not specified
  if (!message.user) {
    message.user = message.channelData.recipient.id;
  }

  const user = message.user || message.channelData.recipient.id

  request({
    url: 'https://chatbase.com/api/message',
    method: 'POST',
    json: {
      api_key: key,
      type: type,
      user_id: user,
      time_stamp: new Date().getTime() / 10000,
      platform: platform,
      message: JSON.stringify(message.text)
    }
  }, (err, httpRsp, body) => {
    if (err) {
      console.log(err);
    }
  });
}

function receive(bot, message, next) {
  logMessage(bot, message, 'user');
  next();
}

function send(bot, message, next) {
  logMessage(bot, message, 'agent');
  next();
}

return {send, receive}
}

module.exports = chatbase;
