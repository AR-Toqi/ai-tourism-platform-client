import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, MapPin, DollarSign } from "lucide-react";
import { IDestination } from "@/types/destination";
import { BookmarkButton } from "@/components/ui/bookmark-button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function getCuratedDestinations(): Promise<IDestination[]> {
  try {
    // Fetch destinations with Incremental Static Regeneration (ISR) - revalidates every hour
    const res = await fetch(`${API_BASE_URL}/api/v1/destinations`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch curated destinations. Status:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Failed to fetch curated destinations:", error);
    return [];
  }
}

export async function CuratedForYou() {
  const allDestinations = await getCuratedDestinations();

  // Sort by rating (descending) and take top 6
  const destinations = allDestinations
    .sort((a, b) => (Number(b.avgRating) || 0) - (Number(a.avgRating) || 0))
    .slice(0, 6);

  return (
    <section className="py-12 md:py-24 bg-surface">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 px-4 md:px-0">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-3xl md:text-headline-lg font-bold">Popular Destinations</h2>
            <p className="text-on-surface-variant">Top-rated places to explore around the globe.</p>
          </div>
          <Link href="/destinations" className="self-center sm:self-auto">
            <Button variant="link" className="text-primary font-semibold group p-0">
              View all destinations <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {destinations.length > 0 ? (
            destinations.map((dest) => (
              <Link key={dest.id} href={`/destinations/${dest.slug}`}>
                <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] overflow-hidden group h-full flex flex-col bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dest.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}
                      alt={dest.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-md border-none font-bold shadow-sm">
                        {dest.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <Badge className="bg-primary/90 hover:bg-primary backdrop-blur-md border-none text-white font-bold shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {Number(dest.avgRating).toFixed(1)}
                      </Badge>
                      <BookmarkButton itemId={dest.id} type="destination" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="space-y-2 mb-4">
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                        {dest.name}
                      </h3>
                      <div className="flex items-center text-slate-500 font-medium text-sm">
                        <MapPin className="w-4 h-4 mr-1 text-primary/60" />
                        {dest.location}, {dest.country}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-grow">
                      {dest.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex items-center text-slate-700 font-bold">
                        <DollarSign className="w-4 h-4 text-emerald-500 mr-1" />
                        <span>
                          ${Number(dest.budgetMin)} - ${Number(dest.budgetMax)}
                        </span>
                      </div>
                      <div className="flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">Amazing destinations are coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

