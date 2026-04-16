import { ArrowLeft, Trash2 } from "lucide-react";

export interface DiaryEntry {
  id: string;
  date: string;
  meals: Record<string, string>;
  feelings: string;
  reflection: string;
}

interface HistoryScreenProps {
  entries: DiaryEntry[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

const HistoryScreen = ({ entries, onBack, onDelete }: HistoryScreenProps) => {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-1 mb-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <h1
          className="font-display text-2xl text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Past Entries
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-4xl mb-3">📝</span>
            <p className="text-foreground/60 text-sm">
              No entries yet. Complete your first food diary to see it here!
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl bg-white border border-primary/10 p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary">
                  {formatDate(entry.date)}
                </span>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="p-1 text-foreground/30 hover:text-destructive transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {Object.entries(entry.meals).some(([, v]) => v) && (
                <div className="space-y-1">
                  {entry.meals.breakfast && (
                    <p className="text-xs text-foreground/70">
                      🍳 {entry.meals.breakfast}
                    </p>
                  )}
                  {entry.meals.lunch && (
                    <p className="text-xs text-foreground/70">
                      🥗 {entry.meals.lunch}
                    </p>
                  )}
                  {entry.meals.dinner && (
                    <p className="text-xs text-foreground/70">
                      🍽️ {entry.meals.dinner}
                    </p>
                  )}
                  {entry.meals.snacks && (
                    <p className="text-xs text-foreground/70">
                      🍎 {entry.meals.snacks}
                    </p>
                  )}
                </div>
              )}

              {entry.feelings && (
                <p className="text-xs text-foreground/55 italic">
                  "{entry.feelings}"
                </p>
              )}

              {entry.reflection && (
                <p className="text-xs text-primary/80 font-medium">
                  💡 {entry.reflection}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
