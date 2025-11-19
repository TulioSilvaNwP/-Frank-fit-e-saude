import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Habitos() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* --- CABEÇALHO LARANJA --- */}
      <View style={styles.header}>
        {/* Botão Voltar */}
        <View style={styles.headerTopRow}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Títulos */}
        <View style={styles.headerTexts}>
          <Text style={styles.headerTitle}>Hábitos</Text>
          <Text style={styles.headerSubtitle}>Seus hábitos</Text>
        </View>
      </View>

      {/* --- LISTA DE CARDS (Sem Scroll) --- */}
      <View style={styles.contentContainer}>
        
        {/* 1. CARD SONO */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#FFF' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3073/3073451.png' }} 
               style={{ width: 24, height: 24, tintColor: '#333' }} 
             />
             {/* Bolinha de notificação simulada */}
             <View style={styles.notificationBadge}><Text style={styles.notifText}>4+</Text></View>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Sono</Text>
            <Text style={styles.cardSubtitle}>Sono está em dia!</Text>
          </View>
        </TouchableOpacity>

        {/* 2. CARD ATIVIDADES */}
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Atividades')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#F97316' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/55/55240.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Atividades Registradas</Text>
            <Text style={styles.cardSubtitle}>Meta de atividades batida!</Text>
          </View>
          <View style={styles.grayBadge}>
            <Text style={styles.grayBadgeText}>8+</Text>
          </View>
        </TouchableOpacity>

        {/* 3. CARD ÁGUA (Com Barra de Progresso) */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#2563EB' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png' }} 
               style={{ width: 20, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Água</Text>
            
            {/* Barra de Progresso Customizada */}
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>1005ml da meta de 1500ml</Text>
          </View>
        </TouchableOpacity>

        {/* 4. CARD TREINOS */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#84CC16' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Treinos</Text>
            <Text style={styles.cardSubtitle}>Treinos de Intensos faltando!</Text>
          </View>
        </TouchableOpacity>

        {/* 5. CARD ALIMENTAÇÃO */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#A855F7' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/706/706164.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Alimentação</Text>
            <Text style={styles.cardSubtitle}>55% da dieta mensal concluída!</Text>
          </View>
        </TouchableOpacity>

        {/* 6. CARD DICAS */}
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Dicas')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#EF4444' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2983/2983854.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Dicas</Text>
            <Text style={styles.cardSubtitle}>100% das dicas seguidas!</Text>
          </View>
        </TouchableOpacity>

      </View>
      
      {/* Botão Flutuante para "Novos Hábitos" se desejar, ou acesso via outro lugar */}
       <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('NovosHabitos')} // Certifique-se de ter registrado essa tela no index.js
       >
         <Text style={styles.floatingButtonText}>+</Text>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Fundo bem clarinho
  },
  
  // --- HEADER ---
  header: {
    height: height * 0.25, // 25% da altura da tela
    backgroundColor: '#F97316', // Laranja
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 50, // Espaço seguro
    justifyContent: 'flex-start',
  },
  headerTopRow: {
    marginBottom: 10,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.2)', // Laranja translúcido
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

  // --- LISTA (Flexível para caber sem scroll) ---
  contentContainer: {
    flex: 1, // Ocupa o resto da tela
    padding: 20,
    justifyContent: 'space-between', // Distribui os cards igualmente
    paddingBottom: 30, // Margem inferior
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Cinza do card
    borderRadius: 20,
    padding: 12,
    // Altura flexível para se adaptar
    height: (height * 0.70) / 7, // Cálculo aproximado para caber 6 itens
    maxHeight: 80, // Limite máximo visual
  },
  
  // Ícones
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F97316',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  notifText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },

  // Texto do Card
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Específicos
  grayBadge: {
    backgroundColor: '#D1D5DB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  grayBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  
  // Barra de Progresso (Água)
  progressBarContainer: {
    height: 6,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    width: '100%',
    marginTop: 5,
    marginBottom: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB', // Azul
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },

  // Botão Flutuante (Opcional para adicionar novo hábito)
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
  }
});