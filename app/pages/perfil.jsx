import React from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
// IMPORTANTE: Usar ScrollView do gesture-handler para evitar travamentos com o Drawer
import { ScrollView } from "react-native-gesture-handler"; 
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function Perfil() {
  const navigation = useNavigation();

  const userData = {
    nome: "Usuário Exemplo",
    email: "usuario@email.com",
    idade: "25 anos",
    peso: "78 kg",
    altura: "182 cm"
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- CABEÇALHO PERSONALIZADO --- */}
        <View style={styles.headerContainer}>
          
          {/* Botões do Topo */}
          <View style={styles.topButtonsRow}>
             {/* Botão VOLTAR */}
             <TouchableOpacity style={styles.squareButtonGrey} onPress={() => navigation.goBack()}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
                  style={styles.backIcon} 
                />
             </TouchableOpacity>

             <Text style={styles.headerTitle}>Meu Perfil</Text>

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

          {/* Foto de Perfil Grande */}
          <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }} 
                style={styles.profileImageLarge} 
              />
              <View style={styles.editIconContainer}>
                 <Text style={{fontSize: 12}}>✏️</Text>
              </View>
          </View>

          <Text style={styles.userNameLarge}>{userData.nome}</Text>
          <Text style={styles.userEmailLarge}>{userData.email}</Text>

        </View>

        {/* --- DADOS DO USUÁRIO --- */}
        <View style={styles.infoContainer}>
            
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>NOME COMPLETO</Text>
                <View style={styles.infoValueBox}>
                    <Text style={styles.infoValue}>{userData.nome}</Text>
                </View>
            </View>

            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>E-MAIL</Text>
                <View style={styles.infoValueBox}>
                    <Text style={styles.infoValue}>{userData.email}</Text>
                </View>
            </View>

            {/* Grid para medidas */}
            <View style={styles.statsRow}>
                <View style={[styles.infoItem, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.infoLabel}>IDADE</Text>
                    <View style={styles.infoValueBox}>
                        <Text style={styles.infoValue}>{userData.idade}</Text>
                    </View>
                </View>
                
                <View style={[styles.infoItem, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.infoLabel}>PESO</Text>
                    <View style={styles.infoValueBox}>
                        <Text style={styles.infoValue}>{userData.peso}</Text>
                    </View>
                </View>

                <View style={[styles.infoItem, { flex: 1 }]}>
                    <Text style={styles.infoLabel}>ALTURA</Text>
                    <View style={styles.infoValueBox}>
                        <Text style={styles.infoValue}>{userData.altura}</Text>
                    </View>
                </View>
            </View>

            {/* Botão Editar Perfil */}
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar Dados</Text>
            </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  
  // --- HEADER ---
  headerContainer: {
    backgroundColor: '#111',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  topButtonsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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

  // --- FOTO E NOME ---
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#F97316', 
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#111',
  },
  userNameLarge: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmailLarge: {
    color: '#CCC',
    fontSize: 14,
    marginTop: 5,
  },

  // --- INFO AREA ---
  infoContainer: {
    paddingHorizontal: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280', 
    marginBottom: 8,
    marginLeft: 4,
  },
  infoValueBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});