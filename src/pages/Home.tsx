import { useState } from 'react';
import { Link } from 'react-router-dom';
import mockData from '../data/mockData.json';

export default function Home() {
   const [busqueda, setBusqueda] = useState('');
   const [especialidad, setEspecialidad] = useState('');
   const [localidad, setLocalidad] = useState('');
   // const [tipoConsulta, setTipoConsulta] = useState('');

   // Obtener especialidades y localidades únicas
   const especialidadesUnicas = [...new Set(mockData.profesionales.map(p => p.especialidad))];
   const localidadesUnicas = [...new Set(mockData.profesionales.map(p => p.localidad))];

   // 1. Filtrado dinámico avanzado
   const profesionalesFiltrados = mockData.profesionales.filter((medico) => {
      const terminoBusqueda = busqueda.toLowerCase();
      const filtroEspecialidad = especialidad === '' || medico.especialidad === especialidad;
      const filtroLocalidad = localidad === '' || medico.localidad === localidad;
      
      const cumpleBusqueda = !terminoBusqueda || 
         medico.nombre.toLowerCase().includes(terminoBusqueda) ||
         medico.especialidad.toLowerCase().includes(terminoBusqueda) ||
         medico.localidad.toLowerCase().includes(terminoBusqueda);

      return filtroEspecialidad && filtroLocalidad && cumpleBusqueda;
   });

   // 2. Prioridad en búsquedas (Ordena: Premium [3], luego Intermedio [2], luego Básico [1])
   const profesionalesOrdenados = [...profesionalesFiltrados].sort(
      (a, b) => b.plan_id - a.plan_id
   );

   const limpiarFiltros = () => {
      setBusqueda('');
      setEspecialidad('');
      setLocalidad('');
      // setTipoConsulta('');
   };

   return (
      <div className="min-h-screen bg-slate-50 text-slate-800">

         {/* Hero Section Mejorada - Estilo TopDoctors */}
         <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-20 px-4 text-center overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-10">
               <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
               <span className="bg-blue-500/40 text-blue-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-300/30 inline-block mb-4">
                  ✓ Verificado y Auditado
               </span>
               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 leading-tight">
                  Reservá una hora con el<br /><span className="text-cyan-300">mejor médico especialista</span>
               </h1>
               <p className="text-blue-100 mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Compatible con tu Obra Social o Prepaga. Especialistas verificados y disponibles para consultas presenciales y por videollamada.
               </p>

               {/* Buscador Avanzado de 3 Campos */}
               <div className="mt-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-3xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     {/* Campo: Especialidad */}
                     <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Especialidad</label>
                        <select
                           value={especialidad}
                           onChange={(e) => setEspecialidad(e.target.value)}
                           className="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                           <option value="">Todas las especialidades</option>
                           {especialidadesUnicas.map((esp) => (
                              <option key={esp} value={esp}>{esp}</option>
                           ))}
                        </select>
                     </div>

                     {/* Campo: Localidad */}
                     <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Localidad</label>
                        <select
                           value={localidad}
                           onChange={(e) => setLocalidad(e.target.value)}
                           className="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                           <option value="">Todas las localidades</option>
                           {localidadesUnicas.map((loc) => (
                              <option key={loc} value={loc}>{loc}</option>
                           ))}
                        </select>
                     </div>
                  </div>

                  {/* Campo: Búsqueda por nombre */}
                  <div className="flex flex-col mb-4">
                     <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Buscar profesional</label>
                     <div className="relative">
                        <input
                           type="text"
                           placeholder="Nombre del médico, especialidad específica..."
                           value={busqueda}
                           onChange={(e) => setBusqueda(e.target.value)}
                           className="w-full bg-slate-50 text-slate-900 px-4 py-3 pl-10 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-slate-400"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                     </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3">
                     <button
                        onClick={limpiarFiltros}
                        className="flex-1 md:flex-auto px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-all"
                     >
                        Limpiar
                     </button>
                     <button
                        className="flex-1 px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all"
                     >
                        Buscar Médicos
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* Sección de Estadísticas - Estilo TopDoctors */}
         <section className="bg-white py-16 px-4 border-t border-slate-200">
            <div className="max-w-5xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { number: '85%', text: 'de los casos, un médico acierta en su diagnóstico en la primera consulta' },
                     { number: '95%', text: 'de los consumidores leen las valoraciones antes de tomar una decisión' },
                     { number: '90%', text: 'de los pacientes encuentra al experto más adecuado para su caso' },
                  ].map((stat, i) => (
                     <div key={i} className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</p>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">{stat.text}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Sección de Beneficios - Telemedicina y Verificación */}
         <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-5xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
                  Servicios disponibles
               </h2>
               <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                  Accedé a profesionales de salud verificados con múltiples opciones de consulta
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                     { 
                        icon: '💻', 
                        title: 'Telemedicina', 
                        desc: 'Contactá con especialistas expertos en cualquier momento y lugar mediante chat privado o videoconsulta' 
                     },
                     { 
                        icon: '✓', 
                        title: 'Pacientes Verificados', 
                        desc: 'Todas las valoraciones provienen de pacientes reales que tuvieron una consulta con el médico' 
                     },
                     { 
                        icon: '🏆', 
                        title: 'Especialistas Auditados', 
                        desc: 'Cada profesional es verificado y seleccionado por nuestro equipo de expertos' 
                     },
                     { 
                        icon: '📋', 
                        title: 'Compatibilidad', 
                        desc: 'Compatible con tu Obra Social o Prepaga. Reservá turnos sin complicaciones' 
                     },
                  ].map((benefit, i) => (
                     <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                        <p className="text-4xl mb-3">{benefit.icon}</p>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Acceso por Categorías */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto px-4 mb-8">
            {[
               { name: 'Médicos', icon: '👨‍⚕️', color: 'bg-blue-100' },
               { name: 'Farmacias', icon: '💊', color: 'bg-emerald-100' },
               { name: 'Centros', icon: '🏥', color: 'bg-red-100' },
               { name: 'Localidades', icon: '📍', color: 'bg-amber-100' },
            ].map((cat) => (
               <div key={cat.name} className="flex flex-col items-center p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all">
                  <span className="text-3xl mb-2">{cat.icon}</span>
                  <span className="text-xs font-bold uppercase text-slate-700">{cat.name}</span>
               </div>
            ))}
         </div>

         {/* Cuerpo Principal / Resultados */}
         <main className="max-w-5xl mx-auto py-12 px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
               <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                     {busqueda || especialidad || localidad ? '🔍 Resultados de búsqueda' : 'Especialistas destacados en la zona'}
                  </h2>
                  {(busqueda || especialidad || localidad) && (
                     <p className="text-sm text-slate-500 mt-1">
                        Mostrando {profesionalesOrdenados.length} profesional{profesionalesOrdenados.length !== 1 ? 'es' : ''}
                     </p>
                  )}
               </div>
               <span className="text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-full">
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
                     // Calificación simulada basada en ID
                     const medicoIdNum = Number(medico.id);
                     const rating = (3.5 + (medicoIdNum % 2 * 1.5)).toFixed(1);
                     const numReviews = 15 + (medicoIdNum % 20);

                     return (
                        <div
                           key={medico.id}
                           className={`bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border transition-all ${esPremium
                              ? 'border-amber-300 shadow-lg ring-1 ring-amber-200/50 relative overflow-hidden bg-gradient-to-r from-amber-50/30 to-white'
                              : esIntermedio
                                 ? 'border-blue-200 shadow-md hover:shadow-lg'
                                 : 'border-slate-200 shadow-sm hover:shadow-md'
                              }`}
                        >
                           {/* Badge de Plan Premium en Esquina */}
                           {esPremium && (
                              <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-[11px] uppercase px-4 py-1.5 rounded-bl-2xl shadow-md tracking-wider flex items-center gap-1">
                                 ⭐ Destacado Premium
                              </div>
                           )}

                           {/* Foto de Perfil */}
                           <div className="shrink-0">
                              <img
                                 src={medico.foto_url}
                                 alt={medico.nombre}
                                 className={`w-24 h-24 rounded-full object-cover border-3 ${esPremium ? 'border-amber-400' : esIntermedio ? 'border-blue-400' : 'border-slate-200'
                                    }`}
                              />
                           </div>

                           {/* Datos del Profesional */}
                           <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                 <div>
                                    <h3 className="font-extrabold text-slate-900 text-lg">
                                       {medico.nombre}
                                    </h3>
                                    <p className="text-blue-600 font-semibold text-sm">{medico.especialidad}</p>
                                 </div>
                                 <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg">
                                    <span className="text-amber-600 font-bold text-sm">⭐ {rating}</span>
                                    <span className="text-xs text-slate-500">({numReviews})</span>
                                 </div>
                              </div>

                              <p className="text-slate-500 text-xs mb-3">Matrícula: {medico.matricula}</p>

                              {/* Prestaciones */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                 <span className="bg-blue-100 text-blue-700 text-[11px] px-2.5 py-1 rounded-md font-medium">
                                    📍 {medico.localidad}
                                 </span>
                                 <span className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-md font-medium">
                                    Presencial
                                 </span>
                                 {esPremium && (
                                    <>
                                       <span className="bg-emerald-100 text-emerald-800 text-[11px] px-2.5 py-1 rounded-md font-medium">
                                          ⏱️ Turnos Hoy
                                       </span>
                                       <span className="bg-purple-100 text-purple-800 text-[11px] px-2.5 py-1 rounded-md font-medium">
                                          💻 Videollamada
                                       </span>
                                    </>
                                 )}
                              </div>
                           </div>

                           {/* Acción Comercial */}
                           <div className="w-full sm:w-auto pt-2 sm:pt-0 flex gap-2">
                              <Link
                                 to={`/profesional/${medico.slug}`}
                                 className={`block text-center flex-1 sm:flex-auto text-sm font-bold px-6 py-3 rounded-xl transition-all ${esPremium
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                              >
                                 {esPremium ? '📅 Reservar' : 'Ver Perfil'}
                              </Link>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                     <p className="text-slate-500 text-lg font-medium mb-2">😕 No encontramos resultados</p>
                     <p className="text-slate-400 text-sm mb-6">Intenta cambiar tus filtros o búsqueda</p>
                     <button
                        onClick={limpiarFiltros}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all"
                     >
                        Limpiar filtros
                     </button>
                  </div>
               )}
            </div>
         </main>

         {/* Footer */}
         <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800 mt-20">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
               <div>
                  <h3 className="font-bold text-white mb-3">guia de salud<span className="text-cyan-400">.ar</span></h3>
                  <p className="text-xs text-slate-400">La plataforma médica más moderna de la región. Especialistas verificados y disponibles.</p>
               </div>
               <div>
                  <h4 className="font-semibold text-white mb-3 text-sm">Enlaces</h4>
                  <ul className="space-y-2 text-xs">
                     <li><a href="#" className="hover:text-cyan-400 transition">Sobre nosotros</a></li>
                     <li><a href="#" className="hover:text-cyan-400 transition">Términos de uso</a></li>
                     <li><a href="#" className="hover:text-cyan-400 transition">Privacidad</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-semibold text-white mb-3 text-sm">Contacto</h4>
                  <p className="text-xs text-slate-400">📧 info@guiadesalud.ar</p>
                  <p className="text-xs text-slate-400">📱 +54 (11) 1234-5678</p>
               </div>
            </div>
            <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
               <p>© 2026 guia de salud.ar · La red médica más grande de la zona.</p>
            </div>
         </footer>
      </div>
   );
}