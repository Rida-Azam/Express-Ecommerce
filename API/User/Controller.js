const User = require('./Model')
const { connect } = require('mongoose')
require('dotenv').config()
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const getAllUser = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const allUser = await User.find()
        res.json({
            user: allUser
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }

}

const getUserbyId = async (req, res) => {

    const { _id } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const user = await User.findOne({ _id })
        res.json({ user })
    } catch (error) {
        res.status(400).json({
            message: error.message
     })
    }
}

const getUserbyEmail = async (req, res) => {
    const { email } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const user = await User.findOne({ email })
        res.json({ user })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


const Signup = async (req, res) => {
    const { username, password, email } = req.body

    try {

        await connect(process.env.MONGO_URI)
        const checkExisting = await User.exists({ email: email })

        if (checkExisting) {
            res.status(400).json({
                message: "User Already Exists"
            })

        } else {

            await User.create({ username, email, password: await hash(password, 12) })
            res.status(201).json({
                message: "User Created"
            })


        }


    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }
}

const LoginUser = async (req, res) => {
    const { password, email } = req.body

    try {
        await connect(process.env.MONGO_URI)
        const checkExistUser = await User.findOne({ email: email })

        if (!checkExistUser) {
            res.status(404).json({
                message: "User Not Found"
            })

        } const decryptPass = await compare(password, checkExistUser.password)
        console.log(decryptPass)

        if (email == checkExistUser.email && decryptPass) {
             const token =sign(
                {
                    username: checkExistUser.username,
                    id: checkExistUser._id,
                    email: checkExistUser.email
                }
                ,
                process.env.JWT_SECRET
            )

            res.status(200).json({
                message: "Successfully Signed In",
                token: token
            })
        } else {
            res.json({
                message: "Invalid Credential"

            })
        }

    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }
}


const updateUser = async (req, res) => {

    const { _id, username, profile_pic } = req.body

    const filter = { _id };
    const update = { username, profile_pic };

    try {
        await connect(process.env.MONGO_URI)

        await User.findOneAndUpdate(filter, update, {
            new: true
        });

        const user = await User.find()
        res.json({
            message: "Updated Successfully",
            user
        })
    }
    catch (error) {

        res.status(400).json({
            message: error.message
        })

    }
}


const deleteUser = async (req, res) => {

    const { _id } = req.body

    try {
        await connect(process.env.MONGO_URI)
        await User.deleteOne({ _id })
        const user = await User.find()
        res.status(200).json({
            message: "User Deleted Successfully",
            user
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}



module.exports = { Signup, LoginUser ,getAllUser,getUserbyId,getUserbyEmail,updateUser, deleteUser}