// ─── Image Imports ─────────────────────────────────────────────────────────────

// Batch 2027 (Final Year / Seniors)
import shivammishraImage from "@/assets/images/Shivam_Mishra.jpeg";
import ysvImage from "@/assets/images/ysv.webp";
import Aviral from "@/assets/images/Aviral.webp";
import threeMImage from "@/assets/images/3m.webp";
import Shubham from "@/assets/images/Shubham.webp";
import aryanImage from "@/assets/images/Aryan.webp";
import Prad from "@/assets/images/Pradyuman.webp";
import Ananya from "@/assets/images/Ananya.webp";
import Tamanna from "@/assets/images/Tamanna.webp";
import Aman from "@/assets/images/Aman Rawat.webp";
import ashishImage from "@/assets/images/ashish.webp";
import shivamsinghImage from "@/assets/images/shivamsingh.webp";
import RiyaImage from "@/assets/images/Riya Verma.webp";
import vmishraImage from "@/assets/images/Vish.webp";
import Anushka from "@/assets/images/Anuphoto - Anushka Singh.webp";

// Batch 2028 (Pre-Final Year / Juniors)
import jaiKumarImage from "@/assets/images/JaiKumar.webp";
import priyaSinghImage from "@/assets/images/Priya.jpeg";
import princeSahuImage from "@/assets/images/Prince.jpeg";
import sudeekshaImage from "@/assets/images/Sudeeksha.jpeg";
import atulKumarImage from "@/assets/images/Atul.jpeg";
import rishiImage from "@/assets/images/Rishi.jpeg";
import abhigyanVardhanImage from "@/assets/images/AbhigyanVardhan.webp";
import stutiTripathiImage from "@/assets/images/StutiTripathi .webp";
import surajKumarImage from "@/assets/images/SurajKumar .webp";
import devanshKumarImage from "@/assets/images/Devansh.jpeg";
import prakharShuklaImage from "@/assets/images/PrakharShukla.webp";
import rohanJaiswalImage from "@/assets/images/RohanJaiswal .webp";
import sameerChauhanImage from "@/assets/images/SameerSingh.webp";
import anushkaChaudharyImage from "@/assets/images/AnushkaChaudhary .webp";
import ayushSharmaImage from "@/assets/images/AyushSharma.webp";
import divejSinghImage from "@/assets/images/DivejSingh.webp";
import harshVermaImage from "@/assets/images/HarshVerma.webp";
import nikhilJaiswalImage from "@/assets/images/NikhilJaiswal .webp";
import anshikaTripathiImage from "@/assets/images/AnshikaTripathi  .webp";
import auchityaKumarImage from "@/assets/images/AuchityaKumar.webp";

// Batch 2029 (Sophomore Year / Second Year)
import aashishKumarImage from "@/assets/images/Aashish kumar.webp";
import aditiVermaImage from "@/pages/faculty/Aditi.jpeg";
import adityaGuptaImage from "@/assets/images/Aditya Gupta.webp";
import adityaShuklaImage from "@/assets/images/AdityaShukla.jpeg";
import anuradhaSrivastavaImage from "@/assets/images/Anuradha Srivastava.webp";
import arpitaMishraImage from "@/assets/images/Arpita Mishra.webp";
import deepakShivhareImage from "@/assets/images/Deepak Shivhare.webp";
import himanshuMauryaImage from "@/assets/images/HIMANSHU MAURYA.webp";
import khushiPatelImage from "@/assets/images/Khushi Patel.webp";
import mahakSinghImage from "@/assets/images/Mahak.jpeg";
import pradumnaManuImage from "@/assets/images/Pradumna Manu.webp";
import rishirajImage from "@/assets/images/rishiraj.webp";
import ritishaImage from "@/assets/images/ritisha.webp";
import saumyjeetKumarImage from "@/assets/images/Saumyjeet kumar.webp";
import shrutiTripathiImage from "@/assets/images/struti.jpeg";
import sundaramDubeyImage from "@/assets/images/Sundaram Dubey.webp";
import utkarshImage from "@/assets/images/Utkarsh.png";
import vinitKumarImage from "@/assets/images/VINIT RAJENDRA KUMAR.webp";

