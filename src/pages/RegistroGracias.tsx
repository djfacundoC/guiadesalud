import { Link, useLocation } from 'react-router-dom';

export default function RegistroGracias() {
  const location = useLocation();
  const nombre = (location.state as { nombre?: string } | null)?.nombre;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-12 shadow-2xl border border-slate-200 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <span className="text-3xl">✅</span>
        </div>

        <h1 className="mt-8 text-3xl font-bold text-slate-900">Registro enviado con éxito</h1>
        <p className="mt-4 text-slate-600 text-base leading-7">
          {nombre ? `Gracias ${nombre},` : 'Gracias,'} recibimos tu solicitud correctamente.
        </p>
        <p className="mt-3 text-slate-600 text-base leading-7">
          En breve recibirás un correo de confirmación. Esta página simula el flujo de confirmación y la posterior visualización de envío correcto.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Volver al inicio
          </Link>
          <Link
            to="/registro-profesional"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Registrar otro profesional
          </Link>
        </div>
      </div>
    </div>
  );
}
