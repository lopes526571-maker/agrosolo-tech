"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../firebase";

export default function Historico() {
  const [analises, setAnalises] =
    useState([]);

  async function carregarAnalises() {
    const usuario =
      auth.currentUser;

    if (!usuario) return;

    const q = query(
      collection(
        db,
        "analises"
      ),

      where(
        "usuario",
        "==",
        usuario.email
      ),

      orderBy(
        "data",
        "desc"
      )
    );

    const querySnapshot =
      await getDocs(q);

    const lista = [];

    querySnapshot.forEach(
      (doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    );

    setAnalises(lista);
  }

  useEffect(() => {
    carregarAnalises();
  }, []);

  return (
    <main
      style={{
        minHeight:
          "100vh",

        background:
          "#020617",

        color:
          "white",

        padding:
          "40px",

        fontFamily:
          "Arial",
      }}
    >
      <h1
        style={{
          color:
            "#00ff88",

          fontSize:
            "50px",

          marginBottom:
            "40px",
        }}
      >
        📋 Histórico
        de Análises
      </h1>

      {analises.map(
        (analise) => (
          <div
            key={analise.id}
            style={{
              background:
                "#111827",

              padding:
                "25px",

              borderRadius:
                "20px",

              marginBottom:
                "20px",
            }}
          >
            <h2>
              🌱{" "}
              {
                analise.cultura
              }
            </h2>

            <p>
              pH:
              {
                analise.ph
              }
            </p>

            <p>
              Fósforo:
              {
                analise.fosforo
              }
            </p>

            <p>
              Potássio:
              {
                analise.potassio
              }
            </p>

            <p>
              Cálcio:
              {
                analise.calcio
              }
            </p>

            <p>
              Magnésio:
              {
                analise.magnesio
              }
            </p>

            <p>
              CTC:
              {
                analise.ctc
              }
            </p>

            <p>
              Área:
              {
                analise.area
              }
            </p>

            <hr
              style={{
                margin:
                  "15px 0",
              }}
            />

            <p>
              {
                analise.resultado
              }
            </p>
          </div>
        )
      )}
    </main>
  );
}