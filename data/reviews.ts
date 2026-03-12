export interface Review {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Rahul Verma",
        role: "B.Tech Aspirant",
        content: "EduExpert helped me choose the right college based on my JEE rank. The counselling session was extremely informative and eye-opening.",
        rating: 5,
        avatar: "👤",
    },
    {
        id: 2,
        name: "Priyanka Nair",
        role: "Parent",
        content: "As a parent, I was worried about my daughter's admission. EduExpert provided a clear roadmap and assisted us with all the paperwork.",
        rating: 4.8,
        avatar: "👩",
    },
    {
        id: 3,
        name: "Aditya Hegde",
        role: "Medical Student",
        content: "Fantastic platform! The details about quotas and cut-offs for NEET are very accurate and updated regularly.",
        rating: 5,
        avatar: "🩺",
    },
    {
        id: 4,
        name: "Sneha Reddy",
        role: "MCA Student",
        content: "I found the best PG courses through this site. The comparison tool is a lifesaver when you're confused between multiple universities.",
        rating: 4.5,
        avatar: "💻",
    },
    {
        id: 5,
        name: "Karthik Raja",
        role: "MBA Aspirant",
        content: "Highly recommended for Southern India admissions. Their local presence in cities like Chennai and Bangalore makes a big difference.",
        rating: 4.9,
        avatar: "📈",
    },
    {
        id: 6,
        name: "Deepika Divakar",
        role: "Design Student",
        content: "Enrolling through EduExpert was one of my best decisions. I found a college that truly fits my creative vision and career goals.",
        rating: 5,
        avatar: "🎨",
    },
    {
        id: 7,
        name: "Prachi Sharma",
        role: "B.Com Student",
        content: "The interface is so clean and easy to use. I could compare all top colleges in Bangalore in just a few minutes.",
        rating: 4.7,
        avatar: "📚",
    },
    {
        id: 8,
        name: "Ananya Iyer",
        role: "Psychology Aspirant",
        content: "The counseling team is very patient and knowledgeable. They helped me find the best Arts and Science colleges in Chennai.",
        rating: 5,
        avatar: "🧠",
    },
    {
        id: 9,
        name: "Vikram Singh",
        role: "Architecture Student",
        content: "I was confused about the architecture entrance requirements. EduExpert clarified everything and helped me secure a seat in a top institution.",
        rating: 4.6,
        avatar: "📐",
    },
    {
        id: 10,
        name: "Suresh Babu",
        role: "Engineering Graduate",
        content: "Excellent service! They even helped me understand the placement records and hostel facilities of different colleges accurately.",
        rating: 4.9,
        avatar: "🎓",
    }
];

export default reviews;
