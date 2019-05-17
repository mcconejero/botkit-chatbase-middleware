var request = require("request");

module.exports = (apiKey, platform = "Any") => {
  if (!apiKey) {
    throw new Error('Must supply an apiKey')
  }

  function logMessage(bot, message, type) {
    request(
      {
        url: "https://chatbase.com/api/message",
        method: "POST",
        json: {
          api_key: apiKey,
          type: type,
          user_id: message.user || message.channelData.recipient.id,
          time_stamp: new Date().getTime() / 1000,
          platform: platform,
          message: JSON.stringify(message.text)
        }
      },
      (err, httpRsp, body) => {}
    );
  }

  function send(bot, message, next) {
    if (message && message.type == "message") {
      logMessage(bot, message, "user");
    }
    next();
  }

  function receive(bot, message, next) {
    if (message && message.type == "message") {
      logMessage(bot, message, "agent");
    }
    next();
  }

  return { send, receive }
}
