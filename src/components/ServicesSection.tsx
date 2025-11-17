import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FlowingLinesBackground } from "@/components/backgrounds";
import { useData } from "@/contexts/DataContext";

const ServicesSection = () => {
  const { services } = useData();
  const activeServices = services.filter(s => s.isActive);

  // Get icon component from icon name
  const getIconComponent = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className="w-12 h-12" /> : <Icons.Shield className="w-12 h-12" />;
  };

  // Duplicate services for infinite scroll effect if more than 3
  const duplicatedServices = activeServices.length > 3 ? [...activeServices, ...activeServices] : activeServices;

  if (activeServices.length === 0) {
    return null;
  }

  const shouldAutoScroll = activeServices.length > 3;

  return (
    <section className={`relative py-20 md:py-28 ${shouldAutoScroll ? 'overflow-hidden' : ''}`}>
      <FlowingLinesBackground variant="wave" direction="rtl" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with better spacing */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Icons.Shield className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide">
              PROFESSIONAL SERVICES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Professional cybersecurity testing services to protect your digital assets with cutting-edge techniques
          </p>
        </div>

        {/* Auto-scrolling container or grid */}
        {shouldAutoScroll ? (
          <div className="relative">
            <div className="flex gap-6 animate-scroll">
            {duplicatedServices.map((service, index) => {
              return (
                <div
                  key={`${service.id}-${index}`}
                  className="group relative flex-shrink-0 w-[360px]"
                >
                  {/* Card with gradient border effect */}
                  <div className="card-sleek p-8 h-full flex flex-col relative overflow-hidden">
                    {/* Top gradient accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/40 transition-all duration-300">
                        <div className="text-primary group-hover:scale-105 transition-transform duration-300">
                          {getIconComponent(service.icon)}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed">
                      {service.description}
                    </p>

                    {/* CTA Button */}
                    <Link to={`/services/${service.slug}`}>
                      <Button
                        className="w-full rounded-full bg-white/5 text-white border border-white/10 hover:bg-primary hover:text-black hover:border-primary font-semibold transition-all duration-300 group/btn"
                      >
                        Explore Service
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {activeServices.map((service) => (
              <div
                key={service.id}
                className="group relative"
              >
                <div className="card-sleek p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Top gradient accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/40 transition-all duration-300">
                      <div className="text-primary group-hover:scale-105 transition-transform duration-300">
                        {getIconComponent(service.icon)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <Link to={`/services/${service.slug}`}>
                    <Button
                      className="w-full rounded-full bg-white/5 text-white border border-white/10 hover:bg-primary hover:text-black hover:border-primary font-semibold transition-all duration-300 group/btn"
                    >
                      Explore Service
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
