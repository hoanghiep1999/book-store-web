const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Decimal128,
    required: true
  },
  categoryID: {
    type: String,
    required: true
  }
})

const BookModel = mongoose.model('books', BookSchema);

module.exports = BookModel;