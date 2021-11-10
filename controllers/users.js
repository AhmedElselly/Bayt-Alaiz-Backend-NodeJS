const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    getUserById(req, res, next, id){
        User.findById(id).exec((err, user) => {
            if(err) return res.status(400).json({err});
            req.user = user;
            next();
        });
    },

    async register(req, res){
        const user = await User(req.body);
        await user.setPassword(req.body.password);
        user.save((err, user) => {
            if(err) return res.status(400).json({err});
            return res.json(user);
        })
    },

    async login(req, res){
        const {err, user} = await User.authenticate()(req.body.email.toLowerCase().replace(' ', ''), req.body.password);
        if(err || !user){
            return res.status(400).json({error: "Email and password don't match!"});
        }
        const {email, _id, username} = user;
        const token = jwt.sign({
            email,
            username,
            _id
        }, process.env.SECRET_KEY);

        return res.json({
            token,
            user
        });
    }
}