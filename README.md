# 🩺 Saúde e Hábitos

Aplicativo desenvolvido em **React Native com Expo Router** para o gerenciamento de **hábitos, atividades físicas e bem-estar pessoal**.
O projeto faz parte de uma iniciativa acadêmica voltada à promoção da saúde e organização da rotina através do registro de hábitos, humor e treinos.

---

## 🚀 Tecnologias Utilizadas

* **React Native 0.81.5**
* **Expo SDK 54**
* **Expo Router 6**
* **React Navigation**
* **React Native Paper**
* **AsyncStorage** (persistência local)
* **React Native Toast Message** (feedback visual)
* **@react-native-picker/picker**
* **Expo Haptics**, **Expo Splash Screen**, **Expo Status Bar**

## ⚙️ Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/seuusuario/saude-habitos.git
cd saude-habitos
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Rodar o projeto

```bash
npm start
```

Em seguida, escolha a plataforma:

* **a** para Android
* **i** para iOS
* **w** para Web

---

## 🧠 Conceito do App

O **Saúde e Hábitos** foi criado para facilitar o acompanhamento diário de hábitos e rotinas saudáveis.
Ele permite que o usuário:

* Cadastre suas **atividades físicas** e controle duração e intensidade;
* Registre **hábitos** e acompanhe sua constância;
* Monitore **emoções e humor**;
* Acesse **dicas e conteúdos** sobre saúde;
* Gerencie informações pessoais em **Perfil**.

Os dados são armazenados localmente com `AsyncStorage`, garantindo persistência mesmo offline.

## 🧰 Scripts Disponíveis

| Comando                 | Descrição                           |
| ----------------------- | ----------------------------------- |
| `npm start`             | Inicia o servidor Expo              |
| `npm run android`       | Executa no emulador Android         |
| `npm run web`           | Executa no navegador                |
| `npm run lint`          | Roda o lint para verificar o código |
| `npm run reset-project` | Limpa caches e reseta o projeto     |
