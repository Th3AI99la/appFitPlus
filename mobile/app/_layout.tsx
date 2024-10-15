// LAYOUT INSERIR AS TELAS

import { Stack } from "expo-router";

export default function RootLayout() {
   return (
      <Stack>
         <Stack.Screen
            // Tela 1 - Tela Inicial
            name="index"
            options={{
               headerShown: false
            }}
         />

         <Stack.Screen
            // Tela 2 - Vamos Começar
            name="step/index"
            options={{
               headerShown: false
            }}
         />

         <Stack.Screen
            // Tela 3 - Finalizando Dieta
            name="create/index"
            options={{
               headerShown: false
            }}
         />
      </Stack>
   );
}
