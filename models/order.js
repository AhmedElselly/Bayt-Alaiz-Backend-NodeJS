const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],

  email: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    required: true
  },
  
  lastName: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);