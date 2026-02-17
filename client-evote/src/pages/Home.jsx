import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ user, onLogout }) {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [filters, setFilters] = useState({ name: "", status: "all", date: "" });

  useEffect(() => {
    const query = `?name=${filters.name}&status=${filters.status}&date=${filters.date}`;
    fetch(`http://localhost:3000/elections${query}`)
      .then((res) => res.json())
      .then((data) => setElections(data));
  }, [filters]);

  return (
    <div className="relative flex flex-col items-center w-full max-w-md px-6 py-10 min-h-screen">
      <h1 className="text-7xl font-black mb-8 italic text-white uppercase italic">
        EVOTE
      </h1>

      <button
        onClick={() => navigate("/resultados")}
        className="w-full py-5 mb-10 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20"
      >
        📊 Resultados Escrutinio
      </button>

      <div className="w-full space-y-3 mb-10 bg-slate-900/50 p-4 rounded-3xl border border-slate-800 shadow-2xl">
        <input
          type="text"
          placeholder="Buscar elección..."
          className="w-full bg-slate-950 p-4 rounded-full text-xs text-white outline-none border border-slate-700 focus:border-indigo-500"
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <div className="flex gap-2">
          <select
            className="flex-1 bg-slate-950 p-4 rounded-full text-[10px] font-black uppercase border border-slate-700"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">Estados</option>
            <option value="active">Activas</option>
            <option value="upcoming">Próximas</option>
            <option value="closed">Cerradas</option>
          </select>
          <input
            type="date"
            className="flex-1 bg-slate-950 p-4 rounded-full text-[10px] border border-slate-700"
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>
      </div>

      <div className="w-full space-y-4 mb-20">
        {elections.map((e) => (
          <button
            key={e._id}
            onClick={() =>
              navigate(`/categorias/${e._id}`, { state: { election: e } })
            }
            className="w-full flex items-center justify-between p-7 rounded-full border-2 border-slate-800 bg-slate-900/40 hover:scale-[1.03] transition-all group"
          >
            <div className="text-left">
              <h2 className="text-lg font-black text-white group-hover:text-indigo-400">
                {e.name}
              </h2>
              <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">
                {e.status} • {e.level}
              </span>
            </div>
            <span className="text-[9px] font-black text-slate-700 uppercase group-hover:text-white">
              Select
            </span>
          </button>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 flex gap-3">
        <button
          onClick={onLogout}
          className="px-5 py-3 bg-white text-slate-900 rounded-full font-black text-[10px] uppercase shadow-2xl"
        >
          Salir
        </button>
        {user?.role === "Admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="px-5 py-3 bg-indigo-600 text-white rounded-full font-black text-[10px] uppercase shadow-2xl"
          >
            ⚙️ Admin
          </button>
        )}
      </div>
    </div>
  );
}
export default Home;
