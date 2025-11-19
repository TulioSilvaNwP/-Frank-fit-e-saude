import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView // Adicionado ScrollView para garantir que tudo caiba em telas menores
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function NovoHumor() {
  const navigation = useNavigation();
  
  const [sentimento, setSentimento] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <View style={styles.container}>
      {/* CABEÇALHO CÉU AZUL */}
      <ImageBackground 
        // Usando uma imagem de céu azul vibrante e confiável
        source={{ uri: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1468&auto=format&fit=crop' }} 
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTexts}>
            <Text style={styles.headerTitle}>Humor</Text>
            <Text style={styles.headerSubtitle}>Como está seu Humor hoje?</Text>
          </View>
        </View>
      </ImageBackground>

      {/* CONTEÚDO BRANCO (Sobrepondo a imagem) */}
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
          >
            
            {/* FORMULÁRIO */}
            <View style={styles.form}>
              
              <View style={styles.inputGroup}>
                  <InputLabel label="Como você está se sentindo?" />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Ex: Feliz, cansado..."
                    value={sentimento}
                    onChangeText={setSentimento}
                    placeholderTextColor="#999"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <InputLabel label="Data:" />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Hoje"
                    value={data}
                    onChangeText={setData}
                    placeholderTextColor="#999"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <InputLabel label="Descrição (Opcional):" />
                  <TextInput 
                    style={[styles.input, styles.textArea]} 
                    placeholder="Adicione detalhes..."
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline={true}
                    placeholderTextColor="#999"
                  />
              </View>

              {/* BOTÕES */}
              <View style={styles.footerButtons}>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => navigation.navigate('Humor')}
                >
                  <Text style={styles.buttonText}>Seu Humor →</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => console.log("Salvar Humor")}
                >
                  <Text style={styles.buttonText}>Adicionar Humor</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const InputLabel = ({ label }) => (
  <Text style={styles.label}>{label}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  // --- Header Céu Azul ---
  headerImage: {
    width: '100%',
    height: height * 0.35, // Aumentei um pouco para garantir que o céu apareça bem
  },
  overlay: {
    flex: 1,
    paddingTop: 50, 
    paddingHorizontal: 20,
    justifyContent: 'space-between', 
    paddingBottom: 50, // Espaço extra embaixo para o texto não ser cortado pelo container branco
    backgroundColor: 'rgba(0,0,0,0.1)', // Leve escurecida para o texto branco estourar
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#FFF',
    fontSize: 22,
    marginTop: -2,
  },
  headerTexts: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF', 
    marginBottom: 5,
    // Sombra no texto para garantir leitura contra nuvens
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },

  // --- Conteúdo Branco ---
  contentContainer: {
    flex: 1, 
    backgroundColor: '#FFF',
    marginTop: -40, // Sobe por cima do céu
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    overflow: 'hidden', // Garante que o conteúdo respeite as bordas arredondadas
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between' // Empurra os botões para baixo se sobrar espaço
  },
  
  form: {
    gap: 20, 
  },
  inputGroup: {
    marginBottom: 5, 
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8, 
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 25, 
    paddingHorizontal: 20,
    height: 50, 
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100, 
    textAlignVertical: 'top',
    paddingTop: 15,
    borderRadius: 20,
  },
  
  // --- Botões ---
  footerButtons: {
    marginTop: 30, // Espaço antes dos botões
    gap: 15, 
  },
  button: {
    backgroundColor: '#F97316', // Laranja
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    width: '100%', 
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});