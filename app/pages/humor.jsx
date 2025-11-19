import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

// Dados simulados
const historicoHumor = [
  { 
    id: 1, 
    humor: 'Triste', 
    data: '07:00 • 03/11/2025', 
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725099.png' 
  },
  { 
    id: 2, 
    humor: 'Animado', 
    data: '06:00 • 02/11/2025', 
    icon: 'https://cdn-icons-png.flaticon.com/512/1933/1933691.png' 
  },
  { 
    id: 3, 
    humor: 'Neutro', 
    data: '08:00 • 01/11/2025', 
    // ÍCONE CORRIGIDO NOVAMENTE: Rosto inexpressivo/neutro
    icon: 'https://cdn-icons-png.flaticon.com/512/1933/1933011.png' 
  },
  { 
    id: 4, 
    humor: 'Cansado', 
    data: '06:00 • 30/10/2025', 
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725116.png' 
  },
  { 
    id: 5, 
    humor: 'Feliz', 
    data: '08:00 • 28/10/2025', 
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725107.png' 
  },
  { 
    id: 6, 
    humor: 'Estressado', 
    data: '08:00 • 25/10/2025', 
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725095.png' 
  },
];

export default function Humor() {
  const navigation = useNavigation();

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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LISTA DE CARDS */}
        {historicoHumor.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.icon }} style={styles.emojiIcon} />
            
            <View style={styles.textContainer}>
              <Text style={styles.moodTitle}>{item.humor}</Text>
              <Text style={styles.moodDate}>{item.data}</Text>
            </View>
          </View>
        ))}

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
    marginBottom: 4,
  },
  moodDate: {
    fontSize: 14,
    color: '#9CA3AF', 
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