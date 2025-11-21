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
  Dimensions,
  StatusBar
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// --- IMPORTAÇÃO DAS PÁGINAS ---
import Home from './pages/home'; 
import Perfil from './pages/perfil'; 

// Atividades
import Atividades from './pages/atividades'; 
import NovasAtividades from './pages/novasatividades';

// Hábitos
import Habitos from './pages/habitos';      
import NovosHabitos from './pages/novoshabitos';

// Dicas
import Dicas from './pages/dicas'; 
import NovasDicas from './pages/novasdicas';

// Humor
import Humor from './pages/humor';
import NovoHumor from './pages/novohumor';

// --- IMPORTAÇÃO DO DRAWER CUSTOMIZADO ---
// Certifique-se de que este arquivo existe no seu projeto
import CustomDrawerContent from './components/CustomDrawerContent'; 

const { height } = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator(); 

// --- COMPONENTE DE CABEÇALHO PERSONALIZADO ---
const CustomHeader = ({ title, showBackButton, navigation }) => (
  <View style={styles.headerContainer}>
    {showBackButton && (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.headerBackArrow}>←</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

// --- COMPONENTE DE INPUT REUTILIZÁVEL ---
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
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground 
        source={{ uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" }} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlayIcon}>
           {/* ÍCONE RESTAURADO CONFORME SOLICITADO */}
           <Image 
             source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' }} 
             style={{ width: 80, height: 80, tintColor: '#F97316' }} 
             resizeMode="contain"
           />
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollForm} showsVerticalScrollIndicator={false}>
          <Text style={styles.loginTitle}>{modoCadastro ? "Crie sua conta" : "Bem-vindo de volta!"}</Text>
          
          {modoCadastro && (
            <>
              <InputText label="Nome" placeholder="Seu nome" value={form.nome} onChange={(t) => handleChange("nome", t)} />
              <View style={styles.row}>
                <View style={{flex: 1, marginRight: 10}}>
                    <InputText label="Idade" placeholder="00" keyboardType="numeric" value={form.idade} onChange={(t) => handleChange("idade", t)} />
                </View>
                <View style={{flex: 1, marginRight: 10}}>
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

// --- STACK INTERNA (DEPOIS DO LOGIN) ---
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
      
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      
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

// --- DRAWER NAVIGATION (MENU LATERAL) ---
function DrawerNavigation() {
  return (
    <Drawer.Navigator
        drawerContent={(props) => {
            // Tenta usar o CustomDrawerContent, se não existir, usa o padrão (fallback)
            try {
                return <CustomDrawerContent {...props} />;
            } catch (e) {
                return <DrawerContentScrollView {...props}><DrawerItemList {...props} /></DrawerContentScrollView>;
            }
        }}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#F97316', 
          drawerInactiveTintColor: '#333', 
          drawerStyle: { width: '80%', backgroundColor: '#FFF' },
          drawerLabelStyle: { marginLeft: -20, fontWeight: '500', fontSize: 15 },
          drawerItemStyle: { borderRadius: 10, paddingLeft: 10, marginVertical: 2 },
        }}
      >
        <Drawer.Screen 
            name="Início" 
            component={MainStack} 
            options={{ 
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="AtividadesDrawer" 
            component={Atividades} 
            options={{ 
                title: 'Atividades',
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2928/2928755.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="HabitosDrawer" 
            component={Habitos} 
            options={{ 
                title: 'Hábitos',
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/25/25235.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="DicasDrawer" 
            component={Dicas} 
            options={{ 
                title: 'Dicas',
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
        <Drawer.Screen 
            name="HumorDrawer" 
            component={Humor} 
            options={{ 
                title: 'Humor',
                drawerIcon: ({color}) => <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/569/569501.png'}} style={{width: 20, height: 20, tintColor: color}} /> 
            }} 
        />
    </Drawer.Navigator>
  );
}

// --- APP PRINCIPAL (ROOT) ---
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

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  // Header
  headerContainer: { 
    height: 90, 
    paddingTop: 40, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    elevation: 2
  },
  backButton: { padding: 8, marginRight: 10, borderRadius: 20, backgroundColor: '#F3F4F6' },
  headerBackArrow: { fontSize: 20, color: '#F97316', fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },

  // Login Screen
  backgroundImage: { 
    height: height * 0.35, 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    paddingBottom: 40
  },
  overlayIcon: { 
    backgroundColor: 'rgba(0,0,0,0.1)', 
    padding: 20, 
    borderRadius: 30, 
  },
  formContainer: { 
    flex: 1, 
    marginTop: -25, 
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
  scrollForm: { paddingBottom: 40 },
  loginTitle: { fontSize: 26, fontWeight: 'bold', color: '#111', marginBottom: 20, textAlign: 'center' },
  
  // Inputs
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#4B5563', marginBottom: 6 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: 14, 
    paddingHorizontal: 14,
    height: 52,
    backgroundColor: '#F9FAFB'
  },
  inputField: { flex: 1, color: '#111', fontSize: 16 },
  eyeIcon: { padding: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  
  // Botões
  buttonPrimary: {
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginRight: 8 },
  arrowIcon: { color: '#F97316', fontSize: 22, fontWeight: 'bold' },
  
  // Footer
  footerTextContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#6B7280', fontSize: 15 },
  linkText: { color: '#F97316', fontWeight: 'bold', fontSize: 15 },
});