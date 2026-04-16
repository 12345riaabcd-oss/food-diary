import { ArrowLeft, Clock } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
  onBack: () => void;
  onHistory: () => void;
}

const IntroScreen = ({ onStart, onBack, onHistory }: IntroScreenProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-1 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors">
          <ArrowLeft size={22} />
        </button>
        <button onClick={onHistory} className="p-2 -mr-2 text-foreground/70 hover:text-foreground transition-colors">
          <Clock size={22} />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <h1 className="font-display text-3xl text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Food Diary
        </h1>
        <p className="text-primary font-medium text-sm mb-6">
          Small steps to big health changes!
        </p>
        <p className="text-foreground/75 text-[15px] leading-relaxed">
          Welcome to your Food Diary! 🌿 Tracking what you eat helps you understand your body better — what gives you energy, what makes you feel heavy, and where you can make simple improvements. This is a judgment-free zone. Just be honest and enjoy the process!
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-[15px] hover:opacity-90 transition-opacity mt-8"
      >
        Let's Start →
      </button>
    </div>
  );
};

export default IntroScreen;
