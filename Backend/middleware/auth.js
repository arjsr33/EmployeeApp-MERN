const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret'; // Use a strong secret in production

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    console.log('No token, authorization denied'); // Log missing token
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    console.log('JWT token verified:', decoded); // Log the decoded token
    next();
  } catch (err) {
    console.log('Token is not valid'); // Log invalid token
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
