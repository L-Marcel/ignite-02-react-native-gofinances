import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dashboard } from './src/screens/Dashboard';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsWereLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold 
  });

  if(!fontsWereLoaded) {
    return <AppLoading/>;
  };

  return (
    <ThemeProvider theme={theme}>
      <Dashboard/>
      <StatusBar style="light"/>
    </ThemeProvider>
  );
}
