import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TScreenDefinitionsProps } from "../AppRoutes";
import { useWorkoutSettings } from "../shared/context/WorkoutSettingsContext";
import { Theme } from "../shared/themes/Theme";

const MINUTE_PRESETS = [1, 2, 3];
const CYCLE_PRESETS = [2, 3, 4];

const sanitizeNumericInput = (value: string) => value.replace(/\D/g, "");

const parseInputValue = (value: string) =>
  value === "" ? 0 : Number.parseInt(value, 10);

const normalizeDuration = (minutes: number, seconds: number) => {
  const totalSeconds = minutes * 60 + seconds;

  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
};

export const Settings = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();
  const {
    exerciseDuration,
    restDuration,
    cycles,
    setExerciseDuration,
    setRestDuration,
    setCycles,
  } = useWorkoutSettings();

  const [exerciseMinutesInput, setExerciseMinutesInput] = useState(
    String(exerciseDuration.minutes)
  );
  const [exerciseSecondsInput, setExerciseSecondsInput] = useState(
    String(exerciseDuration.seconds)
  );
  const [restMinutesInput, setRestMinutesInput] = useState(
    String(restDuration.minutes)
  );
  const [restSecondsInput, setRestSecondsInput] = useState(
    String(restDuration.seconds)
  );
  const [cyclesInput, setCyclesInput] = useState(String(cycles));

  const saveSettings = () => {
    const nextExerciseMinutes = parseInputValue(exerciseMinutesInput);
    const nextExerciseSeconds = parseInputValue(exerciseSecondsInput);
    const nextRestMinutes = parseInputValue(restMinutesInput);
    const nextRestSeconds = parseInputValue(restSecondsInput);
    const nextCycles = Number.parseInt(cyclesInput, 10);

    const hasInvalidValue =
      !Number.isInteger(nextExerciseMinutes) ||
      nextExerciseMinutes < 0 ||
      !Number.isInteger(nextExerciseSeconds) ||
      nextExerciseSeconds < 0 ||
      !Number.isInteger(nextRestMinutes) ||
      nextRestMinutes < 0 ||
      !Number.isInteger(nextRestSeconds) ||
      nextRestSeconds < 0 ||
      !Number.isInteger(nextCycles) ||
      nextCycles <= 0;

    if (hasInvalidValue) {
      Alert.alert(
        "Valores inválidos",
        "Informe números válidos para exercício, descanso e ciclos."
      );
      return;
    }

    const normalizedExerciseDuration = normalizeDuration(
      nextExerciseMinutes,
      nextExerciseSeconds
    );
    const normalizedRestDuration = normalizeDuration(
      nextRestMinutes,
      nextRestSeconds
    );

    const hasZeroDuration =
      normalizedExerciseDuration.minutes === 0 &&
      normalizedExerciseDuration.seconds === 0;

    const hasZeroRest =
      normalizedRestDuration.minutes === 0 &&
      normalizedRestDuration.seconds === 0;

    if (hasZeroDuration || hasZeroRest) {
      Alert.alert(
        "Duração inválida",
        "Exercício e descanso precisam ter pelo menos 1 segundo."
      );
      return;
    }

    setExerciseDuration(normalizedExerciseDuration);
    setRestDuration(normalizedRestDuration);
    setCycles(nextCycles);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons name="home" size={28} color={Theme.colors.dark.mutedText} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Configurações</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Exercício (minutos e segundos)</Text>
          <View style={styles.buttonGroup}>
            {MINUTE_PRESETS.map((preset) => (
              <TouchableOpacity
                key={`exercise-${preset}`}
                style={
                  parseInputValue(exerciseMinutesInput) === preset &&
                  parseInputValue(exerciseSecondsInput) === 0
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => {
                  setExerciseMinutesInput(String(preset));
                  setExerciseSecondsInput("0");
                }}
              >
                <Text
                  style={
                    parseInputValue(exerciseMinutesInput) === preset &&
                    parseInputValue(exerciseSecondsInput) === 0
                      ? styles.primaryButtonText
                      : styles.secondaryButtonText
                  }
                >
                  {preset}:00
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.timeInputRow}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Min</Text>
              <TextInput
                value={exerciseMinutesInput}
                onChangeText={(value) =>
                  setExerciseMinutesInput(sanitizeNumericInput(value))
                }
                keyboardType="number-pad"
                placeholder="Ex.: 5"
                placeholderTextColor={Theme.colors.dark.mutedText}
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Seg</Text>
              <TextInput
                value={exerciseSecondsInput}
                onChangeText={(value) =>
                  setExerciseSecondsInput(sanitizeNumericInput(value))
                }
                keyboardType="number-pad"
                placeholder="Ex.: 30"
                placeholderTextColor={Theme.colors.dark.mutedText}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Descanso (minutos e segundos)</Text>
          <View style={styles.buttonGroup}>
            {MINUTE_PRESETS.map((preset) => (
              <TouchableOpacity
                key={`rest-${preset}`}
                style={
                  parseInputValue(restMinutesInput) === preset &&
                  parseInputValue(restSecondsInput) === 0
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => {
                  setRestMinutesInput(String(preset));
                  setRestSecondsInput("0");
                }}
              >
                <Text
                  style={
                    parseInputValue(restMinutesInput) === preset &&
                    parseInputValue(restSecondsInput) === 0
                      ? styles.primaryButtonText
                      : styles.secondaryButtonText
                  }
                >
                  {preset}:00
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.timeInputRow}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Min</Text>
              <TextInput
                value={restMinutesInput}
                onChangeText={(value) =>
                  setRestMinutesInput(sanitizeNumericInput(value))
                }
                keyboardType="number-pad"
                placeholder="Ex.: 1"
                placeholderTextColor={Theme.colors.dark.mutedText}
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Seg</Text>
              <TextInput
                value={restSecondsInput}
                onChangeText={(value) =>
                  setRestSecondsInput(sanitizeNumericInput(value))
                }
                keyboardType="number-pad"
                placeholder="Ex.: 15"
                placeholderTextColor={Theme.colors.dark.mutedText}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Número de ciclos</Text>
          <View style={styles.buttonGroup}>
            {CYCLE_PRESETS.map((preset) => (
              <TouchableOpacity
                key={`cycles-${preset}`}
                style={
                  Number.parseInt(cyclesInput, 10) === preset
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setCyclesInput(String(preset))}
              >
                <Text
                  style={
                    Number.parseInt(cyclesInput, 10) === preset
                      ? styles.primaryButtonText
                      : styles.secondaryButtonText
                  }
                >
                  {preset}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            value={cyclesInput}
            onChangeText={(value) => setCyclesInput(sanitizeNumericInput(value))}
            keyboardType="number-pad"
            placeholder="Ex.: 6"
            placeholderTextColor={Theme.colors.dark.mutedText}
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
              <Text style={styles.primaryButtonText}>Desativado</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => {}}>
              <Text style={styles.secondaryButtonText}>Ativado</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
  },
  container: {
    paddingBottom: 24,
    gap: 16,
  },
  homeButton: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: Theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: Theme.colors.dark.primary,
  },
  card: {
    backgroundColor: Theme.colors.dark.surface,
    borderWidth: 1,
    borderColor: Theme.colors.dark.cardBorder,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  sectionTitle: {
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.dark.text,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: Theme.colors.dark.primary,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  primaryButtonText: {
    color: Theme.colors.dark.text,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderColor: Theme.colors.dark.primary,
    borderWidth: 2,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Theme.colors.dark.primary,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
  timeInputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputWrap: {
    flex: 1,
    gap: 6,
  },
  inputLabel: {
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.dark.mutedText,
    fontWeight: "bold",
  },
  input: {
    borderColor: Theme.colors.dark.cardBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Theme.colors.dark.text,
    fontSize: Theme.fontSizes.medium,
    backgroundColor: Theme.colors.dark.background,
  },
  saveButton: {
    backgroundColor: Theme.colors.dark.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 4,
  },
  saveButtonText: {
    color: Theme.colors.dark.text,
    fontSize: Theme.fontSizes.medium,
    fontWeight: "bold",
  },
});
