import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import UsuarioService from "../services/usuarioService";

export default function PerfilView() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      const lista = await UsuarioService.listar();
      if (lista.length > 0) setUsuario(lista[0]);
    }
    carregarUsuario();
  }, []);

  async function salvar() {
    try {
      if (!usuario) return;
      await UsuarioService.remover(usuario.id);
      await UsuarioService.criar(usuario);
      Toast.show({ type: "success", text1: "Perfil atualizado com sucesso!" });
    } catch (e) {
      Toast.show({ type: "error", text1: e.message });
    }
  }

  async function excluir() {
    if (!usuario) return;
    await UsuarioService.remover(usuario.id);
    Toast.show({ type: "success", text1: "Perfil excluído." });
    router.push("/");
  }

  async function sair() {
    Toast.show({ type: "info", text1: "Você saiu da conta." });
    router.push("/");
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com imagem */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }}
          style={styles.avatar}
        />
        <Text style={styles.nome}>{usuario.nome || "Usuário"}</Text>
        <Text style={styles.email}>{usuario.email}</Text>
      </View>

      {/* Formulário de edição */}
      <View style={styles.form}>
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
          placeholder="Nível de atividade"
          value={usuario.nivelAtividade}
          onChangeText={(v)=>setUsuario({...usuario, nivelAtividade:v})}
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Notificações:</Text>
          <Switch
            value={usuario.notificacoes}
            onValueChange={(v)=>setUsuario({...usuario, notificacoes:v})}
          />
        </View>
      </View>

      {/* Botões de ação */}
      <Pressable style={styles.btnSalvar} onPress={salvar}>
        <Text style={styles.btnTexto}>💾 Salvar Alterações</Text>
      </Pressable>

      <Pressable style={styles.btnExcluir} onPress={excluir}>
        <Text style={styles.btnTexto}>🗑️ Excluir Conta</Text>
      </Pressable>

      <Pressable style={styles.btnSair} onPress={sair}>
        <Text style={styles.btnTexto}>🚪 Sair</Text>
      </Pressable>

     <Pressable onPress={()=>router.push("/view/homeView")}>
        <Text style={styles.link}>Voltar</Text>
     </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#F4F7FB", padding:20 },
  
  header:{
    alignItems:"center",
    backgroundColor:"#E9F0FF",
    padding:25,
    borderRadius:20,
    marginBottom:20,
    shadowColor:"#000",
    shadowOpacity:0.2,
    shadowRadius:4,
  },
  avatar:{ width:100, height:100, borderRadius:50, marginBottom:10 },
  nome:{ fontSize:20, fontWeight:"bold", color:"#333" },
  email:{ fontSize:14, color:"#555" },
  
  form:{ backgroundColor:"#fff", padding:15, borderRadius:15, shadowColor:"#000", shadowOpacity:0.1, shadowRadius:3, marginBottom:15 },
  input:{ borderWidth:1, borderColor:"#ccc", padding:10, borderRadius:8, marginBottom:10 },
  label:{ fontSize:16, fontWeight:"500" },
  switchRow:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginVertical:10 },
  
  btnSalvar:{ backgroundColor:"#007AFF", padding:15, borderRadius:10, alignItems:"center", marginVertical:5 },
  btnExcluir:{ backgroundColor:"#FF3B30", padding:15, borderRadius:10, alignItems:"center", marginVertical:5 },
  btnSair:{ backgroundColor:"#5856D6", padding:15, borderRadius:10, alignItems:"center", marginVertical:5 },
  btnTexto:{ color:"#fff", fontWeight:"bold", fontSize:16 },
  
  link:{ color:"#007AFF", textAlign:"center", marginTop:15, textDecorationLine:"underline", fontSize:16 },
  title:{ fontSize:20, fontWeight:"bold", textAlign:"center", marginTop:20 },
});
