'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/app/components/Navigation'
import { FaWhatsapp, FaPhone, FaEnvelope, FaIndustry, FaTools, FaCogs, FaUsers, FaHeadset, FaMedal, FaMapMarkerAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-blue-400 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/5" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
            Welcome to <span className="text-white">I K ENGINEERING COMPANY</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed text-white drop-shadow-sm">
            Your Trusted Partner in Global Trade and Engineering Excellence
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/products"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              Explore Our Products
            </Link>
            <a
              href="https://wa.me/918309067404"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 font-semibold text-lg flex items-center gap-2"
            >
              <FaWhatsapp className="text-2xl" />
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div>
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaMedal className="text-5xl text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Quality Products</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards in all our products and services, ensuring excellence in every detail.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaUsers className="text-5xl text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team of experienced professionals ensures the best solutions tailored to your needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaHeadset className="text-5xl text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Customer Support</h3>
              <p className="text-gray-600 leading-relaxed">
                We provide excellent customer service and support, available whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-white">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-blue-600">About I K Engineering</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                I K Engineering Company is a premier engineering solutions provider based in Hyderabad, specializing in high-quality engineering products and services. With years of industry experience, we have established ourselves as a trusted partner for businesses across various sectors.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaTools className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Expert Solutions</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We offer comprehensive engineering solutions tailored to meet your specific requirements, backed by our team of experienced professionals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaMedal className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Assurance</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our commitment to excellence ensures that every product and service meets the highest industry standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaUsers className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Customer Focus</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We prioritize customer satisfaction through personalized service, timely delivery, and continuous support.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg"
                >
                  Learn More About Us
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative h-96 w-96 mx-auto">
              <Image
                src="/images/IKLOGO.jpg"
                alt="About I K Engineering Company"
                fill
                sizes="(max-width: 768px) 384px, 384px"
                className="object-contain rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-gray-50">
        <div>
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Get in Touch</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Have questions about our products or services? We're here to help!
              </p>
              <div className="space-y-6">
                <div className="flex items-center text-gray-600 text-lg">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-2xl text-blue-600" />
                  </div>
                  <span><strong>Email:</strong> ikengineeringcompany@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-600 text-lg">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaPhone className="text-2xl text-blue-600" />
                  </div>
                  <span><strong>Phone:</strong> +91 83090 67404</span>
                </div>
                <div className="flex items-start text-gray-600 text-lg">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 mt-1">
                    <FaMapMarkerAlt className="text-2xl text-blue-600" />
                  </div>
                  <span className="flex-1"><strong>Address:</strong> SHOP 8-2-613/75/A BANJARA HILLS ROAD NO 12, LAND MARK NEAR ROCKLEVEZ APARTMENT, opp. Mustafa Masjid, Hyderabad, Telangana 500034</span>
                </div>
                <a 
                  href="https://wa.me/918309067404" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700 text-lg"
                >
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <FaWhatsapp className="text-2xl text-green-600" />
                  </div>
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Quick Links</h3>
              <div className="space-y-6">
                <Link
                  href="/products"
                  className="block text-blue-600 hover:text-blue-800 flex items-center text-lg"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaTools className="text-2xl text-blue-600" />
                  </div>
                  <span>View Products</span>
                </Link>
                <Link
                  href="/admin/login"
                  className="block text-blue-600 hover:text-blue-800 flex items-center text-lg"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaCogs className="text-2xl text-blue-600" />
                  </div>
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12">
        <div className="text-center">
          <p className="text-lg">&copy; 2024 I K ENGINEERING COMPANY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 