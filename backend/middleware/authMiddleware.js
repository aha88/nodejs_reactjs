const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate JWT token
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['x-token'];
  const token = authHeader && authHeader.split(' ')[0]; 

  // Token is empty
  if (token == null) {
    return res.status(401).json({ message: 'Token is required' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;  
    next();  
  });
};

module.exports = authenticateToken;
