import { motion } from "framer-motion";

export default function FluxLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.h1
        className="text-6xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-primary to-purple-600 bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
          textShadow: "0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.5)",
        }}
      >
        FLUX
      </motion.h1>
    </div>
  );
}
