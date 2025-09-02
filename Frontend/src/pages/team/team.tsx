// Navigation removed: page should render without header
import TeamCard from "@/components/TeamCard";
import { Mail, Instagram, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import aryanImage from "../../assets/images/Aryan.webp";
import ashishImage from "../../assets/images/ashish.jpg";
import shivamBhardwajImage from "../../assets/images/shivamBhardwaj.jpg";
import shivammishraImage from "../../assets/images/shivammishra.jpg";
import shivamsinghImage from "../../assets/images/shivamsingh.jpg";
import vmishraImage from "../../assets/images/vmishra.jpg";
import ysvImage from "../../assets/images/ysv.jpg";
import threeMImage from "../../assets/images/3m.jpg";
import presidentImage from "../../assets/images/president.jpg";


const Team = () => {
  // ORIGINAL TEAM MEMBERS DATA - COMMENTED FOR FUTURE USE
  /*
  const teamMembersOriginal = [
    {
      name: "Aryan Shandilya",
      role: "Executive Engineer",
      description: "Designs efficient algorithms and mentors competitive programming; focuses on performance and problem-solving best practices.",
      email: "aryanacc28@gmail.com",
      linkedin: "https://www.linkedin.com/in/aryan-s-shandilya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      image: aryanImage
    },
    {
      name: "Ashish Yadav",
      role: "Executive Engineer",
      description: "Leads backend architecture and cloud infrastructure; specializes in scalable APIs, CI/CD and reliability engineering.",
      email: "kumaryadavashish390@gmail.com",
      linkedin: "https://in.linkedin.com/in/ashish-yadav-040730225",
      image: ashishImage
    },
     {
      name: "Shivam Bhardwaj",
      role: "Executive Engineer",
      description: "Manages membership operations and records; ensures smooth onboarding and member support systems.",
      email: "N/A",
      linkedin: "N/A",
      image: shivamBhardwajImage
    },
    {
      name: "Shivam Mishra",
      role: "Executive Engineer",
      description: "Organizes tech events and hackathons; expert in event logistics, speaker curation, and community partnerships.",
      email: "shivammishra01329@gmail.com",
      linkedin: "www.linkedin.com/in/shiv9918",
      image: shivammishraImage
    },
    {
      name: "Shivam Singh",
      role: "Executive Engineer",
      description: "Drives marketing strategy and outreach; focused on growth campaigns, content strategy and social analytics.",
      email: "shivamsingh221045@gmail.com",
      linkedin: "https://www.linkedin.com/in/shivam451/",
      image: shivamsinghImage
    },
   
    {
      name: "Vishesh Mishra",
      role: "Executive Engineer",
      description: "Handles internal coordination and documentation; maintains project trackers and communication channels.",
      email: "mishravishesh1403@gmail.com",
      linkedin: "https://www.linkedin.com/in/vishesh-mishra-372784218/",
      image: vmishraImage
    },
    {
      name: "Yashasvi Sharma",
      role: "Executive Engineer",
      description: "Front-end specialist focused on accessible UI, component design and polishing user experiences.",
      email: "yashasvisharma650@gmail.com",
      linkedin: "https://www.linkedin.com/in/yashasvi-sharma-688245294/",
      image: ysvImage
    },
    {
      name: "Yashvardhan Ojha",
      role: "Executive Engineer",
      description: "Full-stack developer supporting integrations, tooling and automations to streamline developer workflows.",
      email: "2023021270@mmmut.ac.in",
      linkedin: "https://www.linkedin.com/in/yashvardhann/",
      image: threeMImage
    }
  ];
  */

  // PLACEHOLDER TEAM MEMBERS - AWAITING INDUCTION
  const teamMembers = [
    {
      name: "Awaiting Induction",
      role: "Executive Engineer",
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!",
      email: "N/A",
      linkedin: "N/A",
      image: "?" // This will be handled in TeamCard to show question mark
    },
    {
      name: "Awaiting Induction",
      role: "Executive Engineer", 
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!",
      email: "N/A",
      linkedin: "N/A",
      image: "?" // This will be handled in TeamCard to show question mark
    },
    {
      name: "Awaiting Induction",
      role: "Executive Engineer",
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!",
      email: "N/A", 
      linkedin: "N/A",
      image: "?" // This will be handled in TeamCard to show question mark
    },
    {
      name: "Awaiting Induction",
      role: "Executive Engineer",
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!",
      email: "N/A",
      linkedin: "N/A", 
      image: "?" // This will be handled in TeamCard to show question mark
    },
    {
      name: "Awaiting Induction",
      role: "Executive Engineer",
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!",
      email: "N/A",
      linkedin: "N/A",
      image: "?" // This will be handled in TeamCard to show question mark
    },
    {
      name: "Awaiting Induction", 
      role: "Executive Engineer",
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!",
      email: "N/A",
      linkedin: "N/A",
      image: "?" // This will be handled in TeamCard to show question mark
    },
    {
      name: "Awaiting Induction",
      role: "Executive Engineer", 
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!",
      email: "N/A",
      linkedin: "N/A",
      image: "?" // This will be handled in TeamCard to show question mark
    },
    {
      name: "Awaiting Induction",
      role: "Executive Engineer",
      description: "This position is currently open and awaiting the induction of a new team member. Stay tuned for updates!", 
      email: "N/A",
      linkedin: "N/A",
      image: "?" // This will be handled in TeamCard to show question mark
    }
  ];

  // President as separate object for special positioning
  const president = {
    name: "Shivam Rai",
    role: "President",
    description: "Sets strategic vision and builds partnerships; leads cross-team initiatives and fosters innovation across the society.",
    email: "president@flux.edu",
    linkedin: "linkedin.com/in/shivam-rai-a64b84298",
    image: presidentImage
  };

  // UPDATED CONTACT INFO - Email as normal text
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      description: "Drop us a line at:",
      value: "flux@mmmut.ac.in",
      link: "mailto:flux@mmmut.ac.in",
      buttonText: null // No button for email
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
      value: "FLUX",
      link: "https://instagram.com/flux.mmmut",
      buttonText: "Connect"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "FLUX",
      link: "https://www.linkedin.com/company/flux-mmm/",
      buttonText: "Connect"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "CSED, MMMUT, Tech District, Gorakhpur, U.P.",
      link: "https://www.google.com/maps/search/?api=1&query=CSED+MMMUT+Tech+District+Gorakhpur+UP",
      buttonText: "View Map"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Space */}
      <div className="h-16 md:h-20"></div>
      
      {/* Team Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-up animate-delay-200 relative">
              <span className="relative inline-block">
                <span className="typewriter">Meet Our Team</span>
                {/* Floating elements around the heading */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-sm animate-bounce"></div>
                <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-pink-500/30 to-primary/30 rounded-full blur-sm animate-ping"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-r from-purple-500/40 to-primary/40 rounded-full blur-sm animate-pulse delay-300"></div>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up animate-delay-500 transform hover:scale-105 transition-transform duration-300">
              Connect directly with our passionate leaders who are driving innovation 
              and building the future of technology at our institution.
            </p>
          </div>

          {/* President Card - Centered */}
          <div className="flex justify-center mb-16">
            <div className="w-full max-w-lg animate-fade-up animate-delay-700 transform hover:scale-105 transition-all duration-500">
              <div className="group relative">
                {/* Animated gradient border - only on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 via-purple-600/60 to-pink-500/60 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700 animate-spin-slow"></div>
                {/* Floating particles - only visible on hover */}
                <div className="absolute -top-6 -left-6 w-3 h-3 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 animate-float transition-opacity duration-300"></div>
                <div className="absolute -top-4 -right-8 w-2 h-2 bg-purple-500/50 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-500 transition-opacity duration-300"></div>
                <div className="absolute -bottom-6 -right-4 w-4 h-4 bg-pink-500/50 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-1000 transition-opacity duration-300"></div>
                <div className="absolute -bottom-4 -left-8 w-2 h-2 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-700 transition-opacity duration-300"></div>
                {/* Mini floating particles that appear on hover */}
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-500/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
                
                <div className="relative transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-1">
                  <TeamCard member={president} index={0} />
                </div>
              </div>
            </div>
          </div>

          {/* Other Team Members - PLACEHOLDER CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`group animate-fade-up animate-delay-${800 + (index * 100)} transform hover:scale-105 transition-all duration-500`}
              >
                <div className="relative">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 via-purple-600/40 to-pink-500/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700 animate-spin-slow"></div>
                  {/* Floating mini particles */}
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-500/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-300"></div>
                  
                  <div className="relative transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-1">
                    <TeamCard member={member} index={index + 1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-up animate-delay-200">
              <span className="text-foreground">Get in </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up animate-delay-500">
              Ready to join our community? Here's how you can reach us.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group gradient-card rounded-xl p-6 text-center animate-fade-up animate-delay-${700 + (index * 100)} hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500`}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{info.label}</h3>
                
                {/* Special handling for email section - NO COLORING */}
                {info.label === "Email" ? (
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">{info.description}</p>
                    <a href={info.link} className="text-sm">
                      {info.value}
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mb-3">{info.value}</p>
                )}

                {/* Button for non-email items */}
                {info.buttonText && (
                  <Button variant="outline" size="sm" asChild className="group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300">
                    <a href={info.link} target="_blank" rel="noopener noreferrer">
                      {info.buttonText}
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Space */}
      <div className="h-16 md:h-20"></div>
      
      {/* Custom animations */}
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
