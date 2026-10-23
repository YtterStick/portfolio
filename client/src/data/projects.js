export const projectsData = [
    {
        _id: '1',
        title: 'Evalo',
        subtitle: 'Assessment & Student Review Portal with AI & Anti-Cheat Proctoring',
        category: 'AI EdTech & Proctoring System',
        featured: true,
        badge: 'Featured Flagship',
        description: 'An advanced, full-stack classroom assessment and student review portal equipped with multi-tiered Generative AI and a robust anti-cheat proctoring engine. Built for both students and educators, Evalo automates the entire examination and revision lifecycle—from AI-generated study pointers, flashcard reviewers, and practice quizzes to automated paper sheet grading using computer vision.',
        metrics: [
            { label: 'Anti-Cheat Enforcement', value: '3-Strike Auto-Submit' },
            { label: 'Student AI Reviewer', value: 'Pointers & Flashcards' },
            { label: 'Evaluation Engine', value: 'OpenCV OMR & Digital' },
            { label: 'Cloud Architecture', value: 'FastAPI + Next.js 14' }
        ],
        keyFeatures: [
            {
                title: 'AI Student Reviewer Suite',
                desc: 'Generates structured study guides with key pointers, adaptive short practice quizzes, and interactive flashcard reviewers to accelerate knowledge retention.'
            },
            {
                title: 'AI Teacher Assessment Creator',
                desc: 'Empowers educators to automatically draft subject-specific exam questions, customizable difficulty tiers, and verified digital answer keys in seconds.'
            },
            {
                title: 'High-Security Anti-Cheat Proctoring',
                desc: 'Enforces automatic fullscreen mode upon starting. Intercepts Alt+Tab, Esc, Alt+F4, and window blur events with real-time warnings, triggering an automatic exam submission after 3 detected infractions.'
            },
            {
                title: 'Question & Option Randomization',
                desc: 'Dynamically randomizes question sequences and answer order for every student session to eliminate adjacent peer cheating.'
            },
            {
                title: 'OpenCV OMR Bubble Sheet Engine',
                desc: 'Employs computer vision for perspective correction on paper sheets, decoding 6-digit Student IDs and automatically evaluating answers with anomaly flagging.'
            }
        ],
        techStack: ['Next.js 14', 'Python FastAPI', 'OpenCV OMR', 'PostgreSQL', 'GenAI / LLMs', 'Tailwind CSS', 'Google Drive API'],
        image: '/evalo-actual-ui.png',
        githubLink: 'https://github.com/YtterStick/Long-Quiz',
        liveLink: 'https://evalo-edu.vercel.app/'
    },
    {
        _id: '2',
        title: 'StarWashPH',
        subtitle: 'Enterprise Laundry Logistics & Multi-Site Operations Platform',
        category: 'Enterprise Solution',
        featured: false,
        badge: 'Enterprise Production',
        description: 'Architected a full-stack, end-to-end enterprise solution utilizing a robust Spring Boot Java backend coupled with MongoDB for efficient, scalable data management. Developed a highly responsive user interface using React Vite and Tailwind CSS to streamline multi-site laundry logistics, customer order tracking, and real-time operations, reducing manual administrative friction by 40%.',
        metrics: [
            { label: 'Efficiency Gain', value: '40% Less Friction' },
            { label: 'Architecture', value: 'Spring Boot + React' },
            { label: 'Database', value: 'MongoDB Scaled' }
        ],
        keyFeatures: [
            {
                title: 'Multi-Site Logistics Tracking',
                desc: 'Real-time monitoring of laundry batch lifecycle across multiple branch locations with automated status updates.'
            },
            {
                title: 'Customer Self-Service Portal',
                desc: 'Intuitive order placement, pickup scheduling, and SMS/email notifications for seamless customer communication.'
            },
            {
                title: 'Enterprise Admin Dashboard',
                desc: 'Comprehensive revenue reporting, staff role-based access control, and operational telemetry.'
            }
        ],
        techStack: ['React', 'Tailwind CSS', 'Spring Boot', 'Java', 'MongoDB'],
        image: '/starwash.jpg',
        githubLink: 'https://github.com/YtterStick/thesis',
        liveLink: 'https://www.starwashph.com/'
    },
    {
        _id: '3',
        title: 'HR TNA Payroll',
        subtitle: 'Time & Attendance, Payroll Cycles and Benefits Management System',
        category: 'HR Management System',
        featured: false,
        badge: 'HR & Operations',
        description: 'A comprehensive human resources and time & attendance (TNA) payroll management dashboard. Enables organizational administrators to configure multi-tier employee benefits, track attendance cycles, automate deductions, and process compliant payroll with detailed audit trails.',
        metrics: [
            { label: 'Process Automation', value: 'End-to-End Payroll' },
            { label: 'Architecture', value: 'PHP + MySQL + JS' },
            { label: 'Security', value: 'Role-Based Auditing' }
        ],
        keyFeatures: [
            {
                title: 'Automated Payroll Calculation',
                desc: 'Dynamic deduction computation for taxes, health benefits, social security, and overtime allowances.'
            },
            {
                title: 'Time & Attendance Auditing',
                desc: 'Accurate logging of employee clock-in/out timestamps, leave credits, and attendance history.'
            },
            {
                title: 'Organization Configuration',
                desc: 'Centralized settings for department structuring, salary grade scaling, and administrative policies.'
            }
        ],
        techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3'],
        image: '/payroll.jpg',
        githubLink: '#',
        liveLink: 'http://54.179.49.80/hr-tools/hr-tna-payroll/public/organization/settings'
    }
];
