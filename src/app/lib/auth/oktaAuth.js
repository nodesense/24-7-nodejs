const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');

const config = require('../../config');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: config.okta.resourceServer.oidc.issuer,
  //assertClaims: config.okta.resourceServer.assertClaims

  clientId: config.okta.resourceServer.clientId,
  //issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,

});

module.exports = function oktaAuthRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        res.status(401);
        return next('Unauthorized');
    }

    const accessToken = match[1];
    console.log('token ', accessToken)

    return oktaJwtVerifier.verifyAccessToken(accessToken)
        .then((jwt) => {
            console.log('received okta jwt ', jwt)
        req.jwt = jwt;
        next();
        })
        .catch((err) => {
            console.log('received okta error ', err)
        res.status(401).send(err.message);
        });
}
