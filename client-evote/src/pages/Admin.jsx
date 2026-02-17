import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pedimos los resultados al backend de NestJS
    fetch("http://localhost:3000/votes/resultados")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md px-6 py-10">
      <button
        onClick={() => navigate("/")}
        className="mb-10 text-[10px] text-slate-500 font-black tracking-widest uppercase border-b border-slate-800 pb-1"
      >
        ← VOLVER AL MENÚ
      </button>

      <h1 className="text-4xl font-black text-white italic uppercase mb-10 text-center">
        Panel <span className="text-indigo-500">Admin</span>
      </h1>

      <div className="w-full bg-slate-900/40 rounded-[2.5rem] border-2 border-slate-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-950/50">
            <tr>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Candidato
              </th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
                Votos
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {results.length > 0 ? (
              results.map((r, index) => (
                // ... dentro del map de results:
                <tr
                  key={index}
                  className="hover:bg-slate-800/20 transition-colors"
                >
                  <td className="p-5 text-sm font-bold text-slate-200">
                    {r.nombre}
                  </td>
                  <td className="p-5 text-sm font-black text-center">
                    <span className="text-indigo-400">{r.totalVotos}</span>
                    <span className="text-slate-500 ml-2 text-[10px]">
                      ({r.porcentaje}%)
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="p-10 text-center text-slate-600 italic text-xs uppercase tracking-widest"
                >
                  No hay votos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ESTA LÍNEA ES LA QUE TE FALTA O ESTÁ DANDO ERROR
export default Admin;
