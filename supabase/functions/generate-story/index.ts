import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { characters, theme, length, setting } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating story with params:", { characters, theme, length, setting });

    // Create detailed system prompt for children's stories
    const systemPrompt = `You are a creative AI story writer who specializes in crafting beautiful, engaging, and moral-based stories for children aged 3 to 12.

Your stories should:
- Be imaginative, fun, and positive
- Use simple language that children can easily understand
- Include a clear moral or life lesson
- Have a clear beginning, middle, and ending
- Be age-appropriate and safe for children
- Include descriptive language that sparks imagination
- Create relatable characters with emotions

Format your response EXACTLY as follows:
Title: [story title]

Story:
[The complete story text]

Moral of the story: [A clear, child-friendly moral lesson]`;

    // Build user prompt based on inputs
    let userPrompt = `Create a ${length || 'medium'} length children's story with the following details:\n\n`;
    userPrompt += `Character(s): ${characters}\n`;
    userPrompt += `Theme or Moral: ${theme}\n`;
    if (setting) {
      userPrompt += `Setting: ${setting}\n`;
    }
    
    userPrompt += `\nPlease write a wonderful story that children will love!`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const storyText = data.choices?.[0]?.message?.content;

    if (!storyText) {
      throw new Error("No story generated");
    }

    console.log("Story generated successfully");

    return new Response(
      JSON.stringify({ story: storyText }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-story function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
