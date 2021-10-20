const express = require('express');
const router = express.Router();

const {
  create,
  categoryIndex
} = require('../controllers/categories');

router.get('/', categoryIndex);
router.post('/create', create);


module.exports = router;