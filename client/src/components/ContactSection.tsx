import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaGlobe } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="py-32 px-4 md:px-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">
              <FaEnvelope className="text-3xl" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Whether you have questions about our products, want to place a custom order, or just want to say hello, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="flex flex-col space-y-12">
              <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 bg-primary rounded-full w-14 h-14 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Fashion Avenue<br />
                    Fashion District, FD 12345<br />
                    United Fashion States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 bg-primary rounded-full w-14 h-14 flex items-center justify-center">
                  <FaPhone className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600">
                    <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                      +1 (234) 567-8900
                    </a><br />
                    <a href="tel:+1234567891" className="hover:text-primary transition-colors">
                      +1 (234) 567-8901
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 bg-primary rounded-full w-14 h-14 flex items-center justify-center">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@juwurastyle.com" className="hover:text-primary transition-colors">
                      info@juwurastyle.com
                    </a><br />
                    <a href="mailto:support@juwurastyle.com" className="hover:text-primary transition-colors">
                      support@juwurastyle.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 bg-primary rounded-full w-14 h-14 flex items-center justify-center">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 bg-primary rounded-full w-14 h-14 flex items-center justify-center">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Social Media</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      Facebook
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="custom">Custom Order</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  Subscribe to our newsletter
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 px-8 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
