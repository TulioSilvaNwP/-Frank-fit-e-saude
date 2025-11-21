function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `t${Date.now()}`; }

export default class AtividadeFisicaEntity {
  constructor(id, tipo, intensidade, duracao, data, calorias = 0, observacoes = '') {
    this.id = id;
    this.tipo = tipo;
    this.intensidade = intensidade;
    this.data = data;
    this.calorias = calorias;
    this.observacoes = observacoes;
  }
}
