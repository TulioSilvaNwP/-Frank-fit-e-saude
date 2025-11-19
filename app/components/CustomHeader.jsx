// app/components/CustomHeader.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({ title, showBackButton }) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Lado Esquerdo: Botão Voltar (Seta Curva no quadrado cinza) */}
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
             {/* Estou usando uma imagem online similar à sua foto. 
                 Se quiser usar o arquivo local: source={require('../../assets/images/botao-voltar.png')} */}
             <Image 
               source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
               style={styles.backButtonImage} 
             />
          </TouchableOpacity>
        )}
      </View>

      {/* Centro: Título (Opcional) */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Lado Direito: Botão Coração (Abre a Sidebar) */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {/* Ícone de coração laranja */}
        <Image 
            source={require('../../assets/images/coracao.png')} // Certifique-se que coracao.png está na pasta assets/images
            // Se der erro, use o link temporário: { uri: 'https://img.icons8.com/ios-filled/50/f97316/like--v1.png' }
            style={styles.heartIcon} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50, // Espaço para status bar
    paddingBottom: 15,
    backgroundColor: '#FAFAFA', // Mesma cor do fundo da Home
  },
  leftContainer: {
    width: 40, // Reserva espaço para manter o título centralizado
  },
  backButtonImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0E0E0', // Fundo cinza do botão
    tintColor: '#555', // Cor da seta
    resizeMode: 'center', // Seta centralizada
    transform: [{ scale: 0.6 }] // Ajuste visual do tamanho do ícone interno
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  heartIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#F97316', // Garante que fique laranja
  },
});