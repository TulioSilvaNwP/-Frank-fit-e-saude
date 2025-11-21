import BaseService from './BaseService';
import HabitosEntity from '../entities/habitosEntity';

class HabitosService extends BaseService {
  constructor() {
    super('/habitos');
  }

  async adicionar(dados) {
    const id = Date.now().toString();
    
    const novoHabito = new HabitosEntity(
      id, 
      dados.nome, 
      dados.descricao, 
      dados.frequencia, 
      dados.horario
    );
    
    return await this.create(novoHabito);
  }
}

export default new HabitosService();