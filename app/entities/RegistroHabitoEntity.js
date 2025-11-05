function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `r${Date.now()}`; }

export default class RegistroAtividadeEntity {
  constructor({
    id=null,
    tipo='',
    descricao='',
    duracao='',
    data=new Date().toISOString().split('T')[0], // data atual padrão
  } = {}) {
    this.id = normalizeId(id) ?? newId();
    this.tipo = tipo;
    this.descricao = descricao;
    this.duracao = duracao;
    this.data = data;
  }

  static fromDto(d){ return d ? new RegistroAtividadeEntity(d) : null; }
  get key(){ return String(this.id); }
}

