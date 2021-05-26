var passport = require('passport');
const { Issuer, Strategy } = require('openid-client');


module.exports = function() {
  
  var issuer = new Issuer({
    issuer: 'https://dev-374819.oktapreview.com',
    authorization_endpoint: 'https://dev-374819.oktapreview.com/oauth2/v1/authorize',
    token_endpoint: 'https://dev-374819.oktapreview.com/oauth2/v1/token',
    jwks_uri: 'https://dev-374819.oktapreview.com/oauth2/v1/keys'
  });
  
  var client = new issuer.Client({
    client_id: process.env['CLIENT_ID'],
    client_secret: process.env['CLIENT_SECRET'],
    redirect_uris: [ 'http://localhost:3000/openidconnect/redirect' ]
  });
  
  passport.use('openidconnect', new Strategy({
      client: client,
      params: {
        scope: 'openid profile email'
      }
    },
    function(tokenset, done) {
      var claims = tokenset.claims();
      var user = {};
      user.id = claims.sub;
      user.displayName = claims.name;
      if (claims.email) {
        user.emails = [ { value: claims.email } ];
      }
      
      return done(null, user);
    }));
  
  
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  In a
  // production-quality application, this would typically be as simple as
  // supplying the user ID when serializing, and querying the user record by ID
  // from the database when deserializing.  However, due to the fact that this
  // example does not have a database, the complete Facebook profile is serialized
  // and deserialized.
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
};
