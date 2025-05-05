// LAYOUT INSERIR AS TELAS
import { Stack } from 'expo-router';

// centraliza o conteúdo
import 'react-native-reanimated';

// caches
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function RootLayout() {
   // Instaciamento - PARA CACHES
   const queryClient = new QueryClient();

   return (
      <QueryClientProvider client={queryClient}>
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

            <Stack.Screen
               // Tela 4 - Dieta Pronta
               name="diet/index"
               options={{
                  headerShown: false
               }}
            />
         </Stack>
      </QueryClientProvider>
   );
}
