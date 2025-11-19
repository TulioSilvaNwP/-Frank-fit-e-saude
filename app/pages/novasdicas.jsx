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
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function NovasDicas() {
  const navigation = useNavigation();
  
  const [form, setForm] = useState({
    tipo: '',
    titulo: '',
    descricao: '',
    fonte: ''
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        
        {/* CABEÇALHO COM IMAGEM (Tema: Alimentação/Saúde) */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1453&auto=format&fit=crop' }} 
          style={styles.headerImage}
        >
          <View style={styles.overlay}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* CONTEÚDO BRANCO ARREDONDADO */}
        <View style={styles.contentContainer}>
          <View style={styles.headerTexts}>
            <Text style={styles.title}>Conteúdos</Text>
            <Text style={styles.subtitle}>Adicione novos Conteúdos</Text>
          </View>

          {/* FORMULÁRIO COM DISTRIBUIÇÃO VERTICAL AUTOMÁTICA */}
          <View style={styles.form}>
            
            {/* Tipo */}
            <View style={styles.inputGroup}>
                <InputLabel label="Tipo:" />
                <TextInput 
                  style={styles.input} 
                  value={form.tipo}
                  onChangeText={(t) => handleChange('tipo', t)}
                />
            </View>

            {/* Título */}
            <View style={styles.inputGroup}>
                <InputLabel label="Título:" />
                <TextInput 
                  style={styles.input} 
                  value={form.titulo}
                  onChangeText={(t) => handleChange('titulo', t)}
                />
            </View>

            {/* Descrição */}
            <View style={styles.inputGroup}>
                <InputLabel label="Descrição:" />
                <TextInput 
                  style={styles.input} 
                  value={form.descricao}
                  onChangeText={(t) => handleChange('descricao', t)}
                />
            </View>

            {/* Fonte (Opcional) */}
            <View style={styles.inputGroup}>
                <InputLabel label="Fonte (Opcional):" />
                <TextInput 
                  style={styles.input} 
                  value={form.fonte}
                  onChangeText={(t) => handleChange('fonte', t)}
                />
            </View>

            {/* BOTÕES EMPILHADOS */}
            <View style={styles.footerButtons}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Dicas')}
              >
                <Text style={styles.buttonText}>Seus Conteúdos →</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Adicionar Conteúdo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  headerImage: {
    width: '100%',
    height: height * 0.22, // 22% da tela
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Overlay leve
    paddingTop: 40, 
    paddingLeft: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#FFF',
    fontSize: 22,
    marginTop: -2,
  },
  contentContainer: {
    flex: 1, 
    backgroundColor: '#FFF',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20, 
  },
  headerTexts: {
    alignItems: 'center',
    marginBottom: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
    marginBottom: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  form: {
    flex: 1,
    justifyContent: 'space-evenly', // Distribui igualmente na tela
  },
  inputGroup: {
    marginBottom: 5, 
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5, 
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 25, 
    paddingHorizontal: 20,
    height: 42, 
    fontSize: 14,
    color: '#333',
    justifyContent: 'center',
  },
  footerButtons: {
    marginTop: 10,
    gap: 12, 
  },
  button: {
    backgroundColor: '#F97316', // Laranja
    height: 50,
    borderRadius: 25,
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
    fontSize: 16,
    fontWeight: 'bold',
  }
});