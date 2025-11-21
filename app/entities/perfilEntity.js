function normalizeId(raw){ return raw ? String(raw) : null; }
function newId(){ return `u${Date.now()}`; }

export default class perfilEntity {
    constructor(nome, email, idade, peso, altura, foto = null) {
    this.id = 'user_profile'; // ID fixo pois só tem um usuário no app
    this.nome = nome;
    this.email = email;
    this.idade = idade;
    this.peso = peso;
    this.altura = altura;
    this.foto = foto;
  }
}