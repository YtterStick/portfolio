const Inquiry = require('../models/inquiryModel');
const nodemailer = require('nodemailer');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    const { name, email, projectType, budget, timeline, subject, message } = req.body;

    const inquiry = await Inquiry.create({
        name,
        email,
        projectType,
        budget,
        timeline,
        subject,
        message
    });

    if (inquiry) {
        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Portfolio Inquiry: ${subject || 'No Subject'} from ${name}`,
            html: `
                <h3>New Inquiry Received</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
                <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
                <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error('Email send failed:', err);
            // Don't fail the request if email fails, but log it
        }

        res.status(201).json(inquiry);
    } else {
        res.status(400);
        throw new Error('Invalid inquiry data');
    }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
const getInquiries = async (req, res) => {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
const updateInquiryStatus = async (req, res) => {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (inquiry) {
        inquiry.status = status;
        const updatedInquiry = await inquiry.save();
        res.json(updatedInquiry);
    } else {
        res.status(404);
        throw new Error('Inquiry not found');
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
const deleteInquiry = async (req, res) => {
    const inquiry = await Inquiry.findById(req.params.id);

    if (inquiry) {
        await inquiry.deleteOne();
        res.json({ message: 'Inquiry removed' });
    } else {
        res.status(404);
        throw new Error('Inquiry not found');
    }
};

module.exports = {
    createInquiry,
    getInquiries,
    updateInquiryStatus,
    deleteInquiry
};
