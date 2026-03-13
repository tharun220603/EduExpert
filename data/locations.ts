export interface Location {
  id: number;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  emoji: string;
  color: string;
}

const locations: Location[] = [
  {
    id: 1,
    city: "Chennai",
    state: "Tamil Nadu",
    address: "123, Anna Salai, Opposite to Spencer Plaza, Chennai - 600002",
    phone: "+91 98400 12345",
    email: "chennai@eduexpert.com",
    emoji: "🌊",
    color: "#1e40af",
  },
  {
    id: 2,
    city: "Bangalore",
    state: "Karnataka",
    address: "45, MG Road, Near Brigade Road Junction, Bangalore - 560001",
    phone: "+91 99000 54321",
    email: "bangalore@eduexpert.com",
    emoji: "🌳",
    color: "#15803d",
  },
  {
    id: 3,
    city: "Hyderabad",
    state: "Telangana",
    address: "89, Banjara Hills Road No. 1, Hyderabad - 500034",
    phone: "+91 97000 67890",
    email: "hyderabad@eduexpert.com",
    emoji: "🏰",
    color: "#b91c1c",
  },
  {
    id: 5,
    city: "Coimbatore",
    state: "Tamil Nadu",
    address: "567, Avinashi Road, Peelamedu, Coimbatore - 641004",
    phone: "+91 96500 55667",
    email: "coimbatore@eduexpert.com",
    emoji: "⛰️",
    color: "#d97706",
  },
  {
    id: 6,
    city: "Madurai",
    state: "Tamil Nadu",
    address: "78, Madurai bypass Road, Madurai - 625001",
    phone: "+91 91200 44556",
    email: "madurai@eduexpert.com",
    emoji: "🏛️",
    color: "#7e22ce",
  },
];

export default locations;
