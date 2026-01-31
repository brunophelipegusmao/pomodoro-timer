import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { TScreenDefinitionsProps } from "../shared/AppRoutes";
import { Theme } from "../shared/themes/Theme";

export const Home = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();
  return (
    <View>
      <Text
        style={{
          color: Theme.colors.dark.primary,
          fontFamily: "NunitoBold",
          fontSize: 32,
        }}
      >
        Homepage
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text style={{ fontFamily: "NunitoRegular", fontSize: 24, color: Theme.colors.dark.accent }}>
          Configurações
        </Text>
      </TouchableOpacity>
    </View>
  );
};
