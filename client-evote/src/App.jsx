import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Voting from "./pages/Voting";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Results from "./pages/Results"; // <-- Importamos la nueva página de porcentajes

function App() {
  // Inicializamos el usuario desde el localStorage para no perder la sesión al recargar
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Routes>
      {/* Ruta de Acceso */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Menú Principal: Si no hay usuario, mandamos al Login */}
      <Route
        path="/"
        element={
          user ? (
            <Home user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 1. Selección de Nivel (Nacional, Provincial, Municipal) */}
      <Route
        path="/categorias/:id"
        element={user ? <Categories /> : <Navigate to="/login" />}
      />

      {/* 2. Selección de cargo específico y emisión del voto */}
      <Route
        path="/votar/:id/:category"
        element={user ? <Voting /> : <Navigate to="/login" />}
      />

      {/* 3. NUEVA RUTA: Tablero de resultados con porcentajes por jerarquía */}
      <Route
        path="/resultados"
        element={user ? <Results /> : <Navigate to="/login" />}
      />

      {/* 4. Panel de Control: Solo accesible para usuarios con rol 'Admin' */}
      <Route
        path="/admin"
        element={user?.role === "Admin" ? <Admin /> : <Navigate to="/" />}
      />

      {/* Redirección por defecto si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
