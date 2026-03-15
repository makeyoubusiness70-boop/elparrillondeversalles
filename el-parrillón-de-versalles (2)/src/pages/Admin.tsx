import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Upload, Trash2, CheckCircle, XCircle, Clock, MessageCircle } from 'lucide-react';

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  people: number;
  date: string;
  time: string;
  comments: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filterDate, setFilterDate] = useState('');
  
  // Modal states
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [importData, setImportData] = useState<Reservation[] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Simple client-side auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'parrilla123') { // Simple password as requested
      setIsAuthenticated(true);
      setError('');
      loadReservations();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadReservations = () => {
    const saved = localStorage.getItem('parrillon_reservations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sort by date and time
        parsed.sort((a: Reservation, b: Reservation) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
        setReservations(parsed);
      } catch (e) {
        console.error('Error parsing reservations', e);
      }
    }
  };

  const saveReservations = (updated: Reservation[]) => {
    localStorage.setItem('parrillon_reservations', JSON.stringify(updated));
    setReservations(updated);
  };

  const updateStatus = (id: string, status: Reservation['status']) => {
    const updated = reservations.map(r => r.id === id ? { ...r, status } : r);
    saveReservations(updated);
    showToast('Estado actualizado');
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      const updated = reservations.filter(r => r.id !== deleteConfirmId);
      saveReservations(updated);
      setDeleteConfirmId(null);
      showToast('Reserva eliminada');
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reservations, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `reservas_parrillon_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportCSV = () => {
    if (reservations.length === 0) return;
    
    const headers = ['ID', 'Nombre', 'Teléfono', 'Personas', 'Fecha', 'Hora', 'Estado', 'Comentarios', 'Creado'];
    const csvRows = [headers.join(',')];
    
    reservations.forEach(r => {
      const row = [
        r.id,
        `"${r.name.replace(/"/g, '""')}"`,
        `"${r.phone}"`,
        r.people,
        r.date,
        r.time,
        r.status,
        `"${(r.comments || '').replace(/"/g, '""')}"`,
        r.createdAt
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reservas_parrillon_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          setImportData(imported);
        } else {
          showToast('El archivo no tiene el formato correcto');
        }
      } catch (err) {
        showToast('Error al leer el archivo JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const confirmImport = () => {
    if (importData) {
      const currentMap = new Map<string, Reservation>(reservations.map(r => [r.id, r]));
      importData.forEach((r: Reservation) => currentMap.set(r.id, r));
      saveReservations(Array.from(currentMap.values()));
      setImportData(null);
      showToast('Reservas importadas correctamente');
    }
  };

  const setTodayFilter = () => {
    const today = new Date().toISOString().split('T')[0];
    setFilterDate(today);
  };

  const getWhatsAppLink = (res: Reservation) => {
    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = res.phone.replace(/\D/g, '');
    // Format date to be more readable (e.g., DD/MM/YYYY)
    const formattedDate = new Date(res.date).toLocaleDateString('es-AR');
    const message = `Hola ${res.name}, te confirmamos tu reserva en El Parrillón de Versalles para el ${formattedDate} a las ${res.time} para ${res.people} personas. ¡Te esperamos!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const filteredReservations = filterDate 
    ? reservations.filter(r => r.date === filterDate)
    : reservations;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-carbon flex items-center justify-center p-4">
        <div className="bg-beige p-8 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl text-wood mb-2">Panel de Control</h1>
            <p className="text-gray-600">El Parrillón de Versalles</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña de acceso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grill-red focus:border-transparent"
                placeholder="Ingresa la contraseña"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-grill-red text-white py-3 rounded-lg font-bold hover:bg-grill-red-dark transition-colors"
            >
              Ingresar
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-wood hover:underline text-sm flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-carbon text-beige p-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-grill-red transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl">Administración de Reservas</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportJSON} className="flex items-center gap-2 bg-wood hover:bg-opacity-80 px-4 py-2 rounded text-sm transition-colors">
              <Download size={16} /> JSON
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 bg-wood hover:bg-opacity-80 px-4 py-2 rounded text-sm transition-colors">
              <Download size={16} /> CSV
            </button>
            <label className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors cursor-pointer">
              <Upload size={16} /> Importar
              <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 animate-fade-in">
          <CheckCircle size={20} className="text-green-400" />
          {toastMessage}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-carbon mb-4">¿Eliminar reserva?</h3>
            <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Confirmation Modal */}
      {importData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-carbon mb-4">Confirmar Importación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de importar {importData.length} reservas? 
              Esto actualizará las reservas existentes que tengan el mismo ID.
            </p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setImportData(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmImport}
                className="px-4 py-2 bg-grill-red text-white rounded hover:bg-grill-red-dark transition-colors"
              >
                Importar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto p-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-carbon">Listado de Reservas</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={setTodayFilter}
                className="text-sm bg-grill-red text-white px-4 py-2 rounded hover:bg-grill-red-dark transition-colors"
              >
                Ver Hoy
              </button>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Filtrar por fecha:</label>
                <input 
                  type="date" 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="border border-gray-300 rounded p-2 text-sm"
                />
                {filterDate && (
                  <button onClick={() => setFilterDate('')} className="text-gray-500 hover:text-red-500">
                    <XCircle size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 border-b-2 border-gray-200">
                  <th className="p-4 font-semibold">Fecha y Hora</th>
                  <th className="p-4 font-semibold">Cliente</th>
                  <th className="p-4 font-semibold">Personas</th>
                  <th className="p-4 font-semibold">Estado</th>
                  <th className="p-4 font-semibold">Comentarios</th>
                  <th className="p-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No hay reservas para mostrar.
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res) => (
                    <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{new Date(res.date).toLocaleDateString('es-AR')}</div>
                        <div className="text-sm text-gray-500">{res.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{res.name}</div>
                        <div className="text-sm text-gray-500">{res.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm font-medium">
                          {res.people} pax
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={res.status}
                          onChange={(e) => updateStatus(res.id, e.target.value as Reservation['status'])}
                          className={`text-sm font-medium rounded-full py-1 px-3 border-0 focus:ring-2 focus:ring-offset-1 ${
                            res.status === 'confirmed' ? 'bg-green-100 text-green-800 focus:ring-green-500' :
                            res.status === 'cancelled' ? 'bg-red-100 text-red-800 focus:ring-red-500' :
                            'bg-yellow-100 text-yellow-800 focus:ring-yellow-500'
                          }`}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmada</option>
                          <option value="cancelled">Cancelada</option>
                        </select>
                      </td>
                      <td className="p-4 max-w-xs truncate text-sm text-gray-600" title={res.comments}>
                        {res.comments || '-'}
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <a 
                          href={getWhatsAppLink(res)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors"
                          title="Confirmar por WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </a>
                        <button 
                          onClick={() => setDeleteConfirmId(res.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                          title="Eliminar reserva"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-right">
            Total: {filteredReservations.length} reservas
          </div>
        </div>
      </main>
    </div>
  );
}
