import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Parrilla encendida con carne"
    },
    {
      src: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Asado argentino"
    },
    {
      src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Bife de chorizo jugoso"
    },
    {
      src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cortes de carne premium"
    },
    {
      src: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Ambiente rústico del restaurante"
    },
    {
      src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Mesas listas para recibir comensales"
    }
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="galeria" className="py-20 bg-beige text-carbon overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-display mb-4 text-wood">Nuestra Parrilla</h2>
          <div className="w-24 h-1 bg-grill-red mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Un vistazo a lo que te espera en El Parrillón de Versalles</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {images.map((img, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="group relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-display text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-grill-red transition-colors z-50"
              onClick={closeLightbox}
            >
              <X size={36} />
            </button>
            
            <button 
              className="absolute left-4 md:left-10 text-white hover:text-grill-red transition-colors z-50 p-2"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>

            <motion.img 
              key={selectedImage}
              src={images[selectedImage].src} 
              alt={images[selectedImage].alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />

            <button 
              className="absolute right-4 md:right-10 text-white hover:text-grill-red transition-colors z-50 p-2"
              onClick={nextImage}
            >
              <ChevronRight size={48} />
            </button>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-white font-display text-xl tracking-wider">
              {images[selectedImage].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
