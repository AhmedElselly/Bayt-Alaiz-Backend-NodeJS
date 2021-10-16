const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    upload = multer({storage: multer.memoryStorage()});

const {
    create,
    getPostById,
    getPost,
    postIndex,
    getPostImage
} = require('../controllers/posts');

const {
    getUserById
} = require('../controllers/users');

router.post('/create/:userId', upload.single('image'), create);

router.get('/:postId', getPost);
router.get('/:postId/image', getPostImage);

router.get('/', postIndex);

router.param('userId', getUserById);
router.param('postId', getPostById);

module.exports = router;