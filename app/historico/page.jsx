"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";

export default function Historico() {
  const [analises, setAnalises] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      try {
        if (!usuario) {
          setErro("Você precisa estar logada para ver o histórico.");
          setCarregando(false);
          return;
        }

        const q = query(
          collection(db, "analises"),
          where("usuario", "==", usuario.email)
        );

        const querySnapshot = await getDocs(q);

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAnalises(lista);
        setCarregando(false);
      } catch (e) {
        console.error(e);
        setErro(e.message);
        setCarregando(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main style={mainStyle}>
      <h1 style={tituloStyle}>📋 Histórico de Análises</h1>

      {carregando && <p>Carregando histórico...</p>}

      {erro && (
        <div style={erroStyle}>
          ⚠️ Erro: {erro}
        </div>
      )}

      {!carregando && !erro && analises.length === 0 && (
        <p>Nenhuma análise encontrada.</p>
      )}

      {analises.map((analise) => (
        <div key={analise.id} style={cardStyle}>
          <h2>🌱 {analise.cultura}</h2>
          <p>Data: {analise.data}</p>
          <p>pH: {analise.ph}</p>
          <p>Fósforo: {analise.fosforo}</p>
          <p>Potássio: {analise.potassio}</p>
          <p>Cálcio: {analise.calcio}</p>
          <p>Magnésio: {analise.magnesio}</p>
          <p>Área: {analise.area} ha</p>

          <hr style={{ margin: "15px 0" }} />

          <p style={{ whiteSpace: "pre-line" }}>
            {analise.resultado}
          </p>
        </div>
      ))}
    </main>
  );
}

const mainStyle = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  padding: "40px",
  fontFamily: "Arial",
};

const tituloStyle = {
  color: "#00ff88",
  fontSize: "50px",
  marginBottom: "40px",
};

const cardStyle = {
  background: "#111827",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "20px",
};

const erroStyle = {
  background: "#7f1d1d",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "20px",
};