import { useState } from 'react';
import { Link } from 'react-router-dom';
import mockData from '../data/mockData.json';

export default function Home() {
   const [busqueda, setBusqueda] = useState('');

   // 1. Filtrado dinámico por nombre o especialidad
   const profesionalesFiltrados = mockData.profesionales.filter((medico) => {
      const termino = busqueda.toLowerCase();

      // Buscamos coincidencia en nombre, especialidad O localidad
      return (
         medico.nombre.toLowerCase().includes(termino) ||
         medico.especialidad.toLowerCase().includes(termino) ||
         medico.localidad.toLowerCase().includes(termino)
      );
   });

   // 2. Prioridad en búsquedas (Ordena: Premium [3], luego Intermedio [2], luego Básico [1])
   const profesionalesOrdenados = [...profesionalesFiltrados].sort(
      (a, b) => b.plan_id - a.plan_id
   );

   return (
      <div className="min-h-screen bg-slate-50 text-slate-800">

         {/* Hero Section / Presentación Comercial */}
         <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-16 px-4 text-center shadow-md">
            <div className="max-w-3xl mx-auto">
               <span className="bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-400/20">
                  Lanzamiento Local
               </span>
               <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4">
                  guia de salud<span className="text-cyan-400">.ar</span>
               </h1>
               <p className="text-blue-100 mt-3 text-lg max-w-xl mx-auto">
                  La plataforma médica definitiva de nuestra región. Encontrá especialistas y reservá turnos en segundos.
               </p>

               {/* Barra de Búsqueda de Alto Impacto */}
               <div className="mt-8 max-w-xl mx-auto relative">
                  <input
                     type="text"
                     placeholder="Buscar por especialista o especialidad (ej. Pediatría)..."
                     value={busqueda}
                     onChange={(e) => setBusqueda(e.target.value)}
                     className="w-full bg-white text-slate-900 pl-5 pr-12 py-4 rounded-2xl shadow-xl border-none focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base placeholder-slate-400 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold pointer-events-none">
                     🔍
                  </div>
               </div>
            </div>
         </section>

         {/* Acceso por Categorías */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-xl mx-auto">
            {[
               { name: 'Médicos', icon: '👨‍⚕️', color: 'bg-blue-100' },
               { name: 'Farmacias', icon: '💊', color: 'bg-emerald-100' },
               { name: 'Centros', icon: '🏥', color: 'bg-red-100' },
               { name: 'Localidades', icon: '📍', color: 'bg-amber-100' },
            ].map((cat) => (
               <div key={cat.name} className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 cursor-pointer transition-all">
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-bold uppercase">{cat.name}</span>
               </div>
            ))}
         </div>

         {/* Cuerpo Principal / Resultados */}
         <main className="max-w-3xl mx-auto py-12 px-4">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-slate-900">
                  {busqueda ? 'Resultados de búsqueda' : 'Profesionales destacados en la zona'}
               </h2>
               <span className="text-xs font-medium text-slate-500 bg-slate-200/60 px-2 py-1 rounded-md">
                  {profesionalesOrdenados.length} disponibles
               </span>
            </div>

            {/* Listado con Diferenciación Estética de Planes */}
            <div className="flex flex-col gap-4">
               {profesionalesOrdenados.length > 0 ? (
                  profesionalesOrdenados.map((medico) => {
                     // Estilos condicionales basados en el Plan contratado
                     const esPremium = medico.plan_id === 3;
                     const esIntermedio = medico.plan_id === 2;

                     return (
                        <div
                           key={medico.id}
                           className={`bg-white rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 border transition-all ${esPremium
                              ? 'border-amber-300 shadow-md ring-1 ring-amber-200/50 relative overflow-hidden bg-gradient-to-r from-amber-50/20 to-white'
                              : esIntermedio
                                 ? 'border-blue-200 shadow-sm'
                                 : 'border-slate-100 shadow-sm'
                              }`}
                        >
                           {/* Badge de Plan Premium en Esquina */}
                           {esPremium && (
                              <div className="absolute top-0 right-0 bg-amber-500 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-bl-xl shadow-sm tracking-wider">
                                 Destacado Premium
                              </div>
                           )}

                           {/* Foto de Perfil */}
                           <img
                              src={medico.foto_url}
                              alt={medico.nombre}
                              className={`w-20 h-20 rounded-full object-cover border-2 shrink-0 ${esPremium ? 'border-amber-400' : esIntermedio ? 'border-blue-500' : 'border-slate-200'
                                 }`}
                           />

                           {/* Datos del Profesional */}
                           <div className="flex-1 text-center sm:text-left">
                              <h3 className="font-extrabold text-slate-900 text-lg flex items-center justify-center sm:justify-start gap-2">
                                 {medico.nombre}
                              </h3>
                              <p className="text-blue-600 font-semibold text-sm mt-0.5">{medico.especialidad}</p>
                              <p className="text-slate-400 text-xs mt-1">Matrícula Nacional: {medico.matricula}</p>

                              {/* Prestaciones ficticias según plan para impresionar en la demo */}
                              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-1.5">
                                 <span className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-md font-medium">
                                    Atención Presencial
                                 </span>
                                 {esPremium && (
                                    <span className="bg-emerald-100 text-emerald-800 text-[11px] px-2 py-0.5 rounded-md font-medium">
                                       ⏱️ Turnos Hoy
                                    </span>
                                 )}
                              </div>
                           </div>

                           {/* Acción Comercial */}
                           <div className="w-full sm:w-auto pt-2 sm:pt-0">
                              <Link
                                 to={`/profesional/${medico.slug}`}
                                 className={`block text-center w-full sm:w-auto text-sm font-bold px-5 py-3 rounded-xl transition-all ${esPremium
                                    ? 'bg-amber-500 hover:bg-brand-primary text-white shadow-sm shadow-amber-300'
                                    : 'bg-brand-primary hover:bg-blue-700 text-white'
                                    }`}
                              >
                                 {esPremium ? 'Reservar Turno' : 'Ver Perfil'}
                              </Link>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                     <p className="text-slate-400 text-base">No encontramos profesionales con ese criterio.</p>
                  </div>
               )}
            </div>
         </main>

         {/* Footer corporativo de venta */}
         <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs mt-20 border-t border-slate-800">
            <p>© 2026 guiadesalud.ar · La red médica más grande de la zona.</p>
         </footer>
      </div>
   );
}