import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../shared/themes/Theme";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { TScreenDefinitionsProps } from "../AppRoutes";

export const Settings = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons
          name="home"
          size={28}
          color={Theme.colors.dark.mutedText}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Configurações</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View>
            <Text style={styles.buttonTitleText}>Periodo de execícios</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>1 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>2 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>3 min</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.buttonTitleText}>Descanso</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>1 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>2 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>3 min</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.buttonTitleText}>Troca de execícios</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>1 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>2 min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>3 min</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.buttonTitleText}>Notificações</Text>

            <View style={styles.notificationGroup}>
              <TouchableOpacity style={styles.actitavateNotificationButton}>
                <Text style={styles.actitavateNotificationButtonText}>
                  Desativado
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.notificationButton}>
                <Text style={styles.notificationButtonText}>Ativado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    gap: 36,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  homeButton: {
    alignSelf: "flex-end",
  },
  titleContainer: {
    marginBottom: 24,
  },
  titleText: {
    fontSize: Theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: Theme.colors.dark.primary,
  },

  buttonContainer: {
    gap: 20,
    width: 232,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonTitleText: {
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.dark.text,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: Theme.colors.dark.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 55,
    alignItems: "center",

    width: 100,
  },
  primaryButtonText: {
    color: Theme.colors.dark.text,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderColor: Theme.colors.dark.primary,
    borderWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 55,
    alignItems: "center",

    width: 100,
  },
  secondaryButtonText: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
  notificationGroup: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  notificationButton: {
    backgroundColor: Theme.colors.dark.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 55,
    alignItems: "center",

    width: 150,
  },
  notificationButtonText: {
    color: Theme.colors.dark.text,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
  actitavateNotificationButton: {
    borderColor: Theme.colors.dark.primary,
    borderWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 55,
    alignItems: "center",

    width: 150,
  },
  actitavateNotificationButtonText: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
});
