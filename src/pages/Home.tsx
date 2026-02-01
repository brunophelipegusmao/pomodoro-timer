import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TScreenDefinitionsProps } from "../AppRoutes";
import { Theme } from "../shared/themes/Theme";
import { CircularProgress } from "react-native-circular-progress";
import { MaterialIcons } from "@expo/vector-icons";

export const Home = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();
  return (
    <View style={styles.mainContainer}>

      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
        <MaterialIcons
          name="settings"
          size={28}
          color={Theme.colors.dark.mutedText}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.titleGroup}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Cronômetro</Text>
          </View>
          <View style={styles.stateContainer}>
            <Text style={styles.stateText}>Hora de suar</Text>
          </View>
          {/* <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Suando</Text>
        </View>
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Descanso</Text>
        </View>
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Amores, dispensandos</Text>
        </View> */}

          <View style={styles.progressContainer}>
            <CircularProgress
              size={160}
              width={7}
              fill={50}
              tintColor={Theme.colors.dark.muted}
              backgroundColor={Theme.colors.dark.glowBorder}
              rotation={0}
              children={() => <Text style={styles.progressText}>25:00</Text>}
            ></CircularProgress>
          </View>
        </View>

        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Pausar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Parar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View> */}
        </View>

        <View style={styles.exerciceContainer}>
          <Text style={styles.exerciceText}>Exercícios:</Text>

          <View style={styles.exerciceIndicatorComplete} />
          <View style={styles.exerciceIndicatorComplete} />
          <View style={styles.exerciceIndicatorComplete} />
          <View style={styles.exerciceIndicator} />
          <View style={styles.exerciceIndicator} />
          <View style={styles.exerciceIndicator} />
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
  settingsButton: {
   alignSelf: "flex-end",
  },
  titleGroup: {
    gap: 4,
  },
  primaryButton: {
    backgroundColor: Theme.colors.dark.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 55,
    alignItems: "center",

    width: "auto",
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

    width: "auto",
  },
  secondaryButtonText: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  progressContainer: {
    alignItems: "center",
    marginVertical: 32,
  },
  progressText: {
    fontSize: Theme.fontSizes.xlarge,
    color: Theme.colors.dark.text,
    fontWeight: "bold",
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: Theme.fontSizes.xlarge,
    color: Theme.colors.dark.accent,
    fontWeight: "bold",
  },
  stateContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  stateText: {
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.dark.mutedText,
  },
  exerciceContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  exerciceText: {
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.dark.mutedText,
  },

  exerciceIndicator: {
    width: 20,
    height: 20,
    borderRadius: "100%",
    backgroundColor: Theme.colors.dark.mutedText,
    marginRight: 8,
  },

  exerciceIndicatorComplete: {
    width: 20,
    height: 20,
    borderRadius: "100%",
    backgroundColor: Theme.colors.dark.primary,
    marginRight: 8,
  },
});
