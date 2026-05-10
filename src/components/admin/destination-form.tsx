"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Loader2, 
  Upload, 
  X, 
  MapPin, 
  Globe, 
  DollarSign, 
  Layers, 
  Star,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Updated schema to align with backend validation
const destinationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  country: z.string().min(2, "Country is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.enum(["beach", "mountain", "city", "adventure", "cultural"], {
    message: "Please select a valid category",
  }),
  budgetMin: z.number().min(0, "Min budget is 0"),
  budgetMax: z.number().min(1, "Max budget must be at least 1"),
  isPublished: z.boolean(),
});

type TDestinationValues = z.infer<typeof destinationSchema>;

interface DestinationFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function DestinationForm({ initialData, onSuccess }: DestinationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(initialData?.coverImage || null);
  const router = useRouter();

  const form = useForm<TDestinationValues>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      country: initialData?.country || "",
      description: initialData?.description || "",
      category: (initialData?.category?.toLowerCase() as any) || "city",
      budgetMin: initialData?.budgetMin ? Number(initialData.budgetMin) : 0,
      budgetMax: initialData?.budgetMax ? Number(initialData.budgetMax) : 0,
      isPublished: initialData?.isPublished ?? false,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: TDestinationValues) => {
    try {
      setIsLoading(true);
      
      // Ensure coverImage is handled for the backend requirement
      const payload = { 
        ...values, 
        coverImage: initialData?.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" // Default placeholder for creation
      };

      let destinationId = initialData?.id;

      if (initialData) {
        await api.patch(`/content-manager/destinations/${initialData.id}`, payload);
        toast.success("Destination updated successfully!");
      } else {
        const response = await api.post<{ data: { id: string } }>("/destinations", payload);
        destinationId = response.data.id;
        toast.success("Destination created successfully!");
      }

      // Handle actual Cover Image Upload if a new file was selected
      if (coverImage && destinationId) {
        const formData = new FormData();
        formData.append("coverImage", coverImage);
        // Using content-manager endpoint as it usually handles multipart uploads
        await api.patch(`/content-manager/destinations/${destinationId}/cover`, formData);
        toast.success("Cover image synchronized!");
      }

      onSuccess?.();
      router.refresh();
    } catch (error: any) {
      console.error("DEBUG - Destination Form Error:", error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to save destination");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Image Upload Area */}
        <div className="space-y-4">
            <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Cover Image</label>
            <div className="relative h-72 w-full rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center overflow-hidden group hover:border-primary/50 transition-colors">
                {coverPreview ? (
                    <>
                        <img src={coverPreview} alt="Preview" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button 
                                type="button" 
                                variant="destructive" 
                                className="rounded-full h-12 w-12 p-0"
                                onClick={() => { setCoverImage(null); setCoverPreview(null); }}
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                    </>
                ) : (
                    <label className="flex flex-col items-center gap-3 cursor-pointer">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-primary transition-colors">
                            <Upload className="h-8 w-8" />
                        </div>
                        <span className="text-sm font-bold text-slate-500">Click to upload cover photo</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-slate-700">Destination Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Santorini" className="rounded-2xl border-slate-200 h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-slate-700">Category</FormLabel>
                    <FormControl>
                        <select 
                          {...field}
                          className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                        >
                          <option value="city">City</option>
                          <option value="beach">Beach</option>
                          <option value="mountain">Mountain</option>
                          <option value="adventure">Adventure</option>
                          <option value="cultural">Cultural</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-slate-700">Specific Location</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="e.g. Oia Village" className="pl-11 rounded-2xl border-slate-200 h-12" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-slate-700">Country</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="e.g. Greece" className="pl-11 rounded-2xl border-slate-200 h-12" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-slate-700">Detailed Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the beauty, activities, and vibes of this destination..." 
                  className="rounded-3xl border-slate-200 min-h-[150px] p-6 focus-visible:ring-primary/20" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
                control={form.control}
                name="budgetMin"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-slate-700">Min Budget ($)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                            <Input 
                                type="number" 
                                className="pl-11 rounded-2xl border-slate-200 h-12" 
                                {...field} 
                                onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="budgetMax"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-slate-700">Max Budget ($)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                            <Input 
                                type="number" 
                                className="pl-11 rounded-2xl border-slate-200 h-12" 
                                {...field} 
                                onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-bold text-slate-700">Status</FormLabel>
                    <FormControl>
                        <select 
                          value={field.value ? "true" : "false"}
                          onChange={(e) => field.onChange(e.target.value === "true")}
                          className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                        >
                          <option value="false">Draft</option>
                          <option value="true">Published</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <Button 
            type="submit" 
            className="w-full rounded-full h-16 text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
            disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Processing...
            </>
          ) : (
            initialData ? "Update Destination" : "Create Destination"
          )}
        </Button>
      </form>
    </Form>
  );
}
