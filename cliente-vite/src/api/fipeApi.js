const API_BASE = "https://parallelum.com.br/fipe/api/v1/carros";

export async function getMarcas() {
  const res = await fetch(`${API_BASE}/marcas`);
  if (!res.ok) throw new Error("Erro ao carregar marcas");
  return res.json();
}

export async function getModelos(marcaId) {
  const res = await fetch(`${API_BASE}/marcas/${marcaId}/modelos`);
  if (!res.ok) throw new Error("Erro ao carregar modelos");
  return res.json();
}

export async function getAnos(marcaId, modeloId) {
  const res = await fetch(`${API_BASE}/marcas/${marcaId}/modelos/${modeloId}/anos`);
  if (!res.ok) throw new Error("Erro ao carregar anos");
  return res.json();
}

export async function getVeiculo(marcaId, modeloId, anoId) {
  const res = await fetch(`${API_BASE}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
  if (!res.ok) throw new Error("Erro ao buscar veículo");
  return res.json();
}