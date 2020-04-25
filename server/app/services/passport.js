import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import LocalStrategy from 'passport-local';
import UserModel from '../models/userModel';
import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import passport from 'passport';

dotenv.config({ silent: true });

export function tokenForUser(userId) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: userId, iat: timestamp }, process.env.AUTH_SECRET);
}

const localOptions = { usernameField: 'email' };
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  UserModel.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        done(error);
      } else if (!isMatch) {
        done(null, false);
      } else {
        done(null, user);
      }
    });
    return null;
  });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  UserModel.findById(payload.sub, (err, user) => {
    if (err) {
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignIn = passport.authenticate('local', { session: false });
