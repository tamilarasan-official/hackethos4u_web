import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cyber.jpg";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  countdown?: {
    days: number;
    hours: number;
  };
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Ethical Hacking Masterclass",
    subtitle: "6-Month Comprehensive Training Program",
    image: heroImage,
    countdown: { days: 5, hours: 12 },
  },
  {
    id: 2,
    title: "VAPT Professional Course",
    subtitle: "Hands-on Penetration Testing Training",
    image: heroImage,
    countdown: { days: 3, hours: 8 },
  },
  {
    id: 3,
    title: "Bug Bounty Bootcamp",
    subtitle: "Earn While You Learn",
    image: heroImage,
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="relative overflow-hidden rounded-3xl bg-card shadow-card">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0"
              }`}
            >
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-background">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-xl opacity-90">
                    {slide.subtitle}
                  </p>

                  {/* Countdown */}
                  {slide.countdown && (
                    <div className="bg-primary rounded-2xl px-6 py-4 inline-flex items-center gap-4 mb-8 w-fit shadow-lg animate-pulse">
                      <span className="text-lg font-bold text-primary-foreground">⏰ Offer Ends In:</span>
                      <span className="text-2xl font-bold text-primary-foreground">
                        {slide.countdown.days}d {slide.countdown.hours}h
                      </span>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="rounded-full px-8">
                      Register Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 bg-background/10 backdrop-blur-sm text-background border-background hover:bg-background hover:text-foreground"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-background rounded-full p-2 transition-smooth"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-background rounded-full p-2 transition-smooth"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentSlide
                    ? "bg-background w-8"
                    : "bg-background/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
