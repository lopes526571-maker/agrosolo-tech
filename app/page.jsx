"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { calcularSolo } from "../lib/calculos";

export default function Home() {
  const [cultura, setCultura] = useState("");
  const [ph, setPh] = useState("");
  const [fosforo, setFosforo] = useState("");
  const [potassio, setPotassio] = useState("");
  const [calcio, setCalcio] = useState("");
  const [magnesio, setMagnesio] = useState("");
  const [area, setArea] = useState("");
  const [resultado, setResultado] = useState("");

  async function gerarAnalise() {
    const texto = calcularSolo({
      cultura,
      ph,
      fosforo,
      potassio,
      calcio,
      magnesio,
      area,
    });

    setResultado(texto);

    try {
      await addDoc(collection(db, "analises"), {
        usuario: auth.currentUser?.email || "sem-email",
        cultura,
        ph,
        fosforo,
        potassio,
        calcio,
        magnesio,
        area,
        resultado: texto,
        data: new Date().toLocaleString("pt-BR"),
      });

      alert("✅ Análise salva com sucesso!");
    } catch (erro) {
      console.log(erro);
      alert("❌ Erro ao salvar análise");
    }
  }

  return (
    <main style={mainStyle}>
      <h1 style={tituloStyle}>🌱 AgroSolo Tech</h1>

      <div style={formStyle}>
        <select
          value={cultura}
          onChange={(e) => setCultura(e.target.value)}
          style={inputStyle}
        >
          <option value="">Selecione a cultura</option>
          <option value="Soja">Soja</option>
          <option value="Milho">Milho</option>
          <option value="Pastagem">Pastagem</option>
        </select>

        <input placeholder="pH" value={ph} onChange={(e) => setPh(e.target.value)} style={inputStyle} />
        <input placeholder="Fósforo" value={fosforo} onChange={(e) => setFosforo(e.target.value)} style={inputStyle} />
        <input placeholder="Potássio" value={potassio} onChange={(e) => setPotassio(e.target.value)} style={inputStyle} />
        <input placeholder="Cálcio" value={calcio} onChange={(e) => setCalcio(e.target.value)} style={inputStyle} />
        <input placeholder="Magnésio" value={magnesio} onChange={(e) => setMagnesio(e.target.value)} style={inputStyle} />
        <input placeholder="Área de aplicação (ha)" value={area} onChange={(e) => setArea(e.target.value)} style={inputStyle} />

        <button onClick={gerarAnalise} style={buttonStyle}>
          Gerar Recomendação
        </button>
      </div>

      <div style={resultadoStyle}>
        <h2 style={{ color: "#00ff88" }}>Resultado</h2>
        <p>{resultado}</p>
      </div>
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
  fontSize: "55px",
  color: "#00ff88",
  marginBottom: "40px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  maxWidth: "500px",
};

const inputStyle = {
  padding: "18px",
  borderRadius: "12px",
  border: "1px solid #333",
  background: "#1e293b",
  color: "white",
  fontSize: "18px",
};

const buttonStyle = {
  background: "#00ff88",
  color: "black",
  border: "none",
  padding: "18px",
  borderRadius: "15px",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
};

const resultadoStyle = {
  marginTop: "40px",
  background: "#111827",
  padding: "30px",
  borderRadius: "20px",
  whiteSpace: "pre-line",
};