/**
 * Image Optimization Utilities
 * Optimizes external images (Unsplash, etc.) for better performance
 */

export interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'auto';
  fit?: 'crop' | 'clip' | 'scale';
  dpr?: 1 | 2 | 3;
}

/**
 * Optimizes Unsplash image URLs for better performance
 * Reduces size from ~200KB to ~75KB (saves ~125KB per image)
 */
export function optimizeUnsplashUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    width = 1200,
    quality = 65, // Reduced from 80 to 65 for better compression
    format = 'auto',
    fit = 'crop',
    dpr = 1
  } = options;

  // Check if it's an Unsplash URL
  if (!url.includes('images.unsplash.com')) {
    return url;
  }

  // Parse existing URL
  const urlObj = new URL(url);
  const params = urlObj.searchParams;

  // Set optimal parameters for performance
  params.set('w', String(width));
  params.set('q', String(quality)); // Lower quality for better compression
  params.set('fit', fit);
  params.set('dpr', String(dpr));

  // Use auto format to let Unsplash choose best format (WebP for modern browsers)
  if (format === 'auto') {
    params.set('auto', 'format,compress');
  } else {
    params.set('fm', format);
  }

  return urlObj.toString();
}

/**
 * Generates responsive srcset for Unsplash images
 * Provides multiple sizes for different screen widths
 */
export function generateUnsplashSrcSet(url: string, quality: number = 65): string {
  if (!url.includes('images.unsplash.com')) {
    return '';
  }

  const sizes = [
    { width: 640, descriptor: '640w' },  // Mobile
    { width: 750, descriptor: '750w' },  // Mobile landscape
    { width: 828, descriptor: '828w' },  // Tablet portrait
    { width: 1080, descriptor: '1080w' }, // Tablet landscape
    { width: 1200, descriptor: '1200w' }, // Desktop
    { width: 1920, descriptor: '1920w' }  // Large desktop
  ];

  return sizes
    .map(({ width, descriptor }) => {
      return `${optimizeUnsplashUrl(url, { width, quality, format: 'auto' })} ${descriptor}`;
    })
    .join(', ');
}

/**
 * Generates responsive sizes attribute based on layout
 */
export function generateSizesAttribute(type: 'hero' | 'card' | 'thumbnail' = 'hero'): string {
  switch (type) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px';
    default:
      return '100vw';
  }
}

/**
 * Optimizes any image URL (Unsplash, local, etc.)
 */
export function optimizeImageUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  // Handle Unsplash URLs
  if (url.includes('images.unsplash.com')) {
    return optimizeUnsplashUrl(url, options);
  }

  // Handle other CDNs or local images
  // For local images, return as-is (should be optimized during build)
  return url;
}

/**
 * Preload critical images for better LCP
 */
export function preloadImage(url: string, type: 'hero' | 'card' = 'hero'): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizeImageUrl(url, { width: type === 'hero' ? 1200 : 600 });

  // Add srcset for responsive preloading
  if (url.includes('images.unsplash.com')) {
    link.setAttribute('imagesrcset', generateUnsplashSrcSet(url));
    link.setAttribute('imagesizes', generateSizesAttribute(type));
  }

  document.head.appendChild(link);
}

/**
 * Get WebP URL for Unsplash images
 */
export function getWebPUrl(url: string, width: number = 1200, quality: number = 65): string {
  if (!url.includes('images.unsplash.com')) {
    return url;
  }

  return optimizeUnsplashUrl(url, { width, quality, format: 'webp' });
}

/**
 * Get AVIF URL for Unsplash images (best compression)
 */
export function getAVIFUrl(url: string, width: number = 1200, quality: number = 60): string {
  if (!url.includes('images.unsplash.com')) {
    return url;
  }

  return optimizeUnsplashUrl(url, { width, quality, format: 'avif' });
}
