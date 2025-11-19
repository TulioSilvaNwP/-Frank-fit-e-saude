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
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function Habitos() {
  const navigation = useNavigation();
  
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    frequencia: '',
    horario: ''
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <View style={styles.container}>
      {/* KeyboardAvoidingView para o teclado não cobrir os campos */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        
        {/* CABEÇALHO ILUSTRATIVO */}
        {/* Usei uma imagem suave para imitar a ilustração vetorial do exemplo */}
        <ImageBackground 
          source={{ uri: 'https://img.freepik.com/free-vector/organic-flat-people-meditating-illustration_23-2148906556.jpg' }} 
          style={styles.headerImage}
          resizeMode="cover"
        >
           {/* Filtro de cor pêssego suave por cima da imagem */}
           <View style={styles.overlayColor}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
           </View>
        </ImageBackground>

        {/* CONTEÚDO BRANCO ARREDONDADO */}
        <View style={styles.contentContainer}>
          
          {/* Títulos Centralizados */}
          <View style={styles.headerTexts}>
            <Text style={styles.title}>Hábitos</Text>
            <Text style={styles.subtitle}>Crie novos Hábitos</Text>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.form}>
            
            {/* Nome */}
            <View style={styles.inputGroup}>
                <InputLabel label="Nome:" />
                <TextInput 
                  style={styles.input} 
                  value={form.nome}
                  onChangeText={(t) => handleChange('nome', t)}
                />
            </View>

            {/* Descrição */}
            <View style={styles.inputGroup}>
                <InputLabel label="Descrição (Opcional):" />
                <TextInput 
                  style={styles.input} 
                  value={form.descricao}
                  onChangeText={(t) => handleChange('descricao', t)}
                />
            </View>

            {/* Frequência */}
            <View style={styles.inputGroup}>
                <InputLabel label="Frequência:" />
                <TextInput 
                  style={styles.input} 
                  value={form.frequencia}
                  onChangeText={(t) => handleChange('frequencia', t)}
                />
            </View>

            {/* Horário */}
            <View style={styles.inputGroup}>
                <InputLabel label="Horário:" />
                <TextInput 
                  style={styles.input} 
                  value={form.horario}
                  onChangeText={(t) => handleChange('horario', t)}
                />
            </View>

            {/* BOTÕES NA PARTE INFERIOR */}
            <View style={styles.footerButtons}>
              <TouchableOpacity 
                style={styles.button} 
                // Aqui você pode redirecionar para uma lista de hábitos se tiver
                onPress={() => console.log("Ver hábitos")}
              >
                <Text style={styles.buttonText}>Seus Hábitos →</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.button}
                onPress={() => console.log("Salvar Hábito", form)}
              >
                <Text style={styles.buttonText}>Adicionar Hábito</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// Componente auxiliar para Label
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
    height: height * 0.25, // 25% da tela para o cabeçalho
  },
  overlayColor: {
    flex: 1,
    backgroundColor: 'rgba(255, 220, 200, 0.4)', // Tom pêssego transparente para dar o efeito da imagem
    paddingTop: 45,
    paddingLeft: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0,0,0,0.5)', // Cinza escuro translúcido
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#FFF',
    fontSize: 24,
    marginTop: -4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: -30, // Sobe por cima da imagem
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTexts: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  form: {
    flex: 1,
    justifyContent: 'space-evenly', // Distribui o espaço verticalmente
  },
  inputGroup: {
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#F3F4F6', // Cinza claro igual da imagem
    borderRadius: 25, // Pílula
    paddingHorizontal: 20,
    height: 42, // Altura compacta
    fontSize: 14,
    color: '#333',
  },
  footerButtons: {
    marginTop: 10,
    gap: 12, // Espaço entre os dois botões
  },
  button: {
    backgroundColor: '#F97316', // Laranja vibrante
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});