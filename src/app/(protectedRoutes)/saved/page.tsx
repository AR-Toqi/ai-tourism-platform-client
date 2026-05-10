"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, MapPin, Star, DollarSign, Calendar, Loader2, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { ISavedDestination, ISavedItinerary } from "@/types/saved";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/ui/bookmark-button";

export default function SavedItemsPage() {
  const [savedDestinations, setSavedDestinations] = useState<ISavedDestination[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<ISavedItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"destinations" | "itineraries">("destinations");

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<{
          data: { destinations: ISavedDestination[]; itineraries: ISavedItinerary[] };
        }>("/saved");
        setSavedDestinations(res.data.destinations || []);
        setSavedItineraries(res.data.itineraries || []);
      } catch (error) {
        console.error("Failed to fetch saved items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaved();
  }, []);

  return (
    <div className="container py-10 space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
          Your Bookmarks
        </h1>
        <p className="text-lg text-slate-500 font-medium">
          All your saved destinations and itineraries in one place.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("destinations")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "destinations"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Destinations ({savedDestinations.length})
        </button>
        <button
          onClick={() => setActiveTab("itineraries")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "itineraries"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Itineraries ({savedItineraries.length})
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : activeTab === "destinations" ? (
        savedDestinations.length === 0 ? (
          <EmptyState type="destinations" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedDestinations.map((saved) => (
              <Link key={saved.id} href={`/destinations/${saved.destination.slug}`}>
                <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] overflow-hidden group h-full flex flex-col bg-white">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={saved.destination.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}
                      alt={saved.destination.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-md border-none font-bold shadow-sm">
                        {saved.destination.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <BookmarkButton itemId={saved.destination.id} type="destination" initialSaved={true} />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                      {saved.destination.name}
                    </h3>
                    <div className="flex items-center text-slate-500 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1 text-primary/60" />
                      {saved.destination.location}, {saved.destination.country}
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100">
                      <div className="flex items-center text-slate-700 font-bold text-sm">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                        {Number(saved.destination.avgRating).toFixed(1)}
                      </div>
                      <div className="flex items-center text-emerald-600 font-bold text-sm">
                        <DollarSign className="w-4 h-4 mr-0.5" />
                        {Number(saved.destination.budgetMin)} - {Number(saved.destination.budgetMax)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )
      ) : savedItineraries.length === 0 ? (
        <EmptyState type="itineraries" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {savedItineraries.map((saved) => (
            <Link key={saved.id} href={`/itineraries/${saved.itinerary.id}`}>
              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] overflow-hidden group bg-white">
                <CardContent className="p-6 md:p-8 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors truncate">
                      {saved.itinerary.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                      {saved.itinerary.destination && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {saved.itinerary.destination.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {saved.itinerary.totalDays} days
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${Number(saved.itinerary.budgetEstimate)}
                      </span>
                    </div>
                  </div>
                  <BookmarkButton
                    itemId={saved.itinerary.id}
                    type="itinerary"
                    initialSaved={true}
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <Bookmark className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-700">No saved {type} yet</h3>
      <p className="text-slate-500 max-w-md mx-auto">
        Start exploring and bookmark your favorite {type} to find them here later.
      </p>
      <Link
        href={type === "destinations" ? "/destinations" : "/itineraries"}
        className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all"
      >
        Explore {type === "destinations" ? "Destinations" : "Itineraries"}
      </Link>
    </div>
  );
}
