import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type TimeDuration = {
  minutes: number;
  seconds: number;
};

type WorkoutSettingsContextData = {
  exerciseDuration: TimeDuration;
  restDuration: TimeDuration;
  cycles: number;
  setExerciseDuration: (value: TimeDuration) => void;
  setRestDuration: (value: TimeDuration) => void;
  setCycles: (value: number) => void;
};

const WorkoutSettingsContext = createContext<
  WorkoutSettingsContextData | undefined
>(undefined);

export const WorkoutSettingsProvider = ({ children }: PropsWithChildren) => {
  const [exerciseDuration, setExerciseDuration] = useState<TimeDuration>({
    minutes: 3,
    seconds: 0,
  });
  const [restDuration, setRestDuration] = useState<TimeDuration>({
    minutes: 1,
    seconds: 0,
  });
  const [cycles, setCycles] = useState(4);

  const value = useMemo(
    () => ({
      exerciseDuration,
      restDuration,
      cycles,
      setExerciseDuration,
      setRestDuration,
      setCycles,
    }),
    [exerciseDuration, restDuration, cycles]
  );

  return (
    <WorkoutSettingsContext.Provider value={value}>
      {children}
    </WorkoutSettingsContext.Provider>
  );
};

export const useWorkoutSettings = () => {
  const context = useContext(WorkoutSettingsContext);

  if (!context) {
    throw new Error(
      "useWorkoutSettings precisa ser usado dentro de WorkoutSettingsProvider"
    );
  }

  return context;
};
