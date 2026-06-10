import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, ShieldCheck, User } from 'lucide-react';

const ESPECIALIDADES = [
  'Nutrición',
  'Psicología',
  'Kinesiología',
  'Fonoaudiología',
  'Ginecología',
  'Cardiología',
  'Dermatología',
];

const OBRAS_SOCIALES = [
  'OSDE',
  'Swiss Medical',
  'Galeno',
  'PAMI',
  'IOMA',
  'Same',
  'No tengo obra social',
];

const TIPOS_CONSULTA = ['Presencial', 'Online', 'Mixta'];

export default function RegistroProfesional() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    especialidad: '',
    obraSocial: '',
    ubicacion: '',
    tipoConsulta: '',
    mensaje: '',
    acepta: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validar = () => {
    const nuevoErrors: Record<string, string> = {};
    if (!form.nombre.trim()) nuevoErrors.nombre = 'Ingresa tu nombre completo.';
    if (!form.email.trim()) {
      nuevoErrors.email = 'Ingresa tu email profesional.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nuevoErrors.email = 'Ingresa un email válido.';
    }
    if (!form.telefono.trim()) nuevoErrors.telefono = 'Ingresa tu teléfono de contacto.';
    if (!form.especialidad) nuevoErrors.especialidad = 'Selecciona una especialidad.';
    if (!form.obraSocial) nuevoErrors.obraSocial = 'Selecciona una obra social o prepaga.';
    if (!form.ubicacion.trim()) nuevoErrors.ubicacion = 'Indica tu ciudad o localidad.';
    if (!form.tipoConsulta) nuevoErrors.tipoConsulta = 'Selecciona el tipo de consulta.';
    if (!form.acepta) nuevoErrors.acepta = 'Debes aceptar recibir la confirmación por correo.';
    return nuevoErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nuevoErrors = validar();
    if (Object.keys(nuevoErrors).length > 0) {
      setErrors(nuevoErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/registro-profesional/gracias', { state: { nombre: form.nombre } });
    }, 700);
  };

  const opcionesEspecialidades = useMemo(() => ESPECIALIDADES, []);
  const opcionesObras = useMemo(() => OBRAS_SOCIALES, []);
  const opcionesConsulta = useMemo(() => TIPOS_CONSULTA, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-10 lg:p-12">
            <div className="flex items-center gap-3 mb-6 text-slate-500">
              <span className="rounded-full bg-blue-50 text-blue-700 p-2">
                <User className="w-5 h-5" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Registro de Profesional</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Completa tu inscripción profesional</h1>
            <p className="mt-4 text-slate-600 leading-7">
              Esta página está pensada para enviar por enlace a los profesionales. Cualquier persona con el enlace puede completar el formulario.
            </p>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Nombre completo
                  <input
                    value={form.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej. María López"
                  />
                  {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Email profesional
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="ejemplo@dominio.com"
                    />
                    <Mail className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Teléfono
                  <input
                    value={form.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="(011) 1234-5678"
                  />
                  {errors.telefono && <p className="text-xs text-red-500">{errors.telefono}</p>}
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Ciudad / Localidad
                  <div className="relative">
                    <input
                      value={form.ubicacion}
                      onChange={(e) => handleChange('ubicacion', e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Ej. CABA, La Plata, Rosario"
                    />
                    <MapPin className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                  {errors.ubicacion && <p className="text-xs text-red-500">{errors.ubicacion}</p>}
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Especialidad
                  <select
                    value={form.especialidad}
                    onChange={(e) => handleChange('especialidad', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona una especialidad</option>
                    {opcionesEspecialidades.map((especialidad) => (
                      <option key={especialidad} value={especialidad}>{especialidad}</option>
                    ))}
                  </select>
                  {errors.especialidad && <p className="text-xs text-red-500">{errors.especialidad}</p>}
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Obra social / Prepaga
                  <select
                    value={form.obraSocial}
                    onChange={(e) => handleChange('obraSocial', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona una obra social</option>
                    {opcionesObras.map((obra) => (
                      <option key={obra} value={obra}>{obra}</option>
                    ))}
                  </select>
                  {errors.obraSocial && <p className="text-xs text-red-500">{errors.obraSocial}</p>}
                </label>
              </div>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                Tipo de consulta
                <select
                  value={form.tipoConsulta}
                  onChange={(e) => handleChange('tipoConsulta', e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Selecciona el tipo de consulta</option>
                  {opcionesConsulta.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                {errors.tipoConsulta && <p className="text-xs text-red-500">{errors.tipoConsulta}</p>}
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                Comentarios adicionales
                <textarea
                  value={form.mensaje}
                  onChange={(e) => handleChange('mensaje', e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Contanos si tenés espacios disponibles, horarios o especialidades extra"
                />
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.acepta}
                  onChange={(e) => handleChange('acepta', e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  Acepto recibir un correo de confirmación una vez completado el registro. El envío se realizará cuando el backend con Supabase esté activo.
                </span>
              </label>
              {errors.acepta && <p className="text-xs text-red-500">{errors.acepta}</p>}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Enviando...' : 'Enviar registro'}
                </button>
                <p className="text-xs text-slate-500 max-w-md">
                  Una vez enviado, mostraremos una pantalla de confirmación. De momento no se conecta a la base de datos.
                </p>
              </div>
            </form>
          </div>

          <aside className="bg-slate-900 text-slate-50 p-10 sm:p-12">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Información clave</p>
                <h2 className="mt-3 text-2xl font-bold">Link de registro exclusivo</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Comparte esta URL con los profesionales. El acceso es público para quienes tengan el enlace.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl bg-blue-800/90 p-5 border border-blue-500/20">
                  <p className="text-sm font-semibold text-blue-100">Especialidades fijas</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    {opcionesEspecialidades.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-slate-800/90 p-5 border border-slate-600/40">
                  <div className="flex items-center gap-3 text-slate-100">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-semibold">Sin login requerido</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">
                    El único requisito hoy es tener el enlace. En el futuro integraremos Supabase para usuarios y confirmaciones automáticas.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
