import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="relative h-[35vh] md:h-[40vh] lg:h-[45vh] bg-blue-400 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/5" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight drop-shadow-lg">
          Welcome to <span className="block sm:inline text-white">I K ENGINEERING COMPANY</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed text-white drop-shadow-sm">
          Your Trusted Partner in Global Trade and Engineering Excellence
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link
            href="/products"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
          >
            Explore Our Products
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 font-semibold text-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
} 