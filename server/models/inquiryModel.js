const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        required: false
    },
    budget: {
        type: String,
        required: false
    },
    timeline: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'new' // new, contacted, closed
    }
}, {
    timestamps: true
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
