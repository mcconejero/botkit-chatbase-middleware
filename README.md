# botkit-chatbase-middleware

A middleware package for [Botkit](https://botkit.ai/) that easily logs your convos in  [Chatbase](https://chatbase.com/)

Install
```
npm install chatbase-botkit-middleware -- save
```

Usage
It's really simple!

First, in your bot.js file, include this module and initialize it with your Chatbase API key.

```
var chatbase = require('chatbase-botkit-middleware')(API_KEY, PLATFORM).botkit;
```

Second, add the following code, usually right after initializing the Botkit controller.

```
controller.middleware.receive.use(chatbase.receive);
controller.middleware.send.use(chatbase.send);
```

That's it!

# Disclaimer

All mention of Chatbase and its use in this project are copyright of Chatbase and Google at http://chatbase.com and http://google.com, respectively.

I do not work for Chatbase or Google, nor does Chatbase or Google endorse this project in any way. I'm the CTO of Obie.ai who needs analytics on my bot!
