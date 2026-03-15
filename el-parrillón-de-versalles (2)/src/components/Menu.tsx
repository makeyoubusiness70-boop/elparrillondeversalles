import { motion } from 'motion/react';

export default function Menu() {
  const menuCategories = [
    {
      title: "Parrilla",
      items: [
        { name: "Parrillada para 2 o 3 personas", desc: "Asado, vacío, chorizo, morcilla, chinchulín, riñón y pollo.", price: "Disponible" },
        { name: "Asado de Tira", desc: "Corte clásico argentino, jugoso y tierno.", price: "Disponible" },
        { name: "Vacío", desc: "Corte sin hueso, cocción lenta.", price: "Disponible" },
        { name: "Matambre de Cerdo", desc: "Tierno matambre a la pizza o al verdeo.", price: "Disponible" },
        { name: "Bife de Chorizo", desc: "El rey de la parrilla, porción generosa.", price: "Disponible" },
        { name: "Entraña", desc: "Corte fino y muy sabroso, vuelta y vuelta.", price: "Disponible" },
      ]
    },
    {
      title: "Achuras y Entradas",
      items: [
        { name: "Chorizo", desc: "Puro cerdo, receta casera.", price: "Disponible" },
        { name: "Morcilla", desc: "Bombón o criolla.", price: "Disponible" },
        { name: "Chinchulines", desc: "Bien crocantes con limón.", price: "Disponible" },
        { name: "Mollejas", desc: "De corazón, al verdeo o al limón.", price: "Disponible" },
        { name: "Provoleta", desc: "Queso provolone fundido con orégano y ají molido.", price: "Disponible" },
        { name: "Empanadas", desc: "Carne cortada a cuchillo, fritas o al horno.", price: "Disponible" },
      ]
    },
    {
      title: "Milanesas y Clásicos",
      items: [
        { name: "Milanesa de la Casa", desc: "Porción muy grande, para compartir. Con papas fritas.", price: "Disponible" },
        { name: "Milanesa con Cheddar y Panceta", desc: "Bañada en queso cheddar, panceta crocante y verdeo.", price: "Disponible" },
        { name: "Pollo con Papas Fritas", desc: "Cuarto trasero o pechuga a la parrilla.", price: "Disponible" },
      ]
    },
    {
      title: "Guarniciones y Ensaladas",
      items: [
        { name: "Papas Fritas", desc: "Clásicas, provenzal o a caballo.", price: "Disponible" },
        { name: "Ensalada Mixta", desc: "Lechuga, tomate y cebolla.", price: "Disponible" },
        { name: "Ensalada Completa", desc: "Lechuga, tomate, cebolla, zanahoria, huevo duro.", price: "Disponible" },
        { name: "Puré", desc: "De papa o calabaza.", price: "Disponible" },
      ]
    },
    {
      title: "Bebidas",
      items: [
        { name: "Vino de la Casa", desc: "Tinto o blanco, en jarra.", price: "Disponible" },
        { name: "Cerveza", desc: "Litro retornable, varias marcas.", price: "Disponible" },
        { name: "Gaseosas", desc: "Línea Coca-Cola, 1.5L o individual.", price: "Disponible" },
        { name: "Agua Saborizada", desc: "Pomelo, naranja, manzana.", price: "Disponible" },
      ]
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="menu" className="py-20 bg-carbon text-beige overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-display mb-4 text-grill-red">Nuestro Menú</h2>
          <div className="w-24 h-1 bg-wood mx-auto"></div>
          <p className="mt-4 text-lg text-gray-400">Porciones abundantes para compartir</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {menuCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800"
            >
              <h3 className="text-3xl font-display text-wood mb-6 border-b border-gray-800 pb-2">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <motion.li 
                    key={itemIdx} 
                    className="flex flex-col p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-default"
                    whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(31, 41, 55, 1)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xl font-bold text-beige">{item.name}</h4>
                      <span className="text-green-500 font-medium ml-4 whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
