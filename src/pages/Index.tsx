import { useState } from "react";
import { StoryForm } from "@/components/StoryForm";
import { StoryDisplay } from "@/components/StoryDisplay";
import { Sparkles, Stars, BookHeart } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

const Index = () => {
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);

  const handleStoryGenerated = (story: string) => {
    setGeneratedStory(story);
  };

  const handleNewStory = () => {
    setGeneratedStory(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Stars className="absolute top-10 left-10 w-8 h-8 text-white animate-float" />
          <Sparkles className="absolute top-20 right-20 w-6 h-6 text-white animate-float-delayed" />
          <Stars className="absolute bottom-20 left-1/4 w-10 h-10 text-white animate-float" />
          <Sparkles className="absolute bottom-10 right-1/3 w-8 h-8 text-white animate-float-delayed" />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-white">
              <div className="flex items-center gap-3">
                <BookHeart className="w-12 h-12 animate-float" />
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Tiny Tales AI
                </h1>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed opacity-95">
                Create magical stories for children with the power of AI! 
                Every story teaches valuable lessons through fun adventures.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Age 3-12</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                  <Stars className="w-5 h-5" />
                  <span className="font-semibold">Educational</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroIllustration} 
                alt="Magical storybook illustration with whimsical characters"
                className="rounded-3xl shadow-soft w-full animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          {!generatedStory ? (
            <StoryForm onStoryGenerated={handleStoryGenerated} />
          ) : (
            <StoryDisplay story={generatedStory} onNewStory={handleNewStory} />
          )}
        </div>
      </section>

      {/* Features Section */}
      {!generatedStory && (
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Kids Love Our Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl gradient-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">Personalized Adventures</h3>
                <p className="text-muted-foreground">
                  Choose your own characters and create unique stories every time!
                </p>
              </div>
              
              <div className="text-center p-6 rounded-2xl gradient-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookHeart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent">Valuable Lessons</h3>
                <p className="text-muted-foreground">
                  Every story includes a meaningful moral that children can learn from.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-2xl gradient-card shadow-card hover:shadow-soft transition-all duration-300">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stars className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary-foreground">
                  Age-Appropriate
                </h3>
                <p className="text-muted-foreground">
                  Stories crafted specifically for children aged 3 to 12 years old.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
