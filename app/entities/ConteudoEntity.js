function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `c${Date.now()}`; }

export default class ConteudoEntity {
  constructor({
    id=null,
    titulo='',
    tipo='Dica',
    descricao='',
    fonte='',
  } = {}) {
    this.id = normalizeId(id) ?? newId();
    this.titulo = titulo;
    this.tipo = tipo;         // Dica, Receita, Artigo
    this.descricao = descricao;
    this.fonte = fonte;       // opcional: link, autor, etc.
  }

  static fromDto(d){ return d ? new ConteudoEntity(d) : null; }
  get key(){ return String(this.id); }
}
