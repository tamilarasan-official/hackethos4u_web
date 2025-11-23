import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import SEO, { createBreadcrumbSchema } from './SEO';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Component with Schema.org markup
 * Improves navigation and SEO with rich snippets
 */
const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  // Always include Home as first item
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: 'https://hackethos4u.com' },
    ...items
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      {/* Inject breadcrumb schema */}
      <SEO
        title=""
        description=""
        structuredData={breadcrumbSchema}
      />

      {/* Visual breadcrumb */}
      <nav
        className={`flex items-center space-x-2 text-sm ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
                )}

                {isLast ? (
                  <span className="text-primary font-medium" aria-current="page">
                    {isHome && <Home className="w-4 h-4 inline mr-1" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url.replace('https://hackethos4u.com', '')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isHome && <Home className="w-4 h-4 inline mr-1" />}
                    {isHome ? '' : item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
