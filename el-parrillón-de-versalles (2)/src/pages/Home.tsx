import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Statistics from '../components/Statistics';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Location from '../components/Location';
import Contact from '../components/Contact';
import ReservationForm from '../components/ReservationForm';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import ScrollProgress from '../components/ScrollProgress';
import BackToTop from '../components/BackToTop';
import { MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Statistics />
        <Menu />
        <Gallery />
        <Reviews />
        <Location />
        <section id="reservas" className="py-20 bg-carbon text-beige">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl mb-4 text-grill-red">Reserva tu mesa</h2>
              <p className="text-xl opacity-80">Asegurá tu lugar en El Parrillón de Versalles</p>
            </motion.div>
            <ReservationForm />
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      
      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/541162491855"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0px 0px 0px 0px rgba(34, 197, 94, 0.4)",
            "0px 0px 0px 15px rgba(34, 197, 94, 0)",
            "0px 0px 0px 0px rgba(34, 197, 94, 0)"
          ]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}
