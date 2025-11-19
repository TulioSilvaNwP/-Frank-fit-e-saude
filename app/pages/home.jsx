import React from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.mainContainer}>
        
      {/* --- CABEÇALHO (HEADER) --- */}
      {/* Mantive o header fixo no topo */}
      <View style={styles.headerContainer}>
        <View style={styles.topButtonsRow}>
            {/* Botão VOLTAR */}
            <TouchableOpacity style={styles.squareButtonGrey} onPress={() => navigation.goBack()}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
                style={styles.backIcon} 
              />
            </TouchableOpacity>

            {/* Botão SIDEBAR */}
            <TouchableOpacity 
              style={styles.squareButtonBlack} 
              onPress={() => navigation.openDrawer()} 
            >
              <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' }} 
                  style={styles.heartIcon} 
              />
            </TouchableOpacity>
        </View>

        {/* Área do Perfil */}
        <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }} 
                  style={styles.profileImage} 
                />
            </TouchableOpacity>
            
            <View style={styles.greetingContainer}>
                <Text style={styles.dateText}>Jun 25, 2024</Text>
                <Text style={styles.greetingText}>
                    Olá,{' '}
                    <Text style={styles.userName} onPress={() => navigation.navigate('Perfil')}>
                        Usuário
                    </Text>
                </Text>
            </View>
            
            <TouchableOpacity 
                style={styles.notificationButton}
                onPress={() => console.log("Abrir Notificações")}
            >
                <Image 
                  source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/bell.png' }} 
                  style={styles.bellIcon} 
                />
            </TouchableOpacity>
        </View>
      </View>

      {/* --- ÁREA DE CONTEÚDO (GRID) --- */}
      {/* Esta View ocupa todo o espaço restante da tela (flex: 1) */}
      <View style={styles.gridContainer}>
        
        {/* LINHA 1 */}
        <View style={styles.gridRow}>
            {/* CARD 1: ATIVIDADES */}
            <TouchableOpacity 
              style={styles.gridCard} 
              onPress={() => navigation.navigate('Atividades')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }} 
                style={styles.cardBgImage} 
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitleWhite}>Atividades</Text>
                <Text style={styles.cardSubtitleWhite}>Ver histórico →</Text>
              </View>
            </TouchableOpacity>

            {/* CARD 2: HÁBITOS */}
            <TouchableOpacity 
              style={[styles.gridCard, { backgroundColor: '#E8E8E8' }]}
              onPress={() => navigation.navigate('Habitos')}
            >
               <View style={styles.cardContentPadding}>
                  <Text style={styles.cardTitleBlack}>Hábitos</Text>
                  <Text style={styles.cardSubtitleBlack}>Rotina Diária</Text>
               </View>
               <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4315/4315445.png' }}
                  style={styles.iconCorner} 
               />
            </TouchableOpacity>
        </View>

        {/* LINHA 2 */}
        <View style={styles.gridRow}>
            {/* CARD 3: HUMOR */}
            <TouchableOpacity 
              style={[styles.gridCard, { backgroundColor: '#FFF3E0' }]}
              onPress={() => navigation.navigate('Humor')}
            >
              <View style={styles.cardContentPadding}>
                <Text style={styles.cardTitleBlack}>Humor</Text>
                <Text style={styles.cardSubtitleBlack}>Como se sente?</Text>
              </View>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/742/742751.png' }} 
                style={styles.iconCorner} 
              />
            </TouchableOpacity>

            {/* CARD 4: DICAS */}
            <TouchableOpacity 
              style={styles.gridCard}
              onPress={() => navigation.navigate('Dicas')}
            >
              <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }}
                  style={styles.cardBgImage}
              />
              <View style={[styles.cardOverlay, { backgroundColor: 'rgba(249, 115, 22, 0.6)' }]}>
                   <Text style={styles.cardTitleWhite}>Dicas</Text>
                   <Text style={styles.cardSubtitleWhite}>Conteúdos</Text>
              </View>
            </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  // --- HEADER ---
  headerContainer: {
    backgroundColor: '#111',
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 50, // Safe area manual
    paddingBottom: 25,
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 10,
  },
  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, 
  },
  squareButtonGrey: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.2)', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
  squareButtonBlack: {
    width: 45,
    height: 45,
    backgroundColor: '#1A1A1A', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  heartIcon: {
    width: 24,
    height: 24,
    tintColor: '#F97316', 
    resizeMode: 'contain'
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: '#333',
  },
  greetingContainer: {
    marginLeft: 15,
    flex: 1,
  },
  dateText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '700',
  },
  greetingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  userName: {
    color: '#E3871F',
    fontWeight: 'bold', 
    textDecorationLine: 'underline',
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  bellIcon: {
    width: 22,
    height: 22,
  },

  // --- GRID LAYOUT ---
  gridContainer: {
    flex: 1, // Ocupa todo o espaço restante
    padding: 20,
    justifyContent: 'space-evenly', // Distribui verticalmente
  },
  gridRow: {
    flex: 1, // Cada linha ocupa metade do espaço disponível
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    maxHeight: '48%', // Garante separação
  },
  gridCard: {
    width: '48%', // Cabe 2 lado a lado com folga
    height: '100%', // Ocupa toda altura da linha
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  
  // --- ESTILOS DOS CARDS ---
  cardBgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  cardContentPadding: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  iconCorner: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    opacity: 0.8,
  },
  
  // --- TIPOGRAFIA ---
  cardTitleWhite: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  cardSubtitleWhite: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  cardTitleBlack: {
    color: '#111',
    fontSize: 20,
    fontWeight: '800',
  },
  cardSubtitleBlack: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
  },
});