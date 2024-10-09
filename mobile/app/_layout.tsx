// LAYOUT

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        // Tela 1 <home>
        name="index"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        // Tela 2 <step>
        name="step/index"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
