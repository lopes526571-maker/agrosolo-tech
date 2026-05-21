"use client";

import { useState, useEffect } from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Home() {
  // =========================
  // LOADING AUTH
  // =========================

  const [loading, setLoading] =
    useState(true);

  // =========================
  // PROTEÇÃO LOGIN
  // =========================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          if (!user) {
            window.location.href =
              "/login";
          } else {
            setLoading(false);
          }
        }
      );

    return () => unsubscribe();
  }, []);

  // =========================
  // STATES
  // =========================

  const [cultura, setCultura] =
    useState("Pastagem");

  const [ph, setPh] =
    useState("");

  const [fosforo, setFosforo] =
    useState("");

  const [potassio, setPotassio] =
    useState("");

  const [unidadeK, setUnidadeK] =
    useState("mg");

  const [calcio, setCalcio] =
    useState("");

  const [magnesio, setMagnesio] =
    useState("");

  const [ctc, setCtc] =
    useState("");

  const [area, setArea] =
    useState("");

  const [resultado, setResultado] =
    useState("");

  const [vBase, setVBase] =
    useState("");

  // =========================
  // LOGOUT
  // =========================

  async function sair() {
    await signOut(auth);

    window.location.href =
      "/login";
  }

  // =========================
  // ANALISAR SOLO
  // =========================

  function analisarSolo() {
    let recomendacoes = [];

    // =========================
    // CONVERSÃO K
    // =========================

    let kConvertido = 0;

    if (unidadeK === "mg") {
      kConvertido =
        Number(potassio) / 391;
    }

    if (unidadeK === "cmol") {
      kConvertido =
        Number(potassio);
    }

    // =========================
    // V%
    // =========================

    const V1 =
      ((Number(calcio) +
        Number(magnesio) +
        kConvertido) /
        Number(ctc)) *
      100;

    setVBase(V1.toFixed(1));

    // =========================
    // V2 CULTURA
    // =========================

    let V2 = 50;

    if (cultura === "Soja") {
      V2 = 60;
    }

    if (cultura === "Milho") {
      V2 = 65;
    }

    if (cultura === "Café") {
      V2 = 70;
    }

    // =========================
    // CALAGEM
    // =========================

    let NC =
      ((V2 - V1) *
        Number(ctc)) /
      100;

    if (NC < 0) {
      NC = 0;
    }

    const sacosCalcario =
      NC * 40;

    // =========================
    // KCL
    // =========================

    const kIdeal = 0.25;

    const necessidadeK =
      kIdeal - kConvertido;

    // =========================
    // pH
    // =========================

    if (Number(ph) < 5.5) {
      recomendacoes.push(
        "Solo ácido. Necessária correção com calcário."
      );
    } else {
      recomendacoes.push(
        "pH adequado."
      );
    }

    // =========================
    // FÓSFORO
    // =========================

    if (Number(fosforo) < 15) {
      recomendacoes.push(
        "Fósforo baixo. Fazer adubação fosfatada."
      );
    } else {
      recomendacoes.push(
        "Fósforo adequado."
      );
    }

    // =========================
    // POTÁSSIO
    // =========================

    if (kConvertido < 0.15) {
      recomendacoes.push(
        "Potássio baixo. Necessária correção potássica."
      );
    } else {
      recomendacoes.push(
        "Potássio adequado."
      );
    }

    // =========================
    // RECOMENDAÇÃO KCL
    // =========================

    if (necessidadeK > 0) {
      const kgKcl =
        necessidadeK * 400;

      const sacosKcl =
        kgKcl / 50;

      const totalKcl =
        kgKcl * Number(area);

      recomendacoes.push(
        `

Recomendação potássica:

Aplicar ${kgKcl.toFixed(
          0
        )} kg/ha de KCl

(${sacosKcl.toFixed(
          1
        )} sacos por hectare).`
      );

      if (kgKcl > 50) {
        recomendacoes.push(
          "Atenção: Dose elevada de KCl. Aplicar excedente a lanço ou em cobertura."
        );
      }

      if (Number(area) > 0) {
        recomendacoes.push(
          `

Para ${area} hectares:

${totalKcl.toFixed(
            0
          )} kg de KCl no total.`
        );
      }
    }

    // =========================
    // CALAGEM FINAL
    // =========================

    if (NC > 0) {
      recomendacoes.push(
        `

Necessidade de calagem:

${NC.toFixed(
  2
)} t/ha de calcário

(${sacosCalcario.toFixed(
          0
        )} sacos por hectare).`
      );
    } else {
      recomendacoes.push(
        "Não há necessidade de calagem."
      );
    }

    setResultado(
      recomendacoes.join(" ")
    );
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          background:
            "#0f172a",
          color: "white",
          fontSize: "30px",
          fontFamily: "Arial",
        }}
      >
        Carregando 🚜
      </main>
    );
  }

  // =========================
  // RETURN
  // =========================

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "#0f172a",
        padding: "30px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* TOPO */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "60px",
              color: "#00ff88",
            }}
          >
            AgroSolo Tech
          </h1>

          <p>
            Inteligência em Solo
          </p>
        </div>

        {/* SAIR */}

        <button
          onClick={sair}
          style={{
            background: "#ff4444",
            border: "none",
            padding: "15px",
            borderRadius: "12px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sair
        </button>
      </div>

      {/* FORM */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "30px",
        }}
      >
        {/* ESQUERDA */}

        <div
          style={{
            background:
              "#111827",
            padding: "30px",
            borderRadius: "25px",
          }}
        >
          <h2
            style={{
              color: "#00ff88",
              marginBottom: "20px",
            }}
          >
            Dados da Análise
          </h2>

          <select
            value={cultura}
            onChange={(e) =>
              setCultura(
                e.target.value
              )
            }
            style={inputStyle}
          >
            <option>
              Pastagem
            </option>

            <option>
              Soja
            </option>

            <option>
              Milho
            </option>

            <option>
              Café
            </option>
          </select>

          <input
            type="number"
            placeholder="pH"
            value={ph}
            onChange={(e) =>
              setPh(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Fósforo"
            value={fosforo}
            onChange={(e) =>
              setFosforo(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Potássio"
            value={potassio}
            onChange={(e) =>
              setPotassio(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <select
            value={unidadeK}
            onChange={(e) =>
              setUnidadeK(
                e.target.value
              )
            }
            style={inputStyle}
          >
            <option value="mg">
              Potássio mg/dm³
            </option>

            <option value="cmol">
              Potássio cmolc/dm³
            </option>
          </select>

          <input
            type="number"
            placeholder="Cálcio"
            value={calcio}
            onChange={(e) =>
              setCalcio(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Magnésio"
            value={magnesio}
            onChange={(e) =>
              setMagnesio(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="CTC"
            value={ctc}
            onChange={(e) =>
              setCtc(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Área hectares"
            value={area}
            onChange={(e) =>
              setArea(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            onClick={
              analisarSolo
            }
            style={
              botaoPrincipal
            }
          >
            🚜 Gerar Recomendação
          </button>
        </div>

        {/* RESULTADO */}

        <div
          style={{
            background:
              "#111827",
            padding: "30px",
            borderRadius: "25px",
          }}
        >
          <h2
            style={{
              color: "#00ff88",
              marginBottom: "20px",
            }}
          >
            Resultado
          </h2>

          <div
            style={{
              background:
                "#1f2937",
              padding: "20px",
              borderRadius: "15px",
              whiteSpace:
                "pre-line",
              lineHeight: "30px",
            }}
          >
            {resultado}
          </div>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "none",
  background: "#1f2937",
  color: "white",
  fontSize: "16px",
};

const botaoPrincipal = {
  width: "100%",
  padding: "18px",
  borderRadius: "12px",
  border: "none",
  background:
    "linear-gradient(90deg,#00c853,#00ff88)",
  color: "black",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};