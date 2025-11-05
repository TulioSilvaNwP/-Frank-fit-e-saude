function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `h${Date.now()}`; }

export default class HabitoEntity {
  constructor({
    id=null,
    nome='',
    descricao='',
    frequencia='diário',
    horario='08:00',
  } = {}) {
    this.id = normalizeId(id) ?? newId();
    this.nome = nome;
    this.descricao = descricao;
    this.frequencia = frequencia;
    this.horario = horario;
  }

  static fromDto(d){ return d ? new HabitoEntity(d) : null; }
  get key(){ return String(this.id); }
}
