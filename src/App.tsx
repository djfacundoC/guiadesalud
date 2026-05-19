import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import PerfilProfesional from './pages/PerfilProfesional';
import Dashboard from './pages/Dashboard'; // <--- Importamos la nueva página

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* VISTAS PÚBLICAS (Llevan Navbar) */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/profesional/:slug" element={<><Navbar /><PerfilProfesional /></>} />
        
        {/* VISTA PRIVADA (El Dashboard suele NO llevar el Navbar público) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}