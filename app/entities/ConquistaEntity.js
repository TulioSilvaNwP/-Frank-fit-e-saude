function normalizeId(raw){ return raw ? String(raw) : null;}
function newId(){ return `c${Date.now()}`;}

export default class ConquistaEntity {
    constructor({ id=null, usuarioId='', titulo='', descricao='', icone='', dataConquista="" } = {}) {
      this.id = normalizeId(id) ?? newId();
      this.usuarioId = usuarioId;
      this.titulo = titulo;
      this.descricao = descricao;
      this.icone = icone;
      this.dataConquista = dataConquista;  
    }

    static fromDto(d){ return d ? new ConquistaEntity(d) : null;}
    get key(){ return String(this.id)}
}