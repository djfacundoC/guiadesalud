import { type FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, User, Clock, Plus, Trash2 } from 'lucide-react';

const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const ESPECIALIDADES = [
   'Médico Pediatra',
   'Médico General',
   'Médico Clínico',
   'Médico Geriatra',
   'Médico Traumatólogo',
   'Médico Cardiólogo',
   'Médico Neurólogo',
   'Médico Psiquiatra',
   'Médico Endocrinólogo',
   'Médico Dermatólogo',
   'Médico Ginecólogo',
   'Médico Oftalmólogo',
   'Médico Otorrinolaringólogo',
   'Médico Gastroenterólogo',
   'Médico Oncólogo',
   'Médico Reumatólogo',
   'Médico Infectólogo',
   'Médico Hematólogo',
   'Médico Neumonólogo',
   'Médico Cirujano General',
   'Médico Cirujano Plástico y Reparador',
   'Médico Nefrólogo',
   'Médico Urólogo',
   'Médico Alergista',
   'Médico Inmunólogo',
   'Médico Radiólogo',
   'Médico Patólogo',
   'Médico Forense',
   'Médico Intensivista',
   'Médico de Medicina Interna',
   'Médico de Medicina Familiar y Comunitaria',
   'Médico de Medicina del Trabajo',
   'Médico de Medicina Física y Rehabilitación',
   'Médico de Medicina Nuclear',
   'Odontología',
   'Nutrición',
   'Psicología',
   'Kinesiología',
   'Fonoaudiología',
   'Enfermería',
   'Obstetricia',
   'Terapia Ocupacional',
   'Fisioterapia',
   'Bioquímica',
   'Laboratorio Clínico',
   'Farmacia',
   'Instrumentación Quirúrgica',
   'Tecnología Médica',
   'Otro',
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

interface Horario {
   id: string;
   dias: string[];
   horaInicio: string;
   horaFin: string;
   lugar: string;
}

interface RegistroForm {
   nombre: string;
   email: string;
   telefono: string;
   especialidad: string[];
   especialidadOtro: string;
   obraSocial: string[];
   ubicacion: string;
   tipoConsulta: string[];
   mensaje: string;
   acepta: boolean;
   horarios: Horario[];
}

export default function RegistroProfesional() {
   const navigate = useNavigate();
   const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
   const [form, setForm] = useState<RegistroForm>({
      nombre: '',
      email: '',
      telefono: '',
      especialidad: [],
      especialidadOtro: '',
      obraSocial: [],
      ubicacion: '',
      tipoConsulta: [],
      mensaje: '',
      acepta: false,
      horarios: [] as Horario[],
   });
   const [errors, setErrors] = useState<Record<string, string>>({});
   const [horarioErrors, setHorarioErrors] = useState<Record<string, Record<string, string>>>({});
   const [focusTarget, setFocusTarget] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (focusTarget) {
         fieldRefs.current[focusTarget]?.focus();
      }
   }, [focusTarget]);

   const handleChange = (field: string, value: string | string[] | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: '' }));
      if (field === 'especialidad' || field === 'obraSocial' || field === 'tipoConsulta') {
         setFocusTarget(null);
      }
   };

   const agregarHorario = () => {
      const nuevoHorario: Horario = {
         id: Date.now().toString(),
         dias: [],
         horaInicio: '',
         horaFin: '',
         lugar: '',
      };
      setForm((prev) => ({ ...prev, horarios: [...prev.horarios, nuevoHorario] }));
   };

   const eliminarHorario = (id: string) => {
      setForm((prev) => ({
         ...prev,
         horarios: prev.horarios.filter((h) => h.id !== id),
      }));
      setHorarioErrors((prev) => {
         const newErrors = { ...prev };
         delete newErrors[id];
         return newErrors;
      });
   };

   const actualizarHorario = (id: string, campo: keyof Horario, valor: string | string[]) => {
      setForm((prev) => ({
         ...prev,
         horarios: prev.horarios.map((h) => (h.id === id ? { ...h, [campo]: valor } : h)),
      }));
      setHorarioErrors((prev) => ({
         ...prev,
         [id]: { ...(prev[id] || {}), [campo]: '' },
      }));
   };

   const toggleDiaHorario = (id: string, dia: string) => {
      setForm((prev) => ({
         ...prev,
         horarios: prev.horarios.map((h) => {
            if (h.id === id) {
               const diasActualizados = h.dias.includes(dia)
                  ? h.dias.filter((d) => d !== dia)
                  : [...h.dias, dia];
               return { ...h, dias: diasActualizados };
            }
            return h;
         }),
      }));
      setHorarioErrors((prev) => ({
         ...prev,
         [id]: { ...(prev[id] || {}), dias: '' },
      }));
   };

   const validar = () => {
      const nuevoErrors: Record<string, string> = {};
      let firstFocus: string | null = null;
      let scheduleErrorCount = 0;

      if (!form.nombre.trim()) {
         nuevoErrors.nombre = 'Ingresa tu nombre completo.';
         firstFocus ??= 'nombre';
      }
      if (!form.email.trim()) {
         nuevoErrors.email = 'Ingresa tu email profesional.';
         firstFocus ??= 'email';
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
         nuevoErrors.email = 'Ingresa un email válido.';
         firstFocus ??= 'email';
      }
      if (!form.telefono.trim()) {
         nuevoErrors.telefono = 'Ingresa tu teléfono de contacto.';
         firstFocus ??= 'telefono';
      }
      if (form.especialidad.length === 0) {
         nuevoErrors.especialidad = 'Selecciona al menos una especialidad.';
         firstFocus ??= 'especialidad';
      }
      if (form.especialidad.includes('Otro') && !form.especialidadOtro?.trim()) {
         nuevoErrors.especialidadOtro = 'Ingresa la especialidad.';
         firstFocus ??= 'especialidadOtro';
      }
      if (form.obraSocial.length === 0) {
         nuevoErrors.obraSocial = 'Selecciona al menos una obra social o prepaga.';
         firstFocus ??= 'obraSocial';
      }
      if (!form.ubicacion.trim()) {
         nuevoErrors.ubicacion = 'Indica tu ciudad o localidad.';
         firstFocus ??= 'ubicacion';
      }
      if (form.tipoConsulta.length === 0) {
         nuevoErrors.tipoConsulta = 'Selecciona al menos un tipo de consulta.';
         firstFocus ??= 'tipoConsulta';
      }
      if (!form.acepta) {
         nuevoErrors.acepta = 'Debes aceptar recibir la confirmación por correo.';
         firstFocus ??= 'acepta';
      }
      if (form.horarios.length === 0) {
         nuevoErrors.horarios = 'Agrega al menos un horario de atención.';
         firstFocus ??= 'especialidad';
      }

      const nuevosErroresHorarios: Record<string, Record<string, string>> = {};
      form.horarios.forEach((horario) => {
         const erroresHorario: Record<string, string> = {};
         if (horario.dias.length === 0) erroresHorario.dias = 'Selecciona al menos un día.';
         if (!horario.horaInicio) erroresHorario.horaInicio = 'Ingresa la hora de inicio.';
         if (!horario.horaFin) erroresHorario.horaFin = 'Ingresa la hora de fin.';
         if (!horario.lugar.trim()) erroresHorario.lugar = 'Ingresa el lugar de atención.';
         if (Object.keys(erroresHorario).length > 0) {
            nuevosErroresHorarios[horario.id] = erroresHorario;
            scheduleErrorCount += 1;
            if (!firstFocus) {
               firstFocus = `horario-${horario.id}-horaInicio`;
            }
         }
      });

      if (Object.keys(nuevosErroresHorarios).length > 0) {
         setHorarioErrors(nuevosErroresHorarios);
      }
      if (firstFocus) {
         setFocusTarget(firstFocus);
      }

      return { nuevoErrors, scheduleErrorCount };
   };

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { nuevoErrors, scheduleErrorCount } = validar();
      if (Object.keys(nuevoErrors).length > 0 || scheduleErrorCount > 0) {
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
   const [especialidadesVisible, setEspecialidadesVisible] = useState(10);

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
                              ref={(el) => { fieldRefs.current.nombre = el }}
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
                                 ref={(el) => { fieldRefs.current.email = el }}
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
                              ref={(el) => { fieldRefs.current.telefono = el }}
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
                                 ref={(el) => { fieldRefs.current.ubicacion = el }}
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
                              ref={(el) => { fieldRefs.current.especialidad = el }}
                              multiple
                              size={6}
                              value={form.especialidad}
                              onChange={(e) => handleChange('especialidad', Array.from(e.target.selectedOptions, (option) => option.value))}
                              className="w-full min-h-[10rem] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                           >
                              {opcionesEspecialidades.map((especialidad) => (
                                 <option key={especialidad} value={especialidad}>{especialidad}</option>
                              ))}
                           </select>
                           {errors.especialidad && <p className="text-xs text-red-500">{errors.especialidad}</p>}
                        </label>

                           {form.especialidad.includes('Otro') && (
                              <div className="mt-3">
                                 <label className="space-y-2 text-sm font-medium text-slate-700">
                                    Otra especialidad
                                    <input
                                       ref={(el) => { fieldRefs.current.especialidadOtro = el }}
                                       value={form.especialidadOtro}
                                       onChange={(e) => handleChange('especialidadOtro', e.target.value)}
                                       className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                       placeholder="Especificá la especialidad"
                                    />
                                    {errors.especialidadOtro && <p className="text-xs text-red-500">{errors.especialidadOtro}</p>}
                                 </label>
                              </div>
                           )}

                        <label className="space-y-2 text-sm font-medium text-slate-700">
                           Obra social / Prepaga
                           <select
                              ref={(el) => { fieldRefs.current.obraSocial = el }}
                              multiple
                              size={4}
                              value={form.obraSocial}
                              onChange={(e) => handleChange('obraSocial', Array.from(e.target.selectedOptions, (option) => option.value))}
                              className="w-full min-h-[8rem] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                           >
                              {opcionesObras.map((obra) => (
                                 <option key={obra} value={obra}>{obra}</option>
                              ))}
                           </select>
                           <p className="text-xs text-slate-500">Mantén presionada la tecla Ctrl (o Cmd en Mac) para seleccionar varias opciones.</p>
                           {errors.obraSocial && <p className="text-xs text-red-500">{errors.obraSocial}</p>}
                        </label>

                     </div>

                     <label className="space-y-2 text-sm font-medium text-slate-700">
                        Tipo de consulta
                        <select
                           ref={(el) => { fieldRefs.current.tipoConsulta = el }}
                           multiple
                           size={3}
                           value={form.tipoConsulta}
                           onChange={(e) => handleChange('tipoConsulta', Array.from(e.target.selectedOptions, (option) => option.value))}
                           className="w-full min-h-[7rem] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                           {opcionesConsulta.map((tipo) => (
                              <option key={tipo} value={tipo}>{tipo}</option>
                           ))}
                        </select>                           <p className="text-xs text-slate-500">Mantén presionada la tecla Ctrl (o Cmd en Mac) para seleccionar varias opciones.</p>                        {errors.tipoConsulta && <p className="text-xs text-red-500">{errors.tipoConsulta}</p>}
                     </label>

                     <div className="border-t border-slate-200 pt-6 mt-6">
                        <div className="flex items-center gap-2 mb-4">
                           <Clock className="w-5 h-5 text-blue-600" />
                           <h3 className="text-lg font-semibold text-slate-900">Horarios de atención</h3>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">
                           Agrega los diferentes horarios y lugares donde atiendes. Los profesionales suelen atender en distintos horarios y lugares.
                        </p>

                        {form.horarios.length === 0 && (
                           <p className="text-sm text-slate-500 italic mb-4">No has agregado horarios aún.</p>
                        )}

                        {form.horarios.map((horario, idx) => (
                           <div
                              key={horario.id}
                              className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4"
                           >
                              <div className="flex justify-between items-start">
                                 <span className="text-sm font-semibold text-slate-700">Horario #{idx + 1}</span>
                                 <button
                                    type="button"
                                    onClick={() => eliminarHorario(horario.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>

                              <div className="space-y-3">
                                 <label className="block text-sm font-medium text-slate-700">
                                    Días de atención
                                    <div className="mt-2 flex flex-wrap gap-2">
                                       {DIAS_SEMANA.map((dia) => (
                                          <label key={dia} className="flex items-center gap-2 cursor-pointer">
                                             <input
                                                type="checkbox"
                                                checked={horario.dias.includes(dia)}
                                                onChange={() => toggleDiaHorario(horario.id, dia)}
                                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                             />
                                             <span className="text-sm text-slate-700">{dia}</span>
                                          </label>
                                       ))}
                                    </div>
                                    {horarioErrors[horario.id]?.dias && (
                                       <p className="text-xs text-red-500 mt-2">{horarioErrors[horario.id].dias}</p>
                                    )}
                                 </label>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                 <label className="space-y-2 text-sm font-medium text-slate-700">
                                    Hora de inicio
                                    <input
                                       ref={(el) => { fieldRefs.current[`horario-${horario.id}-horaInicio`] = el }}
                                       type="time"
                                       value={horario.horaInicio}
                                       onChange={(e) => actualizarHorario(horario.id, 'horaInicio', e.target.value)}
                                       className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                    {horarioErrors[horario.id]?.horaInicio && (
                                       <p className="text-xs text-red-500">{horarioErrors[horario.id].horaInicio}</p>
                                    )}
                                 </label>

                                 <label className="space-y-2 text-sm font-medium text-slate-700">
                                    Hora de fin
                                    <input
                                       type="time"
                                       value={horario.horaFin}
                                       onChange={(e) => actualizarHorario(horario.id, 'horaFin', e.target.value)}
                                       className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                    {horarioErrors[horario.id]?.horaFin && (
                                       <p className="text-xs text-red-500">{horarioErrors[horario.id].horaFin}</p>
                                    )}
                                 </label>
                              </div>

                              <label className="space-y-2 text-sm font-medium text-slate-700">
                                 Lugar de atención
                                 <div className="relative">
                                    <input
                                       type="text"
                                       value={horario.lugar}
                                       onChange={(e) => actualizarHorario(horario.id, 'lugar', e.target.value)}
                                       className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                       placeholder="Ej. Consultorio Centro, Hospital Privado, Online"
                                    />
                                    <MapPin className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                 </div>
                                 {horarioErrors[horario.id]?.lugar && (
                                    <p className="text-xs text-red-500">{horarioErrors[horario.id].lugar}</p>
                                 )}
                              </label>
                           </div>
                        ))}

                        <button
                           type="button"
                           onClick={agregarHorario}
                           className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 text-blue-600 px-4 py-3 text-sm font-semibold hover:bg-blue-100 transition border border-blue-200"
                        >
                           <Plus className="w-4 h-4" />
                           Agregar horario
                        </button>
                        {errors.horarios && <p className="text-xs text-red-500 mt-2">{errors.horarios}</p>}
                     </div>

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
                           <p className="text-sm font-semibold text-blue-100">Especialidades incluidas</p>
                           <ul className="mt-3 space-y-1 text-xs text-slate-200 max-h-48 overflow-y-auto">
                              {opcionesEspecialidades.slice(0, especialidadesVisible).map((item) => (
                                 <li key={item}>• {item}</li>
                              ))}
                              {opcionesEspecialidades.length > especialidadesVisible ? (
                                 <li>
                                    <button
                                       type="button"
                                       onClick={() => setEspecialidadesVisible((v) => Math.min(opcionesEspecialidades.length, v + 10))}
                                       className="text-slate-400 italic hover:underline"
                                    >
                                       + Ver 10 más
                                    </button>
                                 </li>
                              ) : opcionesEspecialidades.length > 10 ? (
                                 <li>
                                    <button
                                       type="button"
                                       onClick={() => setEspecialidadesVisible(10)}
                                       className="text-slate-400 italic hover:underline"
                                    >
                                       Mostrar menos
                                    </button>
                                 </li>
                              ) : null}
                           </ul>
                        </div>

                        <div className="rounded-3xl bg-slate-800/90 p-5 border border-slate-600/40">
                           <div className="flex items-center gap-2 text-slate-100 mb-2">
                              <span className="font-semibold">✓ Sin login requerido</span>
                           </div>
                           <p className="text-xs text-slate-400">
                              El único requisito es tener el enlace. Próximamente Supabase para usuarios y confirmaciones automáticas.
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
