import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Security Analyst",
    rating: 5,
    comment: "The ethical hacking course was incredibly comprehensive. The hands-on labs and real-world scenarios helped me land my dream job in cybersecurity.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Penetration Tester",
    rating: 5,
    comment: "Best VAPT training I've taken. The instructors are industry experts and the course material is always up-to-date with latest techniques.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Bug Bounty Hunter",
    rating: 5,
    comment: "The bug bounty bootcamp transformed my approach to vulnerability hunting. I earned my first bounty within 2 months of completing the course!",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Security Consultant",
    rating: 5,
    comment: "Professional training with excellent support. The practical approach and real-world projects made all the difference in understanding concepts.",
    date: "1 week ago",
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Reviews</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our successful students who transformed their careers
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="bg-card rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-smooth"
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
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="bg-card hover:bg-primary hover:text-primary-foreground rounded-full p-3 shadow-card transition-smooth"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextReview}
              className="bg-card hover:bg-primary hover:text-primary-foreground rounded-full p-3 shadow-card transition-smooth"
              aria-label="Next reviews"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
