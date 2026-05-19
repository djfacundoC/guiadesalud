import { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { name: 'Turnos del Día', value: '12', icon: Calendar, color: 'bg-brand-primary' },
    { name: 'Pacientes Nuevos', value: '4', icon: Users, color: 'bg-brand-secondary' },
    { name: 'Turnos Pendientes', value: '3', icon: Clock, color: 'bg-orange-500' },
    { name: 'Completados', value: '85%', icon: CheckCircle2, color: 'bg-emerald-500' },
  ];

  const turnosHoy = [
    { id: 1, paciente: "Juan Pérez", hora: "09:00", especialidad: "Pediatría", estado: "Confirmado" },
    { id: 2, paciente: "Maria García", hora: "09:45", especialidad: "Control", estado: "Esperando" },
    { id: 3, paciente: "Roberto Gomez", hora: "10:30", especialidad: "Pediatría", estado: "Pendiente" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-brand-primary p-2 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Panel Salud</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'agenda', name: 'Agenda Médica', icon: Calendar },
            { id: 'pacientes', name: 'Pacientes', icon: Users },
            { id: 'config', name: 'Configuración', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id 
                ? 'bg-brand-primary text-white shadow-md' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2 text-sm font-semibold">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* HEADER TOPBAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar paciente o historial..." 
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Dr. Martínez</p>
                <p className="text-xs text-brand-primary font-medium">Plan Premium</p>
              </div>
              <div className="w-10 h-10 bg-brand-primary rounded-full border-2 border-brand-secondary"></div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900">Hola, Dr. Martínez 👋</h1>
            <p className="text-slate-500">Resumen de actividad para hoy, lunes 18 de mayo.</p>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-sm`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* TURNOS Y ACTIVIDAD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* PRÓXIMOS TURNOS */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Próximos Turnos (Mañana)</h3>
                <button className="text-brand-primary text-sm font-bold hover:underline">Ver Agenda Completa</button>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Paciente</th>
                      <th className="px-6 py-4">Hora</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {turnosHoy.map((turno) => (
                      <tr key={turno.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-700">{turno.paciente}</td>
                        <td className="px-6 py-4 text-slate-500 font-medium">{turno.hora} hs</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            turno.estado === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' : 
                            turno.estado === 'Esperando' ? 'bg-brand-primary/10 text-brand-primary' : 
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {turno.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-slate-400 hover:text-brand-primary">Atender</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUICK ACTIONS / TOOLS */}
            <div className="bg-brand-primary rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Soporte Premium</h3>
                <p className="text-brand-secondary font-medium text-sm leading-relaxed">
                  ¿Necesitas ayuda con tu agenda? Contacta a tu asesor dedicado de guiadesalud.ar
                </p>
              </div>
              <button className="mt-8 bg-white text-brand-primary font-extrabold py-3 rounded-xl hover:bg-slate-100 transition-colors">
                Contactar Asesor
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}