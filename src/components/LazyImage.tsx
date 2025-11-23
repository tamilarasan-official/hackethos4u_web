import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * LazyImage Component - Optimized image loading with:
 * - Native lazy loading
 * - Intersection Observer fallback
 * - WebP format support with JPEG fallback
 * - Responsive srcset
 * - Blur-up placeholder effect
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  objectFit = 'cover'
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Eager load if priority
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    // Intersection Observer for lazy loading fallback
    if (!('loading' in HTMLImageElement.prototype)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px' // Start loading 50px before image enters viewport
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    } else {
      setIsInView(true); // Native lazy loading supported
    }
  }, [priority, loading]);

  // Generate WebP source if original is JPEG/PNG
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.match(/\.(jpg|jpeg|png)$/i)) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return null;
  };

  const webpSrc = getWebPSrc(src);

  // Generate responsive srcset for different screen sizes
  const getSrcSet = (originalSrc: string) => {
    // For now, return the original. In production, you'd have different sizes
    // Example: `${originalSrc}?w=400 400w, ${originalSrc}?w=800 800w, ${originalSrc}?w=1200 1200w`
    return undefined;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%'
      }}
    >
      {/* Blur placeholder while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ backdropFilter: 'blur(10px)' }}
        />
      )}

      {isInView && (
        <picture>
          {/* WebP format for modern browsers */}
          {webpSrc && (
            <source
              srcSet={webpSrc}
              type="image/webp"
            />
          )}

          {/* Fallback to JPEG/PNG */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            srcSet={getSrcSet(src)}
            loading={loading}
            onLoad={handleLoad}
            className={`
              w-full h-full transition-opacity duration-500
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ objectFit }}
            width={width}
            height={height}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;
