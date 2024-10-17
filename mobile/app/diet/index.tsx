import { View, Text, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

// API
import { api } from "../../services/api";

// Cache
import { useQuery } from "@tanstack/react-query";

//fontes
import React, { useState, useEffect } from "react";
import * as Font from "expo-font"; // Importa o módulo para carregar fontes
import { Fonts } from "../../styles/fonts";

// Store - pegar os dados da minha Store
import { useDataStore } from "../../store/data";
import { colors } from "@/constants/colors";

// Importar a tipagem dos dados
import { Data } from "../../types/data";
import { Link } from "@react-navigation/native";

// Interface do Data

interface ResponseData {
   data: Data;
}

// Dev
export default function Diet() {
   // pegando os dados
   const user = useDataStore((state) => state.user);

   const { data, isFetching, error } = useQuery({
      queryKey: ["diet"], //identificador
      queryFn: async () => {
         try {
            if (!user) {
               throw new Error("Erro ao carregar a dieta: usuário não encontrado ou não autenticado.");
            }

            const response = await api.get<ResponseData>("/teste");

            // // fazer a requisão
            // const response = await api.post("/create", {
            //    nome: user.name,
            //    idade: user.idade,
            //    genero: user.genero,
            //    altura: user.altura,
            //    peso: user.peso,
            //    level: user.level,
            //    objetivo: user.objetivo
            // });

            return response.data.data;
         } catch (err) {
            console.log(err);
         }
      }
   });

   // Fontes personalizadas
   const [fontsLoaded, setFontsLoaded] = useState(false);

   // Carregar fontes personalizadas
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

   // Se estiver carregando
   if (isFetching) {
      return (
         <View style={styles.loading}>
            <Text style={styles.loadingText}>Estamos gerando sua dieta personalizada...</Text>
            <Text style={styles.loadingText}>Consultando a Inteligência Artificial, por favor, aguarde.</Text>
         </View>
      );
   }

   // Se ocorrer um erro
   if (error) {
      return (
         <View style={styles.loading}>
            <Text style={styles.loadingText}>Não foi possível gerar a dieta.</Text>
            <Link to="/">
               <Text style={styles.loadingText}>Clique aqui para tentar novamente.</Text>
            </Link>
         </View>
      );
   }

   // Dev (View)
   return (
      <View style={styles.container}>
         <View style={styles.containerHeader}>
            <View style={styles.contentHeader}>
               <Text style={styles.title}>Minha Dieta</Text>

               <Pressable style={styles.buttonShare}>
                  <Text style={styles.buttonShareText}>Compartilhar</Text>
               </Pressable>
            </View>
         </View>

         <ScrollView style={{ paddingLeft: 15, paddingRight: 15 }}>
            {data && Object.keys(data).length > 0 && (
               <>
                  <Text style={styles.name}>Nome: {data.nome}</Text>
                  <Text style={styles.objetivo}>Foco: {data.objetivo}</Text>

                  <Text style={styles.label}>Refeições: </Text>
               </>
            )}
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   loading: {
      flex: 1,
      backgroundColor: colors.background
   },
   loadingText: {
      fontSize: 20,
      color: colors.blue,
      marginBottom: 4,
      justifyContent: "center",
      alignItems: "center"
   },

   container: {
      backgroundColor: colors.background,
      flex: 1
   },

   containerHeader: {
      backgroundColor: colors.white,
      borderBottomLeftRadius: 14,
      borderBottomStartRadius: 14,
      paddingTop: 60,
      paddingBottom: 20,
      marginBottom: 15
   },

   contentHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 16,
      paddingRight: 16
   },

   title: {
      fontSize: 28, // Minha Dieta
      fontFamily: Fonts.PoppinsBold,
      color: colors.black
   },

   buttonShare: {
      backgroundColor: colors.blue,
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      borderRadius: 4
   },
   buttonShareText: {
      color: colors.white,
      fontFamily: Fonts.PoppinsBold
   },

   // Parte das Refeições

   name: {
      fontSize: 20,
      color: colors.white,
      fontFamily: Fonts.PoppinsBold
   },

   objetivo: {
      fontSize: 17,
      color: colors.white,
      fontFamily: Fonts.PoppinsRegular,
      marginBottom: 25
   },

   label: {
      fontSize: 17,
      color: colors.white,
      fontFamily: Fonts.PoppinsBold,

   }
});
