const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  contactInfo: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  products: [
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: mongoose.Decimal128,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  total: {
    type: mongoose.Decimal128,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  },
  user_email: {
    type: String,
    required: true,
  }
});

const OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;