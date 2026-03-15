import { motion } from 'motion/react';

export default function Location() {
  return (
    <section id="ubicacion" className="py-20 bg-beige text-carbon overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-display mb-4 text-wood">Dónde Encontrarnos</h2>
          <div className="w-24 h-1 bg-grill-red mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">En el corazón de Versalles, Buenos Aires</p>
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto bg-white p-4 rounded-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="aspect-video w-full rounded-lg overflow-hidden relative group">
            <div className="absolute inset-0 bg-grill-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.076840748135!2d-58.52934142345686!3d-34.62750395873977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb7c7b8c7c7b7%3A0x7b7b7b7b7b7b7b7b!2sRuiz%20de%20los%20Llanos%201410%2C%20C1408%20CABA%2C%20Argentina!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación El Parrillón de Versalles"
              className="grayscale group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xl font-medium">Ruiz de los Llanos 1410</p>
            <p className="text-gray-600">Versalles, Buenos Aires, Argentina</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
