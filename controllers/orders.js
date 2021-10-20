const Order = require('../models/order');

module.exports = {
  getOrderById(req, res, next, id){
    Order.findById(id).populate('products', '-image').exec((err, order) => {
      if(err) return res.json({err});
      req.order = order;
      next();
    });
  },

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
  },

  async getOrder(req, res){
    console.log(req.order)
    return res.json(req.order);
  }
}