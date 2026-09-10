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
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  rollNo: z.string().min(1, "Roll number is required"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch is required"),
  softSkills: z.string().min(1, "Please mention at least one soft skill"),
  hardSkills: z.string().min(1, "Please mention at least one hard skill"),
  society: z.string().min(1, "Please mention your current society or write 'None'"),
  whyJoin: z.string().min(
    50,
    "Please provide at least 50 characters explaining why you want to join"
  ),
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

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Application submitted:", data);
    toast({
      title: "Application Submitted!",
      description:
        "Thank you for applying to FLUX. We'll review your application and get back to you soon.",
    });
    reset();
    setIsSubmitting(false);
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
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
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
                <p className="text-sm text-destructive">{errors.email.message}</p>
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
                <p className="text-sm text-destructive">{errors.phone.message}</p>
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
                <p className="text-sm text-destructive">{errors.rollNo.message}</p>
              )}
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Year
              </Label>
              <Select onValueChange={(value) => setValue("year", value)}>
                <SelectTrigger className="bg-input border-flux-border focus:border-primary">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.year && (
                <p className="text-sm text-destructive">{errors.year.message}</p>
              )}
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Branch
              </Label>
              <Select onValueChange={(value) => setValue("branch", value)}>
                <SelectTrigger className="bg-input border-flux-border focus:border-primary">
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branch && (
                <p className="text-sm text-destructive">{errors.branch.message}</p>
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
                <p className="text-sm text-destructive">{errors.softSkills.message}</p>
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
                <p className="text-sm text-destructive">{errors.hardSkills.message}</p>
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
                <p className="text-sm text-destructive">{errors.society.message}</p>
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
              <p className="text-sm text-destructive">{errors.whyJoin.message}</p>
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
