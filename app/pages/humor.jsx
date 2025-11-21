import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import humorService from '../services/humorService';

const { height } = Dimensions.get('window');

export default function Humor() {
  const navigation = useNavigation();
  const [listaHumores, setListaHumores] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarHumores();
    }, [])
  );

  const carregarHumores = async () => {
    try {
      setLoading(true);
      const dados = await humorService.getAll();
      if (Array.isArray(dados)) {
        setListaHumores(dados.reverse());
      } else {
        setListaHumores([]);
      }
    } catch (error) {
      console.error("Erro ao buscar humores:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para tentar adivinhar o ícone pelo texto
  const getIconBySentiment = (sentimento) => {
    const s = sentimento ? sentimento.toLowerCase() : '';
    if (s.includes('feliz') || s.includes('bem') || s.includes('ótimo')) return 'https://cdn-icons-png.flaticon.com/512/725/725107.png';
    if (s.includes('triste') || s.includes('mal')) return 'https://cdn-icons-png.flaticon.com/512/725/725099.png';
    if (s.includes('estress') || s.includes('bravo') || s.includes('raiva')) return 'https://cdn-icons-png.flaticon.com/512/725/725095.png';
    if (s.includes('cansado') || s.includes('sono')) return 'https://cdn-icons-png.flaticon.com/512/725/725116.png';
    if (s.includes('animado')) return 'https://cdn-icons-png.flaticon.com/512/1933/1933691.png';
    // Ícone padrão (Neutro)
    return 'https://cdn-icons-png.flaticon.com/512/1933/1933011.png'; 
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Humor</Text>
        <View style={{ width: 40 }} /> 
      </View>

      {/* CONTEÚDO */}
      <View style={{flex: 1}}>
        {loading ? (
             <ActivityIndicator size="large" color="#F97316" style={{marginTop: 50}} />
        ) : (
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {listaHumores.length === 0 ? (
                    <Text style={styles.emptyText}>Nenhum registro de humor.</Text>
                ) : (
                    listaHumores.map((item, index) => (
                    <View key={item.id || index} style={styles.card}>
                        <Image source={{ uri: getIconBySentiment(item.sentimento) }} style={styles.emojiIcon} />
                        
                        <View style={styles.textContainer}>
                            <Text style={styles.moodTitle}>{item.sentimento}</Text>
                            <Text style={styles.moodDate}>{item.data}</Text>
                            {item.descricao ? <Text style={styles.moodDesc}>{item.descricao}</Text> : null}
                        </View>
                    </View>
                    ))
                )}

                {/* RODAPÉ COM BOTÃO */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Esses são seus Humores mais recentes.</Text>
                    
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => navigation.navigate('NovosHumores')} 
                    >
                        <Text style={styles.addButtonText}>Adicione Humor</Text>
                        <Text style={styles.addButtonArrow}>→</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EAF8', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7F9099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#333',
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#555',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emojiIcon: {
    width: 45,
    height: 45,
    marginRight: 15,
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  moodDate: {
    fontSize: 13,
    color: '#9CA3AF', 
    marginBottom: 2,
  },
  moodDesc: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#F97316', 
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  addButtonArrow: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});