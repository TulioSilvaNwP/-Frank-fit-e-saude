function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `h${Date.now()}`; }

export default class HumorEntity {
  constructor({
    id=null,
    data=new Date().toISOString().split('T')[0],
    humor='Feliz',
    intensidade='Média',
    descricao=''
  } = {}) {
    this.id = normalizeId(id) ?? newId();
    this.data = data;
    this.humor = humor;
    this.intensidade = intensidade;
    this.descricao = descricao;
  }

  static fromDto(d){ return d ? new HumorEntity(d) : null; }
  get key(){ return String(this.id); }
}
