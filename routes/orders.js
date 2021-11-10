const express = require('express');
const router = express.Router();

const {
  create,
  getOrder,
  getOrderById
} = require('../controllers/orders');

router.post('/create', create);
router.get('/:orderId', getOrder);

router.param('orderId', getOrderById);

module.exports = router;