// ─── Member Interface ──────────────────────────────────────────────────────────
export interface Member {
  name: string;
  role: string;
  branch: string;
  batch: string;
  email?: string;
  linkedin?: string;
  github?: string;
  image: string;
  imagePosition?: string;
  imageScale?: number;
}

// ─── Year Section Interface ────────────────────────────────────────────────────
export interface YearSectionConfig {
  id: string;
  num: string;
  title: string;
  sub: string;
  desc: string;
  batch: string;
  members: Member[];
}

// ─── Senior / Final Year Members ───────────────────────────────────────────────
export const finalYearMembers: Member[] = [
  {
    name: 'Shivam Mishra',
    role: 'President',
    branch: 'CSE',
    batch: "'27",
    email: 'shivammishra01329@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shiv9918',
    image: shivammishraImage,
  },
  {
    name: 'Yashasvi Sharma',
    role: 'Vice President',
    branch: 'CSE',
    batch: "'27",
    email: 'yashasvisharma650@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yashasvi-sharma-688245294',
    image: ysvImage,
  },
  {
    name: 'Aviral Omar',
    role: 'Head of Operations',
    branch: 'ChE',
    batch: "'27",
    email: 'aviralmaster@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aviral-omar-763878294',
    image: Aviral,
  },
  {
    name: 'Yashvardhan Ojha',
    role: 'Additional Coordinator',
    branch: 'CSE',
    batch: "'27",
    email: '2023021270@mmmut.ac.in',
    linkedin: 'https://www.linkedin.com/in/yashvardhann/',
    image: threeMImage,
    imageScale: 1.2,
  },
  {
    name: 'Shubham Rai',
    role: 'Treasurer',
    branch: 'CSE',
    batch: "'27",
    email: 'kuvar2003@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shubham-rai-866b2b294/',
    image: Shubham,
  },
  {
    name: 'Aryan S. Shandilya',
    role: 'Development Head',
    branch: 'CSE',
    batch: "'27",
    email: 'aryanacc28@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aryan-s-shandilya',
    image: aryanImage,
  },
  {
    name: 'Pradyumn Agrahari',
    role: 'Development Head',
    branch: 'CSE',
    batch: "'27",
    email: 'pradyumnagrahari111@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pradyumn-a-09b209277',
    image: Prad,
  },
  {
    name: 'Ananya',
    role: 'Design Head',
    branch: 'CE',
    batch: "'27",
    email: 'ananyar0912@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ananya-mmmut',
    image: Ananya,
  },
  {
    name: 'Tamanna Sharma',
    role: 'Design Head',
    branch: 'EE',
    batch: "'27",
    email: 'tamanna.sharma9929knp@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tamanna-sharma-b3290a294/',
    image: Tamanna,
  },
  {
    name: 'Aman Kumar Rawat',
    role: 'Photography & Video Head',
    branch: 'ME',
    batch: "'27",
    email: 'amankrawat.ds@gmail.com',
    linkedin: 'https://www.linkedin.com/in/amankrrawat/',
    image: Aman,
  },
  {
    name: 'Ashish Kumar Yadav',
    role: 'Algorithms Head',
    branch: 'CSE',
    batch: "'27",
    email: 'kumaryadavashish390@gmail.com',
    linkedin: 'https://in.linkedin.com/in/ashish-yadav-040730225',
    image: ashishImage,
  },
  {
    name: 'Shivam Singh',
    role: 'Algorithms Head',
    branch: 'CSE',
    batch: "'27",
    email: 'shivamsingh221045@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shivam451/',
    image: shivamsinghImage,
  },
  {
    name: 'Riya Verma',
    role: 'AI & ML Head',
    branch: 'CSE',
    batch: "'27",
    email: 'riya.verma7202@gmail.com',
    linkedin: 'https://www.linkedin.com/in/riya-verma-28b461289/',
    image: RiyaImage,
  },
  {
    name: 'Vishesh Mishra',
    role: 'AI & ML Head',
    branch: 'CSE',
    batch: "'27",
    email: 'mishravishesh1403@gmail.com',
    linkedin: 'https://www.linkedin.com/in/vishesh-mishra-372784218/',
    image: vmishraImage,
  },
  {
    name: 'Anushka Singh',
    role: 'Content & Social Media Head',
    branch: 'CSE',
    batch: "'27",
    email: 'anuskajiya@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anushkasingh-a18a25318/',
    image: Anushka,
  },
];

