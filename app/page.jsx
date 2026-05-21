"use client";

import { useState } from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase";

export default function Home() {
  const [cultura, setCultura] =
    useState("");

  const [ph, setPh] =
    useState("");

  const [fosforo, setFosforo] =
    useState("");

  const [potassio, setPotassio] =
    useState("");

  const [area, setArea] =
    useState("");

  const [resultado, setResultado] =
    useState("");

  async function gerarAnalise() {
    let texto = "";

    if (ph < 5.5) {
      texto +=
        "⚠️ Solo ácido. Recomenda-se calagem.\n";
    }

    if (fosforo < 10) {
      texto +=
        "⚠️ Fósforo baixo. Fazer adubação fosfatada.\n";
    }

    if (potassio < 30) {
      texto +=
        "⚠️ Potássio baixo. Fazer adubação potássica.\n";
    }

    if (
      texto === ""
    ) {
      texto =
        "✅ Solo em boas condições.";
    }

    setResultado(texto);

    try {
      await addDoc(
        collection(
          db,
          "analises"
        ),

        {
          usuario:
            auth.currentUser
              ?.email ||

            "sem-email",

          cultura:
            cultura,

          ph: ph,

          fosforo:
            fosforo,

          potassio:
            potassio,

          area: area,

          resultado:
            texto,

          data:
            new Date(),
        }
      );

      alert(
        "✅ Análise salva com sucesso!"
      );
    } catch (erro) {
      console.log(
        erro
      );

      alert(
        "❌ Erro ao salvar análise"
      );
    }
  }

  return (
    <main
      style={{
        minHeight:
          "100vh",

        background:
          "#020617",

        padding:
          "40px",

        color:
          "white",

        fontFamily:
          "Arial",
      }}
    >
      <h1
        style={{
          color:
            "#00ff88",

          fontSize:
            "55px",

          marginBottom:
            "40px",
        }}
      >
        🌱 AgroSolo Tech
      </h1>

      <div
        style={{
          display:
            "flex",

          flexDirection:
            "column",

          gap: "20px",

          maxWidth:
            "500px",
        }}
      >
        <input
          placeholder="Cultura"
          value={
            cultura
          }
          onChange={(
            e
          ) =>
            setCultura(
              e.target
                .value
            )
          }
          style={
            inputStyle
          }
        />

        <input
          placeholder="pH"
          value={ph}
          onChange={(
            e
          ) =>
            setPh(
              e.target
                .value
            )
          }
          style={
            inputStyle
          }
        />

        <input
          placeholder="Fósforo"
          value={
            fosforo
          }
          onChange={(
            e
          ) =>
            setFosforo(
              e.target
                .value
            )
          }
          style={
            inputStyle
          }
        />

        <input
          placeholder="Potássio"
          value={
            potassio
          }
          onChange={(
            e
          ) =>
            setPotassio(
              e.target
                .value
            )
          }
          style={
            inputStyle
          }
        />

        <input
          placeholder="Área (ha)"
          value={area}
          onChange={(
            e
          ) =>
            setArea(
              e.target
                .value
            )
          }
          style={
            inputStyle
          }
        />

        <button
          onClick={
            gerarAnalise
          }
          style={{
            background:
              "#00ff88",

            color:
              "black",

            border:
              "none",

            padding:
              "18px",

            borderRadius:
              "15px",

            fontSize:
              "20px",

            fontWeight:
              "bold",

            cursor:
              "pointer",
          }}
        >
          Gerar
          Recomendação
        </button>
      </div>

      <div
        style={{
          marginTop:
            "40px",

          background:
            "#111827",

          padding:
            "30px",

          borderRadius:
            "20px",

          whiteSpace:
            "pre-line",
        }}
      >
        <h2
          style={{
            color:
              "#00ff88",
          }}
        >
          Resultado
        </h2>

        <p>
          {resultado}
        </p>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "18px",

  borderRadius:
    "12px",

  border:
    "1px solid #333",

  background:
    "#1e293b",

  color:
    "white",

  fontSize:
    "18px",
};