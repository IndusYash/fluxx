import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Rocket,
  Users,
  Sparkles,
  Info,
  FileText,
  ExternalLink,
  ChevronDown,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TeamMemberCard, { TeamMember } from "./TeamMemberCard";
import FileUpload from "./FileUpload";
import { toast } from "@/hooks/use-toast";
import {
  uploadFile,
  submitTeam,
  TeamPayload,
  checkTeamExists,
} from "../../lib/api/hackathon";
import projectsJson from "../../projects.json";

// const PROJECTS = [
//   { id: "1", name: "AI-Powered Healthcare Assistant" },
//   { id: "2", name: "Sustainable Smart City Solution" },
//   { id: "3", name: "Blockchain-Based Supply Chain" },
//   { id: "4", name: "EdTech Learning Platform" },
//   { id: "5", name: "FinTech Payment Innovation" },
//   { id: "6", name: "IoT Environmental Monitoring" },
//   { id: "7", name: "AR/VR Training Simulator" },
//   { id: "8", name: "Cybersecurity Threat Detection" },
// ];

// Total team size (including leader)
const MIN_TEAM_SIZE = 3; // minimum total members including leader
const MAX_TEAM_SIZE = 4; // maximum total members including leader

const createEmptyMember = (): TeamMember => ({
  name: "",
  email: "",
  phone: "",
  rollNumber: "",
  branch: "",
  year: "",
});

interface FormErrors {
  teamName?: string;
  projectId?: string;
  pptFile?: string;
  teamPhoto?: string;
  leader?: Partial<Record<keyof TeamMember, string>>;
  members?: Partial<Record<keyof TeamMember, string>>[];
  mentors?: string;
}

