const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/User');
const verifyToken = require('../middleware/auth');

let refreshTokens = [];

router.get('/', verifyToken, async (req, res) => {
  await userModel.find({}, (err, result) => {
    if(err) {
      throw err;
    }
    else
      res.json(result);
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

/* test */
router.get('/:id', verifyToken, async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.json(user);
})

router.post('/login', async (req, res) => {
  const { email, passWord } = req.body;
  const resMessage = "Your email or password is not correct!";
  const user = await userModel.findOne({email: email});
  if (user === null) {
    res.send(resMessage);
    console.log("Cannot find user!")
  }
  else {
    bcrypt.compare(passWord, user.passWord, function(err, result) {
      if(result === true) {
        const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'});
        const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({email: email, accessToken, refreshToken});
        console.log("Pass is correct!")
      }
      else {
        res.send(resMessage);
        console.log("Pass not correct!");
      }
    });
  }
})

router.post('/new', async (req, res) => {
  try {
    const { email, passWord } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassWord = await bcrypt.hash(passWord, salt);
    const checkUser = await userModel.findOne({email: email});
    if (checkUser === null) {
      const user = new userModel({
        ...req.body,
        passWord: hashedPassWord
      });
      try {
        await user.save();
        const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'});
        const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({email: email, accessToken, refreshToken});
      }
      catch(err) {
        res.send("Cannot create new user!")
      }
    }
    else {
      res.send("This email is already created!");
      console.log("This email is already created!");
    }
  } catch (err) {
    throw err;
  }
})

router.post('/auth/refreshToken', async (req, res) => {
  const reqToken = req.body.token;
  if(!reqToken) res.sendStatus(401);
  else {
    if(!refreshTokens.includes(reqToken)) res.sendStatus(403);
    else {
      jwt.verify(reqToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if(err)
          res.sendStatus(403);
        else {
          const accessToken = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' });
          res.json({ data, accessToken });
        }
      })
    }
  }
})

router.post('/auth/logout', async (req, res) => {
  const reqToken = req.body.token;
  refreshTokens = refreshTokens.filter(token => token !== reqToken);
  res.sendStatus(200);
})

module.exports = router;