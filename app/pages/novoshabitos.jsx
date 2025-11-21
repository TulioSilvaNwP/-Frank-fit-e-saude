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
import habitosService from '../services/habitosService';
import HabitosEntity from '../entities/habitosEntity';

const { height } = Dimensions.get('window');

export default function NovosHabitos() {
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

  const handleSalvar = async () => {
    if (!form.nome || !form.frequencia) {
        Alert.alert('Atenção', 'Por favor, preencha Nome e Frequência.');
        return;
    }

    try {
        // Cria entidade. ID null para gerar automático no service ou db
        const novoHabito = new HabitosEntity(
            null, 
            form.nome,
            form.descricao,
            form.frequencia,
            form.horario
        );

        await habitosService.create(novoHabito);
        
        Alert.alert('Sucesso', 'Hábito criado!');
        setForm({ nome: '', descricao: '', frequencia: '', horario: '' });
        navigation.navigate('Habitos');
    } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível salvar o hábito.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        
        <ImageBackground 
          source={{ uri: 'https://img.freepik.com/free-vector/organic-flat-people-meditating-illustration_23-2148906556.jpg' }} 
          style={styles.headerImage}
          resizeMode="cover"
        >
           <View style={styles.overlayColor}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
           </View>
        </ImageBackground>

        <View style={styles.contentContainer}>
          
          <View style={styles.headerTexts}>
            <Text style={styles.title}>Hábitos</Text>
            <Text style={styles.subtitle}>Crie novos Hábitos</Text>
          </View>

          <View style={styles.form}>
            
            <View style={styles.inputGroup}>
                <InputLabel label="Nome:" />
                <TextInput 
                  style={styles.input} 
                  value={form.nome}
                  onChangeText={(t) => handleChange('nome', t)}
                  placeholder="Ex: Ler Livro"
                />
            </View>

            <View style={styles.inputGroup}>
                <InputLabel label="Descrição (Opcional):" />
                <TextInput 
                  style={styles.input} 
                  value={form.descricao}
                  onChangeText={(t) => handleChange('descricao', t)}
                  placeholder="Ex: 10 páginas por dia"
                />
            </View>

            <View style={styles.inputGroup}>
                <InputLabel label="Frequência:" />
                <TextInput 
                  style={styles.input} 
                  value={form.frequencia}
                  onChangeText={(t) => handleChange('frequencia', t)}
                  placeholder="Ex: Diariamente"
                />
            </View>

            <View style={styles.inputGroup}>
                <InputLabel label="Horário:" />
                <TextInput 
                  style={styles.input} 
                  value={form.horario}
                  onChangeText={(t) => handleChange('horario', t)}
                  placeholder="Ex: 20:00"
                />
            </View>

            <View style={styles.footerButtons}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Habitos')}
              >
                <Text style={styles.buttonText}>Seus Hábitos →</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.button}
                onPress={handleSalvar}
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
    height: height * 0.25, 
  },
  overlayColor: {
    flex: 1,
    backgroundColor: 'rgba(255, 220, 200, 0.4)', 
    paddingTop: 45,
    paddingLeft: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0,0,0,0.5)', 
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
    marginTop: -30, 
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
    justifyContent: 'space-evenly', 
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
    backgroundColor: '#F3F4F6', 
    borderRadius: 25, 
    paddingHorizontal: 20,
    height: 42, 
    fontSize: 14,
    color: '#333',
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
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});