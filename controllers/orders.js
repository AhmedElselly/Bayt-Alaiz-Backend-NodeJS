const Order = require('../models/order');

module.exports = {
  async create(req, res){
    const order = await new Order(req.body);

    order.save((err, order) => {
      if(err) return res.json({err});
      return res.json(order);
    });
  },

  async orders(req, res){
    const orders = await Order.find();
    return res.json(orders);
  }
}