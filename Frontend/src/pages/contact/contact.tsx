import { useState } from 'react';
import { SiGmail } from "react-icons/si";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We are a coding society dedicated to hosting conferences, workshops, and hackathons to foster learning and innovation. Our mission is to connect tech enthusiasts, provide mentorship, and empower members with the latest industry insights."
    }
    ,{
      question: "Who can join the society?",
      answer: "Anyone interested in coding, technology, and innovation can join, regardless of experience level."
    },
    {
      question: "How often does the society host events?",
      answer: "We organize conferences, workshops, and hackathons multiple times each semester, along with regular coding sessions and meetups."
    },
    {
      question: "Can I collaborate or volunteer with the society?",
      answer: "Absolutely! We encourage students to contribute as volunteers, mentors, or event organizers to gain experience and network."
    }
  ];

  // Commented out testimonials data for future use
  /*
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      content: "Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations. Their attention to detail and technical expertise is unmatched."
    },
    {
      name: "Michael Chen",
      position: "Marketing Director, GrowthCo",
      content: "The digital transformation they implemented for our company resulted in a 40% increase in online engagement. Their strategic approach and technical skills are top-notch."
    },
    {
      name: "Emily Rodriguez",
      position: "Founder, EcoSolutions",
      content: "As a non-profit, we needed an affordable yet professional solution. They created a beautiful website that perfectly represents our mission and has helped us increase donations significantly."
    }
  ];
  */

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Contact Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Have a project in mind or want to learn more about our services? Reach out to our team and let's create something amazing together.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-gray-900 rounded-lg p-4 w-64">
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 w-64">
              <div className="text-3xl font-bold text-blue-400 mb-2">XXX+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 w-64">
              <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-gray-400"> Students' Trust</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Contact Info Section */}
            <div className="md:w-2/5 bg-gradient-to-br from-purple-900 to-blue-900 p-8 text-white">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
                <p className="text-purple-200 mb-6">
                 Fill out the form and our team will get back to you within 24 hours. We're available Monday to Friday, 9am to 6pm EST, to assist with event registrations, hackathon queries, and conference participation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Our Location</h3>
                    <p className="text-purple-200">CSED, MMMUT<br />Tech District, Gorakhpur, U.P.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaInstagram className="h-6 w-6 text-purple-300" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Instagram Handle</h3>
                    <p className="text-purple-200">flux.mmmut</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Email Address</h3>
                    <p className="text-purple-200"> flux@mmmut.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Contact Hours</h3>
                    <p className="text-purple-200">Monday - Friday: 9am - 6pm EST<br />Saturday: 10am - 4pm EST</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
  {[
    { name: "gmail", Icon: SiGmail, link: "mailto:flux@mmmut.ac.in" },
    { name: "whatsapp", Icon: FaWhatsapp, link: "https://chat.whatsapp.com/F8O8hTu2aCZ6NKLeRVqJ0R?mode=ac_t" },
    { name: "instagram", Icon: FaInstagram, link: "https://www.instagram.com/flux.mmmut?igsh=aHI5c3Z1dGZwOGI2" },
  ].map(({ name, Icon, link }) => (
    <a
      key={name}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="h-12 w-12 rounded-full bg-purple-700 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
      aria-label={name}
    >
      <span className="sr-only">{name}</span>
      <Icon className="h-6 w-6 text-white" />
    </a>
  ))}
</div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition duration-300"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="design">UI/UX Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="cloud">Cloud Solutions</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition duration-300"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </div>
              </form>

              {submitSuccess && (
                <div className="mt-6 p-4 bg-green-900/30 text-green-300 rounded-lg border border-green-800 flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Find answers to common questions about our services and process</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-900 rounded-xl overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <svg
                  className={`h-6 w-6 transition-transform duration-300 ${
                    activeFaq === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeFaq === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-400">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section - COMMENTED OUT FOR FUTURE USE */}
      {/*
      <div className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Speakers Say</h2>
          <p className="text-gray-400">Hear from speakers who have contributed in our events.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.position}</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      */}

      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 md:p-12">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:max-w-md">
              <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
              <p className="text-purple-200">
                Subscribe to our newsletter for the latest updates, industry insights, and exclusive offers.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg bg-purple-800 border border-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-purple-900 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
