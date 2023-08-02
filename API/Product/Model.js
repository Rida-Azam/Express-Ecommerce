const { Schema, model} = require('mongoose')

const ProductSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique:true,
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true

    },

    image: {
        type: Array,
        required: true

    },

    rating: {
        type: String,
        required: true

    }
})

const Product = model('product', ProductSchema)
module.exports = Product