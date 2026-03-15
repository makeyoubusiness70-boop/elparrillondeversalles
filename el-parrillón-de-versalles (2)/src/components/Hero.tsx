import { motion } from 'motion/react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="inicio" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto text-beige"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-display mb-4 text-white drop-shadow-lg"
        >
          El Parrillón <span className="text-grill-red">de Versalles</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 font-light tracking-wide text-gray-200"
        >
          Parrilla argentina tradicional en el corazón de Versalles.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a 
            href="#menu" 
            whileHover={{ scale: 1.05, backgroundColor: "var(--color-beige)", color: "var(--color-carbon)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-beige text-beige px-8 py-3 rounded text-lg font-bold transition-colors"
          >
            Ver Menú
          </motion.a>
          <motion.a 
            href="#reservas" 
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-grill-red text-white hover:bg-grill-red-dark px-8 py-3 rounded text-lg font-bold transition-colors shadow-lg"
          >
            Reservar Mesa
          </motion.a>
          <motion.a 
            href="https://wa.me/541162491855" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded text-lg font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            Contactar por WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
