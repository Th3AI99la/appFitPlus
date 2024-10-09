// TELA INICIAL

import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { Link } from "expo-router";
//fontes
import React, { useState, useEffect } from "react";
import * as Font from "expo-font"; // Importa o módulo para carregar fontes
import { Fonts } from "../styles/fonts";

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Carregar fontes personalizadas
  useEffect(() => {
    async function loadFonts() {
      // passar endereço das fontes
      await Font.loadAsync({
        "Batangas-Bold": require("../assets/fonts/Batangas-Bold.otf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf")
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // Retorna null até que as fontes estejam carregadas
  if (!fontsLoaded) {
    return null; // Pode ser substituído por um spinner de loading
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/images/logo5.png")} />

      <Text style={styles.title}>
        FitPlus<Text style={{ color: colors.white }}>.AI</Text>
      </Text>

      <Text style={styles.text}>
        Seu aplicativo de dieta inteligente para uma vida mais saudável e equilibrada.
      </Text>

      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Gerar Dieta</Text>
        </Pressable>
      </Link>
    </View>
  );
}

// Criar grupos de estilo personalizados
const styles = StyleSheet.create({
  //#container
  container: {
    // fundo verde
    backgroundColor: colors.background,
    // flexível, cobre a tela inteira
    flex: 1,
    // centralizar verticalmente
    justifyContent: "center",
    // alinhar horizontalmente
    alignItems: "center",
    // espaçamento interno (não grudar na borda do celular)
    paddingLeft: 15,
    paddingRight: 15
  },
  //#image
  image: {
    width: 380, // Largura desejada
    height: 260 // Altura desejada
    //backgroundColor: "blue", //visualizar corte
  },

  //#title
  title: {
    // texto da logo
    fontSize: 50, // tamanho da fonte
    fontFamily: Fonts.BatangasBold, // Fonte personalizada -fonts.ts-
    color: colors.yellow
  },
  //#text
  text: {
    // texto descritivo
    fontSize: 15,
    fontFamily: Fonts.PoppinsRegular,
    color: colors.white,
    width: 261, // largura do texto
    textAlign: "center", // centralizar texto
    marginTop: 8,
    marginBottom: 8
  },
  //#button
  button: {
    // botão de ação
    backgroundColor: colors.blue,
    width: "100%", // largura total
    height: 40,
    borderRadius: 4, // bordas arredondadas
    justifyContent: "center", // centralizar verticalmente
    alignItems: "center", // centralizar horizontalmente
    marginTop: 35 // afastar de outros elementos
  },
  //#buttonText
  buttonText: {
    // texto dentro do botão
    color: colors.white,
    fontSize: 17,
    fontFamily: Fonts.PoppinsBold
  }
});
