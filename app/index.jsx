import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ImageBackground, 
  ScrollView,
  Dimensions
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// --- IMPORTAÇÃO DAS PÁGINAS ---
import Home from './pages/home'; 
import Perfil from './pages/perfil'; 
import Atividades from './pages/atividades'; 
import NovasAtividades from './pages/novasatividades';
import Habitos from './pages/habitos';      
import NovosHabitos from './pages/novoshabitos';
import Dicas from './pages/dicas'; 
import NovasDicas from './pages/novasdicas';
import Humor from './pages/humor';
import NovoHumor from './pages/novohumor';

// --- IMPORTAÇÃO DO DRAWER (SIDEBAR) ---
// Certifique-se que o caminho está correto baseada na sua estrutura de pastas
import CustomDrawerContent from './components/CustomDrawerContent'; 

const { height } = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator(); 

// --- MOCK COMPONENTS ---
const PlaceholderScreen = ({ name }) => (
  <View style={styles.centerScreen}>
    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#333'}}>{name}</Text>
  </View>
);

// --- CUSTOM HEADER ---
const CustomHeader = ({ title, showBackButton, navigation }) => (
  <View style={styles.headerContainer}>
    {showBackButton && (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.headerText}>←</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

// --- COMPONENTE DE INPUT ---
const InputText = ({ label, isPassword, value, onChange, placeholder, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType || 'default'}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Text>{showPassword ? "👁️" : "🔒"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// --- TELA DE LOGIN ---
function LoginScreen({ navigation }) {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [form, setForm] = useState({
    email: "", senha: "", nome: "", idade: "", peso: "", altura: ""
  });

  const handleChange = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const handleAction = () => {
    navigation.replace('AppDrawer'); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" }} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlayIcon}>
           <Image 
             source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' }} 
             style={{ width: 80, height: 80, tintColor: '#F97316' }} 
             resizeMode="contain"
           />
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollForm}>
          {modoCadastro && (
            <>
              <InputText label="Nome" placeholder="Seu nome" value={form.nome} onChange={(t) => handleChange("nome", t)} />
              <View style={styles.row}>
                <View style={{flex: 1, marginRight: 5}}>
                    <InputText label="Idade" placeholder="00" keyboardType="numeric" value={form.idade} onChange={(t) => handleChange("idade", t)} />
                </View>
                <View style={{flex: 1, marginRight: 5}}>
                    <InputText label="Peso" placeholder="kg" keyboardType="numeric" value={form.peso} onChange={(t) => handleChange("peso", t)} />
                </View>
                <View style={{flex: 1}}>
                    <InputText label="Altura" placeholder="cm" keyboardType="numeric" value={form.altura} onChange={(t) => handleChange("altura", t)} />
                </View>
              </View>
            </>
          )}
          <InputText label="Email" placeholder="exemplo@email.com" keyboardType="email-address" value={form.email} onChange={(t) => handleChange("email", t)} />
          <InputText label="Senha" isPassword={true} placeholder="********" value={form.senha} onChange={(t) => handleChange("senha", t)} />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleAction}>
            <Text style={styles.buttonText}>{modoCadastro ? "Salvar Cadastro" : "Entrar"}</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>

          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>{modoCadastro ? "Já tem uma conta? " : "Novo usuário? "}</Text>
            <TouchableOpacity onPress={() => setModoCadastro(!modoCadastro)}>
              <Text style={styles.linkText}>{modoCadastro ? "Entrar" : "Cadastre-se"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// --- NAVEGAÇÃO INTERNA (STACK) ---
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route }) => {
          const showBackButton = route.name !== "Home"; 
          return <CustomHeader title={route.name} showBackButton={showBackButton} navigation={navigation} />;
        }
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Perfil" component={Perfil} />
      
      <Stack.Screen name="Atividades" component={Atividades} options={{ headerShown: false }} />
      <Stack.Screen name="NovasAtividades" component={NovasAtividades} options={{ headerShown: false }} />
      
      <Stack.Screen name="Habitos" component={Habitos} options={{ headerShown: false }} />
      <Stack.Screen name="NovosHabitos" component={NovosHabitos} options={{ headerShown: false }} />

      <Stack.Screen name="Dicas" component={Dicas} options={{ headerShown: false }} />
      <Stack.Screen name="NovasDicas" component={NovasDicas} options={{ headerShown: false }} />

      <Stack.Screen name="Humor" component={Humor} options={{ headerShown: false }} />
      <Stack.Screen name="NovosHumores" component={NovoHumor} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// --- NAVEGAÇÃO DRAWER (MENU LATERAL) ---
function DrawerNavigation() {
  return (
    <Drawer.Navigator
        // AQUI ELE USA O SEU NOVO ARQUIVO IMPORTADO
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#F97316', // Laranja ao selecionar
          drawerInactiveTintColor: '#333',  // Cinza padrão
          drawerStyle: { width: '80%', backgroundColor: '#FFF' },
          drawerLabelStyle: { marginLeft: -20, fontWeight: '500', fontSize: 15 },
          drawerItemStyle: { borderRadius: 10, paddingLeft: 10, marginVertical: 2 },
        }}
      >
        {/* ÍCONES PERSONALIZADOS PARA O MENU */}
        <Drawer.Screen 
            name="Início" 
            component={MainStack} 
            options={{ 
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="Atividades" 
            component={Atividades} 
            options={{ 
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2928/2928755.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="Hábitos" 
            component={Habitos} 
            options={{ 
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/25/25235.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="Dicas" 
            component={Dicas} 
            options={{ 
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="Humor" 
            component={Humor} 
            options={{ 
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/569/569501.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
    </Drawer.Navigator>
  );
}

// --- APP PRINCIPAL ---
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationIndependentTree>
        <NavigationContainer independent={true}>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="AppDrawer" component={DrawerNavigation} />
          </RootStack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </GestureHandlerRootView>
  );
}

// --- ESTILOS DO INDEX ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  
  headerContainer: { 
    height: 80, 
    paddingTop: 30, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  backButton: { padding: 5, marginRight: 10 },
  headerText: { fontSize: 24, color: '#F97316' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },

  backgroundImage: { height: height * 0.4, justifyContent: 'center', alignItems: 'center' },
  overlayIcon: { backgroundColor: 'rgba(0,0,0,0.1)', padding: 20, borderRadius: 20 },
  formContainer: { 
    flex: 1, 
    marginTop: -30, 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 24, 
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollForm: { paddingBottom: 30 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#D1D5DB', 
    borderRadius: 12, 
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#F9FAFB'
  },
  inputField: { flex: 1, color: '#111' },
  eyeIcon: { padding: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonPrimary: {
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  arrowIcon: { color: '#F97316', fontSize: 20, fontWeight: 'bold' },
  footerTextContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { color: '#6B7280' },
  linkText: { color: '#F97316', fontWeight: 'bold' },
});