function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `h${Date.now()}`; }

export default class habitosEntity {
  constructor(id, nome, descricao, frequencia, horario, icone = null) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.frequencia = frequencia;
    this.horario = horario;
    this.icone = icone;
  }
}
