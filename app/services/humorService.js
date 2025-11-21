import BaseService from './BaseService';
import HumorEntity from '../entities/humorEntity';

class HumorService extends BaseService {
  constructor() {
    super('/humores');
  }

  async adicionar(dados) {
    const id = Date.now().toString();
    
    const novoHumor = new HumorEntity(
      id, 
      dados.sentimento, 
      dados.data, 
      dados.descricao
    );
    
    return await this.create(novoHumor);
  }

  async pegarUltimo() {
    const todos = await this.getAll();
    return todos.length > 0 ? todos[todos.length - 1] : null;
  }
}

export default new HumorService();