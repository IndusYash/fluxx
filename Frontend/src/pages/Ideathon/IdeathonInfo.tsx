import React from "react";
import { Calendar, Globe, Trophy, BadgeCheck, Users, FileText } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



const infoCards = [
    {
        icon: <Calendar className="w-10 h-10 text-primary" />,
        title: "Event Dates",
        desc: "XX-XX-XXXX",
        gradient: "from-blue-500/40 to-cyan-400/40",
        glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
        icon: <Globe className="w-10 h-10 text-primary animate-spin-slow" />,
        title: "Mode",
        desc: "Hybrid (Online & MMMUT Campus)",
        gradient: "from-green-500/40 to-emerald-400/40",
        glowColor: "rgba(34, 197, 94, 0.3)",
    },
    {
        icon: <Trophy className="w-10 h-10 text-primary animate-pulse" />,
        title: "Prize Pool",
        desc: "₹50,000+ & Incubation",
        gradient: "from-yellow-400/40 to-orange-400/40",
        glowColor: "rgba(251, 191, 36, 0.3)",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const guidelines = [
    {
        icon: <BadgeCheck className="text-primary w-5 h-5" />, // Eligibility
        title: "Eligibility:",
        details: "Atleast 1 female member in a team"
    },
    {
        icon: <Users className="text-primary w-5 h-5" />, // Team Size
        title: "Team Size :",
        details: "4-5 members"
    },
    {
        icon: <FileText className="text-primary w-5 h-5" />, // Submission Format
        title: "Submission Format :",
        details: "PDF, Max X Pages"
    },
];

const IdeathonInfo: React.FC = () => {
    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    

    return (
        <>
            <section id="ideathon-info" className="relative py-10 px-4 sm:px-8 lg:px-12 container-max">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={itemVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg mb-2 py-12">
                        <span className="text-primary">IDEATHON : </span>KEY HIGHLIGHT</h2>


                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
                >
                    {infoCards.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={itemVariants}
                            className="group relative min-h-[220px]  flex flex-col rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 transition-all duration-500 overflow-hidden hover:border-cyan-400 hover:shadow-[0_0_35px_10px_rgba(6,182,212,0.5)]"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/20 to-blue-500/20  blur-2xl rounded-2xl">
                            </div>
                            {/* Remove hover gradient overlay for clean blue border/shadow effect */}
                            <div className="relative z-10 flex flex-col h-full items-center justify-center">
                                <div className="mb-4 mt-4 inline-flex items-center justify-center bg-primary/20 rounded-xl p-4 w-fit mx-auto transform transition-transform duration-300 hovering:shadow-[0_0_32px_8px_rgba(6,182,212,0.4)] hover:shadow-xl group-hover:scale-125">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-base text-muted-foreground/80 text-center leading-relaxed flex-grow mb-12">
                                    {item.desc}
                                </p>
                            </div>
                            
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section className="mt-8 px-4 mb-8
             sm:px-8 lg:px-12 container-max">
                <hr className="border-border/40 mb-8" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
                    COMPETITION GUIDELINES
                </h2>
                <ul className="space-y-4">
                    {guidelines.map((rule, index) => (
                        <li key={index}>
                            <motion.div
                                className="flex items-center gap-3 bg-card/70 border border-border/40 rounded-xl px-4 py-3 shadow-sm hover:shadow-lg hover:bg-primary/10 transition-all duration-200 group cursor-pointer relative"
                                role="button"
                            >
                                <span className="group-hover:scale-125 transition-transform duration-200 ">
                                    {rule.icon}
                                </span>
                                <span className="font-semibold text-white group-hover:text-primary transition-colors duration-200">
                                    {rule.title}
                                </span>
                                <span className="text-muted-foreground/80 ml-1">
                                    {rule.details}
                                </span>
                               </motion.div>
                        </li>
                    ))}
                </ul>
                {/* Tooltip */}
                {tooltip && (
                    <div
                        style={{
                            position: 'fixed',
                            left: tooltipPos.x + 12,
                            top: tooltipPos.y + 12,
                            zIndex: 50,
                            background: 'rgba(30,41,59,0.97)',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '0.95rem',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                            pointerEvents: 'none',
                            transition: 'opacity 0.2s',
                        }}
                    >
                        {tooltip}
                    </div>
                )}
            </section>

            {/* Stages of Competition Section */}
            <section className="mt-16 mb-20 px-4 sm:px-8 lg:px-12 container-max">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-10">STAGES OF COMPETITION</h2>
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                    {/* Stage 1 */}
                    <div className="relative z-10 flex-1 min-w-[220px] max-w-xs py-10 bg-card/80 border-2 border-primary rounded-2xl p-6 shadow-[0_0_32px_8px_rgba(6,182,212,0.4)] text-center text-white font-semibold stage-double-border">
                        <div className="text-primary text-lg font-bold mb-2">STAGE 1</div>
                        <div className="text-base font-medium mb-1">REGISTRATION & IDEA SUBMISSION</div>
                        <div className="text-primary/80 text-sm">(XX-XX-XXXX)</div>
                    </div>
                   
                    {/* Stage 2 */}
                    <div className="relative z-10 flex-1 min-w-[220px] max-w-xs py-10 bg-card/80 border-2 border-primary rounded-2xl p-6 shadow-[0_0_32px_8px_rgba(6,182,212,0.4)] text-center text-white font-semibold stage-double-border">
                        <div className="text-primary text-lg font-bold mb-2">STAGE 2</div>
                        <div className="text-base font-medium mb-1">SHORTLISTING & MENTORSHIP</div>
                        <div className="text-primary/80 text-sm">(XX-XX-XXXX)</div>
                    </div>
                    {/* Connector (optional, can be removed for more separation) */}
                    {/* <div className="hidden md:block absolute left-2/3 top-1/2 w-1/3 h-0 border-t-2 border-dashed border-cyan-400 z-0" style={{transform: 'translateY(-50%)'}}></div> */}
                    {/* Stage 3 */}
                    <div className="relative z-10 flex-1 min-w-[220px] max-w-xs py-10 bg-card/80 border-2 border-primary rounded-2xl p-6 shadow-[0_0_32px_8px_rgba(6,182,212,0.4)] text-center text-white font-semibold stage-double-border">
                        <div className="text-primary text-lg font-bold mb-2">STAGE 3</div>
                        <div className="text-base font-medium mb-1">FINAL PRESENTATION <span className="text-white font-normal">| WINNERS</span></div>
                        <div className="text-primary/80 text-sm">(XX-XX-XXXX)</div>
                    </div>
                </div>
                                </section>

                                {/* Register Now Button */}
                                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
                                    <style>{`
                                        .register-now-btn {
                                            position: relative;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            padding: 0.85rem 2.2rem;
                                            background: rgba(150,255,245,0.08);
                                            border: 2px solid rgba(6,182,212,0.25);
                                            border-radius: 14px;
                                            font-family: 'Inter', system-ui, -apple-system, sans-serif;
                                            font-size: 1.18rem;
                                            font-weight: 700;
                                            color: #fff;
                                            cursor: pointer;
                                            transition: all 0.3s ease;
                                            box-shadow: 0 0 18px rgba(6,182,212,0.13);
                                            overflow: hidden;
                                            letter-spacing: 0.09em;
                                            text-transform: uppercase;
                                        }
                                        .register-now-btn::before {
                                            content: '';
                                            position: absolute;
                                            inset: -2px;
                                            background: linear-gradient(135deg, rgba(229,255,251,0.25), rgba(6,182,212,0.18), rgba(229,255,251,0.25));
                                            border-radius: 14px;
                                            opacity: 0;
                                            transition: opacity 0.3s ease;
                                            z-index: -1;
                                        }
                                        .register-now-btn:hover::before {
                                            opacity: 1;
                                        }
                                        .register-now-btn:hover {
                                            transform: translateY(-2px) scale(1.04);
                                            border-color: rgba(6,182,212,0.45);
                                            box-shadow: 0 0 24px rgba(6,182,212,0.22), 0 6px 24px rgba(0,0,0,0.18);
                                        }
                                    `}</style>
                                    <button
                                        className="register-now-btn"
                                        onClick={() => {
                                            navigate('/ideathon/register');
                                            // navigate('/');
                                        }}
                                    >
                                        Register Now
                                    </button>
                                </div>

                {/* Double border effect for stage boxes */}
                <style>{`
                    .stage-double-border {
                        position: relative;
                    }
                    .stage-double-border::before {
                        content: '';
                        position: absolute;
                        inset: -6px;
                        border-radius: 1.25rem;
                        border: 2px solid #06b6d4; /* cyan-400 */
                        box-shadow: 0 0 24px 4px #06b6d4, 0 0 8px 2px var(--tw-color-primary);
                        animation: borderGlow 2.5s linear infinite alternate;
                        pointer-events: none;
                        z-index: 1;
                    }
                    @keyframes borderGlow {
                        0% { box-shadow: 0 0 24px 4px #06b6d4, 0 0 8px 2px var(--tw-color-primary); }
                        100% { box-shadow: 0 0 36px 8px #06b6d4, 0 0 16px 4px var(--tw-color-primary); }
                    }
                `}</style>
        </>
    );
};

export default IdeathonInfo;
