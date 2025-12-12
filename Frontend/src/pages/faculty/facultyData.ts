import SatvikSir from '../../assets/images/SatvikSir.jpg';
import shwetSir from '../../assets/images/shwetSir.jpeg';
import SatyaSir from '../../assets/images/SatyaSir.jpeg';

import hod from '../../assets/images/RakeshSir.jpg';
import jpSaini from '../../assets/images/JPSaini.jpg';  // Correct image
import bkSharma from '../../assets/images/BKSharma.jpg';  // New image import
import shantanu from '../../assets/images/shantanu.jpg'
export interface FacultyMember {
  id: number;
  name: string;
  title: string;
  department: string;
  specialization: string[];
  email: string;
  phone: string;
  profileImage: string;
  description: string;
  publications?: number;
  experience?: number;
  citations?: number | string;
  skills?: number;
  linkedinUrl?: string;
  websiteUrl?: string;
  googleScholarUrl?: string;

  patents?: string;
  projectPublications?: string;
  booksPublished?: string;
  internationalPublications?: string;
  organisations?: string;
  internationalConferences?: string;
  articles?: string;
  areasOfExpertise?: string;
  review?: string;
  
  isHOD?: boolean;
  qualification?: string;
  teachingExperienceUG?: number;
  teachingExperiencePG?: number;
  seminarsOrganised?: number;
  seminarsAttended?: number;
  memberships?: string[];
  mtechSupervised?: number;
  phdSupervised?: number;
  additionalInfo?: string;
}

