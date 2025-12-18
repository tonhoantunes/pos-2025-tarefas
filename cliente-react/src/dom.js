import * as api from './api.js';

const marcaSelect = document.getElementById('marca');
const modeloSelect = document.getElementById('modelo');
const anoSelect = document.getElementById('ano');
const form = document.getElementById('fipeForm');

const resultadoDiv = document.getElementById('resultado');
const carName = document.getElementById('carName');
const carInfo = document.getElementById('carInfo');

async function carregarMarcas() {
  marcaSelect.innerHTML = `<option value="">Carregando...</option>`;
  try {
    const marcas = await api.getMarcas();
    marcaSelect.innerHTML = `<option value="">Selecione...</option>`;
    marcas.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.codigo;
      opt.textContent = m.nome;
      marcaSelect.appendChild(opt);
    });
    modeloSelect.innerHTML = `<option value="">Selecione a marca primeiro</option>`;
    anoSelect.innerHTML = `<option value="">Selecione o modelo primeiro</option>`;
  } catch (err) {
    marcaSelect.innerHTML = `<option value="">Erro ao carregar</option>`;
    console.error(err);
  }
}

async function carregarModelos(marcaId) {
  modeloSelect.innerHTML = `<option value="">Carregando...</option>`;
  try {
    const data = await api.getModelos(marcaId);
    modeloSelect.innerHTML = `<option value="">Selecione...</option>`;
    data.modelos.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.codigo;
      opt.textContent = m.nome;
      modeloSelect.appendChild(opt);
    });
    anoSelect.innerHTML = `<option value="">Selecione o modelo primeiro</option>`;
  } catch (err) {
    modeloSelect.innerHTML = `<option value="">Erro ao carregar</option>`;
    console.error(err);
  }
}

async function carregarAnos(marcaId, modeloId) {
  anoSelect.innerHTML = `<option value="">Carregando...</option>`;
  try {
    const anos = await api.getAnos(marcaId, modeloId);
    anoSelect.innerHTML = `<option value="">Selecione...</option>`;
    anos.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.codigo;
      opt.textContent = a.nome;
      anoSelect.appendChild(opt);
    });
  } catch (err) {
    anoSelect.innerHTML = `<option value="">Erro ao carregar</option>`;
    console.error(err);
  }
}

async function buscarVeiculo(marcaId, modeloId, anoId) {
  try {
    const veiculo = await api.getVeiculo(marcaId, modeloId, anoId);

    carName.textContent = `${veiculo.Marca} ${veiculo.Modelo} (${veiculo.AnoModelo})`;

    carInfo.innerHTML = `
      <li><strong>Preço:</strong> ${veiculo.Valor}</li>
      <li><strong>Combustível:</strong> ${veiculo.Combustivel}</li>
      <li><strong>Código FIPE:</strong> ${veiculo.CodigoFipe}</li>
      <li><strong>Mês de Referência:</strong> ${veiculo.MesReferencia}</li>
    `;

    resultadoDiv.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    resultadoDiv.classList.remove('hidden');
    carName.textContent = 'Erro ao buscar veículo';
    carInfo.innerHTML = `<li>${err.message}</li>`;
  }
}

export function initDOM() {
  marcaSelect.addEventListener('change', e => {
    const marcaId = e.target.value;
    if (marcaId) carregarModelos(marcaId);
  });

  modeloSelect.addEventListener('change', e => {
    const modeloId = e.target.value;
    if (modeloId) carregarAnos(marcaSelect.value, modeloId);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const marcaId = marcaSelect.value;
    const modeloId = modeloSelect.value;
    const anoId = anoSelect.value;

    if (marcaId && modeloId && anoId) {
      buscarVeiculo(marcaId, modeloId, anoId);
    }
  });

  carregarMarcas();
}
