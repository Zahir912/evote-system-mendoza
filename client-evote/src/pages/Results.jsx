import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "Admin";

  const fetchResults = () => {
    if (isAdmin)
      fetch("http://localhost:3000/votes/resultados")
        .then((r) => r.json())
        .then(setData);
  };

  useEffect(() => {
    fetchResults();
  }, [isAdmin]);

  if (!isAdmin)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white uppercase font-black">
        <p>Acceso restringido a administradores</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-indigo-600 rounded-full text-[10px]"
        >
          Volver
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 py-20 min-h-screen text-white">
      <h1 className="text-4xl font-black italic uppercase mb-10 text-center">
        Escrutinio <span className="text-indigo-500">Real</span>
      </h1>

      {data.map((sec, i) => (
        <div
          key={i}
          className="mb-10 bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-800"
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-indigo-500 font-bold uppercase text-[9px] tracking-widest">
              {sec._id.level}
            </h2>
            <span className="text-[9px] text-slate-500 font-bold uppercase">
              Total: {sec.total} Votos
            </span>
          </div>
          <h3 className="text-white font-black uppercase text-sm mb-6 italic">
            {sec._id.category}
          </h3>

          <div className="space-y-5">
            {sec.candidatos.map((c) => (
              <div key={c.nombre} className="relative">
                <div className="flex justify-between text-[11px] font-black uppercase mb-1">
                  <span>
                    {c.nombre} ({c.votos})
                  </span>
                  <span className="text-indigo-400">
                    {((c.votos / sec.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-1000"
                    style={{ width: `${(c.votos / sec.total) * 100}%` }}
                  />
                </div>
                <p className="text-[7px] text-slate-600 mt-2 uppercase">
                  Última actividad: {new Date(c.fecha).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={async () => {
          if (window.confirm("¿Vaciar urna?")) {
            await fetch("http://localhost:3000/votes/clear", {
              method: "DELETE",
            });
            fetchResults();
          }
        }}
        className="w-full py-4 mt-10 bg-red-600/10 text-red-500 border border-red-600/20 rounded-full font-black text-[10px] uppercase hover:bg-red-600 hover:text-white transition-all"
      >
        🚨 Resetear Urna
      </button>
    </div>
  );
}
export default Results;
