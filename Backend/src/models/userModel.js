const mongoose = require('../config/dbConfig')

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'tenant'],
        default: 'tenant'
    },
    status: {
        type: String,
        enum: ['active', 'vacated'],
        default: 'active'
    },
    // strActiveStatus: { type: String },
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

const userModel = mongoose.model('users', userSchema)
module.exports = userModel