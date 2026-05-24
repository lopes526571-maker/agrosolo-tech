import { soja } from "../boletim100/soja";
import { milho } from "../boletim100/milho";
import { pastagem } from "../boletim100/pastagem";

export function calcularAdubacao(cultura, fosforo, potassio, area) {
  let resultado = "";

  if (!cultura) {
    return "⚠️ Selecione uma cultura.\n\n";
  }

  if (!fosforo) {
    return "⚠️ Preencha o fósforo.\n\n";
  }

  if (!potassio) {
    return "⚠️ Preencha o potássio.\n\n";
  }

  if (!area) {
    return "⚠️ Preencha a área de aplicação.\n\n";
  }

  const p = Number(fosforo);
  const k = Number(potassio);
  const areaNumero = Number(area);

  if (isNaN(p) || isNaN(k) || isNaN(areaNumero)) {
    return "⚠️ Verifique os valores informados.\n\n";
  }

  if (areaNumero <= 0) {
    return "⚠️ A área de aplicação deve ser maior que zero.\n\n";
  }

  let tabelaAtual = soja;

  if (cultura.toLowerCase() === "milho") {
    tabelaAtual = milho;
  }

  if (cultura.toLowerCase() === "pastagem") {
    tabelaAtual = pastagem;
  }

  const tabelaFosforo = tabelaAtual.fosforo.find(
    (item) => p <= item.limite
  );

  if (tabelaFosforo) {
    const doseP2O5 = tabelaFosforo.p2o5;
    const superSimples = doseP2O5 / 0.18;

    resultado += `⚠️ Fósforo ${tabelaFosforo.classe}\n`;
    resultado += `🧪 Necessário ${doseP2O5} kg/ha de P2O5\n`;
    resultado += `📦 Superfosfato Simples: ${superSimples.toFixed(0)} kg/ha\n\n`;
  }

  const tabelaPotassio = tabelaAtual.potassio.find(
    (item) => k <= item.limite
  );

  if (tabelaPotassio) {
    const doseK2O = tabelaPotassio.k2o;
    const kclKg = doseK2O * areaNumero;
    const kclSacos = kclKg / 50;

    resultado += `⚠️ Potássio ${tabelaPotassio.classe}\n`;
    resultado += `🧪 KCl total: ${kclKg.toFixed(0)} kg\n`;
    resultado += `📦 Sacos KCl: ${kclSacos.toFixed(1)} sacos\n`;
    resultado += `📌 Aplicar o excedente a lanço ou em pré-plantio.\n\n`;
  }

  return resultado;
}