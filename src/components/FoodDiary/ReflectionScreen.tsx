import { useState } from "react";

interface ReflectionScreenProps {
  onDone: (reflection: string) => void;
  initialData?: string;
}

const ReflectionScreen = ({ onDone, initialData }: ReflectionScreenProps) => {
  const [reflection, setReflection] = useState(initialData || "");

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-4">
        <span className="text-5xl">🎉</span>
      </div>

      <p className="text-primary italic text-center text-[15px] font-medium mb-5">
        What's one thing you'd like to eat better tomorrow?
      </p>

      <textarea
        placeholder="Write your thoughts here..."
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 rounded-xl bg-white border border-primary/20 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none mb-5"
      />

      <p className="text-foreground/65 text-sm text-center leading-relaxed mb-6">
        Every entry you make brings you one step closer to a healthier, happier you. Keep showing up — consistency is the real secret! 💪
      </p>

      <button
        onClick={() => onDone(reflection)}
        className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-[15px] hover:opacity-90 transition-opacity"
      >
        Done ✅
      </button>
    </div>
  );
};

export default ReflectionScreen;
