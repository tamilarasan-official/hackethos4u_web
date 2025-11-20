import { useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import { FlowingLinesBackground } from "@/components/backgrounds";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const ReviewsSection = () => {
  const { reviews, addReview } = useData();
  const activeReviews = reviews.filter(r => r.isActive);

  // Review submission modal state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    role: "",
    email: "",
    rating: 5 as 1 | 2 | 3 | 4 | 5,
    comment: "",
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  // Handle review submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewForm.name || !reviewForm.comment) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await addReview({
        name: reviewForm.name,
        role: reviewForm.role,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString(),
        isActive: false, // Pending admin approval
      });

      // Reset form
      setReviewForm({
        name: "",
        role: "",
        email: "",
        rating: 5,
        comment: "",
      });

      setShowSubmitModal(false);
      toast.success("Thank you! Your review has been submitted and is pending approval.");
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Duplicate reviews for infinite scroll effect if more than 3
  const duplicatedReviews = activeReviews.length > 3 ? [...activeReviews, ...activeReviews] : activeReviews;

  if (activeReviews.length === 0) {
    return null;
  }

  const shouldAutoScroll = activeReviews.length > 3;

  return (
    <section id="reviews" className={`relative py-20 md:py-28 ${shouldAutoScroll ? 'overflow-hidden' : ''}`}>
      <FlowingLinesBackground variant="wave" direction="rtl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide">
              SUCCESS STORIES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Student Reviews</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Hear from our successful students who transformed their careers
          </p>
          <div className="mt-8">
            <Button
              onClick={() => setShowSubmitModal(true)}
              className="rounded-full bg-primary text-black hover:bg-primary/90 font-semibold"
              size="lg"
            >
              <MessageSquarePlus className="w-5 h-5 mr-2" />
              Submit Your Review
            </Button>
          </div>
        </div>

        {/* Auto-scrolling container or grid */}
        {shouldAutoScroll ? (
          <div className="relative">
            <div className="flex gap-6 animate-scroll">
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="card-sleek p-6 flex-shrink-0 w-[380px] flex flex-col min-h-[280px]"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-muted-foreground mb-6 flex-grow line-clamp-6">
                  "{review.comment}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {review.role}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {activeReviews.map((review) => (
              <div
                key={review.id}
                className="card-sleek p-6 flex flex-col min-h-[280px]"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-muted-foreground mb-6 flex-grow line-clamp-6">
                  "{review.comment}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {review.role}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Review Modal */}
        <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Submit Your Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReview} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name *</label>
                <Input
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Role/Title (Optional)</label>
                <Input
                  value={reviewForm.role}
                  onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                  placeholder="e.g., Security Analyst, Student, Pentester"
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email (Optional - for follow-up)</label>
                <Input
                  type="email"
                  value={reviewForm.email}
                  onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star as 1 | 2 | 3 | 4 | 5 })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= reviewForm.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {reviewForm.rating === 5 && "Excellent!"}
                  {reviewForm.rating === 4 && "Very Good"}
                  {reviewForm.rating === 3 && "Good"}
                  {reviewForm.rating === 2 && "Fair"}
                  {reviewForm.rating === 1 && "Needs Improvement"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Review *</label>
                <Textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your experience with our courses or services..."
                  required
                  rows={5}
                  className="rounded-lg bg-black border-white/10 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Your review will be reviewed by our team before being published.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-full bg-primary text-black hover:bg-primary/90 font-semibold"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  variant="outline"
                  className="rounded-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ReviewsSection;
