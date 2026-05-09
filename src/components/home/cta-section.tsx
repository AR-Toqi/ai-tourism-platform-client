import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section-gap">
      <div className="container text-center space-y-8 max-w-2xl">
        <h2 className="text-display-lg leading-tight">Ready to see the world differently?</h2>
        <p className="text-on-surface-variant text-body-lg">
          Join over 50,000 discerning travelers using Lumina AI to redefine their exploration.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button className="w-full sm:w-auto h-14 px-10 rounded-full font-bold text-lg shadow-sm cursor-pointer">
            Get Started Free
          </Button>
          <Button variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-full border-primary text-primary font-bold text-lg hover:bg-primary/5 cursor-pointer">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
