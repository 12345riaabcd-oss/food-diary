import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressDots from "./ProgressDots";
import IntroScreen from "./IntroScreen";
import MealLogScreen from "./MealLogScreen";
import FeelingsScreen from "./FeelingsScreen";
import ReflectionScreen from "./ReflectionScreen";
import HistoryScreen, { DiaryEntry } from "./HistoryScreen";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "food-diary-entries";

const loadEntries = (): DiaryEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveEntries = (entries: DiaryEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const FoodDiaryExercise = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mealData, setMealData] = useState<Record<string, string>>({});
  const [feelings, setFeelings] = useState("");
  const [reflection, setReflection] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>(loadEntries);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    toast({ title: "Exited exercise", description: "You can come back anytime!" });
  };

  const handleHistory = () => {
    setShowHistory(true);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Entry deleted" });
  };

  const handleDone = (ref: string) => {
    setReflection(ref);
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      meals: { ...mealData },
      feelings,
      reflection: ref,
    };
    setEntries((prev) => [newEntry, ...prev]);
    toast({ title: "Entry saved! 🌱", description: "Great job logging your food diary today." });
    setDirection(1);
    setStep(0);
    setMealData({});
    setFeelings("");
    setReflection("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--card-bg)' }}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 390,
          minHeight: 680,
        }}
      >
        <div className="flex flex-col h-full min-h-[680px] px-6 pt-4 pb-6">
          {!showHistory && <ProgressDots currentStep={step} totalSteps={4} />}

          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {showHistory ? (
                <motion.div
                  key="history"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-full flex flex-col"
                >
                  <HistoryScreen
                    entries={entries}
                    onBack={() => setShowHistory(false)}
                    onDelete={handleDeleteEntry}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-full flex flex-col"
                >
                  {step === 0 && (
                    <IntroScreen onStart={goNext} onBack={handleBack} onHistory={handleHistory} />
                  )}
                  {step === 1 && (
                    <MealLogScreen
                      initialData={mealData}
                      onNext={(data) => { setMealData(data); goNext(); }}
                    />
                  )}
                  {step === 2 && (
                    <FeelingsScreen
                      initialData={feelings}
                      onNext={(f) => { setFeelings(f); goNext(); }}
                    />
                  )}
                  {step === 3 && (
                    <ReflectionScreen initialData={reflection} onDone={handleDone} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDiaryExercise;
