const Product = require('./model')
const { connect } = require('mongoose')
require('dotenv').config()


const getAllProduct = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const allProduct = await Product.find()
        res.json({
            product: allProduct
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }

}

const getProductbyCategory = async (req, res) => {

    const { category } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const product = await Product.findOne({ category })
        res.json({ product })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}

// const getProductbyBrand= async (req, res) => {

//     const {Brand } = req.query
//     try {
//         await connect(process.env.MONGO_URI)
//         const product = await Product.findOne({ Brand })
//         res.json({ product })
//     } catch (error) {
//         res.status(400).json({
//             message: error.message
//         })

//     }
// }


const createProduct = async (req, res) => {
    const { title,price,description,category,image,rating} = req.body

    if (!title || !price || !description || !category||!image ||!rating) {
        res.status(403).json({
            message: "Required Field Missing"
        })
    }
    else {
        try {

            await connect(process.env.MONGO_URI)
            const checkExisting = await Product.exists({ title })

            if (checkExisting) {
                res.status(400).json({
                    message: "Product Already Exists"
                })
            } else {

                await Product.create({ title,price,description,category,image,rating })
                const allProduct = await Product.find()

                res.json({
                    message: "DB connected",
                    product: allProduct
                })


            }


        } catch (error) {

            res.status(400).json({
                message: error.message
            })

        }
    }
}

const updateProduct= async (req, res) => {

    const { _id, title, price  ,description,category,image,rating} = req.body

    const filter = { _id };
    const update = { title,price,description,category,image,rating };

    try {
        await connect(process.env.MONGO_URI)

        await Product.findOneAndUpdate(filter, update, {
            new: true
        });

        const product = await Product.find()

        res.json({
            message: "Updated Successfully",
            product
        })

    }
    catch (error) {

        res.status(400).json({
            message: error.message
        })

    }
}


const deleteProduct = async (req, res) => {

    const { _id } = req.body

    try {
        await connect(process.env.MONGO_URI)
        await Product.deleteOne({ _id })
        const product = await Product.find()
        res.status(200).json({
            message: "Deleted Successfully",
            product
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}



module.exports = { createProduct,getAllProduct,getProductbyCategory,deleteProduct,updateProduct}