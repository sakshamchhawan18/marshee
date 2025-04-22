
// components/Footer.tsx

import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center sm:flex-row justify-between px-4">
        {/* Logo */}
        <div className="flex items-center mb-6 sm:mb-0">
          <Image src="/next.svg" alt="Logo" width={40} height={40} className="mr-3" />
          <span className="text-2xl font-semibold">Marshee</span>
        </div>

        {/* Navigation */}
        <ul className="flex space-x-6 mb-6 sm:mb-0">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/services', label: 'Services' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href} passHref>
                <span className="hover:text-gray-400 cursor-pointer">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="#" aria-label="Facebook" className="hover:text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Marshee. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer