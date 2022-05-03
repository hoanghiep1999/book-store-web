const express = require('express');
const router = express.Router();

const BookModel = require('../models/Book');

router.get('/', async (req, res) => {
  await BookModel.find({}, (err, result) => {
    if(err)
      throw err;
    else
      res.json(result);
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

/* Lay danh sach book theo categoryID */
router.get('/list/:id', async (req, res) => {
  await BookModel.find({categoryID: req.params.id}, (err, result) => {
    if(err)
      throw err;
    else
      res.json(result);
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

router.get('/search/:title', async (req, res) => {
  var regex = new RegExp(req.params.title, 'i');
  await BookModel.find({title: regex}, (err, result) => {
    if(err)
      throw err;
    else {
      res.json(result);
    }
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

/* Lay chi tiet 1 book theo _id */
router.get('/:id', async (req, res) => {
  await BookModel.findById(req.params.id, (err, result) => {
    if(err)
      throw err;
    else
      res.json(result);
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

module.exports = router;