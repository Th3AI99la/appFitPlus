import { View, Text, StyleSheet, Pressable, ScrollView, KeyboardTypeOptions } from "react-native";
import { Header } from "../../components/header/index";
import { colors } from "../../constants/colors";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Create() {
   return (
      <View style={styles.container}>
         <Header step="Passo 2 " title="Finalizando Dieta"></Header>
      </View>
   );
}

const styles = StyleSheet.create({
   // cor de fundo
   container: {
      flex: 1,
      backgroundColor: colors.background
   }
});

