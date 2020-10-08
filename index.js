require('dotenv').config()
const express = require('express');
const exphbs  = require('express-handlebars');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const sendNudges = require('./lib/nudge');

// TODO
// pass user id and accountId env vars to view
// add google fonts
// add some sort of fake app styling dashboard
// add text to readme
// replace scripts with prod version

const PORT = process.env.PORT || 9000;

const auth = "Basic dWNwdWJfa2V5X2Y3YmE0ZWY1M2Y5NWMwZjBmMThmMDFlYzU2MzkxZWRjOnVjc2VjX2tleV8xZmI2ZjdkZjUxNzYxNTQ3NWIyOTUzZWNhYTI2ODAwYw==";



const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.render('login', {layout: 'login.handlebars'})
});

app.get('/login', async (req, res) => {
  res.redirect('/');
});

app.post('/login', async (req, res) => {
  if (!req.body.username) {
    res.redirect('/');
    return;
  }

  const settings = {
    uid: req.body.username,
    auth: auth,
    host: "api.519dev.com",
    youtubeId: 'kQ4DmRHBYkE',
    memeUrl: 'https://media.makeameme.org/created/subitup-is-filling.jpg',
    heroUrl: 'https://img.yasteq.com/2/safe_image.php?d=AQCjmEr9DNN6C5nu&url=http%3A%2F%2Fcampusrecmag.com%2Fwp-content%2Fuploads%2F2016%2F11%2FAds-Campus-Rec_Banner.png&_nc_hash=AQCKZphJrA5-79zu'
  };

  sendNudges(settings);

  res.render('splash', {
    layout: 'splash',
    username: req.body.username
  });
});

app.get('/home', async (req, res) => {
  const userName = req.query.username;

  // TODO create token and pass to view
  const secret = process.env.UCENTRIC_SECRET_KEY;
  const token = '';

  res.render('home', {
    userId: userName,
    accountId: process.env.UCENTRIC_ACCOUNT_ID,
    ucentricKey: process.env.UCENTRIC_KEY,
    ucentricToken: token
  });
});

app.post('/nudges', async (req, res) => {
});

app.post('/webhook', async (req, res) => {
  console.info('Received Webhook: ', req.body);

  // check webhook signature
  const header = req.headers['x-ucentric-signature'];
  const hmac = crypto.createHmac('sha256', process.env.UCENTRIC_WEBHOOK_SECRET);
  hmac.update(req.rawBody);
  const hash = hmac.digest('hex');

  if (header !== hash) {
    throw new Error('Invalid Webhook Signature');
  }

  // todo if the webhook is asking a question, then create a new
  // nudge to send to the asker

  res.send('OK');
});

app.listen(PORT);

console.info(`Ucentric Demo Server Listening On Port: ${PORT}`);
