const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userModel = require('../models/User');

router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.json(user);
})

router.post('/login', async (req, res) => {
  const resMessage = "Your email or password is not correct!";
  const user = await userModel.findOne({email: req.body.email});
  if (user === null) {
    res.send(resMessage);
    console.log("Cannot find user!")
  }
  else {
    bcrypt.compare(req.body.passWord, user.passWord, function(err, result) {
      if(result === true) {
        res.json(user);
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassWord = await bcrypt.hash(req.body.passWord, salt);
    const checkUser = await userModel.findOne({email: req.body.email});
    if (checkUser === null) {
      const user = new userModel({
        ...req.body,
        passWord: hashedPassWord
      });
      await user.save();
      res.json(user);
    }
    else {
      res.send("This email is already created!");
      console.log("This email is already created!");
    }
  } catch (err) {
    throw err;
  }
})

module.exports = router;