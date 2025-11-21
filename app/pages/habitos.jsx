import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import habitosService from '../services/habitosService';

const { height } = Dimensions.get('window');

// Cores para variar os cards dinamicamente
const CARD_COLORS = ['#F97316', '#2563EB', '#84CC16', '#A855F7', '#EF4444', '#F59E0B'];

export default function Habitos() {
  const navigation = useNavigation();
  const [listaHabitos, setListaHabitos] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarHabitos();
    }, [])
  );

  const carregarHabitos = async () => {
    try {
      setLoading(true);
      const dados = await habitosService.getAll();
      // Inverte para mostrar os mais recentes primeiro
      if (Array.isArray(dados)) {
        setListaHabitos(dados.reverse());
      } else {
        setListaHabitos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar hábitos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para pegar uma cor baseada no índice
  const getCardColor = (index) => {
    return CARD_COLORS[index % CARD_COLORS.length];
  };

  return (
    <View style={styles.container}>
      
      {/* --- CABEÇALHO LARANJA --- */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerTexts}>
          <Text style={styles.headerTitle}>Hábitos</Text>
          <Text style={styles.headerSubtitle}>Seus hábitos diários</Text>
        </View>
      </View>

      {/* --- CONTEÚDO --- */}
      <View style={styles.contentContainer}>
        {loading ? (
             <ActivityIndicator size="large" color="#F97316" style={{marginTop: 20}} />
        ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                
                {listaHabitos.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Nenhum hábito cadastrado.</Text>
                        <Text style={styles.emptySubText}>Crie um novo hábito abaixo!</Text>
                    </View>
                ) : (
                    listaHabitos.map((item, index) => {
                        const color = getCardColor(index);
                        return (
                            <TouchableOpacity key={item.id || index} style={styles.card}>
                                <View style={[styles.iconBox, { backgroundColor: color }]}>
                                    {/* Ícone genérico (primeira letra do nome) */}
                                    <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>
                                        {item.nome ? item.nome.charAt(0).toUpperCase() : 'H'}
                                    </Text>
                                </View>
                                <View style={styles.cardTextContainer}>
                                    <Text style={styles.cardTitle}>{item.nome}</Text>
                                    <Text style={styles.cardSubtitle}>{item.descricao || item.frequencia}</Text>
                                </View>
                                <View style={styles.grayBadge}>
                                    <Text style={styles.grayBadgeText}>{item.horario || 'Dia'}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}

            </ScrollView>
        )}
      </View>
      
      {/* Botão Flutuante */}
       <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('NovosHabitos')}
       >
         <Text style={styles.floatingButtonText}>+</Text>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', 
  },
  header: {
    height: height * 0.25, 
    backgroundColor: '#F97316', 
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 50, 
    justifyContent: 'flex-start',
  },
  headerTopRow: {
    marginBottom: 10,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.2)', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#FFF',
    fontSize: 24,
    marginTop: -4,
  },
  headerTexts: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 5,
  },
  contentContainer: {
    flex: 1, 
    padding: 20,
    paddingBottom: 0,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', 
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    height: 80, 
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  grayBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  grayBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 30,
    marginTop: -3,
    fontWeight: '300',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  }
});