import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
<<<<<<< HEAD
import RegistroAtividadeEntity from "../entities/RegistroAtividadeEntity";
=======
import RegistroAtividadeEntity from "../entities/AtividadeFisicaEntity";
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551
import RegistroAtividadeService from "../services/registroAtividadeService";

export default function RegistroAtividadeView() {
  const router = useRouter();
  const [atividades, setAtividades] = useState([]);
  const [nova, setNova] = useState(new RegistroAtividadeEntity());

  async function carregar(){
    const lista = await RegistroAtividadeService.listar();
    setAtividades(lista);
  }

  async function adicionar(){
    if(!nova.tipo){
      Toast.show({ type:"error", text1:"Informe o tipo da atividade!" });
      return;
    }
    await RegistroAtividadeService.criar(nova);
    Toast.show({ type:"success", text1:"Atividade registrada!" });
    setNova(new RegistroAtividadeEntity());
    carregar();
  }

  async function remover(id){
    await RegistroAtividadeService.remover(id);
    Toast.show({ type:"success", text1:"Atividade removida!" });
    carregar();
  }

  useEffect(()=>{ carregar(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Atividades</Text>

      <Text style={styles.subTitle}>Registrar nova atividade</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo (ex: Caminhada, Yoga, Leitura...)"
        value={nova.tipo}
        onChangeText={(v)=>setNova({...nova, tipo:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={nova.descricao}
        onChangeText={(v)=>setNova({...nova, descricao:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (ex: 30 min)"
        value={nova.duracao}
        onChangeText={(v)=>setNova({...nova, duracao:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (AAAA-MM-DD)"
        value={nova.data}
        onChangeText={(v)=>setNova({...nova, data:v})}
      />

      <Pressable style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTxt}>+ Adicionar Atividade</Text>
      </Pressable>

      <Text style={styles.subTitle}>Atividades Registradas</Text>
      <FlatList
        data={atividades}
        keyExtractor={(item)=>item.key}
        renderItem={({item})=>(
          <View style={styles.item}>
            <View>
              <Text style={styles.nome}>{item.tipo}</Text>
              <Text style={styles.detalhe}>{item.duracao} — {item.data}</Text>
              <Text style={styles.desc}>{item.descricao}</Text>
            </View>
            <Pressable onPress={()=>remover(item.id)}>
              <Text style={styles.remover}>🗑️</Text>
            </Pressable>
          </View>
        )}
      />

      <Pressable style={styles.voltar} onPress={()=>router.push("/view/homeView")}>
        <Text style={styles.voltarTxt}>⬅️ Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:"#fff" },
  title:{ fontSize:22, fontWeight:"bold", marginBottom:10, textAlign:"center" },
  subTitle:{ fontSize:18, fontWeight:"bold", marginTop:15, marginBottom:5, color:"#333" },
  input:{ borderWidth:1, borderColor:"#ccc", padding:10, borderRadius:8, marginBottom:10 },
  botao:{ backgroundColor:"#007AFF", padding:15, borderRadius:10, alignItems:"center", marginVertical:10 },
  botaoTxt:{ color:"#fff", fontWeight:"bold" },
  item:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, borderColor:"#ddd", paddingVertical:8 },
  nome:{ fontSize:16, fontWeight:"bold" },
  detalhe:{ color:"#666", fontSize:14 },
  desc:{ color:"#333", fontSize:14 },
  remover:{ fontSize:18 },
  voltar:{ backgroundColor:"#34C759", padding:12, borderRadius:10, alignItems:"center", marginTop:15 },
  voltarTxt:{ color:"#fff", fontWeight:"bold" },
});
