import React, { useEffect } from "react";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { AppRoutes } from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsWereLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function handleOnLoad() {
      if (fontsWereLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    handleOnLoad();
  }, [fontsWereLoaded]);

  if (!fontsWereLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
