import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Hash,
  Calendar,
  GitBranch,
  MessageSquare,
  Star,
  Wrench,
  Users,
  CheckCircle2,
} from "lucide-react";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  rollNo: z.string().length(10, "Roll number must be exactly 10 characters"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch is required"),
  softSkills: z.string().min(1, "Please mention at least one soft skill"),
  hardSkills: z.string().min(1, "Please mention at least one hard skill"),
  society: z.string().optional(),
  whyJoin: z.string().min(50, "Please provide at least 50 characters explaining why you want to join"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const branches = [
  "Computer Science Engineering",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Information Technology",
  "Chemical Engineering",
  "Biotechnology",
  "IoT",
  "BBA",
  "BPharma",
];

const STEP_LABELS = ["Personal & Contact", "About You", "Review"];

const ReviewItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
    <span className="text-sm text-foreground font-medium">{value || "—"}</span>
  </div>
);

export const FluxApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    reset,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { society: "" },
  });

  const goNext = async () => {
    const step1Fields = ["fullName", "email", "phone", "rollNo", "year", "branch"] as const;
    const step2Fields = ["softSkills", "hardSkills", "whyJoin"] as const;
    const valid = await trigger(step === 1 ? step1Fields : step2Fields);
    if (valid) setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => s - 1);

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    const API_BASE = import.meta.env.VITE_API_BASE || "";

    const payload = {
      name: data.fullName,
      rollNo: data.rollNo,
      branch: data.branch,
      year: data.year,
      phone: data.phone,
      email: data.email,
      whyJoin: data.whyJoin,
      softSkills: data.softSkills,
      hardSkills: data.hardSkills,
      society: data.society || "None",
    };

    try {
      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (res.ok) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for applying to FLUX. We'll review your application and get back to you soon.",
        });
        reset();
        setStep(1);
      } else if (res.status === 409) {
        toast({ title: "Duplicate Entry", description: body.error || "Phone or email already exists" });
      } else {
        toast({ title: "Submission Failed", description: body.error || "Unexpected server error" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Network Error", description: "Could not reach the server. Check your network or backend." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-md border-flux-border">
      <CardContent className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Join FLUX
          </h2>
          <p className="text-muted-foreground">Fill out your details to apply for membership</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center mb-10">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <div key={n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300
                      ${done ? "bg-primary border-primary text-primary-foreground" : active ? "border-primary text-primary bg-transparent" : "border-muted-foreground/40 text-muted-foreground/40"}`}
                  >
                    {done ? <CheckCircle2 className="w-5 h-5" /> : n}
                  </div>
                  <span className={`text-xs hidden sm:block ${active ? "text-primary font-medium" : done ? "text-primary" : "text-muted-foreground/50"}`}>
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div className={`flex-1 h-px mx-3 mb-4 transition-colors duration-300 ${done ? "bg-primary" : "bg-muted-foreground/20"}`} />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ── Step 1: Personal & Contact ── */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Personal & Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </Label>
                  <Input id="fullName" placeholder="Enter your full name" {...register("fullName")} className="bg-input border-flux-border focus:border-primary" />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input id="email" type="email" placeholder="Enter your email" {...register("email")} className="bg-input border-flux-border focus:border-primary" />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </Label>
                  <Input id="phone" placeholder="Enter your phone number" {...register("phone")} className="bg-input border-flux-border focus:border-primary" />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNo" className="flex items-center gap-2">
                    <Hash className="w-4 h-4" /> Roll Number
                  </Label>
                  <Input id="rollNo" placeholder="Enter your roll number" {...register("rollNo")} className="bg-input border-flux-border focus:border-primary" />
                  {errors.rollNo && <p className="text-sm text-destructive">{errors.rollNo.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Year
                  </Label>
                  <Select onValueChange={(value) => setValue("year", value)}>
                    <SelectTrigger className="bg-input border-flux-border focus:border-primary">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover backdrop-blur-none">
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" /> Branch
                  </Label>
                  <Select onValueChange={(value) => setValue("branch", value)}>
                    <SelectTrigger className="bg-input border-flux-border focus:border-primary">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover backdrop-blur-none">
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.branch && <p className="text-sm text-destructive">{errors.branch.message}</p>}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="button" onClick={goNext} className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Next →
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 2: About You ── */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">About You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="softSkills" className="flex items-center gap-2">
                    <Star className="w-4 h-4" /> Soft Skills
                  </Label>
                  <Input id="softSkills" placeholder="E.g. Communication, Teamwork, Leadership" {...register("softSkills")} className="bg-input border-flux-border focus:border-primary" />
                  {errors.softSkills && <p className="text-sm text-destructive">{errors.softSkills.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hardSkills" className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" /> Hard Skills
                  </Label>
                  <Input id="hardSkills" placeholder="E.g. Programming, Graphic Design, Data Analysis" {...register("hardSkills")} className="bg-input border-flux-border focus:border-primary" />
                  {errors.hardSkills && <p className="text-sm text-destructive">{errors.hardSkills.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="society" className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Society <span className="text-muted-foreground text-xs ml-1">(optional)</span>
                  </Label>
                  <Input id="society" placeholder="Name of any society you're currently part of" {...register("society")} className="bg-input border-flux-border focus:border-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whyJoin" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Why do you want to join FLUX?
                </Label>
                <Textarea
                  id="whyJoin"
                  placeholder="Tell us about your interests, what you hope to gain from FLUX, and how you can contribute to our community..."
                  rows={5}
                  {...register("whyJoin")}
                  className="bg-input border-flux-border focus:border-primary resize-none"
                />
                {errors.whyJoin && <p className="text-sm text-destructive">{errors.whyJoin.message}</p>}
              </div>

              <div className="flex justify-between pt-2">
                <Button type="button" onClick={goBack} variant="outline" className="border-flux-border">
                  ← Back
                </Button>
                <Button type="button" onClick={goNext} className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Review →
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 3: Review ── */}
          {step === 3 && (() => {
            const v = getValues();
            return (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Review Your Application</h3>

                <div className="rounded-lg border border-flux-border p-5 space-y-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Personal & Contact</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ReviewItem label="Full Name" value={v.fullName} />
                    <ReviewItem label="Email" value={v.email} />
                    <ReviewItem label="Phone" value={v.phone} />
                    <ReviewItem label="Roll Number" value={v.rollNo} />
                    <ReviewItem label="Year" value={v.year} />
                    <ReviewItem label="Branch" value={v.branch} />
                  </div>
                </div>

                <div className="rounded-lg border border-flux-border p-5 space-y-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">About You</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ReviewItem label="Soft Skills" value={v.softSkills} />
                    <ReviewItem label="Hard Skills" value={v.hardSkills} />
                    {v.society && <ReviewItem label="Society" value={v.society} />}
                  </div>
                  <ReviewItem label="Why Join FLUX" value={v.whyJoin} />
                </div>

                <div className="flex justify-between pt-2">
                  <Button type="button" onClick={goBack} variant="outline" className="border-flux-border">
                    ← Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : "Submit Application"}
                  </Button>
                </div>
              </div>
            );
          })()}
        </form>
      </CardContent>
    </Card>
  );
};
