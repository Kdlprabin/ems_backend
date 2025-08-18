const mongoose = require('mongoose');

const indicatorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shrawan: {
        type: Number,
        default: 0,
    },
    bhadra : {
        type: Number,
        default: 0,
    },
    asowj : {
        type: Number,
        default: 0,
    },
    kartik : {
        type: Number,
        default: 0,
    },
    mangsir : {
        type: Number,
        default: 0,
    },
    poush : {
        type: Number,
        default: 0,
    },
    magh : {
        type: Number,
        default: 0,
    },
    falgun : {
        type: Number,
        default: 0,
    },
    chaitra : {
        type: Number,
        default: 0,
    },
    baishakh : {
        type: Number,
        default: 0,
    },
    jestha : {
        type: Number,
        default: 0,
    },
    ashad : {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    }
});


const achievementSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    indicators: [indicatorSchema],
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;