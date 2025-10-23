import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, RotateCcw } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  onNewStory: () => void;
}

export const StoryDisplay = ({ story, onNewStory }: StoryDisplayProps) => {
  // Parse the story to separate title, story content, and moral
  const parseStory = (text: string) => {
    const titleMatch = text.match(/Title:\s*(.+?)(?:\n|$)/i);
    const storyMatch = text.match(/Story:\s*([\s\S]+?)(?=Moral of the story:|$)/i);
    const moralMatch = text.match(/Moral of the story:\s*(.+?)$/i);

    return {
      title: titleMatch?.[1]?.trim() || "Your Story",
      content: storyMatch?.[1]?.trim() || text,
      moral: moralMatch?.[1]?.trim() || "",
    };
  };

  const { title, content, moral } = parseStory(story);

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="shadow-soft gradient-card">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-primary animate-float" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {title}
            </h2>
            <BookOpen className="w-8 h-8 text-accent animate-float-delayed" />
          </div>
        </CardHeader>
        <CardContent className="space-y-8 px-8 pb-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
              {content}
            </div>
          </div>

          {moral && (
            <div className="gradient-accent rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Moral of the Story
              </h3>
              <p className="text-white text-lg leading-relaxed">{moral}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onNewStory}
          size="lg"
          variant="secondary"
          className="gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Create Another Story
        </Button>
      </div>
    </div>
  );
};
