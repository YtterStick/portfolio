export const projectsData = [
    {
        _id: '1',
        title: 'Evalo',
        subtitle: 'Assessment & Student Review Portal with AI & Anti-Cheat Proctoring',
        category: 'AI EdTech & Proctoring System',
        featured: true,
        description: 'An end-to-end digital assessment platform combining strict anti-cheat proctoring, flexible AI-assisted or manual exam authoring, student AI study tools, and automated OpenCV OMR bubble-sheet grading.',
        caseStudy: {
            problem: 'Educators struggled with widespread online exam cheating, time-consuming manual quiz creation, and slow paper bubble-sheet grading.',
            solution: 'Built a full-stack Next.js + FastAPI platform with 3-strike fullscreen anti-cheat proctoring, GenAI/manual exam authoring, and OpenCV OMR sheet scanning.',
            impact: 'Cut exam prep & grading time by [X]% and reduced unauthorized tab-switching incidents by [X]% across [X]+ student assessments.'
        },
        metrics: [
            { label: 'Grading Time Saved', value: '[X]% Faster' },
            { label: 'Anti-Cheat Enforcement', value: '3-Strike Auto-Submit' },
            { label: 'Assessments Processed', value: '[X]+ Exams' },
            { label: 'Evaluation Engine', value: 'OpenCV OMR & AI' }
        ],
        keyFeatures: [
            {
                title: 'Exam Creation (With or Without AI)',
                desc: 'Gives educators full flexibility to construct examinations either automatically using Generative AI (subject-specific questions, difficulty tiers, and verified answer keys) or without AI through custom manual authoring.'
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
        description: 'A full-stack Spring Boot, MongoDB, and React platform unifying multi-branch laundry logistics, customer self-service order tracking, and real-time executive reporting.',
        caseStudy: {
            problem: 'Multi-branch laundry operations relied on fragmented spreadsheets and manual status updates, causing order delays and high administrative overhead.',
            solution: 'Architected a centralized Spring Boot + MongoDB backend with a React Vite self-service portal, automated branch dispatch, and RBAC admin dashboards.',
            impact: 'Reduced manual administrative friction by 40%, accelerated order turnaround by [X]%, and unified tracking across [X]+ branch locations.'
        },
        metrics: [
            { label: 'Admin Friction', value: '40% Reduction' },
            { label: 'Order Turnaround', value: '[X]% Faster' },
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
        description: 'An automated human resources, time-and-attendance (TNA), and payroll platform with multi-tier benefits configuration, tax/overtime calculations, and role-based audit trails.',
        caseStudy: {
            problem: 'Manual attendance reconciliation and spreadsheet payroll runs created costly calculation errors, compliance risks, and multi-day payout delays.',
            solution: 'Built a centralized PHP + MySQL payroll engine that syncs attendance logs, automates tax/benefit deductions, and enforces role-based audit trails.',
            impact: 'Eliminated [X]% of manual payroll calculation errors and cut cycle processing time from [X] days to [X] hours for [X]+ employees.'
        },
        metrics: [
            { label: 'Cycle Time Saved', value: '[X]% Faster Runs' },
            { label: 'Payroll Accuracy', value: '[X]% Error-Free' },
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
    },
    {
        _id: '4',
        title: 'Tactiq',
        subtitle: 'Unified Business Operating System for CRM, Invoicing & Project Delivery',
        category: 'SaaS & Business OS',
        featured: true,
        badge: 'Multi-Workspace SaaS',
        description: 'A unified Next.js business operating system that brings customer relationships, invoicing, client portals, and project delivery into a single connected workspace—eliminating app-switching and data silos.',
        caseStudy: {
            problem: 'Growing service businesses and agencies lose visibility and billable hours juggling disconnected CRM, invoicing, and project tracking tools.',
            solution: 'Built a multi-workspace Next.js platform featuring isolated client portals, role-based audit trails, and timezone/currency-aware (Asia/Manila, PHP) operations.',
            impact: 'Eliminated [X]+ hours of weekly app-switching and centralized [X]% of client communication, billing, and delivery into one workspace.'
        },
        metrics: [
            { label: 'App-Switching Saved', value: '[X]+ hrs/week' },
            { label: 'Architecture', value: 'Next.js Multi-Tenant' },
            { label: 'Auditability', value: 'Full Action Trail' },
            { label: 'Localization', value: 'Multi-Currency & TZ' }
        ],
        keyFeatures: [
            {
                title: 'Multiple Isolated Workspaces',
                desc: 'Single sign-on to manage every business unit or client workspace independently with clean data separation.'
            },
            {
                title: 'Dedicated Client Portal',
                desc: 'Share live project progress, deliverables, and invoices with clients without exposing internal operations.'
            },
            {
                title: 'Comprehensive Audit Trail',
                desc: 'Every critical change across CRM records, invoices, and tasks is logged with user attribution and timestamps.'
            },
            {
                title: 'Timezone & Currency Aware',
                desc: 'Configurable per workspace (defaulting to Asia/Manila and PHP) for accurate billing and scheduling.'
            }
        ],
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Multi-Tenant SaaS'],
        image: '/tactiq.jpg',
        githubLink: '#',
        liveLink: 'https://tactiq-web.onrender.com/'
    },
    {
        _id: '5',
        title: 'AniVerse',
        subtitle: 'Dark-Mode Anime Discovery, Watchlist & Streaming Platform',
        category: 'Media & Streaming Web App',
        featured: false,
        badge: 'Cloudflare Pages',
        description: 'A fast, responsive dark-themed anime discovery and streaming dashboard engineered for smooth browsing of trending series, personal watchlist management, and persistent watch history tracking.',
        caseStudy: {
            problem: 'Many streaming portals suffer from cluttered layouts, intrusive popups, and poor mobile responsiveness when tracking ongoing series.',
            solution: 'Engineered a sleek, edge-deployed React + Vite streaming interface with instant search, curated trending feeds, watchlist management, and watch-history sync.',
            impact: 'Delivered sub-second page loads on Cloudflare Edge and improved episode discovery & resume-watching speed by [X]%.'
        },
        metrics: [
            { label: 'Edge Delivery', value: 'Cloudflare Pages' },
            { label: 'Load Performance', value: 'Sub-Second UI' },
            { label: 'State Tracking', value: 'Watchlist & History' },
            { label: 'UX Design', value: 'Mobile-First Dark UI' }
        ],
        keyFeatures: [
            {
                title: 'Trending & Catalog Discovery',
                desc: 'Curated dark-mode dashboard showcasing trending anime series, genres, and instant search filtering.'
            },
            {
                title: 'Watchlist & History Tracking',
                desc: 'Seamless episode progress tracking and personal watchlist management across sessions.'
            },
            {
                title: 'Edge-Deployed Performance',
                desc: 'Hosted globally on Cloudflare Pages for low-latency asset delivery and responsive mobile playback.'
            }
        ],
        techStack: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'REST APIs'],
        image: '/aniverse.jpg',
        githubLink: '#',
        liveLink: 'https://anime-verse-ytter.pages.dev/'
    }
];
