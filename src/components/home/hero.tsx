"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { IDestination } from "@/types";

export function Hero() {
  const { user } = useAuth();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [trending, setTrending] = useState<IDestination[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await api.get<{ data: IDestination[] }>("/itineraries/trending-destinations");
        setTrending(response.data);
      } catch (error) {
        console.error("Failed to fetch trending:", error);
      }
    };
    fetchTrending();
  }, []);

  const handlePlanWithAI = async () => {
    if (!user) {
      toast.error("Please login first to plan with AI");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a destination or travel idea");
      return;
    }

    try {
      setIsParsing(true);
      const response = await api.post<{ data: any }>("/itineraries/parse-prompt", { prompt });
      const parsedData = response.data;

      // Build query params
      const params = new URLSearchParams();
      if (parsedData.destination) params.set("destination", parsedData.destination);
      if (parsedData.totalDays) params.set("totalDays", parsedData.totalDays.toString());
      if (parsedData.budgetEstimate) params.set("budget", parsedData.budgetEstimate.toString());
      if (parsedData.travelStyle) params.set("style", parsedData.travelStyle);
      if (parsedData.preferences) params.set("preferences", parsedData.preferences);

      router.push(`/itineraries/create?${params.toString()}`);
    } catch (error) {
      toast.error("AI was unable to parse your request. Try being more specific!");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/images/Cinematic Amalfi Coast.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="container relative z-20 text-center text-white space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-display-lg max-w-3xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl mx-auto font-display font-bold tracking-tighter leading-tight">
            Discover Your Next Adventure with <span className="text-white italic">AI Precision</span>
          </h1>
          <p className="text-xl text-white/80 text-slate-200 max-w-2xl mx-auto font-medium">
            Personalized itineraries curated by intelligence, designed for your soul.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 px-4">
          <div className="flex flex-col md:flex-row items-center bg-white/95 backdrop-blur-lg p-2 rounded-3xl md:rounded-full shadow-2xl transition-all hover:shadow-primary/20">
            <div className="flex-1 flex items-center px-4 md:px-6 w-full">
              <Search className="text-slate-400 mr-3 w-5 h-5 shrink-0" />
              <Input
                className="border-none bg-transparent text-slate-900 focus-visible:ring-0 placeholder:text-slate-400 text-base md:text-lg h-12 w-full"
                placeholder="Try '7 days in Paris on a budget'..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePlanWithAI()}
              />
            </div>
            <Button
              onClick={handlePlanWithAI}
              disabled={isParsing}
              className="w-full md:w-auto rounded-2xl md:rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-white font-bold transition-all flex gap-2 group mt-2 md:mt-0"
            >
              {isParsing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              {isParsing ? "Thinking..." : "Plan with AI"}
            </Button>
          </div>

          {trending.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2 duration-700 delay-500">
              <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Trending:</span>
              {trending.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setPrompt(`Plan a trip to ${dest.name}`)}
                  className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  {dest.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

