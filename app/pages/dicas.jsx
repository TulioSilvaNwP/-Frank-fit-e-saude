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

const { height } = Dimensions.get('window');

export default function Dicas() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* --- CABEÇALHO ESCURO --- */}
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
          <Text style={styles.headerTitle}>Dicas</Text>
          <Text style={styles.headerSubtitle}>Recomendações</Text>
        </View>
      </View>

      {/* --- LISTA DE CARDS (Sem Scroll) --- */}
      <View style={styles.contentContainer}>
        
        {/* 1. Durma bem */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#FFF' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3073/3073451.png' }} 
               style={{ width: 24, height: 24, tintColor: '#333' }} 
             />
             <View style={styles.notificationBadge}><Text style={styles.notifText}>4+</Text></View>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Durma bem!</Text>
            <Text style={styles.cardSubtitle}>Dormir bem aumenta a produtividade.</Text>
          </View>
        </TouchableOpacity>

        {/* 2. Meditação */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#F97316' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2647/2647549.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Meditação</Text>
            <Text style={styles.cardSubtitle}>Meditação reduz o estresse.</Text>
          </View>
        </TouchableOpacity>

        {/* 3. Beba bastante água */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#2563EB' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png' }} 
               style={{ width: 20, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Beba bastante água!</Text>
            <Text style={styles.cardSubtitle}>Manter-se hidratado melhora o humor.</Text>
          </View>
        </TouchableOpacity>

        {/* 4. Melhore seu físico */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#84CC16' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Melhore seu físico</Text>
            <Text style={styles.cardSubtitle}>Treine diariamente!</Text>
          </View>
        </TouchableOpacity>

        {/* 5. Alimentação */}
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#A855F7' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/706/706164.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Alimentação</Text>
            <Text style={styles.cardSubtitle}>Dieta saudável ajuda a emagrecer.</Text>
          </View>
        </TouchableOpacity>

        {/* 6. Novo Conteúdo (Botão da Lista) */}
        <TouchableOpacity 
            style={styles.card}
            // ATUALIZADO: Redireciona para Novas Dicas
            onPress={() => navigation.navigate('NovasDicas')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#EF4444' }]}>
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2983/2983854.png' }} 
               style={{ width: 24, height: 24, tintColor: '#FFF' }} 
             />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Novo conteúdo?</Text>
            <Text style={styles.cardSubtitle}>Adicione novos conteúdos as dicas!</Text>
          </View>
          {/* Seta indicativa */}
          <Text style={styles.arrowRight}>→</Text>
        </TouchableOpacity>

      </View>

      {/* BOTÃO FLUTUANTE */}
      <TouchableOpacity 
        style={styles.floatingButton}
        // ATUALIZADO: Redireciona para Novas Dicas também
        onPress={() => navigation.navigate('NovasDicas')}
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
  
  // --- HEADER ESCURO ---
  header: {
    height: height * 0.25, // 25% da tela
    backgroundColor: '#1C1C1E', // Quase preto
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
    backgroundColor: 'rgba(255,255,255,0.2)', // Translúcido
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
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    marginTop: 5,
  },

  // --- LISTA ---
  contentContainer: {
    flex: 1, 
    padding: 20,
    justifyContent: 'space-between', // Espalha os itens verticalmente
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Cinza claro do card
    borderRadius: 20,
    padding: 12,
    height: (height * 0.70) / 7, // Altura calculada para caber 6 itens
    maxHeight: 80,
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

  // Textos
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
    fontSize: 11, // Levemente menor para garantir que caiba 
    color: '#6B7280',
    fontWeight: '500',
  },
  arrowRight: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: 'bold',
    marginRight: 5,
  },

  // Botão Flutuante
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