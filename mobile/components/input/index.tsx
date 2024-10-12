// INPUT - VAMOS COMEÇAR PASSO 1

import { View, StyleSheet, Text, TextInput, KeyboardTypeOptions } from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "@/constants/colors";

// Fontes
import React, { useState, useEffect } from "react";
import * as Font from "expo-font"; // Importa o módulo para carregar fontes
import { Fonts } from "../../styles/fonts";

interface InputProps {
   name: string;
   control: any;
   placeholder?: string; // opcional
   rules?: object; // opcional
   error?: string; // opcional
   keyboardType: KeyboardTypeOptions;
}

export function Input({ name, control, placeholder, rules, error, keyboardType }: InputProps) {
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
            rules={rules}
            // render
            render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  keyboardType={keyboardType} // tecladinho
               ></TextInput>
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
      borderRadius: 15,
      
   },
   errorText: {
      color: colors.errorcolor,
      marginTop: 3,
      fontSize: 14,
      fontFamily: Fonts.PoppinsRegular,
      lineHeight: 20,
      textAlign: "left"
   }
});
