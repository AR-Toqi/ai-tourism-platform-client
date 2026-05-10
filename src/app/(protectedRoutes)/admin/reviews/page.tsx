"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { 
  Loader2, 
  MessageSquare, 
  Search, 
  Trash2, 
  Star, 
  User, 
  MapPin,
  Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getAllReviews();
      setReviews(response.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review? This action is permanent.")) return;
    
    try {
      await api.delete(`/reviews/${reviewId}`);
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete review");
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.destination?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Review Moderation</h1>
          <p className="text-lg text-slate-500 font-medium">Monitor and manage community feedback across the platform.</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search by comment, user, or place..." 
          className="pl-11 rounded-2xl border-slate-200 h-12 focus-visible:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="border-none shadow-lg shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black">
                          {review.user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{review.user?.name}</p>
                          <div className="flex items-center text-xs text-slate-400 font-medium">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-black">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn("h-4 w-4", i < review.rating ? "fill-current" : "text-slate-200")} 
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <p className="text-slate-700 leading-relaxed font-medium italic">"{review.comment}"</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center text-sm font-bold text-slate-500">
                            <MapPin className="h-4 w-4 mr-2 text-primary/60" />
                            {review.destination?.name}
                        </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-3">
                    <Button 
                        variant="destructive" 
                        className="rounded-2xl h-12 px-6 font-bold flex items-center gap-2"
                        onClick={() => handleDelete(review.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No reviews found</h3>
          <p className="text-slate-500">The platform community has been quiet or search filters are too strict.</p>
        </div>
      )}
    </div>
  );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
