const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
  const authorizationHeader = req.header('Authorization');
  if(authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    if(!token) {
      res.status(401).json("Access token not found!");
    }
    else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
          res.status(403).json("Invalid token!");
        }
        else {
          next();
        }
      })
    }
  }
  else {
    res.status(403).send("Authorization not found!");
  }
}

module.exports = verifyToken;
