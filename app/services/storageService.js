import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageService {

  static async salvar(chave, valor) {
    try {
      const json = JSON.stringify(valor);
      await AsyncStorage.setItem(chave, json);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  }

  static async carregar(chave) {
    try {
      const json = await AsyncStorage.getItem(chave);
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      return null;
    }
  }

  static async remover(chave) {
    try {
      await AsyncStorage.removeItem(chave);
    } catch (error) {
      console.error("Erro ao remover dados:", error);
    }
  }
}
