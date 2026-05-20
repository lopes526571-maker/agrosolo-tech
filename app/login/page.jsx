"use client";

import { useState } from "react";

export default function LoginPage() {
  // =========================
  // STATES
  // =========================

  const [modo, setModo] =
    useState("login");

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [mensagem, setMensagem] =
    useState("");

  // =========================
  // LOGIN
  // =========================

  async function fazerLogin() {
    setMensagem(
      "Login realizado 🚜"
    );
  }

  // =========================
  // CADASTRO
  // =========================

  async function fazerCadastro() {
    setMensagem(
      "Conta criada 🚜"
    );
  }

  // =========================
  // RECUPERAR SENHA
  // =========================

  async function recuperarSenha() {
    setMensagem(
      "Email enviado 🚜"
    );
  }

  // =========================
  // RETURN
  // =========================

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition:
          "center",
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
            "rgba(0,0,0,0.55)",
          backdropFilter:
            "blur(12px)",
          borderRadius: "30px",
          padding: "40px",
          border:
            "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* LOGO */}

        <h1
          style={{
            fontSize: "55px",
            color: "#00ff88",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          AgroSolo Tech
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "35px",
            fontSize: "20px",
          }}
        >
          Plataforma Inteligente
          Agronômica
        </p>

        {/* BOTÕES */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={() =>
              setModo("login")
            }
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background:
                modo === "login"
                  ? "#00ff88"
                  : "rgba(255,255,255,0.1)",
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
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background:
                modo ===
                "cadastro"
                  ? "#00ff88"
                  : "rgba(255,255,255,0.1)",
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

        {/* FORM */}

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "15px",
          }}
        >
          {/* NOME */}

          {modo ===
            "cadastro" && (
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) =>
                setNome(
                  e.target.value
                )
              }
              style={inputStyle}
            />
          )}

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
              onClick={
                fazerLogin
              }
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
                background:
                  "transparent",
                border: "none",
                color:
                  "#00ff88",
                cursor:
                  "pointer",
                marginTop:
                  "10px",
              }}
            >
              Esqueci minha senha
            </button>
          )}

          {/* MENSAGEM */}

          {mensagem && (
            <div
              style={{
                background:
                  "rgba(255,255,255,0.08)",
                padding:
                  "15px",
                borderRadius:
                  "12px",
                color:
                  "white",
                textAlign:
                  "center",
                marginTop:
                  "10px",
              }}
            >
              {mensagem}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// =========================
// STYLE INPUT
// =========================

const inputStyle = {
  padding: "18px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.1)",
  fontSize: "18px",
  background:
    "rgba(255,255,255,0.08)",
  color: "white",
  outline: "none",
};

// =========================
// BOTÃO
// =========================

const botaoPrincipal = {
  background:
    "linear-gradient(90deg,#00c853,#00ff88)",
  border: "none",
  padding: "18px",
  borderRadius: "15px",
  color: "black",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
};