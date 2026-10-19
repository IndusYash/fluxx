import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertCircle, HelpCircle, Shield, FileText } from "lucide-react";
import Container from "@/components/layout/Container";
import { BYTEBRAWL_CONFIG } from "@/config/eventConfig";

export default function RulesAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="rules-and-faq" className="relative py-24 sm:py-32 bg-[#090909] text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Rules & Regulations (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/[0.03] mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                // 04 EVENT DIRECTIVES //
              </span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
              Rules &{" "}
              <span className="font-script lowercase font-normal text-4xl sm:text-6xl text-white/90">
                protocols
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-400 font-light mb-10 max-w-xl">
              Strict compliance is required. Any breach of architectural or registration integrity leads to immediate disqualification.
            </p>

            <div className="space-y-6">
              {BYTEBRAWL_CONFIG.rules.map((ruleCategory) => (
                <div
                  key={ruleCategory.category}
                  className="p-6 rounded-xl border border-white/10 bg-[#121212]/90 backdrop-blur-sm"
                >
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-neutral-400" />
                    <span>{ruleCategory.category}</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {ruleCategory.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed"
                      >
                        <span className="font-mono text-neutral-500 mt-0.5 text-xs">
                          {String(idx + 1).padStart(2, "0")}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: FAQ Accordion (5 cols on lg) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/[0.03] mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                // 05 INQUIRIES //
              </span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight mb-4">
              Frequently Asked{" "}
              <span className="font-script lowercase font-normal text-3xl sm:text-5xl text-white/90">
                questions
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light mb-8">
              Everything about participating, teaming up, and Hacktoberfest 2026 guidelines.
            </p>

            <div className="space-y-3">
              {BYTEBRAWL_CONFIG.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-white/10 bg-[#121212] overflow-hidden transition-colors duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-sans text-sm font-semibold text-white leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Note box */}
            <div className="mt-8 p-5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Have an unlisted question? Reach out to the student coordinators or send an email to <a href={`mailto:${BYTEBRAWL_CONFIG.contactEmail}`} className="text-white underline">{BYTEBRAWL_CONFIG.contactEmail}</a>.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

