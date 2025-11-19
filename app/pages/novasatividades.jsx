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

export default function NovasAtividades() {
  const navigation = useNavigation();
  
  const [form, setForm] = useState({
    tipo: '',
    intensidade: '',
    duracao: '',
    data: '',
    observacoes: ''
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
        
        {/* CABEÇALHO */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop' }} 
          style={styles.headerImage}
        >
          <View style={styles.overlay}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* CONTEÚDO */}
        <View style={styles.contentContainer}>
          <View style={styles.headerTexts}>
            <Text style={styles.title}>Nova Atividade</Text>
            <Text style={styles.subtitle}>Preencha os dados abaixo.</Text>
          </View>

          {/* FORMULÁRIO COM DISTRIBUIÇÃO VERTICAL */}
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

            {/* Intensidade e Duração (Mantive lado a lado para economizar altura) */}
            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <InputLabel label="Intensidade:" />
                    <TextInput 
                      style={styles.input} 
                      value={form.intensidade}
                      onChangeText={(t) => handleChange('intensidade', t)}
                    />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <InputLabel label="Duração:" />
                    <TextInput 
                      style={styles.input} 
                      value={form.duracao}
                      onChangeText={(t) => handleChange('duracao', t)}
                    />
                </View>
            </View>

            {/* Data */}
            <View style={styles.inputGroup}>
                <InputLabel label="Data:" />
                <TextInput 
                  style={styles.input} 
                  value={form.data}
                  onChangeText={(t) => handleChange('data', t)}
                />
            </View>

            {/* Observações */}
            <View style={styles.inputGroup}>
                <InputLabel label="Observações (Opcional):" />
                <TextInput 
                  style={styles.input} 
                  value={form.observacoes}
                  onChangeText={(t) => handleChange('observacoes', t)}
                />
            </View>

            {/* BOTÕES - Agora empilhados iguais aos de Hábitos */}
            <View style={styles.footerButtons}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Atividades')}
              >
                <Text style={styles.buttonText}>Suas Atividades →</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Registrar Atividade</Text>
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
    backgroundColor: 'rgba(249, 115, 22, 0.3)',
    paddingTop: 40, 
    paddingLeft: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    paddingHorizontal: 25, // Aumentei um pouco o padding lateral
    paddingTop: 20,
    paddingBottom: 20, // Padding inferior para segurança
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
    justifyContent: 'space-evenly', // Isso distribui os elementos igualmente na altura disponível
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 42, // Altura consistente com Habitos
    fontSize: 14,
    color: '#333',
    justifyContent: 'center',
  },
  
  // ESTILO DOS BOTÕES IGUAL AO DE HÁBITOS
  footerButtons: {
    marginTop: 10,
    gap: 12, // Espaço vertical entre os botões
  },
  button: {
    backgroundColor: '#F97316', // Ambos laranjas
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    width: '100%', // Ocupa largura total
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});