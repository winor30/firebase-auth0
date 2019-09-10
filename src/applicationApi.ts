import { AuthenticationClient } from 'auth0';
import * as request from 'request';

const auth0 = new AuthenticationClient({
  domain: '****',
  clientId: '***',
  clientSecret: '***'
});

const run = async () => {
  const accessToken = await auth0.clientCredentialsGrant({
    audience: '***',
  });

  const options = { method: 'POST',
  url: '***',
  headers: { authorization: `Bearer ${accessToken.access_token}` } };


  request(options, (err, _, body) => {
    if (err) throw new Error(err);
    console.log(body);
  })
}

run();
