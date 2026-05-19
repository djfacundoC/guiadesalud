import { useParams, Link } from 'react-router-dom';

export default function PerfilProfesional() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <Link to="/" className="text-blue-600 hover:underline text-sm font-medium">
          ← Volver a la guía
        </Link>
        
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">URL detectada: {slug?.replace('-', ' ')}</h2>
          <p className="text-gray-500 mt-1">Perfil del Profesional (Maqueta temporal)</p>
        </div>

        {/* Aquí irá el turnero en el futuro para los planes premium */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-center">
          <p className="text-blue-800 font-medium">Módulo de Turnos próximamente disponible</p>
        </div>
      </div>
    </div>
  );
}