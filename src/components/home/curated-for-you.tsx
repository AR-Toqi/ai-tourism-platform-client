import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

const DESTINATIONS = [
  { title: "Oia, Santorini", location: "Greece", price: "$3,200 - $5,500", tag: "Luxury", reviews: "4.9 (1.2k reviews)" },
  { title: "Zermatt, Switzerland", location: "Europe", price: "$4,500 - $8,200", tag: "Adventure", reviews: "4.8 (850 reviews)" },
  { title: "Paris, France", location: "Europe", price: "$2,850 - $6,500", tag: "AI-Pick", reviews: "4.9 (2.4k reviews)" }
];

export function CuratedForYou() {
  return (
    <section className="section-gap bg-surface">
      <div className="container">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-headline-lg">Curated for You</h2>
            <p className="text-on-surface-variant">AI-picked destinations matching your travel profile.</p>
          </div>
          <Button variant="link" className="text-primary font-semibold group p-0">
            View all destinations <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, i) => (
            <Card key={i} className="border-none shadow-ambient hover:shadow-ambient-lg transition-all group cursor-pointer overflow-hidden rounded-card">
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Badge className="absolute top-4 left-4 rounded-full bg-secondary-container text-on-secondary font-semibold border-none">
                  {dest.tag}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-headline-md leading-none">{dest.title}</h3>
                    <div className="flex items-center text-on-surface-variant text-sm mt-2">
                      <Star className="w-4 h-4 text-accent fill-accent mr-1" />
                      <span>{dest.reviews}</span>
                      <span className="mx-2">•</span>
                      <span>{dest.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="rounded-full border-outline-variant font-medium text-xs py-1">Romantic</Badge>
                  <Badge variant="outline" className="rounded-full border-outline-variant font-medium text-xs py-1">Views</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
