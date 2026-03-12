export interface ExamDetail {
    id: number;
    overview: string;
    highlights: { label: string; value: string }[];
    importantDates: { event: string; date: string; status: "upcoming" | "ongoing" | "past" }[];
    pattern: {
        mode: string;
        duration: string;
        totalMarks: string;
        sections: { name: string; questions: string; marks: string }[];
        markingScheme: string;
    };
    syllabus: { subject: string; topics: string[] }[];
    cutoffs: { category: string; percentile: string }[];
    topColleges: string[];
}

const examDetails: Record<number, ExamDetail> = {
    // JEE Main
    1: {
        id: 1,
        overview: "The Joint Entrance Examination (Main), popularly known as JEE Main, is the primary national-level engineering entrance exam conducted by the National Testing Agency (NTA). It serves as the gateway for admission to B.Tech, B.E., B.Arch, and B.Planning courses in top engineering institutes like NITs, IIITs, and CFTIs. It is also the qualifying exam for JEE Advanced.",
        highlights: [
            { label: "Conducting Body", value: "National Testing Agency (NTA)" },
            { label: "Frequency", value: "Twice a Year (Jan & Apr)" },
            { label: "Level", value: "National Level" },
            { label: "Mode of Exam", value: "Computer Based Test (CBT)" },
            { label: "Language", value: "13 Languages including English, Hindi, Tamil" },
            { label: "Total Candidates", value: "Approx. 12-14 Lakhs per session" }
        ],
        importantDates: [
            { event: "Session 1 Registration Starts", date: "01 Nov 2025", status: "past" },
            { event: "Session 1 Exam Window", date: "24 Jan - 01 Feb 2026", status: "past" },
            { event: "Session 2 Registration", date: "02 Feb - 02 Mar 2026", status: "ongoing" },
            { event: "Session 2 Exam Window", date: "01 Apr - 15 Apr 2026", status: "upcoming" },
            { event: "Final Results Declaration", date: "25 Apr 2026", status: "upcoming" }
        ],
        pattern: {
            mode: "Online (CBT) for B.Tech",
            duration: "3 Hours (180 Minutes)",
            totalMarks: "300 Marks",
            markingScheme: "+4 for Correct, -1 for Incorrect (including numerical)",
            sections: [
                { name: "Physics", questions: "20 MCQs + 10 Numerical (Answer any 5)", marks: "100 Marks" },
                { name: "Chemistry", questions: "20 MCQs + 10 Numerical (Answer any 5)", marks: "100 Marks" },
                { name: "Mathematics", questions: "20 MCQs + 10 Numerical (Answer any 5)", marks: "100 Marks" }
            ]
        },
        syllabus: [
            { subject: "Physics", topics: ["Kinematics", "Laws of Motion", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"] },
            { subject: "Chemistry", topics: ["Physical Chemistry (Mole concept, Solutions)", "Inorganic Chemistry (p-block, Co-ordination)", "Organic Chemistry (Hydrocarbons, Polymers)"] },
            { subject: "Mathematics", topics: ["Calculus", "Algebra (Matrices, Probability)", "Coordinate Geometry", "Trigonometry", "Vector Algebra"] }
        ],
        cutoffs: [
            { category: "General (UR)", percentile: "93.2+" },
            { category: "OBC-NCL", percentile: "79.6+" },
            { category: "SC", percentile: "54.0+" },
            { category: "ST", percentile: "42.0+" },
            { category: "General-EWS", percentile: "81.3+" }
        ],
        topColleges: [
            "National Institute of Technology (NIT) Trichy",
            "National Institute of Technology (NIT) Surathkal",
            "Indian Institute of Information Technology (IIIT) Hyderabad",
            "Delhi Technological University (DTU)"
        ]
    },
    // NEET UG
    6: {
        id: 6,
        overview: "The National Eligibility cum Entrance Test (Undergraduate) or NEET UG is the sole national-level medical entrance examination in India. Conducted by the NTA, it is mandatory for students wishing to pursue undergraduate medical (MBBS), dental (BDS), and AYUSH (BAMS, BUMS, BHMS) courses in government and private institutions in India, as well as those intending to study primary medical qualifications abroad.",
        highlights: [
            { label: "Conducting Body", value: "National Testing Agency (NTA)" },
            { label: "Frequency", value: "Once a Year" },
            { label: "Mode of Exam", value: "Offline (Pen and Paper)" },
            { label: "Total Seats (MBBS)", value: "Approx. 1,08,000+ across India" },
            { label: "Total Candidates", value: "Over 24 Lakhs" }
        ],
        importantDates: [
            { event: "Online Application Begins", date: "09 Feb 2026", status: "ongoing" },
            { event: "Last Date to Apply", date: "09 Mar 2026", status: "upcoming" },
            { event: "Correction Window", date: "11 Mar - 15 Mar 2026", status: "upcoming" },
            { event: "NEET UG Exam Date", date: "05 May 2026", status: "upcoming" },
            { event: "Result Declaration", date: "14 Jun 2026", status: "upcoming" }
        ],
        pattern: {
            mode: "Offline (OMR Based)",
            duration: "3 Hours 20 Minutes (200 Mins)",
            totalMarks: "720 Marks",
            markingScheme: "+4 for Correct, -1 for Incorrect, 0 for Unanswered",
            sections: [
                { name: "Physics", questions: "35 (Sec A) + 15 (Sec B, attempt 10)", marks: "180 Marks" },
                { name: "Chemistry", questions: "35 (Sec A) + 15 (Sec B, attempt 10)", marks: "180 Marks" },
                { name: "Botany", questions: "35 (Sec A) + 15 (Sec B, attempt 10)", marks: "180 Marks" },
                { name: "Zoology", questions: "35 (Sec A) + 15 (Sec B, attempt 10)", marks: "180 Marks" }
            ]
        },
        syllabus: [
            { subject: "Physics", topics: ["Mechanics", "Electrodynamics", "Modern Physics", "Thermodynamics", "Optics"] },
            { subject: "Chemistry", topics: ["Chemical Thermodynamics", "Equilibrium", "Coordination Compounds", "Organic Chemistry Basics", "Biomolecules"] },
            { subject: "Biology", topics: ["Human Physiology", "Genetics & Evolution", "Ecology", "Plant Physiology", "Cell Structure"] }
        ],
        cutoffs: [
            { category: "General (UR/EWS)", percentile: "50th Percentile (Score: ~164-720)" },
            { category: "OBC/SC/ST", percentile: "40th Percentile (Score: ~129-163)" }
        ],
        topColleges: [
            "All India Institute of Medical Sciences (AIIMS) New Delhi",
            "Christian Medical College (CMC) Vellore",
            "JIPMER Puducherry",
            "Madras Medical College (MMC) Chennai",
            "Stanley Medical College, Chennai"
        ]
    },
    // TANCET
    3: {
        id: 3,
        overview: "The Tamil Nadu Common Entrance Test (TANCET) is a state-level entrance exam conducted by Anna University, Chennai, on behalf of the Government of Tamil Nadu. It is taken by candidates seeking admission to postgraduate programs like M.Tech, M.E., M.Arch, M.Plan, MCA, and MBA offered by university departments, university colleges of engineering, regional campuses of Anna University, Annamalai University, government and government-aided colleges, and self-financing colleges in Tamil Nadu.",
        highlights: [
            { label: "Conducting Body", value: "Anna University, Chennai" },
            { label: "Frequency", value: "Once a year" },
            { label: "Level", value: "State Level (Tamil Nadu)" },
            { label: "Mode of Exam", value: "Offline (Pen & Paper Base)" },
            { label: "Exam Duration", value: "2 Hours" }
        ],
        importantDates: [
            { event: "TANCET Registration Starts", date: "10 Jan 2026", status: "past" },
            { event: "Registration Closes", date: "07 Feb 2026", status: "past" },
            { event: "Admit Card Release", date: "21 Feb 2026", status: "past" },
            { event: "TANCET (MCA/MBA) Exam", date: "09 Mar 2026", status: "upcoming" },
            { event: "TANCET Result", date: "14 Apr 2026", status: "upcoming" }
        ],
        pattern: {
            mode: "Offline (OMR Based)",
            duration: "2 Hours (120 Minutes)",
            totalMarks: "100 Marks",
            markingScheme: "+1 for Correct, -1/3 for Incorrect",
            sections: [
                { name: "Quantitative Ability", questions: "20 Questions", marks: "20 Marks" },
                { name: "Analytical & Logical Reasoning", questions: "20 Questions", marks: "20 Marks" },
                { name: "Verbal Ability & Reading Comprehension", questions: "60 Questions", marks: "60 Marks" }
            ]
        },
        syllabus: [
            { subject: "Quantitative Ability", topics: ["Arithmetic", "Algebra", "Geometry", "Data Interpretation"] },
            { subject: "Analytical Reasoning", topics: ["Syllogisms", "Blood Relations", "Seating Arrangement", "Puzzles"] },
            { subject: "Verbal Ability", topics: ["Reading Comprehension", "Grammar", "Vocabulary", "Sentence Correction"] }
        ],
        cutoffs: [
            { category: "General", percentile: "Score: 50 - 65+" },
            { category: "OBC", percentile: "Score: 45 - 60+" },
            { category: "SC/ST", percentile: "Score: 35 - 50+" }
        ],
        topColleges: [
            "College of Engineering Guindy (CEG), Anna University",
            "Madras Institute of Technology (MIT), Chennai",
            "PSG College of Technology, Coimbatore",
            "Thiagarajar School of Management, Madurai"
        ]
    },
    // CAT
    8: {
        id: 8,
        overview: "The Common Admission Test (CAT) is India's most prestigious national-level management entrance examination, conducted on a rotational basis by the Indian Institutes of Management (IIMs). It is the gateway to 21 IIMs and over 1,200 other top-tier B-schools across the country, including FMS Delhi, IIT DoMS, SPJIMR, and MDI Gurgaon. The exam evaluates a candidate's aptitude in quantitative skills, data interpretation, logical reasoning, and verbal ability.",
        highlights: [
            { label: "Conducting Body", value: "IIMs (Rotational)" },
            { label: "Frequency", value: "Once a year" },
            { label: "Mode of Exam", value: "Computer Based Test (CBT)" },
            { label: "Validity of Score", value: "1 Year" },
            { label: "Total Candidates", value: "Approx. 3.3 Lakhs" }
        ],
        importantDates: [
            { event: "CAT Notification Release", date: "30 Jul 2026", status: "upcoming" },
            { event: "Registration Starts", date: "02 Aug 2026", status: "upcoming" },
            { event: "Registration Ends", date: "20 Sep 2026", status: "upcoming" },
            { event: "CAT Exam Date", date: "24 Nov 2026", status: "upcoming" },
            { event: "Results Declaration", date: "21 Dec 2026", status: "upcoming" }
        ],
        pattern: {
            mode: "Online (CBT)",
            duration: "2 Hours (40 Minutes per section)",
            totalMarks: "198 Marks",
            markingScheme: "+3 for Correct, -1 for Incorrect MCQ",
            sections: [
                { name: "Verbal Ability & Reading Comprehension (VARC)", questions: "24 Questions", marks: "72 Marks" },
                { name: "Data Interpretation & Logical Reasoning (DILR)", questions: "20 Questions", marks: "60 Marks" },
                { name: "Quantitative Aptitude (QA)", questions: "22 Questions", marks: "66 Marks" }
            ]
        },
        syllabus: [
            { subject: "VARC", topics: ["Reading Comprehension Passages", "Para Jumbles", "Para Summaries", "Odd One Out"] },
            { subject: "DILR", topics: ["Seating Arrangements", "Blood Relations", "Syllogisms", "Venn Diagrams", "Bar/Line Graphs"] },
            { subject: "QA", topics: ["Arithmetic (Profit/Loss, Time/Speed/Distance)", "Algebra", "Geometry", "Modern Math", "Number System"] }
        ],
        cutoffs: [
            { category: "IIM A, B, C (General)", percentile: "99.5+ Percentile" },
            { category: "Other Tier 1 IIMs", percentile: "98.0+ Percentile" },
            { category: "New IIMs", percentile: "95.0+ Percentile" },
            { category: "Top Non-IIMs (FMS, SPJIMR)", percentile: "98.0+ Percentile" }
        ],
        topColleges: [
            "Indian Institute of Management (IIM) Ahmedabad",
            "Indian Institute of Management (IIM) Bangalore",
            "Indian Institute of Management (IIM) Calcutta",
            "Department of Management Studies (DoMS), IIT Madras"
        ]
    }
};

export default examDetails;
