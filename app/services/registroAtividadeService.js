<<<<<<< HEAD
import RegistroAtividadeEntity from "../entities/RegistroAtividadeEntity";
import StorageService from "./storageService";

const CHAVE = "@registroAtividade";

export default class RegistroAtividadeService {
  static async listar() {
    const dados = await StorageService.carregar(CHAVE);
    return Array.isArray(dados) ? dados.map(RegistroAtividadeEntity.fromDto) : [];
  }

  static async criar(dto) {
    const lista = await this.listar();
    const novo = new RegistroAtividadeEntity(dto);
    lista.push(novo);
    await StorageService.salvar(CHAVE, lista);
    return novo;
  }

  static async remover(id) {
    const lista = await this.listar();
    const novaLista = lista.filter(x => String(x.id) !== String(id));
    await StorageService.salvar(CHAVE, novaLista);
  }
}

=======
import RegistroAtividadeEntity from "../entities/AtividadeFisicaEntity";

const mem = [];

export default class RegistroAtividadeService {
  static toEntity(d){ return RegistroAtividadeEntity.fromDto(d); }

  static async listar(){
    return mem.map(this.toEntity);
  }

  static async criar(dto){
    const novo = { ...dto, id: dto.id ?? `r${Date.now()}` };
    mem.push(novo);
    return { ok:true, atividade:this.toEntity(novo) };
  }

  static async remover(id){
    const idx = mem.findIndex(x => String(x.id) === String(id));
    if (idx === -1) return false;
    mem.splice(idx,1);
    return true;
  }

  static async atualizar(dto){
    const idx = mem.findIndex(x => String(x.id) === String(dto.id));
    if (idx === -1) return null;
    mem[idx] = dto;
    return this.toEntity(dto);
  }
}
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
