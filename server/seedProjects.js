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
        description: 'An advanced, full-stack classroom assessment and student review portal engineered with a strict anti-cheating proctoring engine and multi-tiered Generative AI. Its primary purpose is securing digital examinations by enforcing automatic full-screen mode that prevents Alt+Tab, Esc, Alt+F4, and window switching—automatically submitting the test after 3 warning strikes. Built for maximum flexibility, Evalo empowers educators to create comprehensive exams either with AI assistance or without AI (custom manual authoring), while giving students AI-generated study pointers, flashcard reviewers, practice quizzes, and automated computer vision bubble sheet grading.',
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
