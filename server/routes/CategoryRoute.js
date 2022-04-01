const express = require('express');
const router = express.Router();

const CategoryModel = require('../models/Category');
const verifyToken = require('../middleware/auth');

router.get('/', async (req, res) => {
  await CategoryModel.find({}, (err, result) => {
    if(err)
      throw err;
    else
      res.json(result);
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

/* Lay thong tin category theo categoryID */
router.get('/:id', async (req, res) => {
  await CategoryModel.find({categoryID: req.params.id}, (err, result) => {
    if(err)
      throw err;
    else
      res.json(result);
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

module.exports = router;
