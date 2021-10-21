const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    upload = multer({storage: multer.memoryStorage()});

const {
    create,
    getPostById,
    getPost,
    postIndex,
    getPostImage,
    getPostsByCategory
} = require('../controllers/posts');

const {
    getCategoryById
} = require('../controllers/categories');

const {
    getUserById
} = require('../controllers/users');

router.post('/create', upload.single('image'), create);

router.get('/by-category/:categoryId', getPostsByCategory)
router.get('/:postId', getPost);
router.get('/:postId/image', getPostImage);

router.get('/', postIndex);

router.param('userId', getUserById);
router.param('postId', getPostById);
router.param('categoryId', getCategoryById);

module.exports = router;