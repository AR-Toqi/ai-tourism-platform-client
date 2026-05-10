import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { IDestination } from "@/types/destination";

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
  const destinations = allDestinations.slice(0, 3); // Get top 3

  return (
    <section className="section-gap bg-surface">
      <div className="container">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-headline-lg">Curated for You</h2>
            <p className="text-on-surface-variant">AI-picked destinations matching your travel profile.</p>
          </div>
          <Link href="/destinations">
            <Button variant="link" className="text-primary font-semibold group p-0">
              View all destinations <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.length > 0 ? (
            destinations.map((dest) => (
              <Link key={dest.id} href={`/destinations/${dest.slug}`}>
                <Card className="border-none shadow-ambient hover:shadow-ambient-lg transition-all group h-full flex flex-col bg-white overflow-hidden rounded-card">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dest.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}
                      alt={dest.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <Badge className="absolute top-4 left-4 z-20 rounded-full bg-secondary-container text-on-secondary font-semibold border-none shadow-sm">
                      {dest.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="space-y-2 mb-4">
                      <h3 className="text-headline-md leading-none group-hover:text-primary transition-colors line-clamp-1">{dest.name}</h3>
                      <div className="flex items-center text-on-surface-variant text-sm mt-2">
                        <MapPin className="w-4 h-4 mr-1 text-primary/60" />
                        <span>{dest.location}, {dest.country}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-on-surface-variant text-sm mt-auto">
                      <Star className="w-4 h-4 text-accent fill-accent mr-1" />
                      <span>{Number(dest.avgRating).toFixed(1)} ({dest.reviewCount} reviews)</span>
                      <span className="mx-2">•</span>
                      <span className="font-semibold text-emerald-600">${Number(dest.budgetMin)} - ${Number(dest.budgetMax)}</span>
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

