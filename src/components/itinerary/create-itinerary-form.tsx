"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { IDestination } from "@/types";
import { Loader2, Sparkles } from "lucide-react";

interface CreateItineraryFormProps {
  initialData: {
    destination?: string;
    totalDays?: string;
    budget?: string;
    style?: string;
    preferences?: string;
  };
}

export function CreateItineraryForm({ initialData }: CreateItineraryFormProps) {
  const router = useRouter();
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    destinationId: "",
    title: "",
    totalDays: initialData.totalDays ? parseInt(initialData.totalDays) : 3,
    budgetEstimate: initialData.budget ? parseFloat(initialData.budget) : 500,
    travelStyle: initialData.style || "Balanced",
    preferences: initialData.preferences || "",
    startDate: new Date().toISOString(),
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      totalDays: initialData.totalDays ? parseInt(initialData.totalDays) : prev.totalDays,
      budgetEstimate: initialData.budget ? parseFloat(initialData.budget) : prev.budgetEstimate,
      travelStyle: initialData.style || prev.travelStyle,
      preferences: initialData.preferences || prev.preferences,
    }));
  }, [initialData.totalDays, initialData.budget, initialData.style, initialData.preferences]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoadingDestinations(true);
        // Try fetching with search term first
        let response = await api.get<{ data: IDestination[] }>("/destinations", {
          params: initialData.destination ? { searchTerm: initialData.destination } : {}
        });
        
        let fetchedDestinations = response.data || [];

        // If no results for search term, fetch all as fallback
        if (fetchedDestinations.length === 0 && initialData.destination) {
          response = await api.get<{ data: IDestination[] }>("/destinations", { params: {} });
          fetchedDestinations = response.data || [];
        }
        
        setDestinations(fetchedDestinations);
        
        // If there's an initial destination and we found matches
        if (initialData.destination && fetchedDestinations.length > 0) {
          const exactMatch = fetchedDestinations.find(d => 
            d.name.toLowerCase().includes(initialData.destination!.toLowerCase()) ||
            d.location.toLowerCase().includes(initialData.destination!.toLowerCase())
          );
          const selectedDest = exactMatch || fetchedDestinations[0];
          
          if (selectedDest) {
            setFormData(prev => ({ 
              ...prev, 
              destinationId: selectedDest.id,
              title: prev.title || `Trip to ${selectedDest.name}`
            }));
          }
        }

      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, [initialData.destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destinationId) {
      toast.error("Please select a destination");
      return;
    }

    try {
      setIsSubmitting(true);
      // Ensure date is in ISO format for backend validation
      const submissionData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString()
      };
      
      const response = await api.post<{ data: { id: string } }>("/itineraries", submissionData);
      toast.success("Itinerary generated successfully!");
      router.push(`/itineraries/${response.data.id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to generate itinerary");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Select 
            value={formData.destinationId} 
            onValueChange={(val) => {
              const dest = destinations.find(d => d.id === val);
              setFormData(prev => ({ ...prev, destinationId: val, title: `Trip to ${dest?.name}` }));
            }}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder={isLoadingDestinations ? "Searching..." : "Select Destination"} />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest.id} value={dest.id}>
                  {dest.name}, {dest.country}
                </SelectItem>
              ))}
              {destinations.length === 0 && !isLoadingDestinations && (
                <SelectItem value="none" disabled>No destinations found</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Itinerary Title</Label>
          <Input 
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Summer in Paris"
            className="h-12 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalDays">Duration (Days)</Label>
          <Input 
            id="totalDays"
            type="number"
            min={1}
            max={30}
            value={formData.totalDays}
            onChange={(e) => setFormData(prev => ({ ...prev, totalDays: parseInt(e.target.value) }))}
            className="h-12 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetEstimate">Budget Estimate (USD)</Label>
          <Input 
            id="budgetEstimate"
            type="number"
            min={100}
            value={formData.budgetEstimate}
            onChange={(e) => setFormData(prev => ({ ...prev, budgetEstimate: parseFloat(e.target.value) }))}
            className="h-12 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="travelStyle">Travel Style</Label>
          <Select 
            value={formData.travelStyle} 
            onValueChange={(val) => setFormData(prev => ({ ...prev, travelStyle: val }))}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Budget">Budget</SelectItem>
              <SelectItem value="Balanced">Balanced</SelectItem>
              <SelectItem value="Luxury">Luxury</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input 
            id="startDate"
            type="date"
            value={formData.startDate.split("T")[0]}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: new Date(e.target.value).toISOString() }))}
            className="h-12 rounded-xl"
            required
          />
        </div>

      </div>

      <div className="space-y-2">
        <Label htmlFor="preferences">Special Preferences (AI will use these)</Label>
        <Textarea 
          id="preferences"
          value={formData.preferences}
          onChange={(e) => setFormData(prev => ({ ...prev, preferences: e.target.value }))}
          placeholder="e.g., I love hidden gems, vegetarian food, and photography spots..."
          className="min-h-[120px] rounded-2xl p-4"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl hover:shadow-primary/20 transition-all flex gap-2"
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Sparkles className="w-6 h-6" />
        )}
        {isSubmitting ? "Generating AI Itinerary..." : "Generate Full Itinerary"}
      </Button>
    </form>
  );
}
