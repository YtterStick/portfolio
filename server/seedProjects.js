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
        title: 'Evalo',
        category: 'AI EdTech & Proctoring System',
        description: 'An advanced, full-stack classroom assessment and student review portal equipped with multi-tiered Generative AI (student reviewers with pointers, short quizzes, flashcards; teacher question generation) and an anti-cheat proctoring engine (auto fullscreen, Alt+Tab/Esc/Alt+F4 prevention, 3-strike auto-submit, question randomization). Integrates OpenCV Optical Mark Recognition (OMR) for automated paper bubble sheet scanning and 6-digit Student ID evaluation.',
        techStack: ['Next.js 14', 'Python FastAPI', 'OpenCV OMR', 'PostgreSQL', 'GenAI / LLMs', 'Tailwind CSS', 'Google Drive API'],
        image: '/evalo-showcase.jpg',
        githubLink: 'https://github.com/YtterStick/Long-Quiz',
        liveLink: 'https://evalo-edu.vercel.app/'
    },
    {
        title: 'StarWashPH',
        category: 'Enterprise Solution',
        description: 'A comprehensive full-stack enterprise laundry management system with Spring Boot Java backend, React Vite UI, and MongoDB database. Features real-time tracking, customer booking, and multi-site logistics operations.',
        techStack: ['React', 'Tailwind CSS', 'Spring Boot', 'Java', 'MongoDB'],
        image: 'https://www.starwashph.com/assets/asset_landing-C5blg0qU.jpg',
        githubLink: 'https://github.com/YtterStick/thesis',
        liveLink: 'https://www.starwashph.com/'
    },
    {
        title: 'HR TNA Payroll',
        category: 'HR Management System',
        description: 'A comprehensive HR payroll dashboard that allows administrators to manage organization settings, view payroll cycles, and configure employee benefits with responsive UI and audit logging.',
        techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3'],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        githubLink: '#',
        liveLink: 'http://54.179.49.80/hr-tools/hr-tna-payroll/public/organization/settings'
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
