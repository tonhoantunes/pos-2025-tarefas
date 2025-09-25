const API_BASE = "https://parallelum.com.br/fipe/api/v1/carros";

// Elementos
const marcaSelect = document.getElementById("marca");
const modeloSelect = document.getElementById("modelo");
const anoSelect = document.getElementById("ano");
const form = document.getElementById("fipeForm");

const resultadoDiv = document.getElementById("resultado");
const carName = document.getElementById("carName");
const carInfo = document.getElementById("carInfo");

// Buscar marcas
async function carregarMarcas() {
  const res = await fetch(`${API_BASE}/marcas`);
  const marcas = await res.json();

  marcaSelect.innerHTML = `<option value="">Selecione...</option>`;
  marcas.forEach(m => {
    marcaSelect.innerHTML += `<option value="${m.codigo}">${m.nome}</option>`;
  });
}

// Buscar modelos
async function carregarModelos(marcaId) {
  const res = await fetch(`${API_BASE}/marcas/${marcaId}/modelos`);
  const data = await res.json();

  modeloSelect.innerHTML = `<option value="">Selecione...</option>`;
  data.modelos.forEach(m => {
    modeloSelect.innerHTML += `<option value="${m.codigo}">${m.nome}</option>`;
  });

  anoSelect.innerHTML = `<option value="">Selecione o modelo primeiro</option>`;
}

// Buscar anos
async function carregarAnos(marcaId, modeloId) {
  const res = await fetch(`${API_BASE}/marcas/${marcaId}/modelos/${modeloId}/anos`);
  const anos = await res.json();

  anoSelect.innerHTML = `<option value="">Selecione...</option>`;
  anos.forEach(a => {
    anoSelect.innerHTML += `<option value="${a.codigo}">${a.nome}</option>`;
  });
}

// Buscar dados do veículo
async function buscarVeiculo(marcaId, modeloId, anoId) {
  const res = await fetch(`${API_BASE}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
  const veiculo = await res.json();

  // Nome
  carName.textContent = `${veiculo.Marca} ${veiculo.Modelo} (${veiculo.AnoModelo})`;

  // Dados
  carInfo.innerHTML = `
    <li><strong>Preço:</strong> ${veiculo.Valor}</li>
    <li><strong>Combustível:</strong> ${veiculo.Combustivel}</li>
    <li><strong>Código FIPE:</strong> ${veiculo.CodigoFipe}</li>
    <li><strong>Mês de Referência:</strong> ${veiculo.MesReferencia}</li>
  `;

  resultadoDiv.classList.remove("hidden");
}

// Listeners
marcaSelect.addEventListener("change", e => {
  const marcaId = e.target.value;
  if (marcaId) carregarModelos(marcaId);
});

modeloSelect.addEventListener("change", e => {
  const modeloId = e.target.value;
  if (modeloId) carregarAnos(marcaSelect.value, modeloId);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const marcaId = marcaSelect.value;
  const modeloId = modeloSelect.value;
  const anoId = anoSelect.value;

  if (marcaId && modeloId && anoId) {
    buscarVeiculo(marcaId, modeloId, anoId);
  }
});

// Inicializar
carregarMarcas();
