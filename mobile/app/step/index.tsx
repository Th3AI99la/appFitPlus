// PASSO 1 - FORMULARIO

import { View, Text, Image, StyleSheet, Pressable, ScrollView, KeyboardTypeOptions } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";
import { Input } from "../../components/input";


// Dados e Store
import { useDataStore } from "../../store/data";

// Fontes
import React, { useState, useEffect } from "react";
import * as Font from "expo-font"; // Importa o módulo para carregar fontes
import { Fonts } from "../../styles/fonts";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Router - Anvançar tela

import { router } from "expo-router";

// Validações
const schema = z.object({
   name: z
      .string()
      .min(1, { message: "Nome é obrigatório. Por favor, insira seu nome completo." })
      .regex(/^[A-Z]/, { message: "O nome deve começar com letra maiúscula." }) // Validação: começa com letra maiúscula
      .regex(/^[a-zA-Z\s]+$/, { message: "Insira um nome válido (apenas letras)." }), // Validação: apenas letras
   idade: z
      .string()
      .min(1, { message: "Idade é obrigatória. Por favor, informe sua idade." })
      .regex(/^[0-9]+$/, { message: "Idade deve conter apenas números." }), // Apenas números
   altura: z
      .string()
      .min(1, { message: "Altura é obrigatória. Por favor, insira sua altura." })
      .regex(/^[0-9,.]+$/, { message: "Altura deve conter apenas números." }), // Apenas números e vírgulas ou pontos
   peso: z
      .string()
      .min(1, { message: "Peso é obrigatório. Por favor, informe seu peso." })
      .regex(/^[0-9,.]+$/, { message: "Peso deve conter apenas números." }) // Apenas números e vírgulas ou pontos
});

// Inferencia de Tipo
type FormData = z.infer<typeof schema>;

// Step ()
export default function Step() {
   // Useform
   const {
      control,
      handleSubmit,
      formState: { errors, isValid }
   } = useForm<FormData>({
      resolver: zodResolver(schema)
   });

   function handleAlturaChange(value: string) {
      let formattedValue = value.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
      if (formattedValue.length > 1) {
         formattedValue = formattedValue[0] + "." + formattedValue.slice(1); // Adiciona o ponto após o primeiro dígito
      }
      return formattedValue;
   }

   // useDataStore - Tela 1

   const setPageOne = useDataStore((state) => state.setPageOne);

   // Avançar tela

   function handleCreate(data: FormData) {
      console.log("PASSANDO PAGINA 1");
      setPageOne({
         name: data.name,
         peso: data.peso,
         altura: data.altura,
         idade: data.idade
      });

      router.push("/create");
   }

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
         <Header step="Passo 1 " title="Vamos Começar" />

         <ScrollView style={styles.content}>
            <Text style={styles.label}>Nome:</Text>
            <Input
               name="name"
               control={control}
               placeholder="Digite seu nome"
               error={errors.name?.message}
               keyboardType="default"
            />

            <Text style={styles.label}>Peso Atual:</Text>
            <Input
               name="peso"
               control={control}
               placeholder="Ex: 70 kg"
               error={errors.peso?.message}
               keyboardType="numeric"
            />

            <Text style={styles.label}>Altura:</Text>
            <Input
               name="altura"
               control={control}
               placeholder="Ex: 1.85 m"
               error={errors.altura?.message}
               keyboardType="numeric"
            />

            <Text style={styles.label}>Idade:</Text>
            <Input
               name="idade"
               control={control}
               placeholder="Ex: 22 anos"
               error={errors.idade?.message}
               keyboardType="numeric"
            />

            <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
               <Text style={styles.buttonText}> Avançar</Text>
            </Pressable>
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
   // Tela de rolagem
   content: {
      paddingLeft: 15,
      paddingRight: 15
   },
   // Formulario
   label: {
      fontSize: 20,
      fontFamily: Fonts.PoppinsRegular,
      color: colors.white,
      marginBottom: 8
   },

   //Botão
   button: {
      backgroundColor: colors.blue,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginTop: 25 // trazer botão para baixo
   },

   buttonText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: Fonts.PoppinsBold
   }
});
