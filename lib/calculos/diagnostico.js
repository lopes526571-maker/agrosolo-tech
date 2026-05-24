export function calcularDiagnostico(
  calcio,
  magnesio
) {

  let resultado = "";

  // =========================
  // VALIDAÇÃO
  // =========================

  if (
    calcio === "" ||
    calcio === null ||
    calcio === undefined
  ) {
    return "";
  }

  if (
    magnesio === "" ||
    magnesio === null ||
    magnesio === undefined
  ) {
    return "";
  }

  // =========================
  // CONVERSÃO
  // =========================

  const ca =
    Number(calcio);

  const mg =
    Number(magnesio);

  // =========================
  // VALIDAÇÃO NUMÉRICA
  // =========================

  if (
    isNaN(ca) ||
    isNaN(mg)
  ) {
    return "";
  }

  // =========================
  // DIAGNÓSTICO
  // =========================

  if (
    mg < 0.5
  ) {

    resultado +=
      `🪨 Recomenda-se calcário dolomítico.\n\n`;
  }

  if (
    mg >= 0.5 &&
    ca < 2
  ) {

    resultado +=
      `🪨 Recomenda-se calcário calcítico.\n\n`;
  }

  return resultado;
}