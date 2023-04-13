import  passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import User from '#Models/UserModel.js';
import RoleModel from '#Models/RoleModel.js';
import SpecialtyModel from '#Models/SpecialtyModel.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/test-user/google/callback"
  },
  function verify(accessToken, refreshToken, profile, done) {
    if (profile.emails) {
      User.findOne({ where: { email: profile.emails[0].value }, include: [{model: RoleModel}, {model: SpecialtyModel}] })
      .then(function (user) {
        if (user)
        { 
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    } else {
      return done(null, false);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
