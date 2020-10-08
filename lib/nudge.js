const https = require("https");

module.exports = (settings) => {
  const uid = settings.uid || 'demo';
  const youtubeId = settings.youtubeId;
  const memeUrl = settings.memeUrl;
  const heroUrl = settings.heroUrl;

  const nudges = [

    {
      userId: uid,
      type: 'card',
      title: 'Introducing TimeClock Message!',
      body: 'With <strong>TimeClock Message</strong> you can message your employees right when they punch in for their shifts. After starting a shift they\'ll be greeted with a message from you - just like this one! Want to start using TimeClock Message?',
      reference: 'message_04',
      imageSrc: heroUrl,
      primaryButtonText: 'Yes, Show Me How',
      primaryButtonLink: null,
      secondaryButtonText: 'No Thanks',
      callback: null,
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'Multiple Nudges Sent To The Same User Stack On Top Of Eachother',
      body: 'The user will see each Nudge in the order in which they were created. Which means we can create a bunch of Nudges just for this demo.',
      reference: 'message_04',
      imageSrc: heroUrl,
      primaryButtonText: 'Yes, Show Me How',
      primaryButtonLink: null,
      secondaryButtonText: 'No Thanks',
      callback: null,
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'You can customize the layout and colors of each Nudge',
      body: "For example, this one does not have an image. All the different text fields are specified when the nudge is created. Just omit the field or pass a null value and the field won't show up.",
      reference: 'message_04',
      primaryButtonText: 'Yes, Show Me How',
      primaryButtonLink: null,
      secondaryButtonText: 'No Thanks',
      callback: null,
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      body: `
        <p>This one is without a title. Instead, its just an <strong>HTML</strong> body. Which means you can use most common <strong>HTML</strong> elements.</p>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <pre>var x = 22.2;</pre>
        <p>
          <strong>bold</strong>, <i>italics</i>, etc are all fair game.
        </p>
        <p>
          Even emojjis 🔥🤔😂✈️  if thats your thing.
        </p>
      `,
      reference: 'message_04',
      primaryButtonText: 'YES',
      primaryButtonLink: null,
      secondaryButtonText: 'NO',
      callback: null,
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'And This One Has Only One Button...',
      body: 'You can set the button text at the time you create the Nudge. You can also link to webpages and it will open the url in a new tab',
      reference: 'message_04',
      imageSrc: heroUrl,
      primaryButtonText: 'Visit Ucentric Website',
      primaryButtonLink: 'https://www.ucentric.io',
      callback: null,
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'And When You Need Something More Dynamic, Use Callbacks',
      body: `
        <p>
         These are function names that you pass in when you create a Nudge. When a button is clicked, the function is called
          and it is passed info about the Nudge and which button was clicked.
        </p>
      `,
      reference: 'message_04',
      imageSrc: "https://pyxis.nymag.com/v1/imgs/4db/9a9/78f0f50285dd11bef4946bc47283e49281-pills-lede.rhorizontal.w1200.jpg",
      primaryButtonText: 'Take The Red Pill',
      primaryButtonLink: null,
      secondaryButtonText: "Take The Blue Pill",
      callback: "takePill",
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'Or No Buttons At All...',
      body: `
        If thats your thing. Sometimes memes are enough. <img src="${memeUrl}"/>
      `,
      reference: 'message_04',
      primaryButtonLink: null,
      callback: null,
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'And you can disable the close button if you would like',
      body: 'which is helpful if you want to force the user to confirm they viewed the message since they cannot just click the overlay to close the nudge.',
      reference: 'message_04',
      primaryButtonText: 'Click To Confirm',
      primaryButtonLink: null,
      callback: null,
      delay: 0,
      disableClose: true,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'Nudges can contain some pretty complex HTML',
      body: `
        <p>Like YouTube videos..</p>
        <iframe src="https://www.youtube.com/embed/${youtubeId}">
        </iframe>
        <p>Of course we also sanitize the HTML to prevent any nasty XSS attacks</p>
      `,
      reference: 'message_04',
      primaryButtonLink: null,
      callback: null,
      delay: 0,
      disableClose: false,
      segmentId: '1234'
    },
    {
      userId: uid,
      type: 'card',
      title: 'Creating Nudges Via API Is Simple',
      body: `
<pre>curl -X POST \
  https://api.ucentric.io/app/api/v1/nudges
  -H 'authorization: {{ BASE64(apiKey:secret) }}'
  -H 'content-type: application/json'
  -d '{
    "userId": "749ca33c-e9d3-4baa-bcdb-0caf599ad38d",
    "type": "card",
    "title": "Introducing TimeClock Message!",
    "body": "My Message",
    "reference": "unique_message_id",
    "imageSrc": "https://picsum.photos/600/200",
    "primaryButtonText": "Yes, Show Me How",
    "primaryButtonLink": null,
    "secondaryButtonText": "No Thanks",
    "callback": null,
    "disableClose": false
  }'
</pre>`,
      reference: 'message_04',
      callback: null,
      delay: 0,
      disableClose: false,
    },
    {
      userId: uid,
      type: 'card',
      title: 'And You Get A Response Like This...',
      body: `
<pre>{
  "userId":"749ca33c-e9d3-4baa-bcdb-0caf599ad38d",
  "reference":"unique_message_id",
  "limit":1000,
  "usage":494
}</pre>
<p>...which you can log or to create your own usage charts or alerts.</p>
<p>Notice the "reference" field that gets sent in. You can provide an id to tie this message back to your system. This enables you to creative Nudges that interact with you app.</p>
      `,
      reference: 'message_04',
      callback: null,
      delay: 0,
      disableClose: false,
    },
  ];

  const postNudge = (nudge, callback) => {
    const options = {
      "method": "POST",
      "hostname": settings.host,
      "port": null,
      "path": "/app/api/v1/nudges",
      "rejectUnauthorized": false,
      "headers": {
        "authorization": settings.auth,
        "content-type": "application/json",
        "cache-control": "no-cache",
      }
    };

    const req = https.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(`Nudge Created. Response: ${body.toString()}`);
        callback();
      });
    });

    req.write(JSON.stringify(nudge))

    req.end();
  }

  const processNudge = () => {
    postNudge(nudges.shift(), () => {
      if (nudges.length) {
        processNudge()
      }
    });
  }

  processNudge();
}
