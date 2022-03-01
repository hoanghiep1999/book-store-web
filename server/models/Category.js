const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  categoryID: {
    type: String,
    required: true
  }
})

const CategoryModel = mongoose.model('categories', CategorySchema);

module.exports = CategoryModel;