const jwt = require('jsonwebtoken');
const errors = require('../utils/errors');
const crypt = require('../utils/enDec');
const { JWT } = require('../../config/config');
const { adminUrls, userUrls } = require('../../config/constants/urlByRoles');

let jwtKey;

class JwtToken {
  async generateToken(tokenData, exp, routeUrl) {
    // Get JWT Keys.
    jwtKey = (new JwtToken()).jwtKeys(routeUrl);
    console.log('jwtkey', jwtKey);
    return new Promise((resolve, reject) => {
      jwt.sign(tokenData, jwtKey, { expiresIn: exp }, (err, token) => {
        if (err) {
          return reject(err);
        }
        let encryptToken = token;
        encryptToken = crypt.encryptData(encryptToken);
        return resolve(encryptToken);
      });
    });
  }

  async verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) return next(new errors.AuthorizationError('Did not receive token'));
    try {
      token = crypt.decryptData(token);
      // Get JWT Keys.
      jwtKey = (new JwtToken()).jwtKeys(req._parsedUrl.pathname);
      console.log('jwtkey', req._parsedUrl.pathname);
      if (!jwtKey) next(new errors.AuthorizationError('Access denied!'));
      jwt.verify(token, jwtKey, (err, decoded) => {
        console.log('dec', decoded);
        if (err) next(new errors.AuthorizationError('Token Invalid or Expired. Forbidden!'));
        const isValidUser = (new JwtToken()).accesUrls(req._parsedUrl.pathname, decoded.role);
        if (!isValidUser) next(new errors.AuthorizationError('Access denied!'));
        req._decoded = decoded;
      });
    } catch (err) {
      next(new errors.AuthorizationError('Invalid secret key.'));
    }
    return next();
  }

  jwtKeys(routeUrl) {
    // add different secret keys for different routes.
    if (adminUrls.indexOf(routeUrl) >= 0 || userUrls.indexOf(routeUrl) >= 0) return JWT.login;
    return null;
  }

  // Will return route is for ROLE_ADMIN or ROLE_USER
  accesUrls(routeUrl, role) {
    if (adminUrls.indexOf(routeUrl) >= 0 && role === 'ROLE_ADMIN') return true;
    if (userUrls.indexOf(routeUrl) >= 0 && role === 'ROLE_USER') return true;
    return false;
  }
}

module.exports = new JwtToken();
