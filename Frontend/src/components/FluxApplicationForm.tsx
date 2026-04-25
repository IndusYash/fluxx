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
} from "lucide-react";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .transform((val) => val.toLowerCase())
    .superRefine((val, ctx) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: "Please enter a valid email address",
        });
      }
    }),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  rollNo: z
    .string()
    .trim()
    .length(10, "Roll number must be exactly 10 characters"),

  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch is required"),
  softSkills: z.string().min(1, "Please add at least one skill"),
  hardSkills: z.string().min(1, "Please add at least one skill"),

  society: z
    .string()
    .min(1, "Please mention your current society or write 'None'"),
  whyJoin: z
    .string()
    .trim()
    .min(50, "Please provide at least 50 characters")
    .refine((val) => val.split(" ").length >= 10, {
      message: "Please provide at least 10 words",
    }),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const years = ["3rd Year"];
const branches = [
  "Computer Science Engineering",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Information Technology",
  "Chemical Engineering",
  "IoT",
  "BBA",
  "BPharma",
];

export const FluxApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  });

  const parseSkills = (value: string) => {
    if (!value) return [];
    return value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

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
      society: data.society,
      whyJoin: data.whyJoin,
      softSkills: parseSkills(data.softSkills),
      hardSkills: parseSkills(data.hardSkills),
    } as const;

    try {
      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let body: any = {};
      try {
        body = await res.json();
      } catch {
        try {
          const text = await res.text();
          body = { error: text };
        } catch {
          body = {};
        }
      }

      if (res.ok) {
        toast({
          title: "Application Submitted!",
          description:
            "Thank you for applying to FLUX. We'll review your application and get back to you soon.",
          className: "bg-[#101318] text-white",
        });
        reset();
      } else if (res.status === 409) {
        toast({
          title: "Duplicate Entry",
          description: body.error || "Phone or email already exists",
          className: "bg-[#101318] text-white",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: body.error || "Unexpected server error",
          className: "bg-[#101318] text-white",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Network Error",
        description:
          "Could not reach the server. Check your network or backend.",
          className: "bg-[#101318] text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-md border-flux-border">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Join FLUX
          </h2>
          <p className="text-muted-foreground">
            Fill out your details to apply for membership
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName")}
                className="bg-input border-flux-border focus:border-primary"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="bg-input border-flux-border focus:border-primary"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                {...register("phone")}
                className="bg-input border-flux-border focus:border-primary"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Roll No */}
            <div className="space-y-2">
              <Label htmlFor="rollNo" className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Roll Number
              </Label>
              <Input
                id="rollNo"
                placeholder="Enter your roll number"
                {...register("rollNo")}
                className="bg-input border-flux-border focus:border-primary"
              />
              {errors.rollNo && (
                <p className="text-sm text-destructive">
                  {errors.rollNo.message}
                </p>
              )}
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Year
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("year", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="bg-input border-flux-border focus:border-primary">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-[#101318] text-white">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.year && (
                <p className="text-sm text-destructive">
                  {errors.year.message}
                </p>
              )}
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Branch
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("branch", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="bg-input border-flux-border focus:border-primary">
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent className="bg-[#101318] text-white">
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branch && (
                <p className="text-sm text-destructive">
                  {errors.branch.message}
                </p>
              )}
            </div>

            {/* Soft Skills */}
            <div className="space-y-2">
              <Label htmlFor="softSkills" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Soft Skills
              </Label>
              <Input
                id="softSkills"
                placeholder="E.g. Communication, Teamwork, Leadership"
                {...register("softSkills")}
                className="bg-input border-flux-border focus:border-primary"
              />
              {errors.softSkills && (
                <p className="text-sm text-destructive">
                  {errors.softSkills.message}
                </p>
              )}
            </div>

            {/* Hard Skills */}
            <div className="space-y-2">
              <Label htmlFor="hardSkills" className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Hard Skills
              </Label>
              <Input
                id="hardSkills"
                placeholder="E.g. Programming, Graphic Design, Data Analysis"
                {...register("hardSkills")}
                className="bg-input border-flux-border focus:border-primary"
              />
              {errors.hardSkills && (
                <p className="text-sm text-destructive">
                  {errors.hardSkills.message}
                </p>
              )}
            </div>

            {/* Society */}
            <div className="space-y-2">
              <Label htmlFor="society" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Current Society (if any)
              </Label>
              <Input
                id="society"
                placeholder="Mention your current society or write 'None'"
                {...register("society")}
                className="bg-input border-flux-border focus:border-primary"
              />
              {errors.society && (
                <p className="text-sm text-destructive">
                  {errors.society.message}
                </p>
              )}
            </div>
          </div>

          {/* Why Join */}
          <div className="space-y-2">
            <Label htmlFor="whyJoin" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Why do you want to join FLUX?
            </Label>
            <Textarea
              id="whyJoin"
              placeholder="Tell us about your interests, what you hope to gain from FLUX, and how you can contribute to our community..."
              rows={4}
              {...register("whyJoin")}
              className="bg-input border-flux-border focus:border-primary resize-none"
            />
            {errors.whyJoin && (
              <p className="text-sm text-destructive">
                {errors.whyJoin.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
