const BILL = require('../models/billModel')
const USER = require('../models/userModel')
const mongoose = require('../config/dbConfig')

const updateBill = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                message: "Id required"
            })
        }

        const update = await BILL.findByIdAndUpdate(id,
            { status: "paid", dateUpdated: new Date() },
            { returnDocument: 'after' })

        res.status(200).json({
            message: "Successfully bill paid",
            data: update
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const createBill = async (req, res) => {
    try {
        const { amount, dueDate, status, userId, billType } = req.body

        if (!amount || !dueDate || !status || !userId || !billType) {
            return res.status(404).json({
                message: "Please enter all required fields"
            })
        }

        const obj = {
            fkUserId: userId,
            amount: amount,
            dueDate: dueDate,
            status: status,
            billType: billType,
            dateCreated: new Date(),
        }

        const match = {
            _id: new mongoose.Types.ObjectId(userId)
        }

        const count = await USER.countDocuments(match)

        if (!count) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const insertBill = new BILL(obj)
        const saveBill = insertBill.save()

        return res.status(200).json({
            message: 'New bill created successfully!',
            data: insertBill
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    updateBill,
    createBill
}