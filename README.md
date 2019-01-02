<p align="center">
  <a href="https://smsto.netlify.com" target="_blank"><img src="static/sms-to-netlify.png" style="border-radius: 5px" /></a>
</p>

# SMS To Netlify

### What's up?

This website displays SMS sent to a [Twilio](https://www.twilio.com) number.

When a SMS is sent to this number, the website is deployed to [Netlify](http://netlify.com).

All this is done thanks to [OneGraph](https://onegraph.com) 🚀

Explore the demo: https://smsto.netlify.com

### Main Concepts

- Set-up a GraphQL Subscription sending an event to a Netlify deploy webhook when a SMS is sent to a given Twilio number
- Fetch SMS from Twilio at build time thanks to a GraphQL Query and Next.js static export
- Use the Intersection Observer API to watch scroll without hammering the main thread!
- Make sure links are accessible and have a visible focus effect (try moving around with TAB / SHIFT + TAB!)
- Prefetch assets (cursors) via invisible images
- Confident development iteration with static typings (Flow)

### Develop

1. Clone this repository
1. Copy/pasta `.env.sample` to `.env`
1. Create an account on [Twilio](https://www.twilio.com), then create a number that can receive SMS: set your number `.env` as `TWILIO_NUMBER`
1. Create an account on [OneGraph](https://www.onegraph.com), then create an app: you'll get a OneGraph App Id that you can set in your `.env` as `ONEGRAPH_APP_ID`
1. For this app, create a OneGraph server-side personal token with access rights to Twilio: set it in your `.env` as `ONEGRAPH_BUILD_API_TOKEN`
1. Install dependencies with `yarn`
1. Hack the project with `yarn dev` 🔨
1. Send a SMS to your number, refresh the page: you see the SMS on your screen! 🌮

### Deployment

> Let's the party begin! 🥳

#### Setting up deployment

1. Fork this repository so you have it under your GitHub repositories
2. Create an account on [Netlify](http://netlify.com)
3. Create a new site from Git using your fresh fork of this repository
4. Configure the build command as `yarn build && yarn export`
5. Configure the publish directory as `.out`
6. Add your environment variables from `.env` in the advanced settings section.

#### Automating deployment

1. Create a Netlify build hook

2. Get your Twilio auth token & account SID from your Twilio account setting

3. Go to OneGraph and create a new subscription with all that:

   ```graphql
   subscription {
     twilio(
     	webhookUrl: <https://netlify-build-webhook>
     	auth: {
     	  twilio: {
           authToken: <TWILIO_AUTH_TOKEN>
           accountSid: <TWILIO_ACCOUNT_SID>
         }
       }
     ) {
       incomingSMS(input: {to: <TWILIO_NUMBER>}) {
         sms {
           to
           body
         }
       }
     }
   }

   ```

You are good to go: send a SMS to your Twilio number, your website is deployed automagically to Netlify and you can see all the SMS you have sent to this number on this new website! 😎

### Aknowledgments

- [Sean Grove](https://twitter.com/sgrove) from [OneGraph](https://onegraph.com) who got me started on this project!
- [Tim Boelaars](timboelaars.nl) who designed the amazing graphics for [Framer Loupe Conference](https://www.timboelaars.nl/framer-loupe-conference)
