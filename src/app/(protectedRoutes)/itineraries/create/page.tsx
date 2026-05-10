"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { Sparkles } from "lucide-react";


import { CreateItineraryForm } from "@/components/itinerary/create-itinerary-form";

function CreateItineraryContent() {
  const searchParams = useSearchParams();
  
  const initialData = {
    destination: searchParams.get("destination") || undefined,
    totalDays: searchParams.get("totalDays") || undefined,
    budget: searchParams.get("budget") || undefined,
    style: searchParams.get("style") || undefined,
    preferences: searchParams.get("preferences") || undefined,
  };

  return (
    <div className="container py-10 max-w-4xl">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary">Customize Your Trip</h1>
          <p className="text-muted-foreground text-lg">
            Review the details we've prepared based on your prompt and click generate to create your full AI-powered itinerary.
          </p>
        </div>

        {initialData.destination && (
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 animate-in fade-in zoom-in duration-500 flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-primary uppercase tracking-wider">AI Initial Analysis:</h2>
              <p className="text-lg font-medium text-slate-700 italic">
                "We've optimized a {initialData.totalDays}-day plan for {initialData.destination} with a {initialData.style} style."
              </p>
            </div>
          </div>
        )}

        <div className="p-8 border rounded-[2.5rem] bg-white shadow-ambient">
          <CreateItineraryForm initialData={initialData} />
        </div>
      </div>
    </div>
  );
}


export default function CreateItineraryPage() {
  return (
    <Suspense fallback={<div className="container py-10 text-center">Loading...</div>}>
      <CreateItineraryContent />
    </Suspense>
  );
}

