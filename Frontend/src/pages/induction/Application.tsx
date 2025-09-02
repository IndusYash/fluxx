import { FluxApplicationForm } from "@/components/FluxApplicationForm";
import { FluxInfo } from "@/components/FluxInfo";
import fluxPatternBg from "@/assets/images/flux-pattern-bg.jpg";

const Application = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${fluxPatternBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen">
            {/* Left Column - Application Form */}
            <div className="flex items-start justify-center">
              <div id="join" className="w-full max-w-lg">
                <FluxApplicationForm />
              </div>
            </div>

            {/* Right Column - FLUX Information */}
            <div className="flex items-start justify-center">
              <div className="w-full max-w-lg">
                <FluxInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
