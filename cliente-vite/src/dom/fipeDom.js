export const marcaSelect = document.getElementById("marca");
export const modeloSelect = document.getElementById("modelo");
export const anoSelect = document.getElementById("ano");
export const form = document.getElementById("fipeForm");

export const resultadoDiv = document.getElementById("resultado");
export const carName = document.getElementById("carName");
export const carInfo = document.getElementById("carInfo");

export function renderMarcas(marcas) {
  marcaSelect.innerHTML = `<option value="">Selecione...</option>`;
  marcas.forEach((m) => {
    marcaSelect.innerHTML += `<option value="${m.codigo}">${m.nome}</option>`;
  });
}

export function renderModelos(modelos) {
  modeloSelect.innerHTML = `<option value="">Selecione...</option>`;
  modelos.forEach((m) => {
    modeloSelect.innerHTML += `<option value="${m.codigo}">${m.nome}</option>`;
  });
  anoSelect.innerHTML = `<option value="">Selecione o modelo primeiro</option>`;
}

export function renderAnos(anos) {
  anoSelect.innerHTML = `<option value="">Selecione...</option>`;
  anos.forEach((a) => {
    anoSelect.innerHTML += `<option value="${a.codigo}">${a.nome}</option>`;
  });
}

export function renderVeiculo(veiculo) {
  carName.textContent = `${veiculo.Marca} ${veiculo.Modelo} (${veiculo.AnoModelo})`;
  carInfo.innerHTML = `
    <li><strong>Preço:</strong> ${veiculo.Valor}</li>
    <li><strong>Combustível:</strong> ${veiculo.Combustivel}</li>
    <li><strong>Código FIPE:</strong> ${veiculo.CodigoFipe}</li>
    <li><strong>Mês de Referência:</strong> ${veiculo.MesReferencia}</li>
  `;
  resultadoDiv.classList.remove("hidden");
}