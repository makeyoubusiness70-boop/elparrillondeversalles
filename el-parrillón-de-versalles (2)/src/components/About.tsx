import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-beige text-carbon overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Asado en la parrilla" 
              className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-5xl font-display mb-6 text-wood">Nuestra Historia</h2>
            <motion.div 
              className="w-20 h-1 bg-grill-red mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.div>
            <p className="text-lg mb-4 leading-relaxed">
              El Parrillón de Versalles nació con una idea simple: ofrecer la auténtica experiencia del bodegón de barrio porteño. Somos una parrilla tradicional donde el fuego nunca se apaga y las porciones siempre son abundantes.
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              Nos enorgullece ser el punto de encuentro de familias, grupos de amigos y vecinos que buscan disfrutar de los cortes de carne más sabrosos, preparados con la dedicación y el tiempo que un buen asado argentino requiere.
            </p>
            <p className="text-lg font-medium text-grill-red-dark">
              Calidad, abundancia y atención familiar. Esa es nuestra promesa.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
