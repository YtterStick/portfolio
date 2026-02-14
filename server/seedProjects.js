const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Project = require('./models/projectModel');

// DNS FIX
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const projects = [
    {
        title: 'Star Wash',
        category: 'Thesis Project',
        description: 'A comprehensive laundry management system features booking, tracking, and admin dashboard. Built to streamline operations for laundry businesses.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
        image: 'https://www.starwashph.com/assets/asset_landing-C5blg0qU.jpg',
        githubLink: 'https://github.com/YtterStick/thesis',
        liveLink: 'https://www.starwashph.com/'
    },
    {
        title: 'E-Commerce Dashboard',
        category: 'Web App',
        description: 'A responsive admin dashboard for managing products, orders, and users with real-time data visualization.',
        techStack: ['React', 'Tailwind', 'Chart.js'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        githubLink: '#',
        liveLink: '#'
    },
    {
        title: 'Portfolio v1',
        category: 'Personal',
        description: 'My previous portfolio website showcasing early web development skills and projects.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        githubLink: '#',
        liveLink: '#'
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Project.deleteMany();
        await Project.insertMany(projects);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
