const passport = require('passport');


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID='1065160602754-vma9gac1vm8oat25p7qpmchkoituhpn2.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='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'
 

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
