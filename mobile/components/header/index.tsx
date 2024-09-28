import { SafeAreaView, Platform, StatusBar } from "react-native"; // Header
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // icons
import { colors } from "@/constants/colors";
// Fontes
import * as Font from "expo-font"; // Importa o módulo para carregar fontes
import React, { useState, useEffect } from "react";
import { Fonts } from "../../styles/fonts";

export function Header() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Carregar fontes personalizadas
  useEffect(() => {
    async function loadFonts() {
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // Retorna null até que as fontes estejam carregadas
  if (!fontsLoaded) {
    return null; // Pode ser substituído por um spinner de loading
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable>
            <Feather name="arrow-left" size={24} color={"#000"}></Feather>
          </Pressable>
          <Text style={styles.text}>
            Passo 1 <Feather name="loader" size={16} color={"#000"} />
          </Text>
        </View>

        <Text style={styles.title}>Vamos Começar</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //#container
  container: {
    backgroundColor: colors.green, // TROCAR DE COR
    borderBottomRightRadius: 16, // borda direita
    borderBottomLeftRadius: 16, // borda esquerda
    marginBottom: 16,
    // garantir a recusividade de android e IOS, da Header
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 35 : 35
  },
  //#content
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35,
    borderBottomRightRadius: 16, // borda direita
    borderBottomLeftRadius: 16 // borda esquerda
  },
  //#row
  row: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center"
  },
  //#text
  text: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsRegular
  },

  //#title
  title: {
    fontSize: 30,
    fontFamily: Fonts.PoppinsBold,
    color: colors.black
    
  }
});
