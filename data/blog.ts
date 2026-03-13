export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string; // Image is now optional
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Choose the Right Engineering College in South India",
    slug: "choosing-right-engineering-college",
    excerpt: "Finding the perfect college can be overwhelming. Here's a comprehensive guide to help you make the right choice based on rankings, placements, and campus culture.",
    content: `
# How to Choose the Right Engineering College in South India

South India is home to some of the most prestigious engineering institutions in the country. From the IITs and NITs to top-tier private universities like VIT and SRM, students are spoiled for choice. However, this abundance can also lead to confusion.

## Key Factors to Consider

### 1. NIRF Rankings
The National Institutional Ranking Framework (NIRF) provides a reliable metric for comparing colleges based on teaching, research, and graduation outcomes. Always check the latest rankings before making a shortlist.

### 2. Infrastructure & Labs
Engineering is a hands-on field. Ensure the college you choose has state-of-the-art laboratories and research facilities in your chosen branch.

### 3. Placement History
Look beyond the "highest package." Check the average placement statistics and the list of core companies that visit the campus annually.

### 4. Location & Campus Life
Proximity to industrial hubs can offer better internship opportunities. Additionally, a vibrant campus life contributes significantly to personal growth.

## Conclusion
Make an informed decision by visiting campuses and talking to current students and alumni. Your four years in college will shape your entire career!
    `,
    category: "Engineering",
    author: "Aditi Sharma",
    date: "March 10, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Rise of AI and Data Science Courses: What You Need to Know",
    slug: "rise-of-ai-data-science-courses",
    excerpt: "Artificial Intelligence and Data Science are transforming the job market. Discover why these courses are in high demand and what they entail.",
    content: `
# The Rise of AI and Data Science Courses

The digital revolution has brought AI and Data Science to the forefront of technology. Today, every industry is looking for professionals who can harness the power of data.

## Why Choose AI & Data Science?

* **Career Growth:** The demand for AI engineers and Data Scientists far outweighs the current supply.
* **High Salaries:** These roles are among the highest-paying in the tech industry.
* **Versatility:** You can work in healthcare, finance, retail, and more.

## What is Taught?
Most courses cover Python programming, Machine Learning algorithms, Big Data technologies, and Statistical Analysis.

## Preparing for the Future
If you have a strong foundation in mathematics and a passion for problem-solving, AI and Data Science could be the perfect path for you.
    `,
    category: "Technology",
    author: "Rahul V.",
    date: "March 5, 2026",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "NEET 2026 Preparation: Top Mistakes to Avoid",
    slug: "neet-2026-preparation-mistakes",
    excerpt: "Aspiring for a career in medicine? Learn about the common pitfalls students face during NEET preparation and how to stay on track.",
    content: `
# NEET 2026 Preparation: Top Mistakes to Avoid

The National Eligibility cum Entrance Test (NEET) is one of the toughest exams in India. While hard work is essential, smart work is what distinguishes successful candidates.

## Common Pitfalls

1. **Ignoring NCERT:** 90% of NEET questions are directly or indirectly based on NCERT textbooks. Never skip them.
2. **Lack of Mock Tests:** Practicing in a timed environment is crucial for building speed and accuracy.
3. **Over-referring to Multiple Books:** Stick to a few high-quality resources instead of confusing yourself with too many authors.
4. **Neglecting Health:** Your mind works best when your body is healthy. Balanced diet and sleep are non-negotiable.

## Stay Consistent
Create a realistic schedule and stick to it. Consistency is the key to cracking NEET!
    `,
    category: "Medical",
    author: "Dr. S. Karthik",
    date: "February 28, 2026",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "NIRF 2025: IIT Madras Retains #1 Spot for the 7th Consecutive Year Across Engineering Colleges",
    slug: "nirf-2025-iit-madras-retains-top-spot",
    excerpt: "IIT Madras continues its dominance in the NIRF rankings, securing the top position for the seventh year in a row.",
    content: `
# NIRF 2025: IIT Madras Retains #1 Spot

The Ministry of Education has released the NIRF 2025 rankings, and once again, IIT Madras has emerged as the leader in the engineering category. This marks the seventh consecutive year that the institution has held the top spot.

## Why IIT Madras?
The institution's focus on research, innovation, and industry collaboration has been instrumental in its continued success. With a high score in 'Teaching, Learning & Resources' and 'Graduation Outcomes', IIT Madras remains the preferred choice for engineering aspirants.

## Other Top Performers
IIT Delhi and IIT Bombay secured the second and third positions, respectively, while NIT Tiruchirappalli continues to be the top-ranked NIT.
    `,
    category: "Rankings",
    author: "EduExpert Staff",
    date: "March 5, 2026",
    readTime: "3 min read"
  },
  {
    id: 5,
    title: "JEE Advanced 2025 Applications Now Open — Deadline Set for March 15",
    slug: "jee-advanced-2025-applications-open",
    excerpt: "The application window for JEE Advanced 2025 is now open. Eligible candidates must register before the March 15 deadline.",
    content: `
# JEE Advanced 2025 Applications Now Open

Aspiring engineers who have qualified JEE Main 2025 can now apply for JEE Advanced 2025. The registration process is entirely online.

## Important Dates
* **Application Start:** February 28, 2025
* **Application Deadline:** March 15, 2025
* **Exam Date:** May 2025 (Tentative)

## Eligibility
Candidates must be among the top performers in JEE Main and meet the specific category-wise cutoff marks.
    `,
    category: "Exams",
    author: "EduExpert Staff",
    date: "February 28, 2026",
    readTime: "2 min read"
  },
  {
    id: 6,
    title: "VIT Vellore Launches New B.Tech Programme in Artificial Intelligence & Data Science for 2026",
    slug: "vit-vellore-new-ai-ds-programme",
    excerpt: "VIT Vellore has announced a new B.Tech specialization in AI and Data Science starting from the 2026 academic year.",
    content: `
# VIT Vellore Launches New B.Tech in AI & Data Science

To meet the growing demand for AI professionals, VIT Vellore is introducing a specialized B.Tech programme in Artificial Intelligence and Data Science.

## Programme Highlights
* Curriculum designed in collaboration with industry experts.
* Focus on machine learning, deep learning, and big data analytics.
* Excellent placement opportunities in top tech firms.

The programme aims to equip students with the skills needed to excel in the evolving technological landscape.
    `,
    category: "Admissions",
    author: "EduExpert Staff",
    date: "February 20, 2026",
    readTime: "3 min read"
  },
  {
    id: 7,
    title: "NEET UG 2025 Application Window Extended to February 28 — NMC Official Notification",
    slug: "neet-ug-2025-application-extension",
    excerpt: "The National Medical Commission has extended the NEET UG 2025 application deadline to February 28.",
    content: `
# NEET UG 2025 Application Window Extended

In a relief to thousands of medical aspirants, the NMC has extended the last date for NEET UG 2025 registration.

## New Deadline
* **Extended Date:** February 28, 2026
* **Official Website:** neet.nta.nic.in

Candidates who missed the previous deadline are encouraged to complete their registration at the earliest to avoid last-minute technical issues.
    `,
    category: "Exams",
    author: "EduExpert Staff",
    date: "February 15, 2026",
    readTime: "2 min read"
  }
];

export default blogPosts;
