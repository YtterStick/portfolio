const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
    createInquiry,
    getInquiries,
    updateInquiryStatus,
    deleteInquiry
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(asyncHandler(createInquiry))
    .get(protect, asyncHandler(getInquiries));

router.route('/:id')
    .put(protect, asyncHandler(updateInquiryStatus))
    .delete(protect, asyncHandler(deleteInquiry));

module.exports = router;
