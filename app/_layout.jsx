import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import ButtomMenu from "./components/ButtomMenu";
import TopDropDownMenu from "./components/TopDropDownMenu";

export default function Layout() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <TopDropDownMenu />
        <Slot />
        <ButtomMenu />
        <Toast />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
