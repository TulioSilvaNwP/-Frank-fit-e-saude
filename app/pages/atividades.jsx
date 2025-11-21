import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import atividadesService from '../services/atividadesService';

const { height } = Dimensions.get('window');

export default function Atividades() {
  const navigation = useNavigation();
  const [listaAtividades, setListaAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarAtividades();
    }, [])
  );

  const carregarAtividades = async () => {
    try {
      setLoading(true);
      const dados = await atividadesService.getAll();
      // Inverte para mostrar os mais recentes primeiro
      setListaAtividades(dados.reverse());
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImagemPorTipo = (tipo) => {
    const tipoLower = tipo ? tipo.toLowerCase() : '';
    if (tipoLower.includes('corrida')) return 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop';
    if (tipoLower.includes('muscula')) return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop';
    if (tipoLower.includes('yoga')) return 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1470&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop'; 
  };

  const getCorPorIntensidade = (intensidade) => {
    const intLower = intensidade ? intensidade.toLowerCase() : '';
    if (intLower === 'alta' || intLower === 'intensa') return '#F97316'; // Laranja forte
    if (intLower === 'moderada') return '#FDBA74'; // Laranja médio
    return '#FFEDD5'; // Laranja claro
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Histórico de Atividades</Text>
            <Text style={styles.headerTitle}>e Treinos</Text>
          </View>
          <View style={{ width: 40 }} /> 
        </View>

        {/* LOADING OU LISTA */}
        {loading ? (
          <ActivityIndicator size="large" color="#F97316" style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.listContainer}>
            {listaAtividades.length === 0 ? (
                <Text style={styles.emptyText}>Nenhuma atividade registrada ainda.</Text>
            ) : (
                listaAtividades.map((item, index) => (
                <View key={item.id || index} style={styles.card}>
                    <Image 
                        source={{ uri: getImagemPorTipo(item.tipo) }} 
                        style={styles.cardImage} 
                    />
                    
                    <View style={styles.cardMiddle}>
                        <Text style={styles.cardTitle}>{item.tipo || 'Atividade'}</Text>
                        <Text style={styles.cardSubtitle}>{item.data} • {item.duracao}</Text>
                        {item.observacoes ? <Text style={styles.cardObs}>{item.observacoes}</Text> : null}
                    </View>

                    <View style={styles.cardRight}>
                        <View style={[styles.tagContainer, { backgroundColor: getCorPorIntensidade(item.intensidade) }]}>
                            <Text style={styles.tagText}>{item.intensidade || 'N/A'}</Text>
                        </View>
                    </View>
                </View>
                ))
            )}
          </View>
        )}

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Novas Atividades?</Text>
          <Text style={styles.footerSubtitle}>
            Mantenha seu histórico atualizado.
          </Text>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('NovasAtividades')} 
          >
            <Text style={styles.addButtonText}>Adicionar Nova Atividade</Text>
            <Text style={styles.addButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0EA',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ACA89F',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backArrow: {
    fontSize: 20,
    color: '#333',
    marginTop: -2,
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  listContainer: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#EEE',
  },
  cardMiddle: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  cardObs: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    fontStyle: 'italic',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 45,
  },
  tagContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
  },
  footerSection: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
    marginBottom: 5,
  },
  footerSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#F97316',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  addButtonArrow: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});