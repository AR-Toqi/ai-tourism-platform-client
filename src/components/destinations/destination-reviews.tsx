"use client";

import { useEffect, useState } from "react";
import { Star, Loader2, MessageSquare, LogIn } from "lucide-react";
import { api } from "@/lib/api";
import { IReview } from "@/types/review";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

interface DestinationReviewsProps {
  destinationId: string;
  destinationName: string;
}

// Interactive star rating component
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}) {
  const [hovered, setHovered] = useState(0);
  const iconSize = size === "sm" ? "w-4 h-4" : "w-6 h-6";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={cn(
            "transition-transform",
            !readonly && "hover:scale-125 cursor-pointer",
            readonly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              iconSize,
              "transition-colors",
              (hovered || value) >= star
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-slate-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function DestinationReviews({ destinationId, destinationName }: DestinationReviewsProps) {
  const { user, isLoading: authLoading } = useAuth();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await api.get<{ data: IReview[] }>(`/reviews/${destinationId}`);
      setReviews(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (destinationId) {
      fetchReviews();
    }
  }, [destinationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      await api.post("/reviews", {
        destinationId,
        rating,
        comment: comment.trim(),
      });
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      fetchReviews(); // Refresh the list
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <section className="space-y-8 pt-10 border-t border-slate-100">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Community Reviews</h2>
          <p className="text-slate-500 mt-1">
            What travelers say about {destinationName}
          </p>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3 bg-amber-50 px-5 py-3 rounded-2xl border border-amber-100">
            <span className="text-3xl font-black text-amber-600">{avgRating}</span>
            <div>
              <StarRating value={Math.round(Number(avgRating))} readonly size="sm" />
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Review Form or Login Prompt */}
      {authLoading ? null : user ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6"
        >
          <h3 className="text-lg font-bold text-slate-800">Share Your Experience</h3>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Your Rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className="space-y-2">
            <label htmlFor="review-comment" className="text-sm font-semibold text-slate-600">
              Your Review
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other travelers about your experience here..."
              rows={4}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none placeholder:text-slate-400"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !rating || comment.trim().length < 10}
            className="rounded-full px-8 h-12 font-bold shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
            <LogIn className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Want to share your experience?</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Log in to write a review and help fellow travelers discover {destinationName}.
          </p>
          <Link href="/login">
            <Button className="rounded-full px-8 h-12 font-bold mt-2 shadow-md">
              Log in to Review
            </Button>
          </Link>
        </div>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No reviews yet</h3>
          <p className="text-slate-500">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0 overflow-hidden">
                  {review.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.user.image}
                      alt={review.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    review.user?.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="font-bold text-slate-800">{review.user?.name || "Anonymous"}</h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-1">
                    <StarRating value={review.rating} readonly size="sm" />
                  </div>
                  <p className="mt-3 text-slate-600 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
