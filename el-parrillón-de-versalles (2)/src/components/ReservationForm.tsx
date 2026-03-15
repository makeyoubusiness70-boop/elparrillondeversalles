import React, { useState } from 'react';
import { Reservation } from '../pages/Admin';
import { motion, AnimatePresence } from 'motion/react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    people: 2,
    date: '',
    time: '',
    comments: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Simulate network delay
      setTimeout(() => {
        const newReservation: Reservation = {
          id: crypto.randomUUID(),
          ...formData,
          people: Number(formData.people),
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        const existing = localStorage.getItem('parrillon_reservations');
        const reservations = existing ? JSON.parse(existing) : [];
        reservations.push(newReservation);
        localStorage.setItem('parrillon_reservations', JSON.stringify(reservations));

        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          people: 2,
          date: '',
          time: '',
          comments: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      }, 800);
    } catch (error) {
      console.error('Error saving reservation', error);
      setStatus('error');
    }
  };

  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center py-12"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-display text-white mb-4">¡Reserva Recibida!</h3>
            <p className="text-lg text-gray-300">
              Hemos guardado tu solicitud. Te contactaremos pronto para confirmar tu mesa.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 bg-wood text-beige px-6 py-2 rounded hover:bg-opacity-80 transition-colors"
            >
              Hacer otra reserva
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileTap={{ scale: 0.98 }}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-carbon border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-grill-red focus:border-transparent transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-carbon border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-grill-red focus:border-transparent transition-all"
                  placeholder="Ej. 11 1234 5678"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div whileTap={{ scale: 0.98 }}>
                <label htmlFor="people" className="block text-sm font-medium text-gray-300 mb-2">Personas *</label>
                <select
                  id="people"
                  name="people"
                  required
                  value={formData.people}
                  onChange={handleChange}
                  className="w-full p-3 bg-carbon border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-grill-red focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                  ))}
                  <option value="15">Más de 12 (Consultar)</option>
                </select>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Fecha *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 bg-carbon border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-grill-red focus:border-transparent transition-all [color-scheme:dark]"
                />
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">Hora *</label>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 bg-carbon border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-grill-red focus:border-transparent transition-all"
                >
                  <option value="">Seleccionar hora</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                  <option value="21:30">21:30</option>
                  <option value="22:00">22:00</option>
                  <option value="22:30">22:30</option>
                  <option value="23:00">23:00</option>
                </select>
              </motion.div>
            </div>

            <motion.div whileTap={{ scale: 0.99 }}>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-2">Comentarios (Opcional)</label>
              <textarea
                id="comments"
                name="comments"
                rows={3}
                value={formData.comments}
                onChange={handleChange}
                className="w-full p-3 bg-carbon border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-grill-red focus:border-transparent resize-none transition-all"
                placeholder="Ej. Cumpleaños, silla de bebé, etc."
              ></textarea>
            </motion.div>

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900 border border-red-500 text-red-200 p-4 rounded-lg"
              >
                Hubo un error al procesar tu reserva. Por favor, intenta nuevamente o contáctanos por WhatsApp.
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
              whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
              className={`w-full py-4 rounded-lg text-xl font-bold transition-all shadow-lg relative overflow-hidden ${
                status === 'submitting' 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-grill-red hover:bg-grill-red-dark text-white'
              }`}
            >
              <span className={status === 'submitting' ? 'opacity-0' : 'opacity-100'}>
                Confirmar Reserva
              </span>
              {status === 'submitting' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
