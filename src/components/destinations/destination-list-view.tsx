"use client";

import Link from "next/link";
import { MapPin, Star, DollarSign, ArrowRight, Loader2, X } from "lucide-react";
import { api } from "@/lib/api";
import { IDestination } from "@/types/destination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { useQuery } from "@tanstack/react-query";

export function DestinationListView() {
  const { data: destinations, isLoading, error, refetch } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const response = await api.get<{ data: IDestination[] }>("/destinations");
      return response.data;
    },
  });

  if (error) {
    return (
      <div className="py-20 text-center space-y-4 px-4">
        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-red-500">
           <X className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Oops!</h2>
        <p className="text-slate-500 max-w-sm mx-auto">We couldn't load the destinations right now. Please check your connection.</p>
        <Button onClick={() => refetch()} className="rounded-full px-8">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            Explore Destinations
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl font-medium mx-auto md:mx-0">
            Discover breathtaking locations, from serene beaches to vibrant cities. Find your perfect getaway.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-none shadow-none rounded-[2rem] overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between pt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : destinations && destinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((destination) => (
            <Link key={destination.id} href={`/destinations/${destination.slug}`}>
              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] overflow-hidden group h-full flex flex-col bg-white">
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={destination.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}
                    alt={destination.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-md border-none font-bold shadow-sm">
                      {destination.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <Badge className="bg-primary/90 hover:bg-primary backdrop-blur-md border-none text-white font-bold shadow-sm flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      {Number(destination.avgRating).toFixed(1)}
                    </Badge>
                    <BookmarkButton itemId={destination.id} type="destination" />
                  </div>
                </div>
                <CardContent className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="space-y-2 mb-3 md:mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-slate-500 font-medium text-xs md:text-sm">
                      <MapPin className="w-4 h-4 mr-1 text-primary/60" />
                      {destination.location}, {destination.country}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-xs md:text-sm line-clamp-2 mb-4 md:mb-6 flex-grow">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center text-slate-700 font-bold text-sm md:text-base">
                      <DollarSign className="w-4 h-4 text-emerald-500 mr-1" />
                      <span>
                        ${Number(destination.budgetMin)} - ${Number(destination.budgetMax)}
                      </span>
                    </div>
                    <div className="flex items-center text-primary font-bold text-xs md:text-sm group-hover:translate-x-1 transition-transform">
                      Details <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 mx-4">
          <h3 className="text-xl font-bold text-slate-800">No destinations found</h3>
          <p className="text-slate-500">We are currently adding new locations to our database.</p>
        </div>
      )}
    </div>
  );
}
