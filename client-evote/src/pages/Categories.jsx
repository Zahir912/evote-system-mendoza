import { useLocation, useNavigate, useParams } from "react-router-dom";

function Categories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const election = location.state?.election;

  // El organigrama exacto que me pasaste al principio
  const organigrama = {
    Nacional: [
      "Presidente y Vicepresidente",
      "Senadores Nacionales",
      "Diputados Nacionales",
    ],
    Provincial: [
      "Gobernador y Vicegobernador",
      "Senadores Provinciales",
      "Diputados Provinciales",
    ],
    Municipal: ["Intendente", "Concejales"],
  };

  // Filtramos las categorías según el nivel que viene de MongoDB
  const categoriasDisponibles = organigrama[election?.level] || [
    "Cargo General",
  ];

  return (
    <div className="relative flex flex-col items-center w-full max-w-md px-6 py-20 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 text-[10px] text-slate-500 font-black tracking-widest uppercase"
      >
        ← Volver
      </button>

      <span className="text-[10px] font-bold tracking-[0.4em] text-indigo-500 uppercase mb-2">
        {election?.level}
      </span>
      <h1 className="text-4xl font-black mb-12 italic text-white uppercase text-center leading-tight">
        Seleccione <span className="text-indigo-500">Cargo</span>
      </h1>

      <div className="w-full space-y-4">
        {categoriasDisponibles.map((cat) => (
          <button
            key={cat}
            // Al hacer clic, vamos a la pantalla de votación pasando la categoría
            onClick={() =>
              navigate(`/votar/${id}/${cat}`, { state: { election } })
            }
            className="w-full flex items-center justify-between p-7 rounded-full border-2 border-slate-800 bg-slate-900/40 hover:scale-[1.03] transition-all hover:border-indigo-500/50 group"
          >
            <span className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">
              {cat}
            </span>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
              SELECT
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
