var express = require('express');
var passport = require('passport');
var url = require('url');

var router = express.Router();

router.get('/login',
  passport.authenticate('openidconnect'));

router.get('/openidconnect/redirect',
  passport.authenticate('openidconnect', { failureRedirect: '/login' }),
  function(req, res) {
    // TODO: Clean this up in sess-mgmt
    req.session.passport.ctx = req.authInfo;
    
    res.redirect('/');
  });

router.get('/logout',
  function(req, res) {
    req.logout();
    
    /*
    var loc = url.parse('https://dev-374819.oktapreview.com/oauth2/v1/logout', true);
    // NOTE: Okta fails with "A client_id must be provided in the request." if not provided.
    //       This is not an accurate message.
    loc.query.id_token_hint = req.session.passport.ctx.id_token;
    loc.query.post_logout_redirect_uri = 'http://localhost:3000/openidconnect/logout/redirect'
    */
    
    var loc = url.parse('https://hansonhq.auth0.com/v2/logout', true);
    loc.query.client_id = process.env['CLIENT_ID'];
    loc.query.returnTo = 'http://localhost:3000/auth0/logout/return'
    
    
    res.redirect(url.format(loc));
    //res.redirect('/');
  });

// https://openid.net/specs/openid-connect-rpinitiated-1_0.html
router.get('/openidconnect/logout/redirect',
  function(req, res) {
    // TODO: Validate state, etc.
    res.redirect('/');
  });

// https://auth0.com/docs/api/authentication#logout
router.get('/auth0/logout/return',
  function(req, res) {
    // TODO: Validate state in session, etc.
    res.redirect('/');
  });

module.exports = router;
