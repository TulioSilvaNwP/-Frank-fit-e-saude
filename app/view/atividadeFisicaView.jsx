import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AtividadeFisicaEntity from "../entities/AtividadeFisicaEntity";
<<<<<<< HEAD
import AtividadeFisicaService from "../services/atividadeFisicaService";
=======
import AtividadeFisicaService from "../services/atividadeFisicaServices";
>>>>>>> 9d1785fd7281486e8128910bf23887d951d2c551

export default function AtividadeFisicaView() {
  const router = useRouter();
  const [treinos, setTreinos] = useState([]);
  const [novo, setNovo] = useState(new AtividadeFisicaEntity());

  async function carregar(){
    const lista = await AtividadeFisicaService.listar();
    setTreinos(lista);
  }

  async function adicionar(){
    if(!novo.tipo){
      Toast.show({ type:"error", text1:"Informe o tipo de atividade!" });
      return;
    }
    await AtividadeFisicaService.criar(novo);
    Toast.show({ type:"success", text1:"Atividade registrada!" });
    setNovo(new AtividadeFisicaEntity());
    carregar();
  }

  async function remover(id){
    await AtividadeFisicaService.remover(id);
    Toast.show({ type:"success", text1:"Treino removido!" });
    carregar();
  }

  useEffect(()=>{ carregar(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atividade Física / Treino</Text>

      <Text style={styles.subTitle}>Registrar nova atividade física</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo (ex: Corrida, Musculação, Yoga...)"
        value={novo.tipo}
        onChangeText={(v)=>setNovo({...novo, tipo:v})}
      />

      <Text style={styles.label}>Intensidade:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={novo.intensidade}
          onValueChange={(v)=>setNovo({...novo, intensidade:v})}>
          <Picker.Item label="Leve" value="Leve" />
          <Picker.Item label="Moderada" value="Moderada" />
          <Picker.Item label="Intensa" value="Intensa" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Duração (ex: 45 min)"
        value={novo.duracao}
        onChangeText={(v)=>setNovo({...novo, duracao:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (AAAA-MM-DD)"
        value={novo.data}
        onChangeText={(v)=>setNovo({...novo, data:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Observações (opcional)"
        value={novo.observacoes}
        onChangeText={(v)=>setNovo({...novo, observacoes:v})}
      />

      <Pressable style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTxt}>+ Registrar Atividade</Text>
      </Pressable>

      <Text style={styles.subTitle}>Atividades Registradas</Text>
      <FlatList
        data={treinos}
        keyExtractor={(item)=>item.key}
        renderItem={({item})=>(
          <View style={styles.item}>
            <View>
              <Text style={styles.nome}>{item.tipo} ({item.intensidade})</Text>
              <Text style={styles.detalhe}>{item.duracao} — {item.data}</Text>
              {item.observacoes ? <Text style={styles.obs}>💬 {item.observacoes}</Text> : null}
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
  label:{ fontWeight:"bold", marginTop:5 },
  pickerContainer:{ borderWidth:1, borderColor:"#ccc", borderRadius:8, marginBottom:10 },
  botao:{ backgroundColor:"#007AFF", padding:15, borderRadius:10, alignItems:"center", marginVertical:10 },
  botaoTxt:{ color:"#fff", fontWeight:"bold" },
  item:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, borderColor:"#ddd", paddingVertical:8 },
  nome:{ fontSize:16, fontWeight:"bold" },
  detalhe:{ color:"#666", fontSize:14 },
  obs:{ color:"#333", fontStyle:"italic", fontSize:14 },
  remover:{ fontSize:18 },
  voltar:{ backgroundColor:"#34C759", padding:12, borderRadius:10, alignItems:"center", marginTop:15 },
  voltarTxt:{ color:"#fff", fontWeight:"bold" },
});
