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
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import atividadesService from '../services/atividadesService';
import AtividadesEntity from '../entities/atividadesEntity';

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

  const handleSalvar = async () => {
    if (!form.tipo || !form.data) {
        Alert.alert('Atenção', 'Por favor, preencha pelo menos o Tipo e a Data.');
        return;
    }

    try {
      // Cria a entidade. Passamos null no ID para o json-server gerar, ou string vazia
      const novaAtividade = new AtividadesEntity(
        null, 
        form.tipo,
        form.intensidade,
        form.duracao,
        form.data,
        form.observacoes
      );

      await atividadesService.create(novaAtividade);
      
      // Limpa o formulário e navega para a lista
      setForm({ tipo: '', intensidade: '', duracao: '', data: '', observacoes: '' });
      navigation.navigate('Atividades');

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a atividade.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        
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

        <View style={styles.contentContainer}>
          <View style={styles.headerTexts}>
            <Text style={styles.title}>Nova Atividade</Text>
            <Text style={styles.subtitle}>Preencha os dados abaixo.</Text>
          </View>

          <View style={styles.form}>
            
            <View style={styles.inputGroup}>
                <InputLabel label="Tipo:" />
                <TextInput 
                  style={styles.input} 
                  value={form.tipo}
                  onChangeText={(t) => handleChange('tipo', t)}
                  placeholder="Ex: Corrida, Yoga"
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <InputLabel label="Intensidade:" />
                    <TextInput 
                      style={styles.input} 
                      value={form.intensidade}
                      onChangeText={(t) => handleChange('intensidade', t)}
                      placeholder="Leve, Alta"
                    />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <InputLabel label="Duração:" />
                    <TextInput 
                      style={styles.input} 
                      value={form.duracao}
                      onChangeText={(t) => handleChange('duracao', t)}
                      placeholder="Ex: 30 min"
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <InputLabel label="Data:" />
                <TextInput 
                  style={styles.input} 
                  value={form.data}
                  onChangeText={(t) => handleChange('data', t)}
                  placeholder="DD/MM/AAAA"
                />
            </View>

            <View style={styles.inputGroup}>
                <InputLabel label="Observações (Opcional):" />
                <TextInput 
                  style={styles.input} 
                  value={form.observacoes}
                  onChangeText={(t) => handleChange('observacoes', t)}
                />
            </View>

            <View style={styles.footerButtons}>
              {/* Botão Corrigido: Vai para a tela de Histórico */}
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Atividades')}
              >
                <Text style={styles.buttonText}>Suas Atividades →</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleSalvar}>
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
    height: height * 0.22, 
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
    justifyContent: 'space-evenly', 
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
    backgroundColor: '#F97316', 
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