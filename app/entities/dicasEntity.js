function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `c${Date.now()}`; }

export default class dicasEntity {
  constructor(id, tipo, titulo, descricao, fonte = '') {
    this.id = id;
    this.tipo = tipo;     // ex: "Nutrição"
    this.titulo = titulo;
    this.descricao = descricao;
    this.fonte = fonte;
  }
}
