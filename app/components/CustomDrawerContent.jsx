// app/components/CustomDrawerContent.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

export default function CustomDrawerContent(props) {
  // Pegamos a navegação e o estado atual da rota para saber qual está ativa
  const { navigation, state } = props;
  
  // Função auxiliar para saber se a rota é a ativa
  const isActive = (routeName) => {
    return state.routes[state.index].name === routeName;
  };

  // Componente de Item de Menu Personalizado
  const MenuItem = ({ label, iconSource, routeName }) => {
    const active = isActive(routeName);
    
    return (
      <TouchableOpacity 
        style={[styles.menuItem, active && styles.menuItemActive]} 
        onPress={() => navigation.navigate(routeName)}
      >
        <Image 
          source={{ uri: iconSource }} 
          style={[styles.menuIcon, { tintColor: active ? '#F97316' : '#333' }]} 
        />
        <Text style={[styles.menuText, active && styles.menuTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
        
        {/* 1. Topo: Usuário */}
        <View style={styles.drawerUserSection}>
            <View style={styles.drawerUserIconBox}>
            <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' }} 
                style={{ width: 24, height: 24, tintColor: '#FFF' }} 
            />
            </View>
            <View>
            <Text style={styles.drawerUserName}>Usuário</Text>
            <Text style={styles.drawerUserEmail}>usuario@email.com</Text>
            </View>
        </View>

        {/* 2. Barra de Pesquisa */}
        <View style={styles.drawerSearchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput 
                placeholder="Search..." 
                placeholderTextColor="#999"
                style={styles.searchInput} 
            />
        </View>

        {/* 3. Itens do Menu (Manuais para alinhamento perfeito) */}
        <View style={styles.menuList}>
            
            <MenuItem 
                label="Início" 
                routeName="Início"
                iconSource="https://cdn-icons-png.flaticon.com/512/25/25694.png" 
            />

            <MenuItem 
                label="Atividades" 
                routeName="Atividades"
                iconSource="https://cdn-icons-png.flaticon.com/512/2928/2928755.png" 
            />

            <MenuItem 
                label="Hábitos" 
                routeName="Hábitos"
                iconSource="https://cdn-icons-png.flaticon.com/512/25/25235.png" 
            />

            <MenuItem 
                label="Conteúdos (Dicas)" 
                routeName="Dicas"
                iconSource="https://cdn-icons-png.flaticon.com/512/3602/3602145.png" 
            />

            <MenuItem 
                label="Humor" 
                routeName="Humor"
                iconSource="https://cdn-icons-png.flaticon.com/512/569/569501.png" 
            />

        </View>

      </ScrollView>

      {/* 4. Rodapé: Botão Sair */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity onPress={() => console.log("Sair")} style={styles.logoutButton}>
            <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828479.png' }} 
                style={{ width: 20, height: 20, tintColor: '#333', marginRight: 15 }} 
            />
            <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  // --- Topo Usuário ---
  drawerUserSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 40, 
    paddingBottom: 20,
  },
  drawerUserIconBox: {
    width: 45,
    height: 45,
    backgroundColor: '#F97316', // Laranja
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  drawerUserEmail: {
    fontSize: 12,
    color: '#666',
  },
  
  // --- Busca ---
  drawerSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 25,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 16,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    color: '#333',
  },

  // --- Lista de Itens ---
  menuList: {
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 5,
  },
  menuItemActive: {
    backgroundColor: '#FFF7ED', // Fundo laranja bem claro quando ativo
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 15, // Espaço corrigido entre ícone e texto
    resizeMode: 'contain'
  },
  menuText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuTextActive: {
    color: '#F97316', // Texto laranja quando ativo
    fontWeight: 'bold',
  },

  // --- Rodapé ---
  drawerFooter: {
    padding: 25,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});