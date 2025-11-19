import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dados simulados
const historicoData = [
  { 
    id: 1, 
    titulo: 'Corrida', 
    horario: '07:00', 
    duracao: '45 min', 
    calorias: '420 cal', 
    intensidade: 'Moderada',
    tagColor: '#E8D8B0', 
    img: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    titulo: 'Musculação', 
    horario: '06:00', 
    duracao: '90 min', 
    calorias: '480 cal', 
    intensidade: 'Intensa',
    tagColor: '#FDBA74', 
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 3, 
    titulo: 'Yoga', 
    horario: '08:00', 
    duracao: '30 min', 
    calorias: '150 cal', 
    intensidade: 'Leve',
    tagColor: '#F3E8D3', 
    img: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 4, 
    titulo: 'Musculação', 
    horario: '06:00', 
    duracao: '60 min', 
    calorias: '380 cal', 
    intensidade: 'Moderada',
    tagColor: '#E8D8B0',
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 5, 
    titulo: 'Yoga', 
    horario: '08:00', 
    duracao: '30 min', 
    calorias: '150 cal', 
    intensidade: 'Leve',
    tagColor: '#F3E8D3',
    img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1469&auto=format&fit=crop'
  },
];

export default function Atividades() {
  const navigation = useNavigation();

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

        {/* LISTA */}
        <View style={styles.listContainer}>
          {historicoData.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              
              <View style={styles.cardMiddle}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardSubtitle}>{item.horario} • {item.duracao}</Text>
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.cardCalories}>{item.calorias}</Text>
                <View style={[styles.tagContainer, { backgroundColor: item.tagColor }]}>
                  <Text style={styles.tagText}>{item.intensidade}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER COM BOTÃO DE AÇÃO */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Novas Atividades?</Text>
          <Text style={styles.footerSubtitle}>
            Essas são suas Atividades mais recentes.
          </Text>
          <Text style={styles.footerSubtitle}>
            Adicione novas ao seu histórico.
          </Text>

          {/* BOTÃO REDIRECIONANDO PARA A TELA NOVAS ATIVIDADES */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('NovasAtividades')} 
          >
            <Text style={styles.addButtonText}>Adicione Nova Atividade</Text>
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
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 45,
  },
  cardCalories: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#555',
  },
  footerSection: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
    marginBottom: 10,
  },
  footerSubtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#F97316',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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