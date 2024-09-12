const jwt = require('jsonwebtoken');
const crypto = require('crypto');


function generateToken(user) {
  // Replace 'your-secret-key' with a strong secret key
  const data = `${user.id},${user.username}`; // Concatenate id and username  
  const secretKey = crypto.createHash('sha256').update(data).digest('hex');

  // Define token payload
  const payload = {
    id: user.id,
    username: user.username
    // Add more user details if needed
  };

  // Sign and generate the token
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // token expires in 1 hour
  return token;
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user; // Attach user information to request object
      next();
    });
}
  