import React from 'react';
import TeamCard from "@/components/TeamCard";
// removed contact-related imports

import aryanImage from "../../assets/images/Aryan.webp";
import ashishImage from "../../assets/images/ashish.jpg";
import shivammishraImage from "../../assets/images/shivamPic.jpg";
import shivamsinghImage from "../../assets/images/shivamsingh.jpg";
import vmishraImage from "../../assets/images/Vish.jpg";
import ysvImage from "../../assets/images/ysv.jpg";
import threeMImage from "../../assets/images/3m.jpg";
import presidentImage from "../../assets/images/president.jpg";
import PriyaImage from "../../assets/images/Priya Singh.jpg";
import RiyaImage from "../../assets/images/Riya Verma.jpg";
import Tamanna from "../../assets/images/Tamanna.jpg";
import Shubham from "../../assets/images/Shubham.jpg";
import Ananya from "../../assets/images/Ananya.jpg";
import Anant from "../../assets/images/Anant Mishra.jpg";
import Aman from "../../assets/images/Aman Rawat.png";
import Prad from "../../assets/images/Pradyuman.webp";
import Aviral from "../../assets/images/Aviral.jpg";
import Anushka from "../../assets/images/Anuphoto - Anushka Singh.jpg";


// Sophomore member images
import abhigyanVardhanImage from "../../assets/images/AbhigyanVardhan.jpg";
import adityaPratapImage from "../../assets/images/AdityaPratap .jpg";
import anshikaTripathiImage from "../../assets/images/AnshikaTripathi  .jpg";
import anushkaChaudharyImage from "../../assets/images/AnushkaChaudhary .jpg";
import atulKumarImage from "../../assets/images/AtulThakur.png";
import auchityaKumarImage from "../../assets/images/AuchityaKumar.jpg";
import ayushSharmaImage from "../../assets/images/AyushSharma.png";
import devanshKumarImage from "../../assets/images/DevanshKumar.jpg";
import divejSinghImage from "../../assets/images/DivejSingh.jpg";
import harshVermaImage from "../../assets/images/HarshVerma.jpg";
import jaiKumarImage from "../../assets/images/JaiKumar.jpg";
import mohdAqdasImage from "../../assets/images/MohdAqdas.jpg";
import nikhilJaiswalImage from "../../assets/images/NikhilJaiswal .jpg";
import prakharShuklaImage from "../../assets/images/PrakharShukla.jpg";
import priyaSinghImage from "../../assets/images/PriyaSingh.jpg";
import princeSahuImage from "../../assets/images/PrinceSahu.jpg";
import rishiImage from "../../assets/images/Rishi.jpg";
import rohanJaiswalImage from "../../assets/images/RohanJaiswal .jpg";
import sameerChauhanImage from "../../assets/images/SameerSingh.jpg";
import stutiTripathiImage from "../../assets/images/StutiTripathi .jpg";
import sudeekshaImage from "../../assets/images/Sudeeksha.jpg";
import surajKumarImage from "../../assets/images/SurajKumar .jpg";


interface TeamMember {
  name: string;
  role: string;
  description?: string;
  email: string;
  linkedin: string;
  image: string;
}


