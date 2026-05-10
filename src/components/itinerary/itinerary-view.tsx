"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { IDestination } from "@/types/destination";
import { Calendar, MapPin, DollarSign, Clock, Sparkles, ChevronRight, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface IItineraryDetail {
  id: string;
  title: string;
  totalDays: number;
  budgetEstimate: number;
  travelStyle: string;
  startDate: string;
  aiGeneratedPlan: {
    budget_breakdown: Record<string, string>;
    tips: string[];
    best_time_to_visit: string;
  };
  destination: IDestination;
  days: {
    id: string;
    dayNumber: number;
    theme: string;
    activities: {
      id: string;
      name: string;
      time: string;
      location: string;
      cost: number;
      type: string;
    }[];
  }[];
}

export function ItineraryView({ id }: { id: string }) {

  const [itinerary, setItinerary] = useState<IItineraryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await api.get<{ data: IItineraryDetail }>(`/itineraries/${id}`);
        setItinerary(response.data);
      } catch (error) {
        console.error("Failed to fetch itinerary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <Skeleton className="h-[400px] w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-[600px] w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Itinerary not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
        <img 
          src={itinerary.destination.coverImage} 
          alt={itinerary.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className="bg-white/20 backdrop-blur-md text-white border-none px-4 py-1.5 rounded-full hover:bg-white/30 transition-colors">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-yellow-400 fill-yellow-400" />
              AI Optimized
            </Badge>
            <Badge className="bg-primary/90 text-white border-none px-4 py-1.5 rounded-full">
              {itinerary.travelStyle}
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {itinerary.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 text-white/90">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-medium">{itinerary.destination.name}, {itinerary.destination.country}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-medium">{itinerary.totalDays} Days</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-medium">Est. ${itinerary.budgetEstimate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Timeline */}
        <div className="lg:col-span-2 space-y-12">
          {itinerary.days.map((day, idx) => (
            <div key={day.id} className="relative pl-10 border-l-2 border-primary/10 last:border-l-0 pb-4">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary ring-4 ring-primary/10 shadow-lg shadow-primary/20" />
              
              <div className="flex items-baseline justify-between mb-8">
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">Day {day.dayNumber}</h3>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">{day.theme}</h2>
                </div>
              </div>

              <div className="space-y-6">
                {day.activities.map((activity, aIdx) => (
                  <Card key={activity.id} className="border-none bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 rounded-2xl overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-32 p-6 flex md:flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 bg-white">
                          <Clock className="w-5 h-5 text-primary mb-2 mr-2 md:mr-0" />
                          <span className="text-sm font-bold text-slate-600">{activity.time}</span>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                              {activity.name}
                            </h4>
                            <Badge variant="secondary" className="bg-slate-200/50 text-slate-700 font-medium px-3">
                              ${activity.cost}
                            </Badge>
                          </div>
                          <div className="flex items-center text-slate-500 text-sm font-medium">
                            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                            {activity.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          {/* AI Insights Card */}
          <Card className="border-none bg-slate-900 text-white rounded-[2rem] overflow-hidden shadow-2xl sticky top-24">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/20 rounded-xl border border-primary/30">
                  <Sparkles className="w-6 h-6 text-primary fill-primary" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">AI Expert Insights</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center text-primary-foreground/70 text-xs font-bold uppercase tracking-widest mb-4">
                    <Info className="w-3.5 h-3.5 mr-2" />
                    Best Time to Visit
                  </div>
                  <p className="text-lg leading-relaxed text-slate-300 italic">
                    "{itinerary.aiGeneratedPlan.best_time_to_visit}"
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <div className="flex items-center text-primary-foreground/70 text-xs font-bold uppercase tracking-widest mb-4">
                    <DollarSign className="w-3.5 h-3.5 mr-2" />
                    Budget Breakdown
                  </div>
                  <div className="space-y-4">
                    {Object.entries(itinerary.aiGeneratedPlan.budget_breakdown).map(([category, percentage]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-slate-400">{category}</span>
                          <span className="text-primary font-bold">{percentage}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000 delay-300"
                            style={{ width: percentage }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <div className="flex items-center text-primary-foreground/70 text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                    Travel Tips
                  </div>
                  <ul className="space-y-4">
                    {itinerary.aiGeneratedPlan.tips.map((tip, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
