function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `u${Date.now()}`; }

export default class UsuarioEntity {
  constructor({
    id=null,
    nome='',
    email='',
    senha='',
    idade='',
    altura='',
    peso='',
    nivelAtividade='',
    notificacoes=true
  } = {}) {
    this.id = normalizeId(id) ?? newId();
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.idade = idade;
    this.altura = altura;
    this.peso = peso;
    this.nivelAtividade = nivelAtividade;
    this.notificacoes = notificacoes;
  }

<<<<<<< HEAD
  static fromDto(d){ 
    return d ? new UsuarioEntity(d) : null; }
  
    get key()
  { return String(this.id); }
=======
  static fromDto(d){ return d ? new UsuarioEntity(d) : null; }
  get key(){ return String(this.id); }
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
}
