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
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/provider/AuthProvider";
import { Routes } from "./src/routes/index";
import { useAuth } from "./src/context/hooks/useAuth";
import * as ScreenOrientation from "expo-screen-orientation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { userStorageLoading } = useAuth();
  const [fontsWereLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function handleOnLoad() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      if (fontsWereLoaded && !userStorageLoading) {
        await SplashScreen.hideAsync();
      }
    }

    handleOnLoad();
  }, [fontsWereLoaded, userStorageLoading]);

  if (!fontsWereLoaded || userStorageLoading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
