import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ButtomMenu() {
  return (
    <View style={styles.menu}>
      <Pressable onPress={()=>router.push("/")}>
        <Text style={styles.item}>🏠 Início</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menu:{
    flexDirection:'row',
    justifyContent:'space-around',
    padding:10,
    backgroundColor:'#f2f2f2',
    borderTopWidth:1,
    borderColor:'#ccc'
  },
  item:{
    fontSize:18
  }
});
