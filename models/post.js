const mongoose = require('mongoose'),
    {Schema} = mongoose;

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);