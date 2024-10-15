// INPUT - FINALIZANDO PASSO 2

import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "@/constants/colors";

// efeito blur
import { BlurView } from "expo-blur";

//Estados
import { useState } from "react";

// Fontes
import React, { useEffect } from "react";
import * as Font from "expo-font"; // Importa o módulo para carregar fontes
import { Fonts } from "../../styles/fonts";

// Icones
import { Feather } from "@expo/vector-icons";

// interface de opçoes
interface OptionsProps {
   label: string;
   value: string | number;
}

interface SelectProps {
   name: string;
   control: any;
   placeholder?: string; // opcional
   error?: string; // opcional
   options: OptionsProps[];
}

export function Select({ name, control, placeholder, error, options }: SelectProps) {
   // Abrir e fechar modal
   const [visible, setVisible] = useState(false);

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
         <Controller
            control={control}
            name={name}
            // render
            render={({ field: { onChange, onBlur, value } }) => (
               <>
                  <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
                     <Text>{value ? options.find((options) => options.value === value)?.label : placeholder}</Text>
                     <Feather name="arrow-down" size={15} color="#000">
                        {" "}
                     </Feather>
                  </TouchableOpacity>

                  <Modal
                     visible={visible}
                     animationType="fade" // estilo do abertura do modal
                     transparent={true} // trasparencia
                     onRequestClose={() => setVisible(false)}
                  >
                     <TouchableOpacity
                        style={styles.modalContainer} // style do modal
                        activeOpacity={1}
                        onPress={() => setVisible(false)} // fechar modal
                     >
                        <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                           <FlatList
                              contentContainerStyle={{ gap: 5 }} // espacamento dentro do modal
                              data={options}
                              keyExtractor={(item) => item.value.toString()}
                              renderItem={({ item }) => (
                                 <TouchableOpacity
                                    style={styles.options}
                                    onPress={() => {
                                       onChange(item.value); // selecionar item
                                       setVisible(false); // fechar quando selecionar
                                    }}
                                 >
                                    <Text> {item.label} </Text>
                                 </TouchableOpacity>
                              )}
                           ></FlatList>
                        </TouchableOpacity>
                     </TouchableOpacity>
                  </Modal>
               </>
            )}
         ></Controller>

         {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      marginBottom: 15
   },
   // Estilizar o Input
   input: {
      height: 45,
      backgroundColor: colors.white,
      paddingHorizontal: 10,
      borderRadius: 15
   },
   errorText: {
      color: colors.errorcolor,
      marginTop: 3,
      fontSize: 15,
      fontFamily: Fonts.PoppinsRegular,
      lineHeight: 20,
      textAlign: "left"
   },

   select: {
      flexDirection: "row",
      height: 55, // tamanho da caixa de texto
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      borderRadius: 15
   },
   // cor de fundo do modal - efeito blur
   modalContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      flex: 1,
      justifyContent: "center"
   },
   // item dentro do modal
   modalContent: {
      backgroundColor: colors.white,
      borderRadius: 10,
      paddingEnd: 12,
      paddingStart: 12,
      paddingBottom: 20, // espaço em cima
      paddingTop: 20 // espaço embaixo
   },

   // texto dentro da modal
   options: {
      paddingVertical: 15,
      backgroundColor: "rgba(128, 128, 128, 0.2)", // opçao
      borderRadius: 4,
      paddingHorizontal: 8
   }
});
