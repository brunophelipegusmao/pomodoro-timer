import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import {
  NavigationContainer,
  NavigationProp,
  DefaultTheme,
} from "@react-navigation/native";
import { Theme } from "./shared/themes/Theme";

type TScreenDefinitions = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<TScreenDefinitions>();

export function AppRoutes() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        fonts: {
          ...DefaultTheme.fonts,
          regular: {
            fontFamily: Theme.fonts.regular,
            fontWeight: "normal",
          },
          bold: {
            fontFamily: Theme.fonts.bold,
            fontWeight: "bold",
          },
        },
        colors: {
          ...DefaultTheme.colors,
          background: Theme.colors.dark.background,
          card: Theme.colors.dark.background,
          text: Theme.colors.dark.text,
          border: Theme.colors.dark.cardBorder,
          primary: Theme.colors.dark.primary,
          notification: Theme.colors.dark.accent,
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TScreenDefinitionsProps = NavigationProp<TScreenDefinitions>;