// ─── Junior / Pre-Final Year Members ───────────────────────────────────────────
export const preFinalYearMembers: Member[] = [
  {
    name: 'Jai Kumar Singh',
    role: 'Joint Secretary',
    branch: 'CSE',
    batch: "'28",
    email: 'jaikumarsingh1920@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jai-kumar-singh-9b3152319',
    image: jaiKumarImage,
  },
  {
    name: 'Priya Singh',
    role: 'Joint Secretary',
    branch: 'CSE',
    batch: "'28",
    email: 'singhshruti4131@gmail.com',
    linkedin: 'https://www.linkedin.com/in/priya-singh-393bb82b7',
    image: priyaSinghImage,
  },
  {
    name: 'Prince Sahu',
    role: 'Operations Coordinator',
    branch: 'CSE',
    batch: "'28",
    email: 'sahuprinceguru@gmail.com',
    linkedin: 'https://linkedin.com/in/prince-sahu-552382326/',
    image: princeSahuImage,
  },
  {
    name: 'Sudeeksha',
    role: 'Operations Coordinator',
    branch: 'IT',
    batch: "'28",
    email: 'sudeeksha.prakash04@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sudeeksha-sudeeksha-45ba4228b',
    image: sudeekshaImage,
  },
  {
    name: 'Atul Kumar Thakur',
    role: 'Development Lead',
    branch: 'IT',
    batch: "'28",
    email: 'atulkumarthakur155@gmail.com',
    linkedin: 'https://www.linkedin.com/in/atul1574',
    image: atulKumarImage,
  },
  {
    name: 'Rishi',
    role: 'Development Lead',
    branch: 'IT',
    batch: "'28",
    email: 'rishidiwakar925@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rishi-diwakar-a87b86263/',
    image: rishiImage,
  },
  {
    name: 'Abhigyan Vardhan Singh',
    role: 'Design Lead',
    branch: 'IT',
    batch: "'28",
    email: 'abhigyansingh590@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abhigyan-vardhan-singh-81aa292a5',
    image: abhigyanVardhanImage,
  },
  {
    name: 'Stuti Tripathi',
    role: 'Design Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'stuticse28@gmail.com',
    linkedin: 'https://www.linkedin.com/in/stuti-tripathi-534440328',
    image: stutiTripathiImage,
  },
  {
    name: 'Suraj Kumar',
    role: 'Photography & Video Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'st12365489@gmail.com',
    linkedin: 'https://www.linkedin.com/in/suraj-thakur7080933',
    image: surajKumarImage,
  },
  {
    name: 'Devansh Kumar Yadav',
    role: 'Algorithms Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'dkyadav020806@gmail.com',
    linkedin: 'https://www.linkedin.com/in/devansh-kumar-yadav-4a8146329',
    image: devanshKumarImage,
  },
  {
    name: 'Prakhar Shukla',
    role: 'Algorithms Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'prakharshukla89508@gmail.com',
    linkedin: 'https://www.linkedin.com/in/prakhar-shukla-22aa10316',
    image: prakharShuklaImage,
  },
  {
    name: 'Rohan Jaiswal',
    role: 'Algorithms Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'rohanjaiswal611@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rohan-jaiswal-807338328',
    image: rohanJaiswalImage,
  },
  {
    name: 'Sameer Singh Chauhan',
    role: 'Algorithms Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'itx.sameersinghchauhan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sameer-singh-chauhan-606992356',
    image: sameerChauhanImage,
  },
  {
    name: 'Anushka Chaudhary',
    role: 'AI & ML Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'chaudharyanushka085@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anushka-chaudhary-2b371b316/',
    image: anushkaChaudharyImage,
    imagePosition: 'center 46%',
    imageScale: 1.15,
  },
  {
    name: 'Ayush Sharma',
    role: 'AI & ML Lead',
    branch: 'IT',
    batch: "'28",
    email: 'ayushsharma172005@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ayush-sharma-20b516325',
    image: ayushSharmaImage,
  },
  {
    name: 'Divej Singh',
    role: 'Content & Social Media Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'divejsingh3@gmail.com',
    linkedin: 'https://www.linkedin.com/in/divej-singh-0b6261326',
    image: divejSinghImage,
  },
  {
    name: 'Harsh Verma',
    role: 'Content & Social Media Lead',
    branch: 'CSE',
    batch: "'28",
    email: 'verma.harsh7370@gmail.com',
    linkedin: 'https://www.linkedin.com/in/harsh-verma-07974533b',
    image: harshVermaImage,
  },
  {
    name: 'Nikhil Jaiswal',
    role: 'Content & Social Media Lead',
    branch: 'IT',
    batch: "'28",
    email: 'nikhiljais9984@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nikhil-jaiswal-980a1132b',
    image: nikhilJaiswalImage,
  },
  {
    name: 'Anshika Tripathi',
    role: 'Content & Social Media Lead',
    branch: 'BBA',
    batch: "'28",
    email: 'anshikaatripathiii@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anshika-tripathi-421a26265',
    image: anshikaTripathiImage,
  },
  {
    name: 'Auchitya Kumar Shukla',
    role: 'Content & Social Media Lead',
    branch: 'BBA',
    batch: "'28",
    email: 'auchityashukla16@gmail.com',
    linkedin: 'https://www.linkedin.com/in/auchitya-shukla-b6ab252b4',
    image: auchityaKumarImage,
  },
];

