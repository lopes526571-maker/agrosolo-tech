import { calcularCalagem }
from "./calculos/calagem";

import { calcularAdubacao }
from "./calculos/adubacao";

import { calcularDiagnostico }
from "./calculos/diagnostico";

export function calcularSolo(
  dados
) {

  const {
    cultura,
    ph,
    fosforo,
    potassio,
    calcio,
    magnesio,
    area,
  } = dados;

  // =========================
  // VALIDAÇÃO PRINCIPAL
  // =========================

  const validacao =
    calcularAdubacao(
      cultura,
      fosforo,
      potassio,
      area
    );

  // se retornou erro
  if (
    validacao.includes(
      "⚠️"
    )
  ) {
    return validacao;
  }

  let resultado = "";

  // =========================
  // CALAGEM
  // =========================

  resultado +=
    calcularCalagem(ph);

  // =========================
  // ADUBAÇÃO
  // =========================

  resultado +=
    validacao;

  // =========================
  // DIAGNÓSTICO
  // =========================

  resultado +=
    calcularDiagnostico(
      calcio,
      magnesio
    );

  // =========================

  if (
    resultado === ""
  ) {

    resultado =
      "✅ Solo em boas condições.";
  }

  return resultado;
}