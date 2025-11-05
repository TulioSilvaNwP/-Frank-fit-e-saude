import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Picker, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import HabitoEntity from "../entities/HabitoEntity";
import HabitoService from "../services/habitoService";

export default function HabitosView() {
  const [habitos, setHabitos] = useState([]);
  const [novo, setNovo] = useState(new HabitoEntity());
  const router = useRouter();

  const habitosRecomendados = [
    "🥗 Alimentação equilibrada",
    "🏃‍♀️ Praticar atividade física regularmente",
    "😴 Garantir um sono de qualidade",
    "🧘‍♀️ Cuidar da saúde mental e fazer pausas",
  ];

  async function carregar(){
    const lista = await HabitoService.listar();
    setHabitos(lista);
  }

  async function adicionar(){
    if(!novo.nome){
      Toast.show({ type:"error", text1:"Informe o nome do hábito!" });
      return;
    }
    await HabitoService.criar(novo);
    Toast.show({ type:"success", text1:"Hábito criado!" });
    setNovo(new HabitoEntity());
    carregar();
  }

  async function remover(id){
    await HabitoService.remover(id);
    Toast.show({ type:"success", text1:"Hábito removido!" });
    carregar();
  }

  useEffect(()=>{ carregar(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hábitos</Text>

      {/* 🔹 Hábitos recomendados */}
      <Text style={styles.subTitle}>Bons Hábitos Recomendados</Text>
      {habitosRecomendados.map((h, idx)=>(
        <Text key={idx} style={styles.recomendado}>{h}</Text>
      ))}

      {/* 🔹 Criar novo hábito */}
      <Text style={styles.subTitle}>Criar Novo Hábito</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do hábito"
        value={novo.nome}
        onChangeText={(v)=>setNovo({...novo, nome:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição (opcional)"
        value={novo.descricao}
        onChangeText={(v)=>setNovo({...novo, descricao:v})}
      />
      
      {/* Frequência */}
      <Text style={styles.label}>Frequência:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={novo.frequencia}
          onValueChange={(v)=>setNovo({...novo, frequencia:v})}>
          <Picker.Item label="Diário" value="diário" />
          <Picker.Item label="Semanal" value="semanal" />
          <Picker.Item label="Mensal" value="mensal" />
        </Picker>
      </View>

      {/* Horário */}
      <Text style={styles.label}>Horário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 08:00"
        value={novo.horario}
        onChangeText={(v)=>setNovo({...novo, horario:v})}
      />

      <Pressable style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTxt}>+ Adicionar Hábito</Text>
      </Pressable>

      {/* 🔹 Lista de hábitos criados */}
      <Text style={styles.subTitle}>Seus Hábitos</Text>
      <FlatList
        data={habitos}
        keyExtractor={(item)=>item.key}
        renderItem={({item})=>(
          <View style={styles.item}>
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.detalhe}>{item.frequencia} - {item.horario}</Text>
            </View>
            <Pressable onPress={()=>remover(item.id)}>
              <Text style={styles.remover}>🗑️</Text>
            </Pressable>
          </View>
        )}
      />

      <Pressable onPress={()=>router.push("/view/homeView")}>
        <Text style={styles.link}>Voltar</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:"#fff" },
  title:{ fontSize:22, fontWeight:"bold", marginBottom:10, textAlign:"center" },
  subTitle:{ fontSize:18, fontWeight:"bold", marginTop:15, marginBottom:5, color:"#333" },
  recomendado:{ backgroundColor:"#E9F0FF", padding:8, borderRadius:8, marginVertical:3 },
  input:{ borderWidth:1, borderColor:"#ccc", padding:10, borderRadius:8, marginBottom:10 },
  label:{ fontWeight:"bold", marginTop:5 },
  pickerContainer:{ borderWidth:1, borderColor:"#ccc", borderRadius:8, marginBottom:10 },
  botao:{ backgroundColor:"#007AFF", padding:15, borderRadius:10, alignItems:"center", marginVertical:10 },
  botaoTxt:{ color:"#fff", fontWeight:"bold" },
  item:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, borderColor:"#ddd", paddingVertical:8 },
  nome:{ fontSize:16 },
  detalhe:{ color:"#666", fontSize:14 },
  remover:{ fontSize:18 },
  voltar:{ backgroundColor:"#34C759", padding:12, borderRadius:10, alignItems:"center", marginTop:15 },
  voltarTxt:{ color:"#fff", fontWeight:"bold" },
});
