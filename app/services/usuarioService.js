import UsuarioEntity from "../entities/UsuarioEntity";
import StorageService from "./storageService";

const CHAVE = "@usuarios";

export default class UsuarioService {
<<<<<<< HEAD
  static async listar(){
=======
  static async listar() {
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
    const dados = await StorageService.carregar(CHAVE);
    return Array.isArray(dados) ? dados : [];
  }

<<<<<<< HEAD
  static async criar(dto){
=======
  static async criar(dto) {
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
    const lista = await this.listar();
    const novo = new UsuarioEntity(dto);
    lista.push(novo);
    await StorageService.salvar(CHAVE, lista);
    return novo;
  }

<<<<<<< HEAD
  static async remover(id){
=======
  static async remover(id) {
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
    const lista = await this.listar();
    const novaLista = lista.filter(x => String(x.id) !== String(id));
    await StorageService.salvar(CHAVE, novaLista);
  }

<<<<<<< HEAD
  static async atualizar(dto){
=======
  static async atualizar(dto) {
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
    const lista = await this.listar();
    const idx = lista.findIndex(x => String(x.id) === String(dto.id));
    if (idx !== -1) {
      lista[idx] = dto;
      await StorageService.salvar(CHAVE, lista);
    }
    return dto;
  }

<<<<<<< HEAD
  static async limparTudo(){
    await StorageService.remover(CHAVE);
  }

  static async login(email, senha) {
  const lista = await this.listar();

  // Verifica se existe algum usuário com email e senha correspondentes
  const usuario = lista.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!usuario) {
    throw new Error("Usuário ou senha inválidos!");
  }

  return usuario; // retorna o usuário logado
  }

=======
  static async limparTudo() {
    await StorageService.remover(CHAVE);
  }

  // --- NOVO MÉTODO: login ---
  static async login(nome, senha) {
    const lista = await this.listar();
    const usuario = lista.find(
      x =>
        x.nome?.trim().toLowerCase() === nome.trim().toLowerCase() &&
        x.senha === senha
    );

    if (!usuario) {
      return { ok: false, mensagem: "Usuário ou senha inválidos." };
    }

    // Se quiser, armazene o usuário logado
    await StorageService.salvar("@usuario_logado", usuario);
    return { ok: true, usuario: new UsuarioEntity(usuario) };
  }
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
}
