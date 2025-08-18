const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    staff_code: {
        type: String,
        required: true,
        unique: true,
    },
    staff_name: {
        type: String,
        required: true,
    },
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
    },
    post: {
        type: String,
        required: true,
    },
    jobs: {
        type: String,
        required: true,
    },
    from :{
        type: Date,
    },
    to :{
        type: Date,
    }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;