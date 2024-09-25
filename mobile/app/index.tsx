import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo5.png")} />

      <Text style={styles.title}>
        FitPlus<Text style={{ color: colors.white }}>.AI</Text>
      </Text>

      <Text style={styles.text}>
        Seu aplicativo de dieta inteligente para uma vida mais saudável e equilibrada.
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Gerar Dieta</Text>
      </Pressable>
    </View>
  );
}

// Criar grupos de estilo personalizados
const styles = StyleSheet.create({
  //#container
  container: {
    //verde
    backgroundColor: colors.background,
    // flex, tela inteira
    flex: 1,
    //centralizar
    justifyContent: "center",
    // alinhar horizontamente
    alignItems: "center",
    //espaçamento interno (NÃO GRUDAR NA BORDA DO CELULAR)
    paddingLeft: 15,
    paddingRight: 15
  },
  //#title
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.yellow
  },
  //#text
  text: {
    fontSize: 15,
    color: colors.white,
    width: 261, // altere conforme necessario (texto)
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8
  },
  //#button
  button: {
    backgroundColor: colors.blue,
    width: "100%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35 // desgrudar
  },

  //#buttonText (Texto do botão)
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold"
  }
});
