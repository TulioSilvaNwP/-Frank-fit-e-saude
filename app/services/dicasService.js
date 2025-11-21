import BaseService from './BaseService';
import DicasEntity from '../entities/dicasEntity';

class DicasService extends BaseService {
  constructor() {
    super('/dicas');
  }

  async adicionar(dados) {
    const id = Date.now().toString();
    
    const novaDica = new DicasEntity(
      id, 
      dados.tipo, 
      dados.titulo, 
      dados.descricao, 
      dados.fonte
    );
    
    return await this.create(novaDica);
  }
}

export default new DicasService();