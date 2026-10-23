const Inquiry = require('../models/inquiryModel');
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    try {
        const { name, email, projectType, budget, timeline, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        let savedInquiry = null;

        // 1. Attempt to save to MongoDB if connection is ready
        if (mongoose.connection && mongoose.connection.readyState === 1) {
            try {
                savedInquiry = await Inquiry.create({
                    name,
                    email,
                    projectType,
                    budget,
                    timeline,
                    subject,
                    message
                });
            } catch (dbErr) {
                console.error('Failed to save inquiry to MongoDB:', dbErr.message);
            }
        } else {
            console.warn('MongoDB not ready. Proceeding without database record.');
        }

        // 2. Send email notification if SMTP credentials are provided
        let emailSent = false;
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
                    replyTo: email,
                    subject: `New Portfolio Inquiry: ${subject || 'No Subject'} from ${name}`,
                    html: `
                        <h3>New Portfolio Inquiry Received</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                        <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
                        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
                        <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; font-family: sans-serif;">${message}</p>
                    `
                };

                await transporter.sendMail(mailOptions);
                emailSent = true;
                console.log(`Inquiry notification email sent to ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);
            } catch (err) {
                console.error('Email send failed:', err.message);
            }
        }

        return res.status(201).json({
            success: true,
            message: 'Inquiry received successfully.',
            data: savedInquiry || { name, email, subject, message, createdAt: new Date() },
            emailSent
        });
    } catch (error) {
        console.error('Error in createInquiry:', error);
        return res.status(500).json({ message: 'Internal server error processing inquiry' });
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
