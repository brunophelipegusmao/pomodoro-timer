import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CircularProgress } from "react-native-circular-progress";
import { TScreenDefinitionsProps } from "../AppRoutes";
import { useWorkoutSettings } from "../shared/context/WorkoutSettingsContext";
import { Theme } from "../shared/themes/Theme";

type TimerPhase = "exercise" | "rest" | "finished";

const formatSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const Home = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();
  const { exerciseDuration, restDuration, cycles } = useWorkoutSettings();

  const exerciseDurationSeconds =
    exerciseDuration.minutes * 60 + exerciseDuration.seconds;
  const restDurationSeconds = restDuration.minutes * 60 + restDuration.seconds;

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>("exercise");
  const [currentCycle, setCurrentCycle] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(exerciseDurationSeconds);

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setPhase("exercise");
    setCurrentCycle(1);
    setSecondsLeft(exerciseDurationSeconds);
  };

  useEffect(() => {
    if (isRunning || isPaused || phase === "finished") {
      return;
    }

    setPhase("exercise");
    setCurrentCycle(1);
    setSecondsLeft(exerciseDurationSeconds);
  }, [exerciseDurationSeconds, cycles, isRunning, isPaused, phase]);

  useEffect(() => {
    if (!isRunning || isPaused || phase === "finished") {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((previousSeconds) =>
        previousSeconds > 0 ? previousSeconds - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, phase]);

  useEffect(() => {
    if (!isRunning || isPaused || secondsLeft > 0) {
      return;
    }

    if (phase === "exercise") {
      if (currentCycle >= cycles) {
        setPhase("finished");
        setIsRunning(false);
        setIsPaused(false);
        return;
      }

      setPhase("rest");
      setSecondsLeft(restDurationSeconds);
      return;
    }

    if (phase === "rest") {
      setCurrentCycle((previousCycle) => previousCycle + 1);
      setPhase("exercise");
      setSecondsLeft(exerciseDurationSeconds);
    }
  }, [
    currentCycle,
    cycles,
    exerciseDurationSeconds,
    isPaused,
    isRunning,
    phase,
    restDurationSeconds,
    secondsLeft,
  ]);

  const phaseDuration =
    phase === "rest" ? restDurationSeconds : exerciseDurationSeconds;

  const progressFill = useMemo(() => {
    if (phase === "finished") {
      return 100;
    }

    if (phaseDuration <= 0) {
      return 0;
    }

    return ((phaseDuration - secondsLeft) / phaseDuration) * 100;
  }, [phase, phaseDuration, secondsLeft]);

  const stateLabel = useMemo(() => {
    if (phase === "finished") {
      return "Amores, dispensandos!!!";
    }

    if (isPaused) {
      return "Pausado";
    }

    if (!isRunning) {
      return "Hora de suar";
    }

    if (phase === "exercise") {
      return `Suando`;
    }

    return `Descanso`;
  }, [currentCycle, cycles, isPaused, isRunning, phase]);

  const handleStart = () => {
    if (phase === "finished") {
      setPhase("exercise");
      setCurrentCycle(1);
      setSecondsLeft(exerciseDurationSeconds);
    }

    setIsRunning(true);
    setIsPaused(false);
  };

  const cyclesList = Array.from({ length: cycles }, (_, index) => index + 1);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
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
            <Text style={styles.stateText}>{stateLabel}</Text>
          </View>

          <View style={styles.progressContainer}>
            <CircularProgress
              size={170}
              width={7}
              fill={progressFill}
              tintColor={Theme.colors.dark.mutedText}
              backgroundColor={Theme.colors.dark.primary}
              rotation={0}
            >
              {() => (
                <Text style={styles.progressText}>
                  {formatSeconds(phase === "finished" ? 0 : secondsLeft)}
                </Text>
              )}
            </CircularProgress>
          </View>
        </View>

        <View>
          {!isRunning && !isPaused && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleStart}
              >
                <Text style={styles.primaryButtonText}>
                  {phase === "finished" ? "Iniciar novamente" : "Iniciar"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {isRunning && !isPaused && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setIsPaused(true)}
              >
                <Text style={styles.primaryButtonText}>Pausar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={resetTimer}
              >
                <Text style={styles.secondaryButtonText}>Parar</Text>
              </TouchableOpacity>
            </View>
          )}

          {isRunning && isPaused && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  setIsPaused(false);
                  setIsRunning(true);
                }}
              >
                <Text style={styles.primaryButtonText}>Continuar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={resetTimer}
              >
                <Text style={styles.secondaryButtonText}>Reiniciar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseText}>Ciclos:</Text>
          <View style={styles.indicatorList}>
            {cyclesList.map((cycleNumber) => {
              const isCompleted =
                phase === "finished" ||
                (phase === "rest" && cycleNumber <= currentCycle) ||
                (phase === "exercise" && cycleNumber < currentCycle);

              return (
                <View
                  key={cycleNumber}
                  style={
                    isCompleted
                      ? styles.exerciseIndicatorComplete
                      : styles.exerciseIndicator
                  }
                />
              );
            })}
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
  exerciseContainer: {
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  exerciseText: {
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.dark.mutedText,
  },
  indicatorList: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  exerciseIndicator: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: Theme.colors.dark.mutedText,
  },
  exerciseIndicatorComplete: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: Theme.colors.dark.primary,
  },
});
