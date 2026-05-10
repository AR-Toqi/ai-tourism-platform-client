"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, DollarSign, ArrowLeft, Navigation, Globe, Users, Clock } from "lucide-react";
import { api } from "@/lib/api";
import { IDestination } from "@/types/destination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DestinationReviews } from "@/components/destinations/destination-reviews";
import { BookmarkButton } from "@/components/ui/bookmark-button";

interface Props {
  slug: string;
}

export function DestinationDetailView({ slug }: Props) {
  const router = useRouter();
  const [destination, setDestination] = useState<IDestination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await api.get<{ data: IDestination }>(`/destinations/${slug}`);
        setDestination(response.data);
      } catch (err) {
        console.error("Failed to fetch destination:", err);
        setError("Destination not found or failed to load.");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchDestination();
    }
  }, [slug]);

  if (error) {
    return (
      <div className="py-20 text-center space-y-6 container">
        <h2 className="text-3xl font-black text-slate-800">Destination Not Found</h2>
        <p className="text-slate-500 text-lg">{error}</p>
        <Link href="/destinations">
          <Button className="rounded-full px-8 h-12 font-bold mt-4">Back to Destinations</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-32 h-6" />
        </div>
        <Skeleton className="w-full h-[50vh] rounded-[3rem]" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="w-3/4 h-12" />
            <Skeleton className="w-1/2 h-6" />
            <div className="space-y-4 pt-6">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-4/5 h-4" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="w-full h-64 rounded-[2rem]" />
          </div>
        </div>
      </div>
    );
  }

  if (!destination) return null;

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full mt-4 container max-w-7xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}
          alt={destination.name}
          className="object-cover w-full h-full"
        />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-slate-900 transition-colors h-12 w-12"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Bookmark Button */}
        <div className="absolute top-8 right-8 z-20">
          <BookmarkButton itemId={destination.id} type="destination" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-12 left-8 right-8 z-20 md:left-16 md:right-16">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1.5 text-sm font-bold shadow-lg">
                {destination.category}
              </Badge>
              {destination.avgRating > 0 && (
                <Badge className="bg-white/20 backdrop-blur-md text-white border-none px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-lg">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  {Number(destination.avgRating).toFixed(1)} Rating
                </Badge>
              )}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-lg">
              {destination.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {destination.location}, {destination.country}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">About {destination.name}</h2>
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {destination.description}
              </p>
            </div>
          </section>

          {/* Image Gallery */}
          {destination.images && destination.images.length > 0 && (
            <section className="space-y-6 pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-black text-slate-900">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {destination.images.map((img) => (
                  <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img.url} 
                      alt={`${destination.name} gallery image`} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews Section */}
          <DestinationReviews 
            destinationId={destination.id} 
            destinationName={destination.name} 
          />
        </div>

        {/* Right Column: Info Card & CTA */}
        <div className="space-y-8">
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] sticky top-28 bg-white overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Estimated Budget</p>
                    <p className="text-xl font-black text-slate-800">
                      ${Number(destination.budgetMin)} - ${Number(destination.budgetMax)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Region</p>
                    <p className="text-xl font-bold text-slate-800">
                      {destination.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Community Insights</p>
                    <p className="text-lg font-bold text-slate-800">
                      {destination.reviewCount} Reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Link href={`/itineraries/create?destinationId=${destination.id}&destinationName=${encodeURIComponent(destination.name)}`}>
                  <Button className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Plan a Trip Here
                  </Button>
                </Link>
                <p className="text-center text-sm text-slate-400 mt-4 font-medium">
                  Let AI build the perfect itinerary for you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
