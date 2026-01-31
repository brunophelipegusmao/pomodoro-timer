import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { TScreenDefinitionsProps } from "../AppRoutes";
import { Theme } from "../shared/themes/Theme";

export const Home = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text
          style={{
            color: Theme.colors.dark.text,
          }}
        >
          Configurações
        </Text>
      </TouchableOpacity>
    </View>
  );
};
