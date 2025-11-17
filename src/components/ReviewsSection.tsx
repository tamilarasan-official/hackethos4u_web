import { Star } from "lucide-react";
import { FlowingLinesBackground } from "@/components/backgrounds";
import { useData } from "@/contexts/DataContext";

const ReviewsSection = () => {
  const { reviews } = useData();
  const activeReviews = reviews.filter(r => r.isActive);

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
        </div>

        {/* Auto-scrolling container or grid */}
        {shouldAutoScroll ? (
          <div className="relative">
            <div className="flex gap-6 animate-scroll">
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="card-sleek p-6 flex-shrink-0 w-[380px]"
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
                <p className="text-sm text-muted-foreground mb-6">
                  "{review.comment}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border pt-4">
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
                className="card-sleek p-6"
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
                <p className="text-sm text-muted-foreground mb-6">
                  "{review.comment}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border pt-4">
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
      </div>
    </section>
  );
};

export default ReviewsSection;
