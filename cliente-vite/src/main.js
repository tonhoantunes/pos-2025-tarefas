import { getMarcas, getModelos, getAnos, getVeiculo } from "./api/fipeApi.js";
import {
  renderMarcas,
  renderModelos,
  renderAnos,
  renderVeiculo,
  marcaSelect,
  modeloSelect,
  anoSelect,
  form,
} from "./dom/fipeDom.js";

async function init() {
  try {
    const marcas = await getMarcas();
    renderMarcas(marcas);
  } catch (err) {
    console.error(err);
  }
}

marcaSelect.addEventListener("change", async (e) => {
  const marcaId = e.target.value;
  if (!marcaId) return;
  try {
    const data = await getModelos(marcaId);
    renderModelos(data.modelos);
  } catch (err) {
    console.error(err);
  }
});

modeloSelect.addEventListener("change", async (e) => {
  const modeloId = e.target.value;
  if (!modeloId) return;
  try {
    const anos = await getAnos(marcaSelect.value, modeloId);
    renderAnos(anos);
  } catch (err) {
    console.error(err);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const marcaId = marcaSelect.value;
  const modeloId = modeloSelect.value;
  const anoId = anoSelect.value;
  if (!marcaId || !modeloId || !anoId) return;

  try {
    const veiculo = await getVeiculo(marcaId, modeloId, anoId);
    renderVeiculo(veiculo);
  } catch (err) {
    console.error("Erro ao buscar veículo:", err);
  }
});

init();