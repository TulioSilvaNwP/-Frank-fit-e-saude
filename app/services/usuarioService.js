import UsuarioEntity from "../entities/UsuarioEntity";
import StorageService from "./storageService";

const CHAVE = "@usuarios";

export default class UsuarioService {
  static async listar() {
    const dados = await StorageService.carregar(CHAVE);
    return Array.isArray(dados) ? dados : [];
  }

  static async criar(dto) {
    const lista = await this.listar();
    const novo = new UsuarioEntity(dto);
    lista.push(novo);
    await StorageService.salvar(CHAVE, lista);
    return novo;
  }

  static async remover(id) {
    const lista = await this.listar();
    const novaLista = lista.filter(x => String(x.id) !== String(id));
    await StorageService.salvar(CHAVE, novaLista);
  }

  static async atualizar(dto) {
    const lista = await this.listar();
    const idx = lista.findIndex(x => String(x.id) === String(dto.id));
    if (idx !== -1) {
      lista[idx] = dto;
      await StorageService.salvar(CHAVE, lista);
    }
    return dto;
  }

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
}
