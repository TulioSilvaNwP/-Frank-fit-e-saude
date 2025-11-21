import BaseService from './BaseService';
import PerfilEntity from '../entities/perfilEntity';

class PerfilService extends BaseService {
  constructor() {
    super('/perfil');
  }

  async salvar(dados) {
    // Tenta carregar o perfil existente
    const perfilExistente = await this.carregar();

    // Se já existe, usa o ID dele, senão usa 1
    const id = perfilExistente ? perfilExistente.id : 1;

    const usuario = new PerfilEntity(
      id, 
      dados.nome, 
      dados.email, 
      dados.idade, 
      dados.peso, 
      dados.altura
    );

    if (perfilExistente) {
      return await this.update(id, usuario);
    } else {
      return await this.create(usuario);
    }
  }

  async carregar() {
    const lista = await this.getAll();
    // Como a API retorna uma lista, pegamos o primeiro item para simular um perfil único
    return lista && lista.length > 0 ? lista[0] : null;
  }
}

export default new PerfilService();