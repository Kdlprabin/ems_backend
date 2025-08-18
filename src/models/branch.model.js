const mongoose = require('mongoose');


const branchSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    branch_name: {
        type: String,
        required: true,
        unique: true,
    },
    branch_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true,
    },
    staffs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
    }],
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;