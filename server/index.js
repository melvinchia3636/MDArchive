const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];
const TOKEN_PATH = 'token.json';

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function startAPI(auth) {
  const drive = google.drive({version: 'v3', auth});
  
  app.get('/folder/list', (req, res) => {
    drive.files.list({
      pageSize: 500,
      fields: 'nextPageToken, files(id, name)',
      q: "mimeType='application/vnd.google-apps.folder' and '1YJmSRW_FJOQo_aOvtkHdJ-WCONjndlHe' in parents"
    }, async (err, result) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = result.data.files;
      res.send(files)
    });

    app.get('/file/list/:id', (req, res) => {
      drive.files.list({
        pageSize: 500,
        fields: 'nextPageToken, files(id, name)',
        q: `"${req.params.id}" in parents`,
      }, async (err, result) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = result.data.files;
        res.send(files);
      });
    })

    app.get('/file/content/:id', (req, res) => {
      drive.files.get({
        fileId: req.params.id,
        alt: 'media'
      }, async (err, result) => {
        if (err) return console.log('The API returned an error: ' + err);
        res.send(result.data);
      })
    })
  });
}

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), startAPI);
});

app.listen(3001);