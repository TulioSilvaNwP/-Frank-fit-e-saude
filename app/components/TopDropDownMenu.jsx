import { router } from "expo-router";
import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";

export default function TopDropDownMenu() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      <Appbar.Content title="Saúde e Hábitos" />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            router.push("/");
          }}
          title="🏠 Início"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            router.push("/view/homeView");
          }}
          title="✅ Atividades"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            router.push("/view/homeView");
          }}
          title="💪  Registro de Atividades Fisicas"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            router.push("/view/homeView");
          }}
          title="Humor"
          />
      </Menu>
    </Appbar.Header>
  );
}
