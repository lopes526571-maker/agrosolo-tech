export function calcularCalagem(
  ph
) {
  let resultado = "";

  // =========================
  // VALIDAÇÃO
  // =========================

  if (
    ph === "" ||
    ph === null ||
    ph === undefined
  ) {
    return "";
  }

  // =========================
  // CONVERSÃO
  // =========================

  const phNumero =
    Number(ph);

  // =========================
  // VALIDAÇÃO NUMÉRICA
  // =========================

  if (
    isNaN(phNumero)
  ) {
    return "";
  }

  // =========================
  // CALAGEM
  // =========================

  let calcario = 0;

  let sacosCalcario = 0;

  if (
    phNumero < 5.5
  ) {

    calcario = 3.25;

    sacosCalcario =
      calcario * 20;

    resultado +=
      `🌱 Necessidade de calagem: ${calcario} t/ha\n`;

    resultado +=
      `🪨 Calcário: ${sacosCalcario} sacos/ha\n\n`;
  }

  return resultado;
}