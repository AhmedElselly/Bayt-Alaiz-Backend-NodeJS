const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const {
  create,
  categoryImage,
  categoryIndex,
  getCategoryById
} = require('../controllers/categories');

router.get('/', categoryIndex);
router.get('/:categoryId/image', categoryImage)
router.post('/create', upload.single('image'), create);

router.param('categoryId', getCategoryById);

module.exports = router;