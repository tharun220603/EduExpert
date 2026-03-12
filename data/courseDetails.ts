export interface CourseDetail {
    id: number;
    overview: string;
    highlights: { label: string; value: string }[];
    curriculum: { semester: string; subjects: string[] }[];
    careerPath: { role: string; salary: string; description: string }[];
    topRecruiters: string[];
    admissionProcess: string[];
}

const courseDetails: Record<number, CourseDetail> = {
    // B.Tech CSE
    1: {
        id: 1,
        overview: "B.Tech in Computer Science and Engineering (CSE) is a 4-year undergraduate program that integrates the fields of computer science and electrical engineering. The course focuses on theoretical foundations of computation, algorithms, programming languages, software design, and computer hardware. It is currently the most sought-after engineering discipline due to the booming software industry and high placement packages.",
        highlights: [
            { label: "Duration", value: "4 Years (8 Semesters)" },
            { label: "Eligibility", value: "10+2 with Physics, Chemistry, and Mathematics (min. 60%)" },
            { label: "Admission", value: "Entrance Exams (JEE Main, TNEA, VITEEE)" },
            { label: "Average Starting Salary", value: "₹4 Lakhs to ₹15 Lakhs per annum" }
        ],
        curriculum: [
            { semester: "Year 1 (Sem 1 & 2)", subjects: ["Engineering Mathematics", "Engineering Physics", "Basics of C Programming", "Engineering Graphics", "Basic Electrical & Electronics"] },
            { semester: "Year 2 (Sem 3 & 4)", subjects: ["Data Structures & Algorithms", "Object Oriented Programming (Java/C++)", "Computer Organization & Architecture", "Discrete Mathematics", "Operating Systems"] },
            { semester: "Year 3 (Sem 5 & 6)", subjects: ["Database Management Systems", "Computer Networks", "Software Engineering", "Theory of Computation", "Compiler Design"] },
            { semester: "Year 4 (Sem 7 & 8)", subjects: ["Artificial Intelligence", "Cloud Computing", "Cryptography & Network Security", "Electives (IoT, Big Data)", "Final Year Project"] }
        ],
        careerPath: [
            { role: "Software Developer/Engineer", salary: "₹5L - ₹15L PA", description: "Design, build, and maintain software applications and systems." },
            { role: "Data Scientist", salary: "₹8L - ₹20L PA", description: "Analyze complex data to help organizations make better decisions using ML." },
            { role: "Full Stack Developer", salary: "₹6L - ₹16L PA", description: "Develop both front-end and back-end architectures of web applications." },
            { role: "Cloud Architect", salary: "₹10L - ₹25L PA", description: "Oversee a company's cloud computing strategy and deployments." }
        ],
        topRecruiters: [
            "Microsoft", "Google", "Amazon", "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Zoho", "Freshworks"
        ],
        admissionProcess: [
            "Secure a high rank in national/state entrance exams (JEE Main, KEAM, KCET).",
            "Participate in state counseling (like TNEA in Tamil Nadu) based on 12th board cutoffs.",
            "Apply via direct university exams (VITEEE, SRMJEEE, AEEE).",
            "Clear personal interviews/document verification at the allotted institution."
        ]
    },
    // MBBS
    6: {
        id: 6,
        overview: "Bachelor of Medicine and Bachelor of Surgery (MBBS) is a 5.5-year professional degree program that trains students in the medical sciences to become certified doctors. The program involves 4.5 years of rigorous academic education covering pre-clinical, para-clinical, and clinical subjects, followed by a mandatory 1-year rotating internship in hospitals. It is the fundamental medical degree required to practice medicine or pursue specialization in India.",
        highlights: [
            { label: "Duration", value: "5.5 Years (4.5 Academic + 1 Year Internship)" },
            { label: "Eligibility", value: "10+2 with Physics, Chemistry, Biology (min. 50%)" },
            { label: "Admission", value: "Strictly through NEET UG" },
            { label: "Average Starting Salary", value: "₹5 Lakhs to ₹12 Lakhs per annum" }
        ],
        curriculum: [
            { semester: "Pre-Clinical (Phase 1)", subjects: ["Human Anatomy", "Physiology", "Biochemistry"] },
            { semester: "Para-Clinical (Phase 2)", subjects: ["Pathology", "Microbiology", "Pharmacology", "Forensic Medicine"] },
            { semester: "Clinical (Phase 3)", subjects: ["General Medicine", "General Surgery", "Pediatrics", "Obstetrics & Gynecology", "Orthopedics"] },
            { semester: "Internship (1 Year)", subjects: ["Mandatory Rotatory Residential Internship (CRRI) in various hospital wards."] }
        ],
        careerPath: [
            { role: "General Physician", salary: "₹6L - ₹12L PA", description: "Diagnose and treat primary medical conditions in clinics or hospitals." },
            { role: "Specialist/Surgeon (Post MD/MS)", salary: "₹15L - ₹40L+ PA", description: "Expertise in specialized areas like Cardiology, Neurology, or Orthopedics." },
            { role: "Medical Officer", salary: "₹7L - ₹10L PA", description: "Serve in government hospitals or armed forces through UPSC CMS." },
            { role: "Medical Researcher", salary: "₹5L - ₹15L PA", description: "Conduct clinical research and trials for pharmaceutical companies or institutes." }
        ],
        topRecruiters: [
            "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Government Hospitals", "Armed Forces Medical Services", "AIIMS", "Dr. Reddy's Laboratories"
        ],
        admissionProcess: [
            "Qualify the NEET UG examination with a competitive score.",
            "Register for centralized counseling via MCC (15% All India Quota).",
            "Register for state-level counseling (85% State Quota).",
            "Secure seat allocation, undergo medical fitness tests, and verify documents."
        ]
    },
    // MBA
    12: {
        id: 12,
        overview: "The Master of Business Administration (MBA) is a globally recognized 2-year postgraduate program designed to develop skills in business and management. It covers core areas like accounting, finance, marketing, human resources, and operations. MBA programs incorporate case studies, internships, and practical projects to prepare graduates for leadership roles, strategic decision-making, and entrepreneurial ventures.",
        highlights: [
            { label: "Duration", value: "2 Years (4 Semesters)" },
            { label: "Eligibility", value: "Graduation in any discipline (min. 50%)" },
            { label: "Admission", value: "CAT, MAT, XAT, TANCET, GMAT" },
            { label: "Average Starting Salary", value: "₹6 Lakhs to ₹30 Lakhs per annum (varies widely by institute)" }
        ],
        curriculum: [
            { semester: "Year 1 (Core Foundations)", subjects: ["Organizational Behavior", "Managerial Economics", "Financial Accounting", "Marketing Management", "Operations Management", "Business Statistics"] },
            { semester: "Summer Internship", subjects: ["8-12 weeks of mandatory corporate internship giving hands-on industry experience."] },
            { semester: "Year 2 (Specializations)", subjects: ["Marketing: Brand Management, Digital Marketing", "Finance: Investment Banking, Risk Management", "HR: Talent Acquisition, Labor Laws", "Business Strategy & Capstone Project"] }
        ],
        careerPath: [
            { role: "Management Consultant", salary: "₹12L - ₹35L PA", description: "Advise organizations on improving performance and solving complex problems." },
            { role: "Investment Banker", salary: "₹15L - ₹40L PA", description: "Raise capital for clients and manage large corporate financial transactions." },
            { role: "Marketing Manager", salary: "₹8L - ₹25L PA", description: "Oversee marketing campaigns, brand identity, and market research." },
            { role: "HR Manager", salary: "₹7L - ₹20L PA", description: "Manage recruitment, employee relations, and organizational culture." }
        ],
        topRecruiters: [
            "McKinsey & Co", "BCG", "Deloitte", "Goldman Sachs", "HUL", "P&G", "Amazon", "Tata Administrative Services (TAS)"
        ],
        admissionProcess: [
            "Appear for national or state-level entrance exams (CAT/TANCET).",
            "Clear shortlisting cutoffs set by respective B-schools.",
            "Participate in Group Discussion (GD), Written Ability Test (WAT), and Personal Interview (PI).",
            "Final selection based on academic profile, work experience, and interview performance."
        ]
    },
    // B.Com
    9: {
        id: 9,
        overview: "Bachelor of Commerce (B.Com) is a 3-year undergraduate degree dealing with principles of accounting, finance, economics, and business management. It is one of the most popular traditional undergraduate courses, providing a solid theoretical and practical foundation for students looking to build a career in finance, banking, taxation, or preparing for professional courses like CA, CS, and CMA.",
        highlights: [
            { label: "Duration", value: "3 Years (6 Semesters)" },
            { label: "Eligibility", value: "10+2 with Commerce/Accountancy background" },
            { label: "Admission", value: "Merit-based (Class 12 Marks) or University Entrance Exams" },
            { label: "Average Starting Salary", value: "₹3 Lakhs to ₹6 Lakhs per annum" }
        ],
        curriculum: [
            { semester: "Year 1", subjects: ["Financial Accounting", "Business Organization & Management", "Business Economics", "Business Law", "Environmental Studies"] },
            { semester: "Year 2", subjects: ["Corporate Accounting", "Cost Accounting", "Income Tax Law & Practice", "Company Law", "E-Commerce"] },
            { semester: "Year 3", subjects: ["Management Accounting", "Auditing & Corporate Governance", "Financial Management", "Goods & Services Tax (GST)", "Entrepreneurship Development"] }
        ],
        careerPath: [
            { role: "Accountant/Tax Consultant", salary: "₹2.5L - ₹5L PA", description: "Maintain financial records, prepare tax returns, and ensure compliance." },
            { role: "Chartered Accountant (CA) - Post Qual.", salary: "₹8L - ₹20L PA", description: "Highly respected professional auditing, taxation, and financial advisory role." },
            { role: "Financial Analyst", salary: "₹4L - ₹8L PA", description: "Analyze financial data, identify trends, and assist in business planning." },
            { role: "Bank Probationary Officer (PO)", salary: "₹5L - ₹7L PA", description: "Manage banking operations and customer relations in public/private sector banks." }
        ],
        topRecruiters: [
            "EY", "KPMG", "PwC", "Deloitte", "HDFC Bank", "ICICI Bank", "Genpact", "TCS (BPS)"
        ],
        admissionProcess: [
            "Submit applications to desired colleges upon the release of 12th board results.",
            "Colleges release cut-off lists based on aggregate percentage.",
            "Attend centralized counseling or direct admission based on the merit list.",
            "Pay fees and complete document verification."
        ]
    }
};

export default courseDetails;
