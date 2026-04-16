import { useState } from "react";

interface FeelingsScreenProps {
  onNext: (feelings: string) => void;
  initialData?: string;
}

const FeelingsScreen = ({ onNext, initialData }: FeelingsScreenProps) => {
  const [feelings, setFeelings] = useState(initialData || "");

  return (
    <div className="flex flex-col h-full">
      <h1 className="font-display text-2xl text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        How did you feel after eating?
      </h1>
      <p className="text-foreground/65 text-sm mb-6">
        Listen to your body — it always has something to tell you! 😌
      </p>

      <div className="flex-1">
        <textarea
          placeholder="e.g. I felt satisfied after lunch but a little heavy after dinner..."
          value={feelings}
          onChange={(e) => setFeelings(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-white border border-primary/20 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
        />
      </div>

      <button
        onClick={() => onNext(feelings)}
        className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-[15px] hover:opacity-90 transition-opacity mt-6"
      >
        Next →
      </button>
    </div>
  );
};

export default FeelingsScreen;
