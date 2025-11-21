function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `h${Date.now()}`; }

export default class humorEntity {
  constructor(id, sentimento, data, icone, descricao = '') {
    this.id = id; 
    this.sentimento = sentimento;
    this.data = data;
    this.icone = icone; 
    this.descricao = descricao;
  }
}
