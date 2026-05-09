import { Search, Calendar, Plane } from "lucide-react";

const STEPS = [
  { icon: <Search className="w-8 h-8" />, title: "Discover", desc: "Our AI analyzes thousands of data points to find destinations that align with your unique tastes." },
  { icon: <Calendar className="w-8 h-8" />, title: "Plan", desc: "Receive a custom minute-by-minute itinerary, including flights, stays, and hidden local gems." },
  { icon: <Plane className="w-8 h-8" />, title: "Go", desc: "Book everything in one click and travel with your AI concierge available 24/7 in your pocket." }
];

export function SeamlessJourney() {
  return (
    <section className="section-gap bg-surface-container-low">
      <div className="container text-center">
        <h2 className="text-headline-lg mb-16">Your Seamless Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center shadow-sm text-on-tertiary">
                {step.icon}
              </div>
              <h3 className="text-headline-md">{step.title}</h3>
              <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
