// PASSO 2

import { View, Text, StyleSheet, Pressable, ScrollView, KeyboardTypeOptions } from "react-native";
import { Header } from "../../components/header/index";
import { colors } from "../../constants/colors";

// Fontes
import React, { useState, useEffect } from "react";
import * as Font from "expo-font"; // Importa o módulo para carregar fontes
import { Fonts } from "../../styles/fonts";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Select
import { Select } from "../../components/input/select";

// Validações
const schema = z.object({
   genero: z.string().min(1, {
      message: "Informe o seu Sexo."
   }),
   level: z.string().min(1, {
      message: "Selecione o seu nível de experiência."
   }),
   objetivo: z.string().min(1, {
      message: "Informe o seu objetivo."
   })
});

// Inferencia de Tipo
type FormData = z.infer<typeof schema>;

export default function Create() {
   // Useform
   const {
      control,
      handleSubmit,
      formState: { errors, isValid }
   } = useForm<FormData>({
      resolver: zodResolver(schema)
   });

   // Opçoes de genero
   const generoOptions = [
      { label: "Masculino", value: "masculino" },
      { label: "Feminino", value: "feminino" }
   ];

   // Carregar fontes personalizadas
   const [fontsLoaded, setFontsLoaded] = useState(false);

   useEffect(() => {
      async function loadFonts() {
         // passar endereço das fontes
         await Font.loadAsync({
            "Batangas-Bold": require("../../assets/fonts/Batangas-Bold.otf"),
            "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
            "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf")
         });
         setFontsLoaded(true);
      }
      loadFonts();
   }, []);

   // Retorna null até que as fontes estejam carregadas
   if (!fontsLoaded) {
      return null; // Pode ser substituído por um spinner de loading
   }

   // Dev
   return (
      <View style={styles.container}>
         <Header step="Passo 2 " title="Finalizando Dieta"></Header>

         <ScrollView style={styles.content}>
            <Text style={styles.label}>Sexo: </Text>
            <Select control={control} name="genero" placeholder="Selecione o seu Sexo" error={errors.genero?.message} options={generoOptions}></Select>
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   // cor de fundo
   container: {
      flex: 1,
      backgroundColor: colors.background
   },
   // Forms
   label: {
      fontSize: 20,
      color: colors.white,
      fontFamily: Fonts.PoppinsRegular,
      marginBottom: 8
   },
   // Tela de rolagem
   content: {
      paddingLeft: 15,
      paddingRight: 15
   }
});
