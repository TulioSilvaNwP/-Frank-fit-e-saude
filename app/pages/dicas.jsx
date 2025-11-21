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
import dicasService from '../services/dicasService';

const { height } = Dimensions.get('window');

const CORES_ICONES = ['#FFF', '#F97316', '#2563EB', '#84CC16', '#A855F7', '#EF4444'];

export default function Dicas() {
  const navigation = useNavigation();
  const [listaDicas, setListaDicas] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarDicas();
    }, [])
  );

  const carregarDicas = async () => {
    try {
      setLoading(true);
      const dados = await dicasService.getAll();
      setListaDicas(dados.reverse());
    } catch (error) {
      console.error("Erro ao carregar dicas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEstiloIcone = (index) => {
    const corFundo = CORES_ICONES[index % CORES_ICONES.length];
    const corIcone = corFundo === '#FFF' ? '#333' : '#FFF';
    return { corFundo, corIcone };
  };

  return (
    <View style={styles.container}>
      
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
          <Text style={styles.headerTitle}>Dicas</Text>
          <Text style={styles.headerSubtitle}>Recomendações</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {loading ? (
             <ActivityIndicator size="large" color="#F97316" />
        ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
                {listaDicas.map((item, index) => {
                    const { corFundo, corIcone } = getEstiloIcone(index);
                    return (
                        <TouchableOpacity key={item.id || index} style={styles.card}>
                        <View style={[styles.iconBox, { backgroundColor: corFundo }]}>
                            <Image 
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2983/2983854.png' }} 
                                style={{ width: 24, height: 24, tintColor: corIcone }} 
                            />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>{item.titulo}</Text>
                            <Text style={styles.cardSubtitle}>{item.descricao}</Text>
                        </View>
                        </TouchableOpacity>
                    );
                })}

                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => navigation.navigate('NovasDicas')}
                >
                <View style={[styles.iconBox, { backgroundColor: '#333' }]}>
                    <Text style={{color: '#FFF', fontSize: 24}}>+</Text>
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Novo conteúdo?</Text>
                    <Text style={styles.cardSubtitle}>Adicione novos conteúdos as dicas!</Text>
                </View>
                <Text style={styles.arrowRight}>→</Text>
                </TouchableOpacity>
                
                <View style={{height: 80}} />
            </ScrollView>
        )}
      </View>

      <TouchableOpacity 
        style={styles.floatingButton}
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
  header: {
    height: height * 0.25, 
    backgroundColor: '#1C1C1E', 
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
    color: 'rgba(255,255,255,0.7)',
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
    marginBottom: 10,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 11, 
    color: '#6B7280',
    fontWeight: '500',
  },
  arrowRight: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: 'bold',
    marginRight: 5,
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
  }
});