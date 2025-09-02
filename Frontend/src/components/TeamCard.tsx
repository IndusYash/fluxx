import { Mail, Linkedin } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  email: string;
  linkedin?: string;
  github?: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  const [imgError, setImgError] = useState(false);
  const sampleAvatar = `https://i.pravatar.cc/300?img=${(index % 70) + 1}`;
  const imageSrc = (!member.image || member.image === "/placeholder.svg") ? sampleAvatar : member.image;

  return (
    <div className="bg-card rounded-xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 group">
      {/* Larger Profile Image */}
      <div className="flex justify-center mb-4">
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            alt={member.name}
            className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-primary/20"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center bg-gradient-primary text-primary-foreground font-bold text-2xl border-4 border-primary/20">
            {member.name.split(" ").map(n => n[0]).join("").slice(0,3)}
          </div>
        )}
      </div>

      {/* Member Info */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.role}</p>
        <p className="text-sm text-muted-foreground mb-4">{member.description}</p>

        {/* Side-by-side Icons */}
        <div className="flex justify-center items-center gap-3">
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
          >
            <Mail className="w-4 h-4 text-primary" />
          </a>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5 text-primary" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;