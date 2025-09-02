import { useState } from "react"
import type { ChangeEvent } from "react"
import {  FaWhatsapp, FaInstagram , FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SectionWrapper from "../SectionWrapper"

type Testimonial = {
  text: string
  user: string
  img?: string
}

// Commented out testimonials for future use
/*
const testimonials: Testimonial[] = [
  { text: "WebFlux is where I found my tribe — developers and learners who actually care about growth.", user: "@AnanyaCodes" },
  { text: "The seminars at WebFlux helped me land my first internship in tech. Highly recommend joining!", user: "@RaviDev" },
  { text: "It's not just a society, it's an ecosystem for CSE students to learn, build, and collaborate.", user: "@PriyaBuilds" },
  { text: "From hackathons to dev tasks, WebFlux keeps you challenged and inspired.", user: "@CodeWithAarav" },
  { text: "As a newbie, I felt right at home. WebFlux members are super supportive and motivating.", user: "@IshaLearns" },
  { text: "The WebFlux community turned my coding curiosity into real-world projects. Couldn't ask for more.", user: "@NeerajTech" },
]
*/

export default function Footer() {
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const handleSubscribe = (): void => {
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.")
      return
    }
    setMessage("🎉 Thanks for subscribing!")
    setEmail("")
  }

  return (
    <SectionWrapper title="Get In Touch" background="bg-card/60">
      <footer className="text-white pt-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top Row: Links + Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">WebFlux</h3>
              <p className="text-gray-400 leading-relaxed">
                A community of developers and tech enthusiasts building together and pushing innovation forward.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">Home</li>
                <li className="hover:text-white cursor-pointer">Events</li>
                <li className="hover:text-white cursor-pointer">Our Team</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">Join Our Newsletter</h3>
              <p className="text-gray-400 mb-3">Stay updated with upcoming events & resources.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md text-black"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-emerald-400 text-black px-5 rounded-r-lg hover:bg-emerald-500 transition"
                >
                  Subscribe
                </button>
              </div>
              {message && <p className="text-sm mt-2 text-emerald-300">{message}</p>}
            </div>
          </div>

          {/* Commented out testimonials section for future use */}
          {/*
          <h2 className="text-2xl font-bold text-center mt-12 mb-8 text-emerald-400">Loved by the Community</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-tr from-gray-800 to-gray-700 text-gray-100 rounded-lg p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                {t.img && (
                  <img
                    src={t.img}
                    alt={`${t.user} avatar`}
                    className="w-10 h-10 rounded-full absolute -top-5 left-5 border-2 border-white shadow-md"
                  />
                )}
                <p className="mb-4">{t.text}</p>
                <p className="text-sm font-semibold">{t.user}</p>
              </div>
            ))}
          </div>
          */}

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} WebFlux. All rights reserved.</p>
            
            <div className="flex gap-4 text-lg mt-4 md:mt-0">
              <a 
                href="flux@mmmut.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiGmail className="hover:text-emerald-400 cursor-pointer transition-colors duration-300" />
              </a>

              <a 
                href="https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="hover:text-sky-400 cursor-pointer transition-colors duration-300" />
              </a>

              <a 
                href="https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaInstagram className="hover:text-pink-400 cursor-pointer transition-colors duration-300" />
              </a>

              <a 
                href="https://www.linkedin.com/company/flux-mmm/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedin className="hover:text-sky-400 cursor-pointer transition-colors duration-300" />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </SectionWrapper>
  )
}
