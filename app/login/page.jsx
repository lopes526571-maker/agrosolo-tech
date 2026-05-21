"use client";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../../firebase";

export default function LoginPage() {
  // =========================
  // STATES
  // =========================

  const [modo, setModo] =
    useState("login");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [mensagem, setMensagem] =
    useState("");

  // =========================
  // LOGIN REAL
  // =========================

  async function fazerLogin() {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      setMensagem(
        "Login realizado 🚜"
      );

      setTimeout(() => {
        window.location.href =
          "/";
      }, 1000);
    } catch (erro) {
      setMensagem(
        erro.message
      );
    }
  }

  // =========================
  // CADASTRO REAL
  // =========================

  async function fazerCadastro() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      setMensagem(
        "Conta criada 🚜"
      );

      setTimeout(() => {
        window.location.href =
          "/";
      }, 1000);
    } catch (erro) {
      setMensagem(
        erro.message
      );
    }
  }

  // =========================
  // RECUPERAR SENHA
  // =========================

  async function recuperarSenha() {
    try {
      await sendPasswordResetEmail(
        auth,
        email
      );

      setMensagem(
        "Email de recuperação enviado 🚜"
      );
    } catch (erro) {
      // MOSTRA ERRO REAL FIREBASE

      setMensagem(
        erro.message
      );
    }
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
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background:
            "#111827",
          borderRadius: "25px",
          padding: "40px",
          color: "white",
        }}
      >
        {/* LOGO */}

        <h1
          style={{
            fontSize: "45px",
            color: "#00ff88",
            textAlign: "center",
          }}
        >
          AgroSolo Tech
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Login Agronômico
        </p>

        {/* BOTÕES */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() =>
              setModo("login")
            }
            style={{
              flex: 1,
              padding: "15px",
              border: "none",
              borderRadius:
                "12px",
              background:
                modo === "login"
                  ? "#00ff88"
                  : "#1f2937",
              color:
                modo === "login"
                  ? "black"
                  : "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            onClick={() =>
              setModo("cadastro")
            }
            style={{
              flex: 1,
              padding: "15px",
              border: "none",
              borderRadius:
                "12px",
              background:
                modo ===
                "cadastro"
                  ? "#00ff88"
                  : "#1f2937",
              color:
                modo ===
                "cadastro"
                  ? "black"
                  : "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cadastro
          </button>
        </div>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* SENHA */}

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* LOGIN */}

        {modo === "login" && (
          <button
            onClick={fazerLogin}
            style={
              botaoPrincipal
            }
          >
            🚜 Entrar
          </button>
        )}

        {/* CADASTRO */}

        {modo ===
          "cadastro" && (
          <button
            onClick={
              fazerCadastro
            }
            style={
              botaoPrincipal
            }
          >
            🌱 Criar Conta
          </button>
        )}

        {/* RECUPERAR */}

        {modo === "login" && (
          <button
            onClick={
              recuperarSenha
            }
            style={{
              marginTop: "15px",
              background:
                "transparent",
              border: "none",
              color:
                "#00ff88",
              cursor:
                "pointer",
            }}
          >
            Esqueci minha senha
          </button>
        )}

        {/* MENSAGEM */}

        {mensagem && (
          <div
            style={{
              marginTop: "20px",
              background:
                "#1f2937",
              padding: "15px",
              borderRadius:
                "12px",
              textAlign:
                "center",
              wordBreak:
                "break-word",
            }}
          >
            {mensagem}
          </div>
        )}
      </div>
    </main>
  );
}

// =========================
// INPUT STYLE
// =========================

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "none",
  fontSize: "16px",
  background: "#1f2937",
  color: "white",
};

// =========================
// BOTÃO
// =========================

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