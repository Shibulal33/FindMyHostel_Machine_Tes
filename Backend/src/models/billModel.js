const mongoose = require('../config/dbConfig')

const billSchema = new mongoose.Schema({
    fkUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true },
    status: {
        type: String,
        enum: ["paid", "pending"],
        default: "pending"
    },
    billType: {
        type: String,
        enum: ["security", "others"],
        default: "security"
    },
    strActiveStatus: { type: String },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    createdUserId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    dateUpdated: {
        type: Date,
        default: null
    },
    updatedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
})

const billModel = mongoose.model('bills', billSchema)
module.exports = billModel