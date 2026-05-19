export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">

      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-r from-green-700 to-green-500 p-10 rounded-3xl shadow-2xl">

          <h1 className="text-6xl font-bold">
            AgroSolo Tech
          </h1>

          <p className="mt-4 text-2xl text-green-100">
            Inteligência em Interpretação de Solo
          </p>

          <p className="mt-2 text-green-200">
            Baseado no Boletim 100 de São Paulo
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-[#1e293b] p-8 rounded-3xl shadow-xl border border-green-700">

            <h2 className="text-3xl font-bold text-green-400">
              Resultado da Análise
            </h2>

            <div className="mt-6 space-y-5">

              <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-700">
                <h3 className="font-bold text-xl">pH</h3>
                <p className="text-2xl mt-2">5.2</p>
                <p className="text-red-400">
                  Solo ácido
                </p>
              </div>

              <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-700">
                <h3 className="font-bold text-xl">
                  Fósforo
                </h3>

                <p className="text-2xl mt-2">
                  12 mg/dm³
                </p>

                <p className="text-orange-400">
                  Baixo
                </p>
              </div>

              <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-700">
                <h3 className="font-bold text-xl">
                  Potássio
                </h3>

                <p className="text-2xl mt-2">
                  35 mg/dm³
                </p>

                <p className="text-yellow-400">
                  Médio
                </p>
              </div>

            </div>

          </div>

          <div className="bg-[#1e293b] p-8 rounded-3xl shadow-xl border border-green-700">

            <h2 className="text-3xl font-bold text-green-400">
              Recomendação Técnica
            </h2>

            <div className="mt-6 space-y-5">

              <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-700">
                ✔ Aplicar calcário
              </div>

              <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-700">
                ✔ Corrigir fósforo
              </div>

              <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-700">
                ✔ Monitorar potássio
              </div>

              <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-700">
                ✔ Recomendação baseada no Boletim 100
              </div>

            </div>

            <button className="mt-8 w-full bg-green-600 hover:bg-green-500 transition-all p-4 rounded-2xl text-xl font-bold">
              Gerar Recomendação
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}