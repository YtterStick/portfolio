const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(asyncHandler(getProjects))
    .post(protect, asyncHandler(createProject));

router.route('/:id')
    .put(protect, asyncHandler(updateProject))
    .delete(protect, asyncHandler(deleteProject));

module.exports = router;
