const express = require('express');
const router = express.Router();

const OrderModel = require('../models/Order');

router.get('/:id', async (req, res) => {
  await OrderModel.findById(req.params.id, (err, result) => {
    if(err) 
      throw err;
    else
      res.json(result);
  })
  /* Tranh loi */
  .clone().catch(function(err){ console.log(err)})
})

router.post('/new', async (req, res) => {
  try {
    const order = new OrderModel(req.body);
    await order.save();
    res.json(order);
  }
  catch (err) {
    console.log("Can't create new order!");
    throw err;
  }
})

module.exports = router;