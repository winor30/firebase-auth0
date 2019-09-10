import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'express-jwt';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import jwksRsa from 'jwks-rsa';

admin.initializeApp();
const firestore = admin.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const ISSUER_URL = "AUTH0_ISSUER_URL";
const AUTH0_AUDIENCE = 'AUTH0_AUDIENCE';

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${ISSUER_URL}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: AUTH0_AUDIENCE,
  issuer: `${ISSUER_URL}`,
  algorithms: ['RS256']
});

app.use(checkJwt);
app.post('/authorized', function (req, res) {
  console.log('/authorized', req, res);
  res.send('Secured Resource');
});

module.exports = functions.https.onRequest(async (req, res) => {
  return app(req, res);
});
