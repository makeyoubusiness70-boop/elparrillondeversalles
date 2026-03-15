import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Reviews() {
  const reviews = [
    {
      name: "Carlos M.",
      text: "La mejor parrilla de Versalles. Las porciones son enormes, pedimos una parrillada para 2 y comimos 4. La carne un espectáculo, súper tierna.",
      rating: 5,
      date: "Hace 2 semanas"
    },
    {
      name: "Laura G.",
      text: "Excelente atención y ambiente familiar. El bife de chorizo es de otro planeta. Precios muy accesibles para la cantidad y calidad que sirven.",
      rating: 5,
      date: "Hace 1 mes"
    },
    {
      name: "Diego R.",
      text: "Un bodegón con todas las letras. La milanesa de la casa es gigante, ideal para compartir. Las papas fritas bien caseras. Volveremos seguro.",
      rating: 5,
      date: "Hace 3 meses"
    },
    {
      name: "Martín P.",
      text: "Increíble la provoleta y el asado de tira. El lugar tiene esa magia de bodegón de barrio que ya no se encuentra. 100% recomendado.",
      rating: 5,
      date: "Hace 4 meses"
    },
    {
      name: "Sofía L.",
      text: "Festejamos un cumpleaños y la pasamos bárbaro. La atención de los mozos es de primera, súper atentos y rápidos. La comida espectacular.",
      rating: 5,
      date: "Hace 5 meses"
    }
  ];

  // Duplicate for marquee effect
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="opiniones" className="py-20 bg-wood text-beige overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-display mb-4 text-white">Lo que dicen nuestros clientes</h2>
          <div className="w-24 h-1 bg-grill-red mx-auto"></div>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden py-4">
          <motion.div 
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {duplicatedReviews.map((review, idx) => (
              <motion.div 
                key={idx} 
                className="bg-carbon p-8 rounded-xl shadow-xl border border-gray-800 flex flex-col w-[350px] md:w-[400px] flex-shrink-0"
                whileHover={{ scale: 1.02, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 flex-grow text-gray-300">"{review.text}"</p>
                <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                  <span className="font-bold text-grill-red">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
