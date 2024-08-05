const jwt = require('jsonwebtoken');
const jwtSecret = 'newone'; 

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    console.log('No token, authorization denied'); 
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    console.log('JWT token verified:', decoded); 
    next();
  } catch (err) {
    console.log('Token is not valid'); 
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
