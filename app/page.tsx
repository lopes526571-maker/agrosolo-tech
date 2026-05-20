"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {

  // LOGIN

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  // CULTURA

  const [cultura, setCultura] = useState("Pastagem");

  // SOLO

  const [ph, setPh] = useState("");
  const [fosforo, setFosforo] = useState("");
  const [potassio, setPotassio] = useState("");
  const [vporcentagem, setVporcentagem] = useState("");
  const [ctc, setCtc] = useState("");

  // RESULTADO

  const [resultado, setResultado] = useState("");
  const [nc, setNc] = useState("");

  // =========================
  // CRIAR CONTA
  // =========================

  async function criarConta() {

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {

      alert(error.message);

    } else {

      alert("Conta criada com sucesso 🚜");

    }
  }

  // =========================
  // LOGIN
  // =========================

  async function login() {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

    if (error) {

      alert(error.message);

    } else {

      alert("Login realizado 🚜");

      setUsuarioLogado(true);

    }
  }

  // =========================
  // INTERPRETAÇÃO
  // =========================

  function interpretarSolo() {

    let recomendacao = "";

    const valorPh = Number(ph);
    const valorFosforo = Number(fosforo);
    const valorPotassio = Number(potassio);
    const valorV = Number(vporcentagem);
    const valorCtc = Number(ctc);

    let vDesejado = 60;

    if (cultura === "Pastagem") {
      vDesejado = 45;
    }

    if (cultura === "Soja") {
      vDesejado = 60;
    }

    if (cultura === "Milho") {
      vDesejado = 60;
    }

    if (cultura === "Café") {
      vDesejado = 70;
    }

    // pH

    if (valorPh < 5.0) {

      recomendacao +=
        "pH MUITO BAIXO.\n";

      recomendacao +=
        "Solo fortemente ácido.\n";

      recomendacao +=
        "Alta necessidade de calagem.\n\n";

    }

    else if (valorPh < 5.5) {

      recomendacao +=
        "pH BAIXO.\n";

      recomendacao +=
        "Recomenda-se aplicação de calcário.\n\n";

    }

    else {

      recomendacao +=
        "pH ADEQUADO para a maioria das culturas.\n\n";

    }

    // FÓSFORO

    if (valorFosforo <= 6) {

      recomendacao +=
        "FÓSFORO MUITO BAIXO.\n";

      recomendacao +=
        "Alta probabilidade de resposta à adubação fosfatada.\n\n";

    }

    else if (valorFosforo <= 15) {

      recomendacao +=
        "FÓSFORO BAIXO.\n";

      recomendacao +=
        "Recomenda-se correção fosfatada.\n\n";

    }

    else if (valorFosforo <= 40) {

      recomendacao +=
        "FÓSFORO MÉDIO.\n";

      recomendacao +=
        "Adubação de manutenção recomendada.\n\n";

    }

    else if (valorFosforo <= 80) {

      recomendacao +=
        "FÓSFORO ALTO.\n";

      recomendacao +=
        "Baixa resposta esperada à adubação.\n\n";

    }

    else {

      recomendacao +=
        "FÓSFORO MUITO ALTO.\n";

      recomendacao +=
        "Sem necessidade imediata de correção.\n\n";

    }

    // POTÁSSIO

    if (valorPotassio < 40) {

      recomendacao +=
        "POTÁSSIO BAIXO.\n";

      recomendacao +=
        "Monitorar e corrigir potássio.\n\n";

    }

    else if (valorPotassio <= 80) {

      recomendacao +=
        "POTÁSSIO MÉDIO.\n";

      recomendacao +=
        "Manutenção recomendada.\n\n";

    }

    else {

      recomendacao +=
        "POTÁSSIO ALTO.\n";

      recomendacao +=
        "Sem necessidade imediata de correção.\n\n";

    }

    // V%

    if (valorV < 40) {

      recomendacao +=
        "SATURAÇÃO POR BASES MUITO BAIXA.\n";

      recomendacao +=
        "Alta necessidade de correção da acidez.\n\n";

    }

    else if (valorV < 60) {

      recomendacao +=
        "SATURAÇÃO POR BASES MÉDIA.\n";

      recomendacao +=
        "Recomenda-se manejo de fertilidade.\n\n";

    }

    else {

      recomendacao +=
        "SATURAÇÃO POR BASES ADEQUADA.\n";

      recomendacao +=
        "Boa condição química do solo.\n\n";

    }

    // CTC

    if (valorCtc < 50) {

      recomendacao +=
        "CTC BAIXA.\n";

      recomendacao +=
        "Solo com baixa capacidade de retenção de nutrientes.\n\n";

    }

    else if (valorCtc <= 100) {

      recomendacao +=
        "CTC MÉDIA.\n";

      recomendacao +=
        "Capacidade moderada de retenção de nutrientes.\n\n";

    }

    else {

      recomendacao +=
        "CTC ALTA.\n";

      recomendacao +=
        "Boa capacidade de retenção e fornecimento de nutrientes.\n\n";

    }

    // CALAGEM

    const necessidadeCalagem =
      (valorCtc * (vDesejado - valorV)) / 100;

    if (necessidadeCalagem > 0) {

      recomendacao +=
        `Necessidade estimada de calagem: ${necessidadeCalagem.toFixed(2)} t/ha.\n`;

      recomendacao +=
        "Recomenda-se calcário dolomítico.\n";

      recomendacao +=
        "PRNT mínimo recomendado: 80%.\n";

      if (valorCtc < 50) {

        recomendacao +=
          "Sugere-se parcelamento da aplicação devido à baixa CTC.\n";

      }

      recomendacao += "\n";

      setNc(necessidadeCalagem.toFixed(2));

    }

    setResultado(recomendacao);
  }

  // =========================
  // SALVAR
  // =========================

  async function salvarAnalise() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      alert("Faça login primeiro 🚜");

      return;

    }

    const { error } =
      await supabase
        .from("analises_solo")
        .insert([
          {
            usuario_id: user.id,
            ph: Number(ph),
            fosforo: Number(fosforo),
            potassio: Number(potassio),
            recomendacao: resultado,
          },
        ]);

    if (error) {

      alert(error.message);

    } else {

      alert("Análise salva com sucesso 🚜");

    }
  }

  // =========================
  // PDF
  // =========================

  function gerarPDF() {

    const doc = new jsPDF();

    doc.setFontSize(24);

    doc.text("AGROSOLO TECH", 20, 20);

    doc.setFontSize(16);

    doc.text(
      "Laudo Técnico de Fertilidade do Solo",
      20,
      35
    );

    doc.line(20, 40, 190, 40);

    doc.setFontSize(13);

    doc.text(`Cultura: ${cultura}`, 20, 55);

    doc.text(`pH: ${ph}`, 20, 70);

    doc.text(`Fósforo: ${fosforo}`, 20, 85);

    doc.text(`Potássio: ${potassio}`, 20, 100);

    doc.text(`V%: ${vporcentagem}`, 20, 115);

    doc.text(`CTC: ${ctc}`, 20, 130);

    doc.text(
      `Necessidade de Calagem: ${nc} t/ha`,
      20,
      145
    );

    doc.setFontSize(15);

    doc.text("Recomendação Técnica", 20, 165);

    doc.setFontSize(12);

    doc.text(resultado, 20, 180);

    doc.setFontSize(10);

    doc.text(
      "AgroSolo Tech - Sistema Inteligente de Interpretação de Solo",
      20,
      280
    );

    doc.save("laudo-agrosolo.pdf");
  }

  // =========================
  // TELA LOGIN
  // =========================

  if (!usuarioLogado) {

    return (

      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop')",
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 bg-[#07130b]/90 p-10 rounded-3xl w-full max-w-md border border-green-800 shadow-2xl">

          <h1 className="text-5xl font-black text-green-400 text-center">
            AgroSolo Tech
          </h1>

          <p className="text-center text-green-100 mt-4">
            Plataforma Inteligente de Interpretação de Solo
          </p>

          <div className="mt-10">

            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-[#07130b] mb-4 border border-green-900 text-white"
            />

            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-[#07130b] mb-4 border border-green-900 text-white"
            />

            <button
              onClick={login}
              className="bg-green-500 hover:bg-green-600 w-full p-4 rounded-2xl font-bold text-lg"
            >
              🚜 Entrar
            </button>

            <button
              onClick={criarConta}
              className="bg-white/10 hover:bg-white/20 w-full p-4 rounded-2xl font-bold text-lg mt-4"
            >
              🌱 Criar Conta
            </button>

          </div>

        </div>

      </main>

    );

  }

  // =========================
  // DASHBOARD
  // =========================

  return (

    <main className="min-h-screen bg-[#07130b] text-white">

      <div className="flex">

        {/* SIDEBAR */}

        <aside className="w-72 min-h-screen bg-[#0d1f12] border-r border-green-900 p-8">

          <h1 className="text-4xl font-bold text-green-400">
            AgroSolo
          </h1>

          <p className="text-green-200 mt-2">
            Sistema Inteligente de Solo
          </p>

          <div className="mt-12 space-y-4">

            <div className="bg-green-500/20 p-4 rounded-2xl border border-green-500">
              🌱 Interpretação
            </div>

            <div className="bg-white/5 p-4 rounded-2xl">
              📄 Laudos PDF
            </div>

            <div className="bg-white/5 p-4 rounded-2xl">
              🚜 Culturas
            </div>

            <div className="bg-white/5 p-4 rounded-2xl">
              📊 Histórico
            </div>

          </div>

        </aside>

        {/* CONTEÚDO */}

        <div className="flex-1 p-10">

          <div
            className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 p-12 flex flex-col justify-center h-full">

              <h1 className="text-6xl font-black text-white leading-tight max-w-4xl">
                AgroSolo Tech
              </h1>

              <p className="mt-6 text-2xl text-green-100 max-w-2xl">
                Plataforma Inteligente de Interpretação de Solo
                Baseada no Boletim 100 de São Paulo
              </p>

            </div>

          </div>

          {/* INPUTS */}

          <div className="bg-[#102017] p-8 rounded-3xl border border-green-900 mt-10">

            <h2 className="text-3xl font-bold mb-8 text-green-400">
              Dados da Análise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <select
                value={cultura}
                onChange={(e) =>
                  setCultura(e.target.value)
                }
                className="p-4 rounded-2xl bg-[#07130b] border border-green-900"
              >
                <option>Pastagem</option>
                <option>Soja</option>
                <option>Milho</option>
                <option>Café</option>
              </select>

              <input
                type="number"
                placeholder="pH"
                value={ph}
                onChange={(e) =>
                  setPh(e.target.value)
                }
                className="p-4 rounded-2xl bg-[#07130b] border border-green-900"
              />

              <input
                type="number"
                placeholder="Fósforo"
                value={fosforo}
                onChange={(e) =>
                  setFosforo(e.target.value)
                }
                className="p-4 rounded-2xl bg-[#07130b] border border-green-900"
              />

              <input
                type="number"
                placeholder="Potássio"
                value={potassio}
                onChange={(e) =>
                  setPotassio(e.target.value)
                }
                className="p-4 rounded-2xl bg-[#07130b] border border-green-900"
              />

              <input
                type="number"
                placeholder="V%"
                value={vporcentagem}
                onChange={(e) =>
                  setVporcentagem(e.target.value)
                }
                className="p-4 rounded-2xl bg-[#07130b] border border-green-900"
              />

              <input
                type="number"
                placeholder="CTC"
                value={ctc}
                onChange={(e) =>
                  setCtc(e.target.value)
                }
                className="p-4 rounded-2xl bg-[#07130b] border border-green-900"
              />

            </div>

            <button
              onClick={interpretarSolo}
              className="bg-green-500 hover:bg-green-600 px-8 py-5 rounded-2xl font-bold mt-8 w-full text-xl"
            >
              🌱 Interpretar Solo
            </button>

          </div>

          {/* RESULTADO */}

          <div className="bg-[#102017] p-8 rounded-3xl border border-green-900 mt-10">

            <h2 className="text-3xl font-bold text-green-400 mb-6">
              Resultado da Interpretação
            </h2>

            <div className="bg-[#07130b] p-8 rounded-2xl whitespace-pre-line leading-8 text-lg border border-green-900">
              {resultado ||
                "Nenhuma interpretação realizada"}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

              <button
                onClick={salvarAnalise}
                className="bg-green-500 hover:bg-green-600 p-5 rounded-2xl font-bold text-lg"
              >
                💾 Salvar Análise
              </button>

              <button
                onClick={gerarPDF}
                className="bg-blue-500 hover:bg-blue-600 p-5 rounded-2xl font-bold text-lg"
              >
                📄 Gerar PDF
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}