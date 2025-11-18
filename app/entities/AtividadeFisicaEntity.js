function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `t${Date.now()}`; }

export default class AtividadeFisicaEntity {
  constructor({
    id=null,
    tipo='',
    intensidade='Moderada',
    duracao='',
    data=new Date().toISOString().split('T')[0],
    observacoes=''
  } = {}) {
    this.id = normalizeId(id) ?? newId();
    this.tipo = tipo;
    this.intensidade = intensidade;
    this.duracao = duracao;
    this.data = data;
    this.observacoes = observacoes;
  }

  static fromDto(d){ return d ? new AtividadeFisicaEntity(d) : null; }
  get key(){ return String(this.id); }
}
