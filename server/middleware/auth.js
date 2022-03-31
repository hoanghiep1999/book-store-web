const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
  const authorizationHeader = req.header('Authorization');
  const token = authorizationHeader.split(' ')[1];
  if(!token) {
    res.status(401).json("Access token not found!")
  }
  else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if(err) {
        res.status(403).json("Invalid token!")
      }
      else {
        next();
      }
    })
  }
}

module.exports = verifyToken;
