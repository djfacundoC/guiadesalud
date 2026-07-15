import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, UserCircle } from 'lucide-react'; // Si eliminas lucide, usa texto o iconos SVG
// 1. IMPORTA TU LOGO AQUÍ
import logoImg from '../../assets/logo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Centros', href: '/centros' },
    { name: 'Farmacias', href: '/farmacias' },
    { name: 'Blog', href: '/blog' },
    { name: 'Registro Profesional', href: '/registro-profesional' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo y Nombre (CON IMAGEN) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              {/* 2. USA LA IMAGEN IMPORTADA */}
              <img
                src={logoImg}
                alt="Logo guiadesalud.ar"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                guiadesalud<span className="text-blue-600">.ar</span>
              </span>
            </Link>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-sm font-semibold text-slate-600 hover:text-blue-600">{link.name}</Link>
            ))}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-primary transition-all"
            >
              <UserCircle className="w-4 h-4" />
              Soy Profesional
            </Link>
          </div>

          {/* Botón Hamburguesa */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile (Desplegable) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-blue-50 rounded-lg">{link.name}</Link>
            ))}
            <div className="pt-4">
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center g text-white px-4 py-3 rounded-xl font-bold bg-slate-900">Soy Profesional</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}