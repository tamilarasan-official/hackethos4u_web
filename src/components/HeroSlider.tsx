import { useState, useEffect, useMemo, useRef, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import { FlowingLinesBackground } from "@/components/backgrounds";
import OptimizedImage from "@/components/OptimizedImage";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired?: boolean;
}

const HeroSlider = () => {
  const { banners } = useData();
  const activeBanners = useMemo(() => banners.filter(b => b.isActive), [banners]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, TimeRemaining>>({});
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-advance slides
  useEffect(() => {
    if (activeBanners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    }, 8000); // 8 seconds delay between slides

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
              expired: false,
            };
          } else {
            // Countdown has expired - show expired message
            newTimeRemaining[banner.id] = {
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
              expired: true,
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

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum distance for a swipe to be registered

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - go to next slide
        nextSlide();
      } else {
        // Swipe right - go to previous slide
        prevSlide();
      }
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (activeBanners.length === 0) {
    return (
      <section className="relative w-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Hackethos4U</h2>
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
        <div
          className="relative overflow-hidden rounded-3xl bg-card shadow-card-hover touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
                {/* Background Image - Optimized for performance (WebP/AVIF, quality 65) */}
                <div className="absolute inset-0">
                  <OptimizedImage
                    src={banner.image}
                    alt={banner.title}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    width={1200}
                    height={520}
                    type="hero"
                    quality={65}
                    className="w-full h-full"
                  />
                  {/* Moderate gradient overlay - darker on left for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                  {/* Bottom vignette for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-20 text-white">
                  <div className="max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 leading-tight tracking-tight drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}>
                      {banner.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-5 md:mb-6 opacity-95 font-normal leading-relaxed tracking-wide drop-shadow-xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                      {banner.subtitle}
                    </p>

                    {/* Countdown Timer */}
                    {banner.countdown && timeRemaining[banner.id] && (
                      <div className="bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl px-5 py-3 inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6 shadow-2xl">
                        {timeRemaining[banner.id].expired ? (
                          // Expired State
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🎯</span>
                            <div>
                              <div className="text-lg md:text-xl font-extrabold tracking-wide" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                Offer Ended
                              </div>
                              <div className="text-xs md:text-sm opacity-90 font-medium">
                                Contact us for current offers
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Active Countdown
                          <>
                            <span className="text-sm md:text-base font-bold flex items-center gap-2 tracking-wide" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                              <span className="text-lg">⏰</span>
                              Offer Ends In:
                            </span>
                            <div className="flex gap-2 md:gap-3">
                              <div className="text-center">
                                <div className="text-xl md:text-3xl font-extrabold bg-white/20 backdrop-blur-md rounded-xl px-2.5 py-1.5 min-w-[50px] md:min-w-[60px] border border-white/20 shadow-lg tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                  {timeRemaining[banner.id].days}
                                </div>
                                <div className="text-xs mt-1 opacity-90 font-semibold tracking-wider uppercase">Days</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl md:text-3xl font-extrabold bg-white/20 backdrop-blur-md rounded-xl px-2.5 py-1.5 min-w-[50px] md:min-w-[60px] border border-white/20 shadow-lg tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                  {String(timeRemaining[banner.id].hours).padStart(2, '0')}
                                </div>
                                <div className="text-xs mt-1 opacity-90 font-semibold tracking-wider uppercase">Hours</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl md:text-3xl font-extrabold bg-white/20 backdrop-blur-md rounded-xl px-2.5 py-1.5 min-w-[50px] md:min-w-[60px] border border-white/20 shadow-lg tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                  {String(timeRemaining[banner.id].minutes).padStart(2, '0')}
                                </div>
                                <div className="text-xs mt-1 opacity-90 font-semibold tracking-wider uppercase">Mins</div>
                              </div>
                              <div className="text-center hidden sm:block">
                                <div className="text-xl md:text-3xl font-extrabold bg-white/20 backdrop-blur-md rounded-xl px-2.5 py-1.5 min-w-[50px] md:min-w-[60px] border border-white/20 shadow-lg tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                  {String(timeRemaining[banner.id].seconds).padStart(2, '0')}
                                </div>
                                <div className="text-xs mt-1 opacity-90 font-semibold tracking-wider uppercase">Secs</div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 relative z-20 mb-12 sm:mb-0">
                      {banner.ctaLink ? (
                        <Link to={banner.ctaLink}>
                          <Button size="default" className="rounded-full px-6 md:px-8 py-2 md:py-3 bg-white text-primary hover:bg-white/90 shadow-xl font-semibold text-sm md:text-base lg:text-lg w-full sm:w-auto">
                            {banner.ctaText || 'Learn More'}
                          </Button>
                        </Link>
                      ) : (
                        <Button size="default" className="rounded-full px-6 md:px-8 py-2 md:py-3 bg-white text-primary hover:bg-white/90 shadow-xl font-semibold text-sm md:text-base lg:text-lg w-full sm:w-auto">
                          {banner.ctaText || 'Learn More'}
                        </Button>
                      )}
                      <Link to="/contact">
                        <Button
                          size="default"
                          variant="outline"
                          className="rounded-full px-6 md:px-8 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 hover:bg-white hover:text-primary font-semibold text-sm md:text-base lg:text-lg w-full sm:w-auto"
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

          {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
          {activeBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="hidden md:block absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 md:p-3 transition-smooth shadow-lg border border-white/20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="hidden md:block absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 md:p-3 transition-smooth shadow-lg border border-white/20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Slide Indicators - Fixed width containers to prevent layout shift */}
          {activeBanners.length > 1 && (
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {activeBanners.map((_, index) => (
                <div key={index} className="w-10 md:w-12 flex justify-center">
                  <button
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white w-10 md:w-12 shadow-lg"
                        : "bg-white/40 w-2 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(HeroSlider);
