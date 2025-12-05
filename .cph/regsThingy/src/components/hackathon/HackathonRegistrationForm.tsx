import React, { useState } from 'react';
import { Plus, Rocket, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TeamMemberCard, { TeamMember } from './TeamMemberCard';
import FileUpload from './FileUpload';
import { toast } from 'sonner';
import { uploadFile, submitTeam, TeamPayload, checkTeamExists } from '@/lib/api/hackathon';

const PROJECTS = [
  { id: '1', name: 'AI-Powered Healthcare Assistant' },
  { id: '2', name: 'Sustainable Smart City Solution' },
  { id: '3', name: 'Blockchain-Based Supply Chain' },
  { id: '4', name: 'EdTech Learning Platform' },
  { id: '5', name: 'FinTech Payment Innovation' },
  { id: '6', name: 'IoT Environmental Monitoring' },
  { id: '7', name: 'AR/VR Training Simulator' },
  { id: '8', name: 'Cybersecurity Threat Detection' },
];

const MIN_TEAM_SIZE = 2;
const MAX_TEAM_SIZE = 5;

const createEmptyMember = (): TeamMember => ({
  name: '',
  email: '',
  phone: '',
  rollNumber: '',
  branch: '',
  year: '',
});

interface FormErrors {
  teamName?: string;
  projectId?: string;
  pptFile?: string;
  teamPhoto?: string;
  leader?: Partial<Record<keyof TeamMember, string>>;
  members?: Partial<Record<keyof TeamMember, string>>[];
}

const HackathonRegistrationForm: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [teamPhoto, setTeamPhoto] = useState<File | null>(null);
  const [leader, setLeader] = useState<TeamMember>(createEmptyMember());
  const [members, setMembers] = useState<TeamMember[]>([createEmptyMember()]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMember = () => {
    if (members.length < MAX_TEAM_SIZE - 1) {
      setMembers([...members, createEmptyMember()]);
      toast.success('Team member added');
    } else {
      toast.error(`Maximum ${MAX_TEAM_SIZE} members allowed (including leader)`);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > MIN_TEAM_SIZE - 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
      toast.info('Team member removed');
    } else {
      toast.error(`Minimum ${MIN_TEAM_SIZE} members required (including leader)`);
    }
  };

  const updateMember = (index: number, member: TeamMember) => {
    const newMembers = [...members];
    newMembers[index] = member;
    setMembers(newMembers);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s+\-()]{10,}$/.test(phone);
  };

  const validateLeader = (member: TeamMember): Partial<Record<keyof TeamMember, string>> => {
    const memberErrors: Partial<Record<keyof TeamMember, string>> = {};

    if (!member.name?.trim()) memberErrors.name = 'Name is required';
    if (!member.email?.trim()) memberErrors.email = 'Email is required';
    else if (!validateEmail(member.email || '')) memberErrors.email = 'Invalid email format';
    if (!member.phone?.trim()) memberErrors.phone = 'Phone is required';
    else if (!validatePhone(member.phone || '')) memberErrors.phone = 'Invalid phone format';
    if (!member.rollNumber?.trim()) memberErrors.rollNumber = 'Roll number is required';
    if (!member.branch?.trim()) memberErrors.branch = 'Branch is required';
    if (!member.year?.trim()) memberErrors.year = 'Year is required';

    return memberErrors;
  };

  const validateMember = (member: TeamMember): Partial<Record<keyof TeamMember, string>> => {
    const memberErrors: Partial<Record<keyof TeamMember, string>> = {};

    if (!member.name?.trim()) memberErrors.name = 'Name is required';
    if (!member.branch?.trim()) memberErrors.branch = 'Branch is required';
    if (!member.year?.trim()) memberErrors.year = 'Year is required';

    return memberErrors;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!projectId) newErrors.projectId = 'Please select a project';
    if (!pptFile) newErrors.pptFile = 'PPT file is required';
    if (!teamPhoto) newErrors.teamPhoto = 'Team photo is required';

    // The backend expects leader + 4 members (member1..member4). Ensure exactly 4 members
    if (members.length !== 4) {
      // set a members error so hasErrors becomes true
      newErrors.members = [{ name: 'Please provide exactly 4 additional members' } as any];
      toast.error('Please provide exactly 4 additional members (total 5 including leader)');
    }

    const leaderErrors = validateLeader(leader);
    if (Object.keys(leaderErrors).length > 0) newErrors.leader = leaderErrors;

    const membersErrors = members.map(validateMember);
    if (membersErrors.some((e) => Object.keys(e).length > 0)) {
      newErrors.members = membersErrors;
    }

    setErrors(newErrors);

    const hasErrors =
      newErrors.teamName ||
      newErrors.projectId ||
      newErrors.pptFile ||
      newErrors.teamPhoto ||
      newErrors.leader ||
      newErrors.members?.some((e) => Object.keys(e).length > 0);

    if (hasErrors) {
      toast.error('Please fix all errors before submitting');
    }

    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulating API call - replace with actual backend integration
    try {
      // 1) Check duplicates first to avoid uploading files unnecessarily
      const leaderRoll = leader.rollNumber || '';
      const check = await checkTeamExists(teamName, leaderRoll);
      if (check.exists) {
        const which = check.field || 'team';
        throw new Error(`A record already exists for ${which}. Please change the ${which} and try again.`);
      }

      // 2) upload files to backend upload endpoints
      if (!pptFile || !teamPhoto) {
        throw new Error('Missing files');
      }

      const [pptUrl, photoUrl] = await Promise.all([
        uploadFile(pptFile, 'pdf'),
        uploadFile(teamPhoto, 'image'),
      ]);

      // 2) build payload matching backend teamModel
      const project = PROJECTS.find((p) => p.id === projectId);
      const projectName = project ? project.name : projectId;


      // Map member objects to backend shape
      const mapLeader = (m: TeamMember) => ({
        name: m.name,
        email: m.email || '',
        phone: m.phone || '',
        roll: m.rollNumber || '',
        branch: m.branch || '',
        year: m.year || '',
      });

      const mapMemberSmall = (m: TeamMember) => ({
        name: m.name,
        branch: m.branch || '',
        year: m.year || '',
      });

      // members array should have exactly 4 elements
      const [m1, m2, m3, m4] = members;

      const payload: TeamPayload = {
        teamName,
        projectName,
        pptLink: pptUrl,
        imageLink: photoUrl,
        leader: mapLeader(leader),
        member1: mapMemberSmall(m1),
        member2: mapMemberSmall(m2),
        member3: mapMemberSmall(m3),
        member4: mapMemberSmall(m4),
      };

      await submitTeam(payload);

      toast.success('Registration submitted successfully!', {
        description: 'Your team has been registered for the hackathon.',
      });

      // Reset form after successful submission
      setTeamName('');
      setProjectId('');
      setPptFile(null);
      setTeamPhoto(null);
      setLeader(createEmptyMember());
      setMembers([createEmptyMember()]);
      setErrors({});
    } catch (error) {
      const msg = error?.message || 'Submission failed';
      toast.error(msg, {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalMembers = members.length + 1;

  const isReadyToSubmit = () => {
    if (!teamName.trim()) return false;
    if (!projectId) return false;
    if (!pptFile || !teamPhoto) return false;
    if (members.length !== 4) return false;

    // basic leader checks (don't show toasts here)
    if (!leader.name?.trim()) return false;
    if (!leader.email?.trim()) return false;
    if (!leader.phone?.trim()) return false;
    if (!leader.rollNumber?.trim()) return false;
    if (!leader.branch?.trim()) return false;
    if (!leader.year?.trim()) return false;

    // basic members checks
    for (const m of members) {
      if (!m.name?.trim()) return false;
      if (!m.branch?.trim()) return false;
      if (!m.year?.trim()) return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Registration Open</span>
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">IDEATHON'25</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Register your team and showcase your innovative ideas. Fill in all details carefully.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Info Section */}
          <section className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Team Information</h2>
                <p className="text-sm text-muted-foreground">Basic details about your team</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Team Name</label>
                <Input
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className={errors.teamName ? 'border-destructive' : ''}
                />
                {errors.teamName && (
                  <p className="text-xs text-destructive">{errors.teamName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Project</label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger className={errors.projectId ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECTS.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.projectId && (
                  <p className="text-xs text-destructive">{errors.projectId}</p>
                )}
              </div>
            </div>

            <FileUpload
              accept=".pdf"
              label="Upload PPT (PDF format)"
              type="pdf"
              value={pptFile}
              onChange={setPptFile}
              error={errors.pptFile}
            />

            <FileUpload
              accept="image/*"
              label="Team Photo"
              type="image"
              value={teamPhoto}
              onChange={setTeamPhoto}
              error={errors.teamPhoto}
            />
          </section>

          {/* Team Leader Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
                {/* <p className="text-sm text-muted-foreground">
                  {totalMembers} of {MAX_TEAM_SIZE} members (min {MIN_TEAM_SIZE})
                </p> */}
              </div>
            </div>

            <TeamMemberCard
              member={leader}
              index={0}
              onChange={setLeader}
              isLeader
              errors={errors.leader}
            />

            {members.map((member, index) => (
              <TeamMemberCard
                key={index}
                member={member}
                index={index + 1}
                onChange={(m) => updateMember(index, m)}
                onRemove={members.length > MIN_TEAM_SIZE - 1 ? () => removeMember(index) : undefined}
                errors={errors.members?.[index]}
              />
            ))}

            {members.length < MAX_TEAM_SIZE - 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={addMember}
                className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            )}
          </section>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              variant="glow"
              size="lg"
              disabled={isSubmitting || !isReadyToSubmit()}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Register Team
                </span>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>All fields are mandatory. Make sure all information is accurate.</p>
        </div>
      </div>
    </div>
  );
};

export default HackathonRegistrationForm;
