import { motion } from "framer-motion";
import logo from "@/assets/images/flux-logo-silver.jpg";

export default function FluxLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]">
      <div className="relative">
        {/* Animated background rings */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-64 h-64 rounded-full border border-white/10" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-48 h-48 rounded-full border border-white/5 border-t-white/30 border-b-white/30" />
        </motion.div>

        {/* Main loader logo */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img 
            src={logo}
            alt="FLUX Logo"
            className="w-32 h-32 object-contain mx-auto"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))" }}
          />
          
          {/* Animated dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Corner accents */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-white/30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>
    </div>
  );
}
