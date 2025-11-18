import HabitoEntity from "../entities/HabitoEntity";

const mem = [];

export default class HabitoService {
  static toEntity(d){ return HabitoEntity.fromDto(d); }

  static async listar(){
    return mem.map(this.toEntity);
  }

  static async criar(dto){
    const novo = { ...dto, id: dto.id ?? `h${Date.now()}` };
    mem.push(novo);
    return { ok:true, habito:this.toEntity(novo) };
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

