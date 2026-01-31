import { Nunito_400Regular, Nunito_400Regular_Italic, Nunito_700Bold } from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AppRoutes } from "./shared/AppRoutes";

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
  },[loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return AppRoutes();
}
