import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AppRoutes } from "./AppRoutes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "./shared/themes/Theme";
import { StatusBar } from "react-native";
import { WorkoutSettingsProvider } from "./shared/context/WorkoutSettingsContext";

SplashScreen.preventAutoHideAsync();

export function App() {
  const [loaded, error] = useFonts({
    NunitoRegular: Nunito_400Regular,
    NunitoBold: Nunito_700Bold,
    NunitoItalic: Nunito_400Regular_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hide();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <WorkoutSettingsProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Theme.colors.dark.background }}
        >
          <StatusBar barStyle="light-content" />
          <AppRoutes />
        </SafeAreaView>
      </WorkoutSettingsProvider>
    </SafeAreaProvider>
  );
}
