var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/login',
  passport.authenticate('oidc'));

router.get('/return', 
  passport.authenticate('oidc', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
