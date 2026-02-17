import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function Voting() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);
  const [confirmCandidate, setConfirmCandidate] = useState(null);
  const election = location.state?.election;

  useEffect(() => {
    if (!id || !category) return;
    setLoading(true);
    // Pedimos solo los candidatos del cargo elegido
    fetch(
      `http://localhost:3000/elections/${id}/candidates?category=${category}`,
    )
      .then((res) => res.json())
      .then((data) => setCandidates(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [id, category]);

  const handleVote = async (candidate) => {
    if (voting) return;
    setVoting(true);
    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      electionId: id,
      level: election?.level || "Provincial",
      candidateId: candidate._id,
      candidateName: candidate.name,
      userId: user?.username,
      category: category,
    };

    try {
      const res = await fetch("http://localhost:3000/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Ya has votado en esta categoría.");
      alert("¡Voto registrado!");
      navigate("/resultados");
    } catch (err) {
      alert(err.message);
    } finally {
      setVoting(false);
      setConfirmCandidate(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md px-6 pt-24 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 text-[10px] text-slate-500 font-black uppercase"
      >
        ← Volver
      </button>
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
          {category}
        </span>
        <h2 className="text-4xl font-black text-white uppercase italic">
          Candidatos
        </h2>
      </div>
      <div className="w-full space-y-6">
        {candidates.map((c) => (
          <div
            key={c.name}
            className="p-8 bg-slate-900/40 border-2 border-slate-800 rounded-[3rem] flex flex-col items-center"
          >
            <h3 className="text-2xl font-black text-white uppercase mb-2">
              {c.name}
            </h3>
            <p className="text-slate-500 text-[10px] font-black uppercase mb-6">
              {c.party}
            </p>
            <button
              onClick={() => setConfirmCandidate(c)}
              className="w-full bg-indigo-600 py-4 rounded-full font-black text-xs"
            >
              VOTAR AHORA
            </button>
          </div>
        ))}
      </div>
      {confirmCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-black text-white mb-6 text-center italic uppercase">
              ¿Confirmar voto por {confirmCandidate.name}?
            </h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setConfirmCandidate(null)}
                className="px-5 py-3 border border-slate-700 text-slate-300 rounded-full font-bold uppercase text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleVote(confirmCandidate)}
                className="px-6 py-3 bg-white text-slate-900 rounded-full font-black uppercase text-xs"
              >
                {voting ? "Enviando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Voting;
