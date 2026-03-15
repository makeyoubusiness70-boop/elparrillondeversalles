import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-carbon text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-display text-grill-red mb-4">El Parrillón de Versalles</h3>
            <p className="mb-4">
              La auténtica parrilla argentina en Versalles. Carnes de primera calidad, porciones abundantes y ambiente familiar.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xl font-display text-beige mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="hover:text-grill-red transition-colors inline-block hover:translate-x-1 transform duration-200">Inicio</a></li>
              <li><a href="#menu" className="hover:text-grill-red transition-colors inline-block hover:translate-x-1 transform duration-200">Menú</a></li>
              <li><a href="#reservas" className="hover:text-grill-red transition-colors inline-block hover:translate-x-1 transform duration-200">Reservas</a></li>
              <li><a href="#contacto" className="hover:text-grill-red transition-colors inline-block hover:translate-x-1 transform duration-200">Contacto</a></li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-display text-beige mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-grill-red hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-grill-red hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <p>&copy; {new Date().getFullYear()} El Parrillón de Versalles. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Link to="/admin" className="hover:text-beige transition-colors">
              Acceso Administración
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