const Team: React.FC = () => {
  // Default placeholder for missing images
  const defaultImage = "../../assets/images/3m.jpg"; // Add your placeholder image path


  const teamMembers: TeamMember[] = [
    // --- seniors, final year, pre-final year members ---
    {
      name: "Aman Kumar Rawat",
      role: "ME-Pre Final Year",
      email: "amankrawat.ds@gmail.com",
      linkedin: "https://www.linkedin.com/in/amankrrawat/",
      image: Aman || defaultImage
    },
    {
      name: "Anant Mishra", 
      role: "BBA Final Year",
      email: "anant.m121@gmail.com",
      linkedin: "https://www.linkedin.com/in/anant-mishraa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      image: Anant || defaultImage
    },
    {
      name: "Ananya",
      role: "CE-Pre Final Year", 
      email: "ananyar0912@gmail.com",
      linkedin: "https://www.linkedin.com/in/ananya-mmmut",
      image: Ananya || defaultImage
    },
    {
      name: "Anushka Singh",
      role: "CSE-Pre Final Year",
      email: "anuskajiya@gmail.com", 
      linkedin: "https://www.linkedin.com/in/anushkasingh-a18a25318/",  
      image: Anushka || defaultImage
    },
    {
      name: "Ashish Kumar Yadav",
      role: "CSE-Pre Final Year",
      email: "kumaryadavashish390@gmail.com",
      linkedin: "https://in.linkedin.com/in/ashish-yadav-040730225",
      image: ashishImage || defaultImage
    },
    {
      name: "Aviral Omar", 
      role: "CHE-Pre Final Year",
      email: "N/A",
      linkedin: "N/A",
      image: Aviral || defaultImage
    },
    {
      name: "Aryan S Shandilya",
      role: "CSE-Pre Final Year",
      email: "aryanacc28@gmail.com", 
      linkedin: "https://www.linkedin.com/in/aryan-s-shandilya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      image: aryanImage || defaultImage
    },
    {
      name: "Pradyumn Agrahari",
      role: "CSE-Pre Final Year",
      email: "pradyumnagrahari111@gmail.com",
      linkedin: "https://www.linkedin.com/in/pradyumn-a-09b209277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", 
      image: Prad || defaultImage
    },
    {
      name: "Priya Singh",
      role: "BBA Final Year", 
      email: "Rina965304@gmail.com",
      linkedin: "https://www.linkedin.com/in/priya-s-1b2329259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      image: PriyaImage || defaultImage
    },
    {
      name: "Riya Verma",
      role: "CSE-Pre Final Year", 
      email: "riya.verma7202@gmail.com",
      linkedin: "https://www.linkedin.com/in/riya-verma-28b461289/",
      image: RiyaImage || defaultImage
    },
    {
      name: "Shivam Mishra",
      role: "CSE-Pre Final Year",
      email: "shivammishra01329@gmail.com",
      linkedin: "https://www.linkedin.com/in/shiv9918",
      image: shivammishraImage || defaultImage
    },
    {
      name: "Shivam Singh", 
      role: "CSE-Pre Final Yearr",
      email: "shivamsingh221045@gmail.com",
      linkedin: "https://www.linkedin.com/in/shivam451/",
      image: shivamsinghImage || defaultImage
    },
    {
      name: "Shubham Rai",
      role: "CSE-Pre Final Year",
      email: "kuvar2003@gmail.com", 
      linkedin: "https://www.linkedin.com/in/shubham-rai-866b2b294/",
      image: Shubham || defaultImage
    },
    {
      name: "Tamanna Sharma",
      role: "EE-Pre Final Year",
      email: "tamanna.sharma9929knp@gmail.com",
      linkedin: "https://www.linkedin.com/in/tamanna-sharma-b3290a294/",
      image: Tamanna || defaultImage
    },
    {
      name: "Vishesh mishra", 
      role: "CSE-Pre Final Year",
      email: "mishravishesh1403@gmail.com",
      linkedin: "https://www.linkedin.com/in/vishesh-mishra-372784218/",
      image: vmishraImage || defaultImage
    },
    {
      name: "Yashasvi Sharma",
      role: "CSE-Pre Final Year",
      email: "yashasvisharma650@gmail.com", 
      linkedin: "https://www.linkedin.com/in/yashasvi-sharma-688245294",
      image: ysvImage || defaultImage
    },
    {
      name: "Yashvardhan Ojha",
      role: "CSE-Pre Final Year", 
      email: "2023021270@mmmut.ac.in",
      linkedin: "https://www.linkedin.com/in/yashvardhann/",
      image: threeMImage || defaultImage
    },

    // --- sophomore year members (added from your image/table) ---
{
    name: "Abhigyan Vardhan Singh",
    role: "Sophomore Year, IT",
    email: "abhigyansingh590@gmail.com ",
    linkedin: "https://www.linkedin.com/in/abhigyan-vardhan-singh-81aa292a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: abhigyanVardhanImage || defaultImage,
  },
  {
    name: "Aditya Pratap Singh",
    role: "Sophomore Year, ECE",
    email: "adityasingh.mails@gmail.com",
    linkedin: "https://www.linkedin.com/in/adityaprasingh",
    image: adityaPratapImage,
  },
  {
    name: "Anshika Tripathi",
    role: "Sophomore Year, BBA",
    email: "anshikaatripathiii@gmail.com ",
    linkedin: "https://www.linkedin.com/in/anshika-tripathi-421a26265",
    image: anshikaTripathiImage
  },
  {
    name: "Anushka Chaudhary",
    role: "Sophomore Year, CSE",
    email: "chaudharyanushka085@gmail.com ",
    linkedin: "https://www.linkedin.com/in/anushka-chaudhary-2b371b316/",
    image: anushkaChaudharyImage,
  },
  {
    name: "Atul Kumar Thakur",
    role: "Sophomore Year, IT",
    email: "atulkumarthakur155@gmail.com",
    linkedin: "https://www.linkedin.com/in/atul1574",
    image: atulKumarImage,
  },
  {
    name: "Auchitya Kumar Shukla",
    role: "Sophomore Year, BBA",
    email: "auchityashukla16@gmail.com",
    linkedin: "https://www.linkedin.com/in/auchitya-shukla-b6ab252b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: auchityaKumarImage,
  },
  {
    name: "Ayush Sharma",
    role: "Sophomore Year, IT",
    email: "ayushsharma172005@gmail.com ",
    linkedin: "https://www.linkedin.com/in/ayush-sharma-20b516325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    image: ayushSharmaImage,
  },
  {
    name: "Devansh Kumar Yadav",
    role: "Sophomore Year, CSE",
    email: " dkyadav020806@gmail.com ",
    linkedin: "https://www.linkedin.com/in/devansh-kumar-yadav-4a8146329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    image: devanshKumarImage,
  },
  {
    name: "Divej Singh",
    role: "Sophomore Year, CSE",
    email: "divejsingh3@gmail.com ",
    linkedin: "https://www.linkedin.com/in/divej-singh-0b6261326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: divejSinghImage,
  },
  {
    name: "Harsh Verma",
    role: "Sophomore Year, CSE",
    email: "verma.harsh7370@gmail.com ",
    linkedin: "https://www.linkedin.com/in/harsh-verma-07974533b",
    image: harshVermaImage,
  },
  {
    name: "Jai Kumar Singh",
    role: "Sophomore Year, CSE",
    email: "jaikumarsingh1920@gmail.com ",
    linkedin: "https://www.linkedin.com/in/jai-kumar-singh-9b3152319",
    image: jaiKumarImage,
  },
  {
    name: "Mohd Aqdas",
    role: "Sophomore Year, CSE",
    email: "aqdas26india@gmail.com",
    linkedin: "https://www.linkedin.com/in/mohd-aqdas-a05456336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    image: mohdAqdasImage,
  },
  {
    name: "Nikhil Jaiswal",
    role: "Sophomore Year, IT",
    email: "nikhiljais9984@gmail.com ",
    linkedin: "https://www.linkedin.com/in/nikhil-jaiswal-980a1132b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: nikhilJaiswalImage,
  },
  {
    name: "Prakhar Shukla",
    role: "Sophomore Year, CSE",
    email: "prakharshukla89508@gmail.com ",
    linkedin: "https://www.linkedin.com/in/prakhar-shukla-22aa10316",
    image: prakharShuklaImage,
  },
    {
    name: "Prince Sahu",
    role: "Sophomore Year, CSE",
    email: "sahuprinceguru@gmail.com ",
    linkedin: "https://linkedin.com/in/prince-sahu-552382326/ ",
    image: princeSahuImage,
  },
  {
    name: "Priya Singh",
    role: "Sophomore Year, CSE",
    email: "singhshruti4131@gmail.com ",
    linkedin: "https://www.linkedin.com/in/priya-singh-393bb82b7",
    image: priyaSinghImage,
  },

  {
    name: "Rishi",
    role: "Sophomore Year, IT",
    email: "rishidiwakar925@gmail.com",
    linkedin: "https://www.linkedin.com/in/rishi-diwakar-a87b86263/",
    image: rishiImage,
  },
  {
    name: "Rohan Jaiswal",
    role: "Sophomore Year, CSE",
    email: "rohanjaiswal611@gmail.com ",
    linkedin: " https://www.linkedin.com/in/rohan-jaiswal-807338328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: rohanJaiswalImage,
  },
  {
    name: "Sameer Singh Chauhan",
    role: "Sophomore Year, CSE",
    email: " itx.sameersinghchauhan@gmail.com",
    linkedin: "https://www.linkedin.com/in/sameer-singh-chauhan-606992356",
    image: sameerChauhanImage,
  },
  {
    name: "Stuti Tripathi",
    role: "Sophomore Year, CSE",
    email: "stuticse28@gmail.com ",
    linkedin: "https://www.linkedin.com/in/stuti-tripathi-534440328",
    image: stutiTripathiImage,
  },
  {
    name: "Sudeeksha",
    role: "Sophomore Year, IT",
    email: "sudeeksha.prakash04@gmail.com ",
    linkedin: "https://www.linkedin.com/in/sudeeksha-sudeeksha-45ba4228b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: sudeekshaImage,
  },
  {
    name: "Suraj Kumar",
    role: "Sophomore Year, CSE",
    email: "st12365489@gmail.com ",
    linkedin: "https://www.linkedin.com/in/suraj-thakur7080933",
    image: surajKumarImage,
  },
  ].filter(member => member.name && member.role); // Filter out any incomplete entries

  // helper to remove year words from role for display
  const cleanRole = (role: string) =>
    role
      .replace(/\b(Sophomore|Final Year|Pre Final Year|Pre-Final Year|Final|Pre Final Yearr|Pre Final|Pre-Final|Year)\b/gi, "")
      .replace(/[-_/]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  
  // split into groups: Sophomore vs others (pre-final)
  const sophomoreMembers = teamMembers.filter(m => /Sophomore/i.test(m.role));
  const preFinalMembers = teamMembers.filter(m => !/Sophomore/i.test(m.role));
 
  const president: TeamMember = {
    name: "Shivam Rai",
    role: "President",
    description: "Sets strategic vision and builds partnerships; leads cross-team initiatives and fosters innovation across the society.",
    email: "president@flux.edu",
    linkedin: "https://www.linkedin.com/in/shivam-rai-a64b84298/", 
    image: presidentImage || defaultImage
  };
 
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 md:h-20"></div>
      
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-up animate-delay-200 relative">
              <span className="relative inline-block">
                <span className="typewriter">Meet Our Team</span>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-sm animate-bounce"></div>
                <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-pink-500/30 to-primary/30 rounded-full blur-sm animate-ping"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-r from-purple-500/40 to-primary/40 rounded-full blur-sm animate-pulse delay-300"></div>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up animate-delay-500 transform hover:scale-105 transition-transform duration-300">
              Connect directly with our passionate leaders who are driving innovation and building the future of technology at our institution.
            </p>
          </div>


          {/* President Card */}
          <div className="flex justify-center mb-16">
            <div className="w-full max-w-lg animate-fade-up animate-delay-700 transform hover:scale-105 transition-all duration-500">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 via-purple-600/60 to-pink-500/60 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700 animate-spin-slow"></div>
                <div className="absolute -top-6 -left-6 w-3 h-3 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-300"></div>
                <div className="absolute -top-4 -right-8 w-2 h-2 bg-purple-500/50 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-500 transition-opacity duration-300"></div>
                <div className="absolute -bottom-6 -right-4 w-4 h-4 bg-pink-500/50 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-1000 transition-opacity duration-300"></div>
                <div className="absolute -bottom-4 -left-8 w-2 h-2 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-700 transition-opacity duration-300"></div>
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-500/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
                
                <div className="relative transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-1">
                  <TeamCard member={president} index={0} />
                </div>
              </div>
            </div>
          </div>


          {/* Team Members Grid */}
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Team Pre-Final Year</h2>
          </div>
          {/* Use flex-wrap so rows with <4 items center; card widths tuned for 4-per-row at lg */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {preFinalMembers.map((member: TeamMember, index: number) => (
              <div
                key={`pre-${member.name}-${index}`}
                className={`group animate-fade-up animate-delay-${Math.min(800 + index * 100, 1600)} transform hover:scale-105 transition-all duration-500 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2`}
              >
                <div className="relative w-full max-w-[34rem] mx-auto">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 via-purple-600/40 to-pink-500/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700 animate-spin-slow"></div>
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-500/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
                  <div className="relative transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-1">
                    {/* show cleaned role (no year / no "Executive Member") */}
                    <TeamCard member={{ ...member, role: cleanRole(member.role) }} index={index + 1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
           
           {/* Team Sophomore Year */}
           <div className="mt-14 mb-6 text-center">
             <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Team Sophomore Year</h2>
           </div>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {sophomoreMembers.map((member: TeamMember, index: number) => {
              const branch = (member.role || "").split(",").pop()?.trim() || cleanRole(member.role);
              return (
                <div
                  key={`soph-${member.name}-${index}`}
                  className={`group animate-fade-up animate-delay-${Math.min(900 + index * 80, 1600)} transform hover:scale-105 transition-all duration-500 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2`}
                >
                  <div className="relative w-full max-w-[34rem] mx-auto">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 via-purple-600/40 to-pink-500/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700 animate-spin-slow"></div>
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-500/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
                    <div className="relative transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-1">
                      {/* show branch as role */}
                      <TeamCard member={{ ...member, role: branch }} index={preFinalMembers.length + index + 1} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      <div className="h-16 md:h-20"></div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-15px) rotate(-1deg); }
            75% { transform: translateY(-5px) rotate(1deg); }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #3b82f6; }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          
          .typewriter {
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            border-right: 3px solid #3b82f6;
            width: 0;
            animation: typewriter 3s steps(13) 0.5s forwards, blink 1s step-end infinite 3.5s;
          }
        `
      }} />
    </div>
  );
};


export default Team;
