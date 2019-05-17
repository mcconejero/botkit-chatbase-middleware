'use strict';

var request = require('request');

class ChatbaseBotkit {

  constructor(apiKey, platform) {

    if (!platform){
      platform = 'Unspecified platform'
    }

    let that = this;

    that.platform = platform;
    that.apiKey = apiKey;

    that.logMessage = (bot, message, type) => {

      // map bot as user if not specified
      if (!message.user) {
        message.user = message.channelData.recipient.id;
      }

      const user = message.user || message.channelData.recipient.id

      request({
        url: 'https://chatbase.com/api/message',
        method: 'POST',
        json: {
          api_key: that.apiKey,
          type: type,
          user_id: user,
          time_stamp: new Date().getTime() / 1000,
          platform: that.platform,
          message: JSON.stringify(message.text)
        }
      }, (err, httpRsp, body) => {
      });
    }

    that.send = (bot, message, next) => {
			if (message && message.type == 'message') {
				that.logMessage(bot, message, 'user');
			}
			next();
		};

		// botkit middleware endpoints
		that.receive = (bot, message, next) => {
			if (message && message.type == 'message') {
				that.logMessage(bot, message, 'agent');
			}
			next();
		};
  }
}

module.exports = (apiKey, platform) => {
  if (!apiKey) {
    throw new Error('YOU MUST SUPPLY AN API KEY TO CHATBASE-BOTKIT!');
  }

  return {
    botkit: new ChatbaseBotkit(apiKey, platform)
  };
};

