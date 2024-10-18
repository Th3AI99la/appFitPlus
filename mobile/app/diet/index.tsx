import { View, Text, Image, StyleSheet, Pressable, ScrollView, Share } from "react-native";
import { router } from "expo-router";

// Icons
import { Ionicons } from "@expo/vector-icons";

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
            // const response = await api.post<ResponseData>("/create", {
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

   // Função de compartilhar

   async function hadleShare() {
      try {
         // se estiver vazio da esse return, para nao compartilhar nada vazio
         if (data && Object.keys(data).length === 0) return;

         // se tiver
         const suppleShare = `   ${data?.suplementos.map((item) => `${item}`)}`;

         // exibiçao do Share
         const foods = `${data?.refeicoes.map(
            (item) =>
               `\n- Intervalo: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map(
                  (alimento) => `${alimento}`
               )}\n`
         )}`;

         // juntada
         const message = `Nome: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica de Suplementos: ${suppleShare}`;

         // compartilhamento

         await Share.share({
            message: message
         });
      } catch (err) {
         console.log(err);
      }
   }

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
                  <Text style={styles.buttonShareText} onPress={hadleShare}>
                     Compartilhar
                  </Text>
               </Pressable>
            </View>
         </View>

         <View style={{ paddingLeft: 15, paddingRight: 15, flex: 1 }}>
            {data && Object.keys(data).length > 0 && (
               <>
                  <Text style={styles.name}>Nome: {data.nome}</Text>
                  <Text style={styles.objetivo}>Foco: {data.objetivo}</Text>

                  <Text style={styles.label}>Refeições: </Text>

                  <ScrollView>
                     <View style={styles.foodList}>
                        {data.refeicoes.map((refeicao) => (
                           <View key={refeicao.nome} style={styles.food}>
                              <View style={styles.foodHeader}>
                                 <Text style={styles.foodName}> {refeicao.nome} </Text>
                                 <Ionicons name="restaurant" size={16} color="#000"></Ionicons>
                              </View>

                              <View style={styles.foodContent}>
                                 <Ionicons name="time" size={16} color="#000"></Ionicons>
                                 <Text style={styles.foodTime}>Horário: {refeicao.horario} </Text>
                              </View>

                              <Text style={styles.foodAlimentos}>Alimentos:</Text>
                              {refeicao.alimentos.map((alimento) => (
                                 <Text style={styles.foodAlimentosandAlimentos} key={alimento}>
                                    {alimento}
                                 </Text>
                              ))}
                           </View>
                        ))}
                     </View>

                     <View style={styles.supplements}>
                        <Text style={styles.foodName}>Dica suplementos:</Text>
                        {data.suplementos.map((itemSuplementos) => (
                           <Text style={styles.SuplementosLabel} key={itemSuplementos}>
                              {" "}
                              {itemSuplementos}
                           </Text>
                        ))}
                     </View>

                     <Pressable style={styles.button} onPress={() => router.replace("/")}>
                        <Text style={styles.buttonText}>Gerar nova Dieta</Text>
                     </Pressable>
                  </ScrollView>
               </>
            )}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   loading: {
      flex: 1,
      backgroundColor: colors.white, // cor de fundo do carregando
      justifyContent: "center",
      alignItems: "center"
   },
   loadingText: {
      fontSize: 20,
      color: colors.background,
      marginBottom: 4,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: Fonts.PoppinsRegular
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
      fontFamily: Fonts.PoppinsBold
   },

   //estilizar os Foods

   foodList: {
      // corpo da lista

      backgroundColor: colors.white,
      padding: 14,
      borderRadius: 8,
      marginTop: 7,
      gap: 8
   },

   food: {
      backgroundColor: "rgba(208, 208, 208, 0.4)",
      padding: 8,
      borderRadius: 4
   },

   foodHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4
   },

   foodName: {
      fontSize: 17,
      fontFamily: Fonts.PoppinsBold
   },
   foodTime: {
      fontFamily: Fonts.PoppinsRegular,
      fontSize: 15
   },

   foodContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4
   },

   foodAlimentos: {
      fontSize: 16,
      marginBottom: 4,
      marginTop: 14,
      fontFamily: Fonts.PoppinsRegular
   },

   foodAlimentosandAlimentos: {
      fontSize: 14,
      fontFamily: Fonts.PoppinsRegular
   },

   supplements: {
      backgroundColor: colors.white,
      marginTop: 15,
      marginBottom: 15,
      padding: 14,
      borderRadius: 8
   },

   SuplementosLabel: {
      fontSize: 15,
      marginBottom: 1,
      marginTop: 1,
      fontFamily: Fonts.PoppinsRegular
   },

   //Botão
   button: {
      backgroundColor: colors.blue,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 25 // trazer botão para baixo
   },

   buttonText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: Fonts.PoppinsBold
   }
});
