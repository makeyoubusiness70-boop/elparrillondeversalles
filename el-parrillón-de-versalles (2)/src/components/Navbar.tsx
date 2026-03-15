import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Menú', href: '#menu' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Ubicación', href: '#ubicacion' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <motion.nav 
      className={`bg-carbon text-beige sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl py-0' : 'py-2'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <motion.a 
            href="#inicio" 
            className="text-2xl md:text-3xl font-display tracking-wider text-grill-red hover:text-grill-red-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            El Parrillón <span className="text-beige hidden sm:inline">de Versalles</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="font-medium hover:text-grill-red transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-grill-red transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.a
              href="#reservas"
              className="bg-grill-red text-white px-5 py-2.5 rounded font-bold hover:bg-grill-red-dark transition-colors shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(211, 47, 47, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Reservar
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-beige hover:text-grill-red focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-carbon border-t border-gray-800 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium hover:text-grill-red hover:bg-gray-900 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#reservas"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 mt-4 text-center rounded-md text-base font-bold bg-grill-red text-white hover:bg-grill-red-dark transition-colors mx-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                Reservar Mesa
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
