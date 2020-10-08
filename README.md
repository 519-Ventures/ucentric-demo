# Ucentric Demo

A brief live and interactive demo of Ucentric's Features

## Install

Ensure you have Node.JS >= V10.0 installed.

```
npm install
```

Create a .ENV file or export nessecary ENV variables into the current process.

```
cp ./.env.example ./.env
```

And fill out any variables. You may need to log into your Ucentric account to generate credentials.

## Run

To run use the following command:

```
npm run start
```

By default the application will run on port `9000`. To change the port, set the `PORT` env variable. 

## Using The Demo

To start the demo, visit [http://localhost:9000](http://localhost:9000)

Proceed to enter a username (anything you want!) and click "Sign in". You'll be greeted with a loading screen and in a few seconds, welcomed by lots of new messages.

## After The Demo

Make sure you clean things up by disabling any API keys you used in your Ucentric account. You can always create new keys to use in your production implementation.

## Using Webhooks Locally

To use with your live Ucentric account, use a service such as NGrok or Webhook Relay to forward webhooks to your local machine.

In your Ucentric account, click the "Integrations" tab. Then create a webhook with the url pointing to `{{ WEBHOOK URL }}/webhook`

Next click "Reveal" and copy the secret. Paste this secret into your .ENV file or export as an ENV variable in the current process.

Lastly, under the "Subscriptions" tab, select the events you would like to subscribe to.

## Using Webhooks With A Deployment

In your Ucentric account, click the "Integrations" tab. Then create a webhook with the url pointing to `https://{{ HOST_NAME }}/webhook`

Next click "Reveal" and copy the secret. Paste this secret into your .ENV file or export as an ENV variable in the current process.

Lastly, under the "Subscriptions" tab, select the events you would like to subscribe to.

## Deploying

This app is already set up with a `Procfile` to run on Heroku. Simply clone the repo, create a new Heroku app and then push to the heroku remote. Set the required ENV variables and the demo should be good to go.
