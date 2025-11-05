import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import HumorEntity from "../entities/HumorEntity";
import HumorService from "../services/humorService";

export default function HumorView() {
  const router = useRouter();
  const [registros, setRegistros] = useState([]);
  const [novo, setNovo] = useState(new HumorEntity());

  async function carregar(){
    const lista = await HumorService.listar();
    setRegistros(lista);
  }

  async function adicionar(){
    if(!novo.humor){
      Toast.show({ type:"error", text1:"Selecione um humor!" });
      return;
    }
    await HumorService.criar(novo);
    Toast.show({ type:"success", text1:"Humor registrado!" });
    setNovo(new HumorEntity());
    carregar();
  }

  async function remover(id){
    await HumorService.remover(id);
    Toast.show({ type:"success", text1:"Registro removido!" });
    carregar();
  }

  useEffect(()=>{ carregar(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Humor / Emoção</Text>

      <Text style={styles.subTitle}>Registrar humor do dia</Text>
      <Text style={styles.label}>Como você está se sentindo?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={novo.humor}
          onValueChange={(v)=>setNovo({...novo, humor:v})}>
          <Picker.Item label="😀 Feliz" value="Feliz" />
          <Picker.Item label="😐 Neutro" value="Neutro" />
          <Picker.Item label="😔 Triste" value="Triste" />
          <Picker.Item label="😤 Estressado" value="Estressado" />
          <Picker.Item label="😴 Cansado" value="Cansado" />
          <Picker.Item label="🤩 Animado" value="Animado" />
        </Picker>
      </View>

      <Text style={styles.label}>Intensidade:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={novo.intensidade}
          onValueChange={(v)=>setNovo({...novo, intensidade:v})}>
          <Picker.Item label="Leve" value="Leve" />
          <Picker.Item label="Média" value="Média" />
          <Picker.Item label="Forte" value="Forte" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Descrição / Motivo"
        value={novo.descricao}
        onChangeText={(v)=>setNovo({...novo, descricao:v})}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (AAAA-MM-DD)"
        value={novo.data}
        onChangeText={(v)=>setNovo({...novo, data:v})}
      />

      <Pressable style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTxt}>+ Registrar Humor</Text>
      </Pressable>

      <Text style={styles.subTitle}>Histórico de Humor</Text>
      <FlatList
        data={registros}
        keyExtractor={(item)=>item.key}
        renderItem={({item})=>(
          <View style={styles.item}>
            <View>
              <Text style={styles.nome}>{item.data} — {item.humor} ({item.intensidade})</Text>
              {item.descricao ? <Text style={styles.desc}>💬 {item.descricao}</Text> : null}
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
  label:{ fontWeight:"bold", marginTop:5 },
  input:{ borderWidth:1, borderColor:"#ccc", padding:10, borderRadius:8, marginBottom:10 },
  pickerContainer:{ borderWidth:1, borderColor:"#ccc", borderRadius:8, marginBottom:10 },
  botao:{ backgroundColor:"#007AFF", padding:15, borderRadius:10, alignItems:"center", marginVertical:10 },
  botaoTxt:{ color:"#fff", fontWeight:"bold" },
  item:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, borderColor:"#ddd", paddingVertical:8 },
  nome:{ fontSize:16, fontWeight:"bold" },
  desc:{ color:"#333", fontSize:14, fontStyle:"italic" },
  remover:{ fontSize:18 },
  voltar:{ backgroundColor:"#34C759", padding:12, borderRadius:10, alignItems:"center", marginTop:15 },
  voltarTxt:{ color:"#fff", fontWeight:"bold" },
});
