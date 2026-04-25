import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Code, Lightbulb, Trophy, Rocket, Star, Target } from "lucide-react";

export const FluxInfo = () => {
  const benefits = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Technical Excellence",
      description: "Work on cutting-edge projects and enhance your coding skills"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Collaborative Environment",
      description: "Join a community of like-minded tech enthusiasts"
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Innovation Hub",
      description: "Turn your ideas into reality with our resources and mentorship"
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Competitions & Hackathons",
      description: "Participate in various tech competitions and showcase your skills"
    }
  ];

  // const achievements = [
  //   "50+ Active Members",
  //   "25+ Projects Completed",
  //   "10+ Hackathon Wins",
  //   "100% Placement Rate"
  // ];

  return (
    <div className="space-y-8">
      {/* Main Welcome Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome to FLUX
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Empowering the next generation of tech innovators and problem solvers
          </p>
        </div>

        {/* <div className="flex flex-wrap justify-center gap-2">
          {achievements.map((achievement, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              <Star className="w-3 h-3 mr-1" />
              {achievement}
            </Badge>
          ))}
        </div> */}
      </div>

      {/* About FLUX */}
      <Card className="bg-card/50 backdrop-blur-md border-flux-border">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            About FLUX
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            FLUX is more than just a technical society - we're a community of passionate 
            developers, innovators, and dreamers who believe in the power of technology 
            to change the world. Whether you're a beginner taking your first steps in 
            programming or an experienced developer looking to push boundaries, FLUX 
            provides the perfect platform to grow, learn, and make an impact.
          </p>
        </CardContent>
      </Card>

      {/* Why Join FLUX */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Rocket className="w-6 h-6 text-primary" />
          Why Join FLUX?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card/30 backdrop-blur-sm border-flux-border hover:bg-card/50 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-primary/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
          <p className="text-muted-foreground">
            Fill out the application form and join our amazing community today!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};