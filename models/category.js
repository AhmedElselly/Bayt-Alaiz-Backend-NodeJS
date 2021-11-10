const mongoose = require('mongoose');
const {Schema} = mongoose;


const categorySchema = new Schema({
  text: {
    type: String,
    required: true
  },

  image: {
    data: Buffer,
    contentType: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);