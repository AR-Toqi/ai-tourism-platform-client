import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Eleanor Vance", date: "August 2024", text: "The AI-generated itinerary was flawless. It found hidden beach clubs I would have never discovered on my own. Lumina is a game changer." },
  { name: "Marcus Thorne", date: "June 2024", text: "Exceptional service. The details on the history and culture provided by the platform added so much depth to our trip. A truly premium experience." },
  { name: "Sienna Blake", date: "September 2024", text: "The most beautiful places I've ever visited. The AI concierge recommended a morning walk that was the highlight of our stay." }
];

export function GuestExperiences() {
  return (
    <section className="section-gap bg-surface">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-headline-lg">Guest Experiences</h2>
          <Button variant="link" className="text-on-surface-variant underline p-0 h-auto">View All Reviews</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <Card key={i} className="bg-white border-none shadow-ambient p-8 space-y-6 rounded-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100" />
                <div>
                  <div className="font-bold text-on-surface">{review.name}</div>
                  <div className="text-xs text-on-surface-variant">{review.date}</div>
                </div>
              </div>
              <p className="text-on-surface-variant italic leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex text-accent gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent" />)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
