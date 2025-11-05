import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import ConteudoEntity from "../entities/ConteudoEntity";
import ConteudoService from "../services/conteudoService";

export default function ConteudoView() {
  const router = useRouter();
  const [conteudos, setConteudos] = useState([]);
  const [novo, setNovo] = useState(new ConteudoEntity());

  const dicasFixas = [
    { tipo: "Dica", titulo: "💧 Beba bastante água", descricao: "Manter-se hidratado melhora o humor, o foco e a energia." },
    { tipo: "Dica", titulo: "🕓 Durma bem", descricao: "Dormir entre 7 e 9 horas ajuda na recuperação e produtividade." },
    { tipo: "Receita", titulo: "🥗 Salada de Grão-de-Bico", descricao: "Rica em proteínas e fibras — ideal para o almoço." },
    { tipo: "Artigo", titulo: "🧘 Benefícios da meditação", descricao: "Praticar 10 minutos de meditação diária reduz o estresse." },
  ];

  async function carregar(){
    const lista = await ConteudoService.listar();
    setConteudos(lista);
  }

  async function adicionar(){
    if(!novo.titulo){
      Toast.show({ type:"error", text1:"Informe o título!" });
      return;
    }
    await ConteudoService.criar(novo);
    Toast.show({ type:"success", text1:"Conteúdo adicionado!" });
    setNovo(new ConteudoEntity());
    carregar();
  }

  async function remover(id){
    await ConteudoService.remover(id);
    Toast.show({ type:"success", text1:"Conteúdo removido!" });
    carregar();
  }

  useEffect(()=>{ carregar(); }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Conteúdo / Dicas</Text>

      <Text style={styles.subTitle}>Dicas e Artigos Recomendados</Text>
      {dicasFixas.map((item, i)=>(
        <View key={i} style={styles.card}>
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardTipo}>{item.tipo}</Text>
          <Text style={styles.cardDesc}>{item.descricao}</Text>
        </View>
      ))}

      <Text style={styles.subTitle}>Adicionar Novo Conteúdo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={novo.tipo}
          onValueChange={(v)=>setNovo({...novo, tipo:v})}>
          <Picker.Item label="Dica" value="Dica" />
          <Picker.Item label="Receita" value="Receita" />
          <Picker.Item label="Artigo" value="Artigo" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={novo.titulo}
        onChangeText={(v)=>setNovo({...novo, titulo:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={novo.descricao}
        onChangeText={(v)=>setNovo({...novo, descricao:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Fonte (opcional)"
        value={novo.fonte}
        onChangeText={(v)=>setNovo({...novo, fonte:v})}
      />

      <Pressable style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTxt}>+ Adicionar</Text>
      </Pressable>

      <Text style={styles.subTitle}>Seus Conteúdos</Text>
      <FlatList
        data={conteudos}
        keyExtractor={(item)=>item.key}
        renderItem={({item})=>(
          <View style={styles.item}>
            <View style={{flex:1}}>
              <Text style={styles.nome}>{item.titulo}</Text>
              <Text style={styles.detalhe}>{item.tipo}</Text>
              <Text style={styles.desc}>{item.descricao}</Text>
              {item.fonte ? <Text style={styles.fonte}>🔗 {item.fonte}</Text> : null}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:"#fff" },
  title:{ fontSize:22, fontWeight:"bold", marginBottom:10, textAlign:"center" },
  subTitle:{ fontSize:18, fontWeight:"bold", marginTop:15, marginBottom:5, color:"#333" },
  pickerContainer:{ borderWidth:1, borderColor:"#ccc", borderRadius:8, marginBottom:10 },
  input:{ borderWidth:1, borderColor:"#ccc", padding:10, borderRadius:8, marginBottom:10 },
  botao:{ backgroundColor:"#007AFF", padding:15, borderRadius:10, alignItems:"center", marginVertical:10 },
  botaoTxt:{ color:"#fff", fontWeight:"bold" },
  card:{ backgroundColor:"#F0F8FF", borderRadius:10, padding:10, marginVertical:5 },
  cardTitulo:{ fontWeight:"bold", fontSize:16 },
  cardTipo:{ color:"#555", fontSize:14 },
  cardDesc:{ fontSize:14, color:"#333", marginTop:5 },
  item:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, borderColor:"#ddd", paddingVertical:8 },
  nome:{ fontSize:16, fontWeight:"bold" },
  detalhe:{ color:"#666", fontSize:14 },
  desc:{ color:"#333", fontSize:14 },
  fonte:{ color:"#007AFF", fontSize:13 },
  remover:{ fontSize:18 },
  voltar:{ backgroundColor:"#34C759", padding:12, borderRadius:10, alignItems:"center", marginTop:15 },
  voltarTxt:{ color:"#fff", fontWeight:"bold" },
});
