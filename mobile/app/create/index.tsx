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

// função do botão enviar

function handleCreate(data: FormData) {
   console.log(data);
}

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

   // Opções de gênero
   const generoOptions = [
      { label: "Masculino", value: "masculino" },
      { label: "Feminino", value: "feminino" }
   ];

   // Opções de nível de atividade física
   const levelOptions = [
      {
         label: "Sedentário - (Pouca ou nenhuma atividade física)",
         value: "sedentário"
      },
      {
         label: "Levemente ativo - (Exercícios 1 a 3 vezes por semana)",
         value: "levemente ativo"
      },
      {
         label: "Moderadamente ativo - (Exercícios 3 a 5 vezes por semana)",
         value: "moderadamente ativo"
      },
      {
         label: "Altamente ativo - (Exercícios 5 a 7 vezes por semana)",
         value: "altamente ativo"
      },
      {
         label: "Extremamente ativo - (Treinos intensos diários)",
         value: "extremamente ativo"
      } // Nova opção para quem treina intensamente
   ];

   // Opções de objetivo
   const objetivoOptions = [
      {
         label: "Perda de Peso - (Reduzir gordura corporal)",
         value: "perda de peso"
      },
      {
         label: "Ganhar Massa Muscular - (Hipertrofia)",
         value: "hipertrofia"
      },
      {
         label: "Hipertrofia + Definição - (Ganhar músculos e reduzir gordura)",
         value: "hipertrofia e definição - ganhar músculos e reduzir gordura"
      },
      {
         label: "Definição Muscular - (Evidenciar a musculatura)",
         value: "definição muscular"
      },
      {
         label: "Manter o Peso - (Estabilizar o peso atual)",
         value: "manutenção do peso - estabilizar o peso atual"
      }
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

   // Dev do Select
   return (
      <View style={styles.container}>
         <Header step="Passo 2 " title="Finalizando Dieta"></Header>

         <ScrollView style={styles.content}>
            <Text style={styles.label}>Gênero:</Text>
            <Select
               control={control}
               name="genero"
               placeholder="Escolha o seu gênero"
               error={errors.genero?.message}
               options={generoOptions}
            />

            <Text style={styles.label}>Nível de Atividade Física:</Text>
            <Select
               control={control}
               name="level"
               placeholder="Selecione o seu nível de atividade física"
               error={errors.level?.message}
               options={levelOptions}
            />

            <Text style={styles.label}>Meta de Treino:</Text>
            <Select
               control={control}
               name="objetivo"
               placeholder="Defina o seu objetivo de treino"
               error={errors.objetivo?.message}
               options={objetivoOptions}
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
