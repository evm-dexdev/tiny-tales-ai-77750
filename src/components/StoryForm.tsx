import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StoryFormProps {
  onStoryGenerated: (story: string) => void;
}

export const StoryForm = ({ onStoryGenerated }: StoryFormProps) => {
  const [characters, setCharacters] = useState("");
  const [theme, setTheme] = useState("");
  const [length, setLength] = useState("medium");
  const [setting, setSetting] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!characters.trim() || !theme.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both characters and a theme/moral.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-story", {
        body: {
          characters: characters.trim(),
          theme: theme.trim(),
          length,
          setting: setting.trim() || undefined,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.story) {
        onStoryGenerated(data.story);
        toast({
          title: "Story Created! ✨",
          description: "Your magical story is ready to read!",
        });
      }
    } catch (error: any) {
      console.error("Error generating story:", error);
      toast({
        title: "Story Generation Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-card gradient-card">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Create Your Story
        </CardTitle>
        <CardDescription className="text-base">
          Tell us about your characters and what you want them to learn!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="characters" className="text-base font-semibold">
              Characters
            </Label>
            <Textarea
              id="characters"
              placeholder="e.g., A brave rabbit and a shy turtle"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              className="resize-none"
              rows={3}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme" className="text-base font-semibold">
              Theme or Moral
            </Label>
            <Input
              id="theme"
              placeholder="e.g., Friendship and teamwork"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length" className="text-base font-semibold">
                Story Length
              </Label>
              <Select value={length} onValueChange={setLength} disabled={isGenerating}>
                <SelectTrigger id="length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="setting" className="text-base font-semibold">
                Setting (Optional)
              </Label>
              <Input
                id="setting"
                placeholder="e.g., Enchanted forest"
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                disabled={isGenerating}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            variant="hero"
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" />
                Creating Your Story...
              </>
            ) : (
              <>
                <Sparkles />
                Generate Story
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
