require('dotenv').config()
const express = require('express');
const exphbs  = require('express-handlebars');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const sendNudges = require('./lib/nudge');

// TODO
// add text to readme

const PORT = process.env.PORT || 9000;
const WEBHOOK_SECRET = process.env.UCENTRIC_WEBHOOK_SECRET;
const SECRET = process.env.UCENTRIC_SECRET_KEY;
const ACCOUNT_ID = process.env.UCENTRIC_ACCOUNT_ID;
const KEY = process.env.UCENTRIC_PUB_KEY;
const API_HOST = process.env.UCENTRIC_API_HOST || "api.ucentric.io";

// support self-signed certs in local development
if (API_HOST.indexOf('dev') > -1 ) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

// Demo specific config for content
const DEMO_CONFIG = {
  youtubeId: process.env.YOUTUBE_ID,
  memeUrl: process.env.MEME_URL,
  heroUrl: process.env.HERO_URL
};

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// bodyParser does all sorts of weird stuff to the request body
// so save a copy of the original raw body to the request object
// this is so we can validate the webhook signature off of the full, untouched
// request body. Otherwise, theres a chance it won't match.
app.use(bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}));

app.get('/', async (req, res) => {
  res.render('login', {layout: 'login.handlebars'});
});

app.get('/login', async (req, res) => {
  res.redirect('/');
});

app.post('/login', async (req, res) => {
  if (!req.body.username) {
    res.redirect('/');
    return;
  }

  // encode our api key and secret in a base64 basic auth header
  const auth = 'Basic ' + Buffer.from(KEY + ':' + SECRET).toString('base64');

  const settings = {
    uid: req.body.username,
    auth: auth,
    host: API_HOST,
    youtubeId: DEMO_CONFIG.youtubeId,
    memeUrl: DEMO_CONFIG.memeUrl,
    heroUrl: DEMO_CONFIG.heroUrl
  };

  // call the api to create nudges
  sendNudges(settings);

  // nudges can take a few seconds to process, so render
  // a splash page where the user can wait until they're ready.
  res.render('splash', {
    layout: 'splash',
    username: req.body.username
  });
});

app.get('/home', async (req, res) => {
  const userName = req.query.username;

  // Created A Signed Token, Granting This User To Fetch
  // Nudges for their user id only.
  const exp = Math.ceil(+new Date()/1000) + 60; // unix timestamp seconds
  const str = ACCOUNT_ID + userName + `?Expires=${exp}&Key=${KEY}`
  const hmac = crypto.createHmac('sha256', SECRET);
  const token = hmac.update(str).digest("hex");

  // Pass the token and token meta data to the view, where we will
  // pass the data into the ucentric.init call.
  res.render('home', {
    userId: userName,
    accountId: ACCOUNT_ID,
    ucentricKey: KEY,
    ucentricTokenExp: exp,
    ucentricToken: token
  });
});

app.post('/webhook', async (req, res) => {
  console.info('Received Webhook: ', req.body);

  // check webhook signature
  const header = req.headers['x-ucentric-signature'];
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  hmac.update(req.rawBody);
  const hash = hmac.digest('hex');

  if (header !== hash) {
    throw new Error('Invalid Webhook Signature');
  }

  const payload = req.body;

  switch (payload.event) {
    case "Ucentric Clicked Nudge":
      console.log("Nudge Clicked")
    default:
      console.log(`Unsupported Event Type`);
  }

  res.send('OK');
});

app.listen(PORT);

console.info(`Ucentric Demo Server Listening On Port: ${PORT}`);
