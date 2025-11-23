import { memo } from 'react';
// Import optimized logo versions
import logo56WebP from '@/assets/optimized/logo-56.webp';
import logo56PNG from '@/assets/optimized/logo-56.png';
import logo48WebP from '@/assets/optimized/logo-48.webp';
import logo48PNG from '@/assets/optimized/logo-48.png';
import logo112WebP from '@/assets/optimized/logo-112.webp';
import logo112PNG from '@/assets/optimized/logo-112.png';
import logo96WebP from '@/assets/optimized/logo-96.webp';
import logo96PNG from '@/assets/optimized/logo-96.png';
import logo168WebP from '@/assets/optimized/logo-168.webp';
import logo168PNG from '@/assets/optimized/logo-168.png';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Optimized Logo Component (Memoized)
 *
 * Reduces logo file size by ~48 KiB (97% reduction):
 * - Original PNG: 49.5 KB
 * - Optimized WebP (56x63): 2.1 KB
 * - Optimized WebP (48x54): 1.7 KB
 *
 * Features:
 * - WebP format with PNG fallback
 * - Responsive images for retina displays (1x, 2x, 3x)
 * - Properly sized versions (no oversized images)
 * - Memoized to prevent re-renders on navigation
 */
const Logo = memo(({
  width = 56,
  height = 63,
  className = '',
  priority = true
}: LogoProps) => {

  // Select appropriate logo size based on width
  const isFooterSize = width <= 48;

  // WebP sources with retina support
  const webpSrcSet = isFooterSize
    ? `${logo48WebP} 1x, ${logo96WebP} 2x`
    : `${logo56WebP} 1x, ${logo112WebP} 2x, ${logo168WebP} 3x`;

  // PNG fallback sources with retina support
  const pngSrcSet = isFooterSize
    ? `${logo48PNG} 1x, ${logo96PNG} 2x`
    : `${logo56PNG} 1x, ${logo112PNG} 2x, ${logo168PNG} 3x`;

  // Fallback src
  const fallbackSrc = isFooterSize ? logo48PNG : logo56PNG;

  return (
    <picture>
      {/* WebP format - Best compression (97% size reduction) */}
      <source
        srcSet={webpSrcSet}
        type="image/webp"
        width={width}
        height={height}
      />

      {/* PNG fallback - Still optimized and resized */}
      <source
        srcSet={pngSrcSet}
        type="image/png"
        width={width}
        height={height}
      />

      {/* Final fallback */}
      <img
        src={fallbackSrc}
        alt="Hackethos4U Logo"
        width={width}
        height={height}
        className={`rounded-lg bg-white p-1 ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: 'contain'
        }}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
});

Logo.displayName = 'Logo';

export default Logo;
