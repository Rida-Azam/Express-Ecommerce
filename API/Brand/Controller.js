const Brand = require('./Model')
const { connect } = require('mongoose')
require('dotenv').config()


const getAllBrand = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const allBrand = await Brand.find()
        res.json({
            category: allBrand
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }

}

const getBrandbyId = async (req, res) => {

    const { _id } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const brand = await Brand.findOne({ _id })
        res.json({ brand })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }


}

const getBrandbyName = async (req, res) => {

    const { BrandName } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const brand = await Brand.findOne({ BrandName })
        res.json({ brand })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}


const createBrand = async (req, res) => {
    const { BrandName, BrandImage } = req.body

    if (!BrandName || !BrandImage) {
        res.status(403).json({
            message: "Required Field Missing"
        })
    }
    else {
        try {

            await connect(process.env.MONGO_URI)
            const checkExisting = await Brand.exists({ BrandName })

            if (checkExisting) {
                res.status(400).json({
                    message: "Brand Already Exists"
                })
            } else {

                await Brand.create({ BrandName, BrandImage })
                const allBrand = await Brand.find()

                res.json({
                    message: "DB connected",
                    brand: allBrand
                })


            }


        } catch (error) {

            res.status(400).json({
                message: error.message
            })

        }
    }
}

const updateBrand = async (req, res) => {

    const { _id, BrandNameName, BrandImageImage } = req.body

    const filter = { _id };
    const update = { BrandNameName, BrandImageImage };

    try {
        await connect(process.env.MONGO_URI)

        await Brand.findOneAndUpdate(filter, update, {
            new: true
        });

        const brand = await Brand.find()

        res.json({
            message: "Updated Successfully",
            brand
        })

    }
    catch (error) {

        res.status(400).json({
            message: error.message
        })

    }
}


const deleteBrand = async (req, res) => {

    const { _id } = req.body

    try {
        await connect(process.env.MONGO_URI)
        await Brand.deleteOne({ _id })
        const brand = await Brand.find()
        res.status(200).json({
            message: "Deleted Successfully",
            brand
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}


module.exports = { createBrand, getAllBrand, getBrandbyId, getBrandbyName ,deleteBrand,updateBrand}