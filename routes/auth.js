var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/login',
  passport.authenticate('openidconnect'));

router.get('/openidconnect/redirect',
  passport.authenticate('openidconnect', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
