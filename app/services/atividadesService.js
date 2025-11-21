import BaseService from './BaseService';
import AtividadesEntity from '../entities/atividadesEntity';

class AtividadesService extends BaseService {
    constructor() {
        super('/atividades');
    }

    // Método específico para criar uma atividade já formatada
    async adicionar(dados) {
        const { tipo, intensidade, duracao, data, calorias, observacoes } = dados;
        const id = Date.now().toString(); // Gera um ID único baseado no timestamp

        // Cria a instância da Entity
        const novaAtividade = new AtividadesEntity(
            id, 
            tipo, 
            intensidade, 
            duracao, 
            data, 
            calorias, 
            observacoes
        );

        // Usa o método create do BaseService para salvar
        return await this.create(novaAtividade);
    }

    // Exemplo de método extra: Filtrar por tipo
    async listarPorTipo(tipoAlvo) {
        const todas = await this.getAll();
        return todas.filter(item => item.tipo === tipoAlvo);
    }
}

export default new AtividadesService();