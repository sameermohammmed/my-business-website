'use client'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from './components/Navigation'
import { FaWhatsapp, FaPhone, FaEnvelope, FaIndustry, FaTools, FaCogs, FaUsers, FaHeadset, FaMedal, FaMapMarkerAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center justify-center mb-6 gap-4">
              <Image
                src="/images/IKLOGO.jpg"
                alt="I K Engineering Company Logo"
                width={60}
                height={60}
                className="rounded-full bg-white p-1 shadow"
                priority
              />
              <h1 className="text-4xl md:text-6xl font-bold">
                I K ENGINEERING COMPANY
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8">
              Your trusted partner in engineering solutions
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Our Products
              </Link>
              <a 
                href="https://wa.me/918309067404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <FaMedal className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Products</h3>
              <p className="text-gray-600">
                We maintain the highest standards in all our products and services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <FaUsers className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our team of experienced professionals ensures the best solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <FaHeadset className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
              <p className="text-gray-600">
                We provide excellent customer service and support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-600">About I K Engineering</h2>
              <p className="text-gray-600 mb-4">
                I K Engineering Company is a premier engineering solutions provider based in Hyderabad, specializing in high-quality engineering products and services. With years of industry experience, we have established ourselves as a trusted partner for businesses across various sectors.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaTools className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>Expert Solutions:</strong> We offer comprehensive engineering solutions tailored to meet your specific requirements, backed by our team of experienced professionals.
                  </p>
                </div>
                <div className="flex items-start">
                  <FaMedal className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>Quality Assurance:</strong> Our commitment to excellence ensures that every product and service meets the highest industry standards.
                  </p>
                </div>
                <div className="flex items-start">
                  <FaUsers className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>Customer Focus:</strong> We prioritize customer satisfaction through personalized service, timely delivery, and continuous support.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link 
                  href="/about"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More About Us
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative h-48 md:h-64 w-48 md:w-64 mx-auto">
              <Image
                src="/images/IKLOGO.jpg"
                alt="About I K Engineering Company"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-4">
                Have questions about our products or services? We're here to help!
              </p>
              <div className="space-y-4">
                <p className="text-gray-600 flex items-center">
                  <FaEnvelope className="text-blue-600 mr-3 text-xl" />
                  <span><strong>Email:</strong> ikengineeringcompany@gmail.com</span>
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaPhone className="text-blue-600 mr-3 text-xl" />
                  <span><strong>Phone:</strong> +91 83090 67404</span>
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="text-blue-600 mr-3 text-2xl" />
                  <span className="flex-1"><strong>Address:</strong> SHOP 8-2-613/75/A BANJARA HILLS ROAD NO 12, LAND MARK NEAR ROCKLEVEZ APARTMENT, opp. Mustafa Masjid, Hyderabad, Telangana 500034</span>
                </p>
                <a 
                  href="https://wa.me/918309067404" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  <FaWhatsapp className="mr-3 text-xl" />
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="space-y-4">
                <Link 
                  href="/products"
                  className="block text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <FaTools className="mr-3" />
                  View Products
                </Link>
                <Link 
                  href="/admin"
                  className="block text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <FaCogs className="mr-3" />
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 I K ENGINEERING COMPANY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 