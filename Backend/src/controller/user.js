
const { generateToken } = require('../utils/jwtUtils')
const USER = require('../models/userModel')
const BILL = require('../models/billModel')
const mongoose = require('../config/dbConfig')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.query

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all required fields"
            })
        }

        const existingUser = await USER.findOne({ email: email })
        if (!existingUser) {
            return res.status(400).json({
                message: "user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "password not vlid"
            })
        }

        const objForToken = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        }
        const token = await generateToken(objForToken)

        res.status(200).json({
            message: "Login Successful",
            token: token
        })

    } catch (e) {

        res.status(500).json({
            message: e.message
        })

    }
}

const signup = async (req, res) => {
    try {

        const {
            name,
            role,
            password,
            email,
            amount,
            dueDate,
        } = req.body

        if (!password) {
            return res.status(400).json({
                message: "Password required"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const id = new mongoose.mongo.ObjectId()

        const obj = {
            _id: id,
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            status: "active",
            strActiveStatus: "N",
            dateCreated: new Date(),
            createdUserId: id,
        }

        const insertShema = new USER(obj)

        const insert = await insertShema.save()

        const data = {
            _id: insert._id,
            name: insert.name,
            email: insert.email,
            role: insert.role,
            status: insert.status
        }

        const objBill = {
            fkUserId: insert._id,
            amount: amount,
            dueDate: dueDate,
            status: "pending",
            billType: "security",
            strActiveStatus: "N",
            dateCreated: new Date(),
            createdUserId: insert._id
        }

        const insertBill = new BILL(objBill)
        const saveBill = await insertBill.save()

        res.status(200).json({
            message: 'User account created successfully!',
            data: data
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })

    }
}

const listAllUsers = async (req, res) => {
    try {
        let {
            skip,
            limit,
            email
        } = req.query

        let match = {}

        if (email) {
            match.email = email
        }

        const project = {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            status: 1,
        }

        const count = await USER.countDocuments({})
        if (!count) {
            return res.status(404).json({
                message: "No data found"
            })
        }

        if (!skip) {
            skip = 0
        }

        if (!limit) {
            limit = count
        }

        const findAllUsers = await USER.aggregate([{
            $match: match
        }, {
            $sort: { dateCreated: -1 }
        }, {
            $project: project
        }, {
            $skip: parseInt(skip)
        }, {
            $limit: parseInt(limit)
        }])

        res.status(200).json({
            message: "success",
            count: count,
            data: findAllUsers
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getBills = async (req, res) => {
    try {
        const {
            strUserId
        } = req.query

        if (!strUserId) {
            return res.status(400).json({
                messsage: "User id required"
            })
        }

        let match = {
            fkUserId: new mongoose.Types.ObjectId(strUserId)
        }

        const count = await BILL.countDocuments(match)
        if (!count) {
            return res.status(404).json({
                message: "No data found"
            })
        }
        const findBills = await BILL.aggregate([{
            $match: match
        }])
        res.status(200).json({
            count: count,
            data: findBills
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const vacateUser = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(404).json({
                message: "Id required"
            })
        }

        let match = {
            fkUserId: new mongoose.Types.ObjectId(id)
        }

        let project = {
            refundAmount: { $ifNull: [{ $arrayElemAt: ["$refundAmount.totalAmount", 0] }, 0] },
            paidAmount: { $ifNull: [{ $arrayElemAt: ["$paidAmount.totalAmount", 0] }, 0] },
            pendingAmount: { $ifNull: [{ $arrayElemAt: ["$pendingAmount.totalAmount", 0] }, 0] }
        }

        const bill = await BILL.aggregate([{
            $match: match
        }, {
            $facet: {
                refundAmount: [
                    { $match: { status: "paid", billType: "security" } },
                    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
                ],
                paidAmount: [
                    { $match: { status: "paid" } },
                    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
                ],
                pendingAmount: [
                    { $match: { status: "pending" } },
                    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
                ]
            }
        }, {
            $project: project
        }])

        const update = await USER.findByIdAndUpdate(id,
            { status: 'vacated', dateUpdated: new Date() },
            { returnDocument: 'after' });

        return res.status(200).json({
            message: "Successfully vacated",
            data: update,
            amount: bill[0]
        })

    } catch (error) {
        return res.status(500)
    }
}
module.exports = {
    signup,
    login,
    listAllUsers,
    getBills,
    vacateUser
}