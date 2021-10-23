const Post = require('../models/post');

module.exports = {
	getPostById(req, res, next, id){
		Post.findById(id).populate('author', '_id username email')
		.exec((err, post) => {
			req.post = post;
			if(err) return res.status(400).json({err});
			next();
		})
	},
	
	async create(req, res){
		const post = await new Post(req.body);

		post.author = req.user;

		if(req.file){
			post.image.data = req.file.buffer;
			post.image.contentType = req.file.mimetype;
		}

		post.save((err, post) => {
			if(err) return res.status(400).json({err});
			return res.json(post);
		})
	},

	async update(req, res){
		const post = await req.post;

		const {
			name,
			price,
			quantity,
			description
		} = req.body;

		post.name = name;
		post.price = price;
		post.quantity = quantity;
		post.description = description;

		if(req.file){
			post.image.data = req.file.buffer;
			post.image.contentType = req.file.mimetype;
		}

		post.save((err, post) => {
			if(err) return res.status(400).json({err});
			return res.json(post);
		})
	},

	async postIndex(req, res){
		const posts = await Post.find().select('-image');
		return res.json(posts);
	},

	async getPost(req, res){
		const post = await Post.findById(req.post._id).select('-image');
		return res.json(post);
	},

	async getPostsByCategory(req, res){
		const posts = await Post.find({category: req.category})
		.populate('category', '-image')
		.select('-image');
		console.log(posts)
		return res.json(posts);
	},

	async findPost(req, res){
		const posts = await Post.find({$or: [{name: req.query.search.replace(' ', '')}, {description: req.query.search.replace(' ', '')}]}).select('-image');
		console.log(req.query.search)
		console.log(posts)
		return res.json(posts);
	},

	async getPostImage(req, res) {
		res.set('Content-Type', req.post.image.contentType)
		return res.send(req.post.image.data);
	}
}