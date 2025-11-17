import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import { FlowingLinesBackground } from "@/components/backgrounds";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HeroSlider = () => {
  const { banners } = useData();
  const activeBanners = useMemo(() => banners.filter(b => b.isActive), [banners]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, TimeRemaining>>({});

  // Auto-advance slides
  useEffect(() => {
    if (activeBanners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeBanners.length]);

  // Countdown timer
  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeRemaining: Record<string, TimeRemaining> = {};

      activeBanners.forEach((banner) => {
        if (banner.countdown?.endDate) {
          const now = new Date().getTime();
          const end = new Date(banner.countdown.endDate).getTime();
          const distance = end - now;

          if (distance > 0) {
            newTimeRemaining[banner.id] = {
              days: Math.floor(distance / (1000 * 60 * 60 * 24)),
              hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((distance % (1000 * 60)) / 1000),
            };
          }
        }
      });

      setTimeRemaining(newTimeRemaining);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [activeBanners]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  if (activeBanners.length === 0) {
    return (
      <section className="relative w-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Orange Hub</h2>
            <p className="text-lg md:text-xl text-muted-foreground">Professional Cybersecurity Training & Services</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full">
      <FlowingLinesBackground variant="circuit" direction="ltr" />
      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-card shadow-card-hover">
          {/* Slides */}
          {activeBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100 relative"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="relative h-[450px] sm:h-[470px] md:h-[500px] lg:h-[520px]">
                {/* Background Image with Minimal Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Very light gradient for text readability only */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
                  {/* Subtle vignette for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-20 text-white">
                  <div className="max-w-3xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-lg">
                      {banner.title}
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 opacity-95 font-medium drop-shadow">
                      {banner.subtitle}
                    </p>

                    {/* Countdown Timer */}
                    {banner.countdown && timeRemaining[banner.id] && (
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-8 shadow-2xl">
                        <span className="text-base md:text-lg font-bold flex items-center gap-2">
                          <span className="text-2xl">⏰</span>
                          Offer Ends In:
                        </span>
                        <div className="flex gap-3 md:gap-4">
                          <div className="text-center">
                            <div className="text-2xl md:text-4xl font-bold bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[60px] md:min-w-[70px]">
                              {timeRemaining[banner.id].days}
                            </div>
                            <div className="text-xs md:text-sm mt-1 opacity-90">Days</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl md:text-4xl font-bold bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[60px] md:min-w-[70px]">
                              {String(timeRemaining[banner.id].hours).padStart(2, '0')}
                            </div>
                            <div className="text-xs md:text-sm mt-1 opacity-90">Hours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl md:text-4xl font-bold bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[60px] md:min-w-[70px]">
                              {String(timeRemaining[banner.id].minutes).padStart(2, '0')}
                            </div>
                            <div className="text-xs md:text-sm mt-1 opacity-90">Mins</div>
                          </div>
                          <div className="text-center hidden sm:block">
                            <div className="text-2xl md:text-4xl font-bold bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[60px] md:min-w-[70px]">
                              {String(timeRemaining[banner.id].seconds).padStart(2, '0')}
                            </div>
                            <div className="text-xs md:text-sm mt-1 opacity-90">Secs</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {banner.ctaLink ? (
                        <Link to={banner.ctaLink}>
                          <Button size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90 shadow-xl font-semibold text-base md:text-lg w-full sm:w-auto">
                            {banner.ctaText || 'Learn More'}
                          </Button>
                        </Link>
                      ) : (
                        <Button size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90 shadow-xl font-semibold text-base md:text-lg w-full sm:w-auto">
                          {banner.ctaText || 'Learn More'}
                        </Button>
                      )}
                      <Link to="/contact">
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full px-8 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 hover:bg-white hover:text-primary font-semibold text-base md:text-lg w-full sm:w-auto"
                        >
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          {activeBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 md:p-3 transition-smooth shadow-lg border border-white/20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 md:p-3 transition-smooth shadow-lg border border-white/20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {activeBanners.length > 1 && (
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {activeBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white w-10 md:w-12 shadow-lg"
                      : "bg-white/40 w-2 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
