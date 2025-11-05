import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import HabitoService from "../services/habitoService";


export default function HabitoFormView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [dto, setDto] = useState({ nome:'', descricao:'', frequencia:'Diário', meta:1, unidade:'vezes' });

  useEffect(()=>{
    async function carregar(){
      if(id){
        const hab = await HabitoService.buscarPorId(id);
        if(hab) setDto(hab);
      }
    }
    carregar();
  }, [id]);

  async function salvar(){
    try{
      await HabitoService.criar(dto);
      Toast.show({ type:'success', text1:'Hábito salvo com sucesso!' });
      router.back();
    }catch(e){
      Toast.show({ type:'error', text1:e.message });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id ? "Editar Hábito" : "Novo Hábito"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do hábito"
        value={dto.nome}
        onChangeText={v=>setDto({...dto, nome:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={dto.descricao}
        onChangeText={v=>setDto({...dto, descricao:v})}
      />
      <TextInput
        style={styles.input}
        placeholder="Meta (ex: 8)"
        keyboardType="numeric"
        value={String(dto.meta)}
        onChangeText={v=>setDto({...dto, meta:Number(v)})}
      />
      <Pressable style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTxt}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:22, fontWeight:'bold', marginBottom:10 },
  input:{ borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:8, marginBottom:10 },
  botao:{ backgroundColor:'#007AFF', padding:15, borderRadius:10, marginTop:10, alignItems:'center' },
  botaoTxt:{ color:'#fff', fontWeight:'bold' }
});