// ─── Sophomore / Second Year Members ───────────────────────────────────────────
export const sophomoreMembers: Member[] = [
  {
    name: 'Aashish Kumar',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: '2025021301@mmmut.ac.in',
    linkedin: 'https://www.linkedin.com/in/theaashishkumar/',
    image: aashishKumarImage,
  },
  {
    name: 'Aditi Verma',
    role: 'Executive Member',
    branch: 'IT',
    batch: "'29",
    email: 'aditiverma9945@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aditi-verma-a5a541328',
    image: aditiVermaImage,
  },
  {
    name: 'Aditya Gupta',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: 'guptaaditya002006@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aditya-gupta-a734ba377/',
    image: adityaGuptaImage,
  },
  {
    name: 'Aditya Shukla',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: 'aadityashukla2412@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aditya-shukla-2412-sam',
    image: adityaShuklaImage,
  },
  {
    name: 'Anuradha Srivastava',
    role: 'Executive Member',
    branch: 'IT',
    batch: "'29",
    email: 'srivastavaanu7922@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anuradha-srivastava-514465378',
    image: anuradhaSrivastavaImage,
  },
  {
    name: 'Arpita Mishra',
    role: 'Executive Member',
    branch: 'ME',
    batch: "'29",
    email: 'vaibhavarpita987@gmail.com',
    linkedin: 'https://www.linkedin.com/in/arpita-mishra-3051a8378',
    image: arpitaMishraImage,
  },
  {
    name: 'Deepak Shivhare',
    role: 'Executive Member',
    branch: 'IT',
    batch: "'29",
    email: 'dk23107575@gmail.com',
    linkedin: 'https://www.linkedin.com/in/deepak-shivhare-443333381',
    image: deepakShivhareImage,
  },
  {
    name: 'Himanshu Maurya',
    role: 'Executive Member',
    branch: 'IT',
    batch: "'29",
    email: 'hm3997353@gmail.com',
    linkedin: 'https://linkedin.com/in/himanshumaurya29',
    image: himanshuMauryaImage,
  },
  {
    name: 'Khushi Patel',
    role: 'Executive Member',
    branch: 'IT',
    batch: "'29",
    email: 'khushiipatel657@gmail.com',
    linkedin: 'https://www.linkedin.com/in/khushi-patel-160462378',
    image: khushiPatelImage,
  },
  {
    name: 'Mahak Singh',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: 'mahaksinghofficial@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mahak-singh-814858327',
    image: mahakSinghImage,
  },
  {
    name: 'Pradumna Manu',
    role: 'Executive Member',
    branch: 'BBA',
    batch: "'29",
    email: 'pradumanmanu@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pradumna-manu-8595643b6',
    image: pradumnaManuImage,
  },
  {
    name: 'Rishiraj Kasaudhan',
    role: 'Executive Member',
    branch: 'BBA',
    batch: "'29",
    email: 'rishirajkasaudhan5705@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rishi-raj-kasaudhan-6615343a8',
    image: rishirajImage,
    imagePosition: 'object-top',
  },
  {
    name: 'Ritisha Raghuvanshi',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: 'ritisharaghuvanshi95@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ritisha-raghuvanshi-3612a3379',
    image: ritishaImage,
  },
  {
    name: 'Saumyjeet Kumar',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: '2025021256@mmmut.ac.in',
    linkedin: 'https://www.linkedin.com/in/saumyjeet-kumar-pandey-602a51362/',
    image: saumyjeetKumarImage,
  },
  {
    name: 'Shruti Tripathi',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: 'shrutitripathi369@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shruti-tripathi-20342132b',
    image: shrutiTripathiImage,
  },
  {
    name: 'Sundaram Dubey',
    role: 'Executive Member',
    branch: 'IT',
    batch: "'29",
    email: '2025071161@mmmut.ac.in',
    linkedin: 'https://www.linkedin.com/in/sundaram-dubey-a563a3378',
    image: sundaramDubeyImage,
  },
  {
    name: 'Utkarsh Shrivastava',
    role: 'Executive Member',
    branch: 'CSE',
    batch: "'29",
    email: 'rajatshrivastava036@gmail.com',
    linkedin: 'https://www.linkedin.com/in/utkarsh-shrivastava-a767b8435',
    image: utkarshImage,
  },
  {
    name: 'Vinit Kumar',
    role: 'Executive Member',
    branch: 'IT',
    batch: "'29",
    email: '2025071166@mmmut.ac.in',
    linkedin: 'https://www.linkedin.com/in/vinitkumar491/',
    image: vinitKumarImage,
  },
];

// ─── Reusable Year Sections Config ─────────────────────────────────────────────
// The order is strictly: Final Year -> Pre-Final Year -> Sophomore Year
export const YEAR_SECTIONS: YearSectionConfig[] = [
  {
    id: 'seniors',
    num: '01',
    title: 'FINAL YEAR',
    sub: '',
    desc: 'The final year team — leading, building and leaving a lasting impact at FLUX.',
    batch: "'27",
    members: finalYearMembers,
  },
  {
    id: 'pre-final',
    num: '02',
    title: 'PRE-FINAL YEAR',
    sub: '',
    desc: 'The pre-final year team — driving initiatives, architecting systems and mentoring the next generation.',
    batch: "'28",
    members: preFinalYearMembers,
  },
  {
    id: 'sophomores',
    num: '03',
    title: 'SOPHOMORE YEAR',
    sub: '',
    desc: 'The sophomore team — passionate learners and energetic builders taking on ambitious challenges.',
    batch: "'29",
    members: sophomoreMembers,
  },
];