export const facultyData: FacultyMember[] = [

  // ⭐ UNDER GUIDANCE — Prof. J.P. Saini
  {
    id: 0,
    name: "Prof. J.P. Saini",
    title: "Hon'ble Vice Chancellor",
    department: "",
    specialization: [
      
    ],
    email: "",
    phone: "+91-XXXXXXXXXX",
    profileImage: jpSaini,
    description:
      "Madan Mohan Malaviya University of Technology, Gorakhpur",
    isHOD: false,
    qualification: "",
    additionalInfo: "Vice Chancellor MMMUT Gorakhpur."
  },

  // ⭐ UNDER GUIDANCE — Prof. Rakesh Kumar (HOD)
  {
    id: 1,
    name: "Prof. Rakesh Kumar",
    title: "Professor & Head",
    department: "Computer Science and Engineering",
    specialization: [
      "Mobile & Distributed Computing",
      "Internet of Things",
      "Sensor Networks",
      "Network Security",
      "Machine Learning",
      "Cloud Computing",
      "Image Processing"
    ],
    email: "rkiitr@gmail.com",
    phone: "+91-XXXXXXXXXX",
    profileImage: hod,
    description:
      "Leading the Computer Science and Engineering department with extensive expertise in mobile computing and distributed systems.",
    isHOD: true,

    qualification: "PhD / IIT Roorkee",
    teachingExperienceUG: 32,
    teachingExperiencePG: 28,
    seminarsOrganised: 16,
    seminarsAttended: 45,
    memberships: ["IEEE", "FIE(India)", "FIETE", "CSI", "ISTE", "ACM", "IAENG"],
    mtechSupervised: 32,
    phdSupervised: 12,
    additionalInfo: "Recipient of Best Teacher Award."
  },

  // 👨‍🏫 FACULTY COORDINATORS — Dr. Satya Prakash Yadav
  {
    id: 2,
    name: "Dr. Satya Prakash Yadav",
    title: "Associate Professor",
    department: "Computer Science and Engineering",
    specialization: [
      "Computer Vision",
      "Natural Language Processing",
      "Robotics",
      "Neural Networks"
    ],
    email: "spycs@mmmut.ac.in",
    phone: "+91-9876543210",
    profileImage: SatyaSir,
    description:
      "Renowned researcher in computer vision and robotics with extensive industry collaborations.",
    linkedinUrl: "https://www.linkedin.com/in/satya-prakash-yadav",
    googleScholarUrl: "https://scholar.google.com/citations?user=aKRVzKMAAAAJ",
    articles: "120+",
    citations: "2700+",
    experience: 17,
    booksPublished: "4+",
    organisations: "10+"
  },

  // 👨‍🏫 FACULTY COORDINATORS — Dr. Satvik Vats
  {
    id: 3,
    name: "Dr. B.K Sharma",
    title: "Assosiate Professor",
    department: "Computer Science & Engineering",
    specialization: [
      "Internet of Things (IoT)",
      "Internet of Healthcare Things (IoHT)",
      "Wireless Networks",
      "Smart Systems"
    ],
    email: "bkscs@mmmut.ac.in",
    phone: "+91-XXXXXXXXXX",
    profileImage: bkSharma,
    description:
      "Specializing in Algorithms, Image Processing, IPR & ML/DL",
    linkedinUrl: "https://www.linkedin.com/in/dr-birendra-kumar-sharma-286633380",
    
    citations: "1500+",
    patents: "5+",
    internationalConferences: "4+",
    internationalPublications: "17+",
    organisations: "5+",
    review: "12"
  },
  

  // 👨‍🏫 FACULTY COORDINATORS — Dr. Shwet Ketu
  {
    id: 4,
    name: "Dr. Shwet Ketu",
    title: "Assistant Professor",
    department: "Computer Science & Engineering",
    specialization: [
      "Internet of Things (IoT)",
      "Internet of Healthcare Things (IoHT)",
      "Wireless Networks",
      "Smart Systems"
    ],
    email: "skcse@mmmut.ac.in",
    phone: "+91-XXXXXXXXXX",
    profileImage: shwetSir,
    description:
      "Expert in IoT systems and healthcare technology integration.",
    linkedinUrl: "https://www.linkedin.com/in/shwetketu",
    websiteUrl: "https://sites.google.com/view/shwetketu",
    citations: "1000+",
    patents: "6+",
    internationalConferences: "4+",
    internationalPublications: "13+",
    organisations: "5+",
    review: "10"
  },
  {
    id: 3,
    name: "Dr. Satvik Vats",
    title: "Assistant Professor",
    department: "Computer Science and Engineering",
    specialization: ["Big Data", "Deep Learning", "Machine Learning", "AI"],
    email: "svcse@mmmut.ac.in",
    phone: "+91-XXXXXXXXXX",
    profileImage: SatvikSir,
    description:
      "Specializing in Big Data analytics and Deep Learning applications.",
    linkedinUrl: "https://www.linkedin.com/in/satvik-vats",
    websiteUrl: "https://svats.in",
    citations: "2700+",
    patents: "20+",
    projectPublications: "75+",
    booksPublished: "4+",
    internationalPublications: "18+"
  },
  {
    id: 5,
    name: "Dr. Shantanu Shahi",
    title: "Assistant Professor",
    department: "Computer Science & Engineering",
    specialization: [
      "Machine Learning(ML)",
      "Deep Learning",
      "Industrial Internet of Things(IIoT)",
      "Amazon Web Services(AWS)"
    ],
    email: "dsscse@mmmut.ac.in",
    phone: "+91-XXXXXXXXXX",
    profileImage: shantanu,
    description:
      "Specializing in face recognition algorithms, deep learning, and IoT applications.",
    linkedinUrl: "https://www.linkedin.com/in/dr-shantanu-shahi-5a1b8325b",
    
    citations: "1000+",
    patents: "6+",
    internationalConferences: "4+",
    internationalPublications: "13+",
    organisations: "5+",
    review: "10"
  }
  
];

// ---------------------------------------------
// EXPORT SEPARATE LISTS FOR TWO SECTIONS
// ---------------------------------------------

export const underGuidance = facultyData.filter(
  (f) => f.id === 0 || f.id === 1
);

export const facultyCoordinators = facultyData.filter(
  (f) => f.id >= 2
);
