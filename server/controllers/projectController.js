const Project = require('../models/projectModel');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    const projects = await Project.find({});
    res.json(projects);
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    const { title, description, techStack, image, githubLink, liveLink } = req.body;

    const project = new Project({
        title,
        description,
        techStack,
        image,
        githubLink,
        liveLink
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
    const { title, description, techStack, image, githubLink, liveLink } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = title || project.title;
        project.description = description || project.description;
        project.techStack = techStack || project.techStack;
        project.image = image || project.image;
        project.githubLink = githubLink || project.githubLink;
        project.liveLink = liveLink || project.liveLink;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};
