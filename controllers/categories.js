const Category = require('../models/category');

module.exports = {
  getCategoryById(req, res, next, id){
    Category.findById(id).exec((err, category) => {
      if(err) return res.json({err});
      req.category = category;
      next();
    });
  },

  async create(req, res){
    const category = await new Category(req.body);
    if(req.file){
      category.image.data = req.file.buffer;
      category.image.contentType = req.file.mimetype;
    }

    category.save((err, category) => {
      if(err) return res.json({err});
      return res.json(category);
    })
  },

  async categoryIndex(req, res){
    const categories = await Category.find()
    .select('-image');
    return res.json(categories);
  },

  categoryImage(req, res){
    res.set('Content-Type', req.category.image.contentType);
    return res.send(req.category.image.data);
  }
}