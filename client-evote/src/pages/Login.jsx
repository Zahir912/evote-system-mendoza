import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulación de login (esto debería ir a tu /auth/login del backend)
    const userData = {
      username: username,
      role: username.toLowerCase().includes("admin") ? "Admin" : "User",
    };

    onLogin(userData);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-6">
      <div className="w-full max-w-sm bg-slate-900/40 p-10 rounded-[3rem] border-2 border-slate-800">
        <h1 className="text-4xl font-black text-white italic uppercase mb-8 text-center">
          Ingresar
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            required
            className="w-full bg-slate-950 p-5 rounded-full text-sm text-white border border-slate-700 outline-none focus:border-indigo-500"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            className="w-full bg-slate-950 p-5 rounded-full text-sm text-white border border-slate-700 outline-none focus:border-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-white text-slate-900 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