const HackathonRegistrationForm: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [teamPhoto, setTeamPhoto] = useState<File | null>(null);
  const [leader, setLeader] = useState<TeamMember>(createEmptyMember());
  // initialize with minimum required additional members (MIN_TEAM_SIZE - 1)
  const initialMembers = Array.from(
    { length: Math.max(1, MIN_TEAM_SIZE - 1) },
    () => createEmptyMember()
  );
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
  // Hardcoded mentors with expertise (commented out - revamp in progress)
  const MENTORS = [
    { name: "Dr. Akshi Kumar", expertise: "" },
    { name: "Dr. Devesh Dubey", expertise: "" },
    { name: "Dr. Rajesh Kumar Srivastava", expertise: "" },
    { name: "Dr. Rakesh Kumar", expertise: "" },
    { name: "Dr. P. K. Singh", expertise: "" },
    { name: "Dr. Birendra Kumar Sharma", expertise: "" },
    { name: "Dr. Lokendra Singh Umrao", expertise: "" },
    { name: "Dr. Ritesh Maurya", expertise: "" },
    { name: "Dr. Satya Prakash Yadav", expertise: "" },
    { name: "Dr. Shailendra Pratap Singh", expertise: "" },
    { name: "Dr. Meenu", expertise: "" }, // Replaced Smt.
    { name: "Dr. Abhishek Verma", expertise: "" },
    { name: "Dr. Amit Kumar Dwivedi", expertise: "" },
    { name: "Dr. Anu Raj", expertise: "" },
    { name: "Dr. Avaneesh Singh", expertise: "" },
    { name: "Dr. M. K. Srivastava", expertise: "" },
    { name: "Dr. Manish Kumar Gupta", expertise: "" },
    { name: "Dr. Ninni Singh", expertise: "" },
    { name: "Dr. Pawan Kumar Mall", expertise: "" },
    { name: "Dr. Pradeep Kumar Singh", expertise: "" },
    { name: "Dr. Raj kumar", expertise: "" },
    { name: "Dr. Ram Kumar", expertise: "" },
    { name: "Dr. Rohit Kumar Tiwari", expertise: "" },
    { name: "Dr. Sanjay Kumar", expertise: "" },
    { name: "Dr. Satvik Vats", expertise: "" },
    { name: "Dr. Satya Prakash Maurya", expertise: "" },
    { name: "Dr. Shailesh Kumar", expertise: "" },
    { name: "Dr. Shantanu Shahi", expertise: "" },
    { name: "Dr. Shwet Ketu", expertise: "" },
    { name: "Dr. Sumit Kumar", expertise: "" },
    { name: "Dr. Sushil Kumar Saroj", expertise: "" },
    { name: "Dr. Swapnita Srivastava", expertise: "" },
    { name: "Dr. Vimal Kumar", expertise: "" },
    { name: "Dr. Vipul Narayan", expertise: "" },
  ];

  // New simple mentor preference (single optional field)
  const [mentorPreference, setMentorPreference] = useState<string>("");
  */

  // Single optional mentor preference (front-end only). If empty, we'll send 'none'.
  const [mentorPreference, setMentorPreference] = useState<string>("");

  // Dynamic projects
  const [projects, setProjects] = useState<any[]>([]);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<
    "All" | "Simple" | "Medium" | "Moderate" | "Advanced"
  >("All");
  useEffect(() => {
    setProjects(projectsJson);
  }, []);

  const addMember = () => {
    if (members.length < MAX_TEAM_SIZE - 1) {
      setMembers([...members, createEmptyMember()]);
      toast({ title: "Team member added" });
    } else {
      toast({
        title: `Maximum ${MAX_TEAM_SIZE} members allowed (including leader)`,
        variant: "destructive",
        className: "bg-[#0f1117]",
      });
    }
  };

  const removeMember = (index: number) => {
    if (members.length > MIN_TEAM_SIZE - 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
      toast({ title: "Team member removed" });
    } else {
      toast({
        title: `Minimum ${MIN_TEAM_SIZE} members required (including leader)`,
        variant: "destructive",
        className: "bg-[#0f1117]",
      });
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
    // frontend-only: enforce exactly 10 digits (numbers only)
    return /^\d{10}$/.test(phone);
  };

  const validateRoll = (roll: string) => {
    return /^\d{10}$/.test(roll);
  };

  const validateLeader = (
    member: TeamMember
  ): Partial<Record<keyof TeamMember, string>> => {
    const memberErrors: Partial<Record<keyof TeamMember, string>> = {};

    if (!member.name?.trim()) memberErrors.name = "Name is required";
    if (!member.email?.trim()) memberErrors.email = "Email is required";
    else if (!validateEmail(member.email || ""))
      memberErrors.email = "Invalid email format";
    if (!member.phone?.trim()) memberErrors.phone = "Phone is required";
    else if (!validatePhone(member.phone || ""))
      memberErrors.phone = "Phone must be exactly 10 digits (numbers only)";
    if (!member.rollNumber?.trim())
      memberErrors.rollNumber = "Roll number is required";
    else if (!validateRoll(member.rollNumber || ""))
      memberErrors.rollNumber = "Roll must be exactly 10 digits (numbers only)";
    if (!member.branch?.trim()) memberErrors.branch = "Branch is required";
    if (!member.year?.trim()) memberErrors.year = "Year is required";

    return memberErrors;
  };

  const validateMember = (
    member: TeamMember
  ): Partial<Record<keyof TeamMember, string>> => {
    const memberErrors: Partial<Record<keyof TeamMember, string>> = {};

    if (!member.name?.trim()) memberErrors.name = "Name is required";
    if (!member.branch?.trim()) memberErrors.branch = "Branch is required";
    if (!member.year?.trim()) memberErrors.year = "Year is required";
    if (!member.rollNumber?.trim())
      memberErrors.rollNumber = "Roll number is required";
    else if (!validateRoll(member.rollNumber || ""))
      memberErrors.rollNumber = "Roll must be exactly 10 digits (numbers only)";

    return memberErrors;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!teamName.trim()) newErrors.teamName = "Team name is required";
    if (!projectId) newErrors.projectId = "Please select a project";
    if (!pptFile) newErrors.pptFile = "PPT file is required";
    if (!teamPhoto) newErrors.teamPhoto = "Team photo is required";

    // Enforce total team size between MIN_TEAM_SIZE and MAX_TEAM_SIZE (including leader)
    const total = 1 + members.length;
    if (total < MIN_TEAM_SIZE || total > MAX_TEAM_SIZE) {
      newErrors.members = [
        {
          name: `Team size must be between ${MIN_TEAM_SIZE} and ${MAX_TEAM_SIZE} (including leader)`,
        } as any,
      ];
      toast({
        title: `Team size must be between ${MIN_TEAM_SIZE} and ${MAX_TEAM_SIZE} (including leader)`,
        variant: "destructive",
        className: "bg-[#0f1117]",
      });
    }

    const leaderErrors = validateLeader(leader);
    if (Object.keys(leaderErrors).length > 0) newErrors.leader = leaderErrors;

    const membersErrors = members.map(validateMember);
    if (membersErrors.some((e) => Object.keys(e).length > 0)) {
      newErrors.members = membersErrors;
    }

    // mentors: optional single preference handled client-side

    setErrors(newErrors);

    const hasErrors =
      newErrors.teamName ||
      newErrors.projectId ||
      newErrors.pptFile ||
      newErrors.teamPhoto ||
      newErrors.leader ||
      newErrors.members?.some((e) => Object.keys(e).length > 0) ||
      newErrors.mentors;

    if (hasErrors) {
      toast({
        title: "Please fix all errors before submitting",
        variant: "destructive",
        className: "bg-[#0f1117]",
      });
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
      const leaderRoll = leader.rollNumber || "";
      const leaderPhone = leader.phone || "";
      const leaderEmail = leader.email || "";
      const allRolls = [leader.rollNumber, ...members.map((m) => m.rollNumber)];
      const check = await checkTeamExists(
        teamName,
        leaderRoll,
        leaderPhone,
        leaderEmail,
        allRolls
      );
      if (check.exists) {
        const field = check.field || "team";
        let message = "Please use a different value.";
        // Distinguish leader roll vs other member roll duplicates
        if (field === "leaderRoll") {
          message = "Your leader's roll number is already registered with us.";
        } else if (field === "roll" || field === "memberRoll") {
          message = "One of your team member is already registered with us.";
        } else if (field === "leaderPhone") {
          message = "Please use a different phone number of leader.";
        } else if (field === "phone") {
          message = "Please use a different phone number.";
        } else if (field === "leaderEmail" || field === "email") {
          message = "Please use a different email address.";
        } else if (field === "teamName" || field === "team") {
          message = "This team name is already taken.";
        }
        throw new Error(message);
      }

      // 2) upload files to backend upload endpoints
      if (!pptFile || !teamPhoto) {
        throw new Error("Missing files");
      }

      const [pptUrl, photoUrl] = await Promise.all([
        uploadFile(pptFile, "pdf"),
        uploadFile(teamPhoto, "image"),
      ]);

      // 2) build payload matching backend teamModel
      const selected = projects.find((p) => p.id.toString() === projectId);
      const projectName = selected ? selected.name : projectId;

      // Map member objects to backend shape
      const mapLeader = (m: TeamMember) => ({
        name: m.name,
        email: m.email || "",
        phone: m.phone || "",
        roll: m.rollNumber || "",
        branch: m.branch || "",
        year: m.year || "",
      });

      const mapMemberSmall = (m: TeamMember) => ({
        name: m.name,
        branch: m.branch || "",
        year: m.year || "",
        roll: m.rollNumber || "",
      });

      // Build payload depending on how many additional members were provided (3 or 4)
      const payloadBase: any = {
        teamName,
        projectName,
        pptLink: pptUrl,
        imageLink: photoUrl,
        // include single optional mentor preference (send 'none' when empty)
        mentors: [mentorPreference?.trim() || "none"],
        leader: mapLeader(leader),
      };

      // include members only when they exist to avoid accessing undefined
      if (members[0]) payloadBase.member1 = mapMemberSmall(members[0]);
      if (members[1]) payloadBase.member2 = mapMemberSmall(members[1]);
      if (members[2]) payloadBase.member3 = mapMemberSmall(members[2]);
      if (members[3]) payloadBase.member4 = mapMemberSmall(members[3]);

      const payload: TeamPayload = payloadBase as TeamPayload;

      // eslint-disable-next-line no-console
      console.log("Submitting team payload:", payload);

      await submitTeam(payload);

      toast({
        title: "Registration submitted successfully!",
        description: "Your team has been registered for the hackathon.",
        className: "bg-[#0f1117]",
      });

      // Reset form after successful submission
      setTeamName("");
      setProjectId("");
      setPptFile(null);
      setTeamPhoto(null);
      setLeader(createEmptyMember());
      setMembers(initialMembers);
      setErrors({});
    } catch (error) {
      const raw = error?.message || "Submission failed";
      // If backend returned a duplicate key message like "leader.phone already exists"
      // normalize it to a friendlier explanation for the user.
      const dupMatch = String(raw).match(/([\w.]+)\s+already exists/i);
      if (dupMatch) {
        const field = dupMatch[1].toLowerCase();
        let friendly = "Please use a different value.";
        if (field.includes("phone"))
          friendly = "Please use a different phone number.";
        else if (field.includes("leader") && field.includes("roll"))
          friendly = "Please use a different leader roll number.";
        else if (field.includes("roll"))
          friendly = "Please use a different team member roll number.";
        else if (field.includes("email"))
          friendly = "Please use a different email address.";
        else if (field.includes("teamname") || field.includes("team"))
          friendly = "Please use a different team name.";

        toast({
          title: friendly,
          variant: "destructive",
          className: "bg-[#0f1117]",
        });
      } else {
        toast({
          title: raw,
          variant: "destructive",
          className: "bg-[#0f1117]",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalMembers = members.length + 1;

  const isReadyToSubmit = () => {
    if (!teamName.trim()) return false;
    if (!projectId) return false;
    if (!pptFile || !teamPhoto) return false;
    // additional members must be between MIN_TEAM_SIZE-1 and MAX_TEAM_SIZE-1
    if (
      members.length < MIN_TEAM_SIZE - 1 ||
      members.length > MAX_TEAM_SIZE - 1
    )
      return false;

    // basic leader checks (don't show toasts here)
    if (!leader.name?.trim()) return false;
    if (!leader.email?.trim()) return false;
    if (!leader.phone?.trim()) return false;
    if (!leader.rollNumber?.trim()) return false;
    // enforce frontend format requirements before enabling submit
    if (!validatePhone(leader.phone || "")) return false;
    if (!validateRoll(leader.rollNumber || "")) return false;
    if (!leader.branch?.trim()) return false;
    if (!leader.year?.trim()) return false;

    // basic members checks
    for (const m of members) {
      if (!m.name?.trim()) return false;
      if (!m.branch?.trim()) return false;
      if (!m.year?.trim()) return false;
    }
    // mentor preference is optional now; no blocking check
    // check duplicate rolls inside team
    const allRolls = [leader.rollNumber, ...members.map((m) => m.rollNumber)];
    const normalized = allRolls.map((r) =>
      String(r || "")
        .trim()
        .toLowerCase()
    );
    const set = new Set();

    for (const r of normalized) {
      if (set.has(r)) return false; // ❌ duplicate → disable button
      set.add(r);
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />
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
            Register your team and showcase your innovative ideas. Fill in all
            details carefully.
          </p>
          <a
            href="https://drive.google.com/file/d/10A1EUv5Fe46u0G9hwkCrFA8xgDzsGjA3/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-foreground hover:from-primary/30 hover:to-accent/30 hover:border-primary/50 transition-all duration-300 group"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-medium">Problem Statement</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          {/* <div className="text-sm text-foreground/80 max-w-lg mx-auto space-y-2">
            <strong className="block text-foreground">IMPORTANT</strong>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Teams must have between {MIN_TEAM_SIZE} and {MAX_TEAM_SIZE} members (including the leader).</li>
              <li>A Team must include at least one female member.</li>
              <li>File limits: PPT (PDF) ≤ 2 MB; Team photo ≤ 1 MB.</li>
            </ul>
          </div> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Info Section */}
          <section className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Team Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Basic details about your team
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Team Name
                </label>
                <Input
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className={errors.teamName ? "border-destructive" : ""}
                />
                {errors.teamName && (
                  <p className="text-xs text-destructive">{errors.teamName}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Select Project
                  </label>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowProjectDetails(true)}
                    className="h-auto py-1 px-2 text-xs text-primary ml-3"
                  >
                    <Info className="w-3 h-3 mr-1" /> View Details
                  </Button>
                </div>

                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger
                    className={errors.projectId ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f1117] text-white">
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name}
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
              label={
                <div className="flex items-center justify-between w-full">
                  <span>Upload PPT</span>

                  <a
                    href="https://docs.google.com/presentation/d/1IHBSY2qVtRHYhEK4Oand0FPVZPilFR_m/edit?usp=sharing&ouid=114694869162685465444&rtpof=true&sd=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-300 hover:text-blue-200 transition-color"
                  >
                    <FileText className="w-4 h-4" />
                    Download Template
                  </a>
                </div>
              }
              type="pdf"
              value={pptFile}
              onChange={setPptFile}
              error={errors.pptFile}
            />

            <p className="text-xs text-muted-foreground mt-1">
              Max file size: 2 MB. Accepted format: PDF.
            </p>

            <FileUpload
              accept="image/*"
              label="Team Photo (make collage of all members)"
              type="image"
              value={teamPhoto}
              onChange={setTeamPhoto}
              error={errors.teamPhoto}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Max file size: 1 MB. Accepted formats: JPG, PNG, GIF, etc.
            </p>
          </section>

          {/* Mentor Preference (simple, optional) */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Mentor Preference (optional)
                </h2>
                {/* <p className="text-sm text-muted-foreground">Enter a preferred mentor's name if you have one. Leave blank to let us assign one.</p> */}
              </div>
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Mentor name"
                value={mentorPreference}
                onChange={(e) => setMentorPreference(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                If left blank we'll provide a mentor.
              </p>
            </div>
          </section>

          {/* Team Leader Section */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Team Members
                </h2>
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
                onRemove={
                  members.length > MIN_TEAM_SIZE - 1
                    ? () => removeMember(index)
                    : undefined
                }
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
              className="min-w-[200px] bg-[#16A34A]"
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
          <p>
            All fields are mandatory. Make sure all information is accurate.
          </p>
        </div>
      </div>
      {showProjectDetails && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Project Details</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowProjectDetails(false)}
              >
                Close
              </Button>
            </div>

            {/* <div className="p-4 flex justify-end items-center gap-3">
              <span className="text-sm">Difficulty:</span>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as any)}
                className="bg-black border rounded px-3 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="Simple">Simple</option>
                <option value="Medium">Medium</option>
                <option value="Moderate">Moderate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div> */}

            <div className="overflow-y-auto p-4 space-y-4">
              {projects
                .filter((p) =>
                  difficultyFilter === "All"
                    ? true
                    : p.difficulty === difficultyFilter
                )
                .map((p) => (
                  <div
                    key={p.id}
                    className={`p-4 rounded-lg border cursor-pointer ${
                      projectId === p.id.toString()
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-primary/5"
                    }`}
                    onClick={() => {
                      setProjectId(p.id.toString());
                      setShowProjectDetails(false);
                      toast({
                        title: `Selected: ${p.name}`,
                        className: "bg-[#0f1117]",
                      });
                    }}
                  >
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-xs">Theme: {p.domain}</p>
                    {/* <p className="text-xs">Difficulty: {p.difficulty}</p> */}

                    <p className="text-sm mt-2 whitespace-pre-line">
                      <strong>Problem Statement:</strong>
                      <br />
                      {p.problemStatement}
                    </p>

                    <p className="text-sm mt-2 whitespace-pre-line">
                      <strong>Expected Solution:</strong>
                      <br />
                      {p.expectedSolution}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonRegistrationForm;
