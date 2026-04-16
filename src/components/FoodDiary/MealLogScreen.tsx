import { useState } from "react";

interface MealLogScreenProps {
  onNext: (data: Record<string, string>) => void;
  initialData?: Record<string, string>;
}

const meals = [
  { key: "breakfast", emoji: "🍳", label: "Breakfast", placeholder: "What did you have?" },
  { key: "lunch", emoji: "🥗", label: "Lunch", placeholder: "What did you have?" },
  { key: "dinner", emoji: "🍽️", label: "Dinner", placeholder: "What did you have?" },
  { key: "snacks", emoji: "🍎", label: "Snacks", placeholder: "Anything in between?" },
];

const MealLogScreen = ({ onNext, initialData }: MealLogScreenProps) => {
  const [data, setData] = useState<Record<string, string>>(initialData || {});

  return (
    <div className="flex flex-col h-full">
      <h1 className="font-display text-2xl text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        What did you eat today?
      </h1>
      <p className="text-foreground/65 text-sm mb-6">
        Log each meal or snack below. Even a rough note counts! 🍽️
      </p>

      <div className="flex-1 space-y-3">
        {meals.map((meal) => (
          <div key={meal.key}>
            <label className="text-sm font-medium text-foreground/80 mb-1 block">
              {meal.emoji} {meal.label}
            </label>
            <input
              type="text"
              placeholder={meal.placeholder}
              value={data[meal.key] || ""}
              onChange={(e) => setData({ ...data, [meal.key]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-primary/20 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => onNext(data)}
        className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-[15px] hover:opacity-90 transition-opacity mt-6"
      >
        Next →
      </button>
    </div>
  );
};

export default MealLogScreen;
