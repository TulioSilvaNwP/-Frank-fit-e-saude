import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import UsuarioService from "./services/usuarioService";

export default function Index() {
  const router = useRouter();
  const [modoCadastro, setModoCadastro] = useState(false);

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    idade: "",
    altura: "",
    peso: "",
    nivelAtividade: "",
    notificacoes: true,
  });

  async function cadastrar(){
    try {
      await UsuarioService.criar(usuario);
      Toast.show({ type: "success", text1: "Usuário cadastrado com sucesso!" });
      setModoCadastro(false); // volta pra tela de login
    } catch (e) {
      Toast.show({ type: "error", text1: e.message });
    }
  }

  async function logar(){
    const user = await UsuarioService.login(usuario.email, usuario.senha);
    if (user){
      Toast.show({ type: "success", text1: `Bem-vindo, ${user.nome}!` });
      router.push("/view/homeView");
    } else {
      Toast.show({ type: "error", text1: "Usuário ou senha incorretos" });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SAÚDE FIT</Text>

      <Text style={styles.subtitle}>Saúde e Hábitos</Text>


      {/* ---------------- LOGIN ---------------- */}
      {!modoCadastro && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={usuario.email}
            onChangeText={(v)=>setUsuario({...usuario, email:v})}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={usuario.senha}
            onChangeText={(v)=>setUsuario({...usuario, senha:v})}
          />
          <Pressable style={styles.button} onPress={logar}>
            <Text style={styles.text}>Entrar</Text>
          </Pressable>

          <Pressable onPress={()=>setModoCadastro(true)}>
            <Text style={styles.link}>Novo usuário? Cadastre-se</Text>
          </Pressable>
        </>
      )}

      {/* ---------------- CADASTRO ---------------- */}
      {modoCadastro && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={usuario.nome}
            onChangeText={(v)=>setUsuario({...usuario, nome:v})}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={usuario.email}
            onChangeText={(v)=>setUsuario({...usuario, email:v})}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={usuario.senha}
            onChangeText={(v)=>setUsuario({...usuario, senha:v})}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            keyboardType="numeric"
            value={usuario.idade}
            onChangeText={(v)=>setUsuario({...usuario, idade:v})}
          />
          <TextInput
            style={styles.input}
            placeholder="Altura (cm)"
            keyboardType="numeric"
            value={usuario.altura}
            onChangeText={(v)=>setUsuario({...usuario, altura:v})}
          />
          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            keyboardType="numeric"
            value={usuario.peso}
            onChangeText={(v)=>setUsuario({...usuario, peso:v})}
          />
          <TextInput
            style={styles.input}
            placeholder="Nível de atividade (leve, moderado, intenso)"
            value={usuario.nivelAtividade}
            onChangeText={(v)=>setUsuario({...usuario, nivelAtividade:v})}
          />
          <View style={styles.switchRow}>
            <Text>Notificações:</Text>
            <Switch
              value={usuario.notificacoes}
              onValueChange={(v)=>setUsuario({...usuario, notificacoes:v})}
            />
          </View>

          <Pressable style={styles.button} onPress={cadastrar}>
            <Text style={styles.text}>Salvar Cadastro</Text>
          </Pressable>

          <Pressable onPress={()=>setModoCadastro(false)}>
            <Text style={styles.link}>Já tenho conta</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:"#fff", justifyContent:"center" },
  title:{ fontSize:30, fontFamily:"helvetica", fontWeight:"bold", marginBottom:15, textAlign:"center" },
  subtitletitle:{ fontSize:25, fontWeight:"bold", marginBottom:15, textAlign:"center" },
  input:{ borderWidth:1, borderColor:"#ccc", padding:10, borderRadius:8, marginBottom:10 },
  switchRow:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginVertical:10 },
  button:{ backgroundColor:"#007AFF", padding:15, borderRadius:10, alignItems:"center", marginTop:15 },
  text:{ color:"#fff", fontWeight:"bold" },
  link:{ color:"#007AFF", textAlign:"center", marginTop:15, textDecorationLine:"underline" }
});

