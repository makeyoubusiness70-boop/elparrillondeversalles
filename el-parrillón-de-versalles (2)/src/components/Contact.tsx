import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contacto" className="py-20 bg-wood text-beige border-t border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }} 
              className="bg-grill-red p-4 rounded-full mb-4"
            >
              <MapPin size={32} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-display mb-2 text-white">Dirección</h3>
            <p className="text-gray-300">Ruiz de los Llanos 1410</p>
            <p className="text-gray-300">Versalles, Buenos Aires</p>
            <p className="text-gray-300">Argentina</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }} 
              className="bg-grill-red p-4 rounded-full mb-4"
            >
              <Phone size={32} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-display mb-2 text-white">Teléfono</h3>
            <p className="text-gray-300">+54 11 6249-1855</p>
            <motion.a 
              href="https://wa.me/541162491855" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 mt-2 font-medium flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Contactar por WhatsApp
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }} 
              className="bg-grill-red p-4 rounded-full mb-4"
            >
              <Clock size={32} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-display mb-2 text-white">Horario</h3>
            <p className="text-gray-300">Lunes a Domingo</p>
            <p className="text-gray-300 font-bold text-xl mt-1">11:00 a 00:00</p>
            <p className="text-gray-400 text-sm mt-1">Abierto todos los días</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }} 
              className="bg-grill-red p-4 rounded-full mb-4"
            >
              <Mail size={32} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-display mb-2 text-white">Consultas</h3>
            <p className="text-gray-300">Para eventos especiales o reservas grandes, no dudes en contactarnos.</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
