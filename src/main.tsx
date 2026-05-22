import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .then(() => {
        if ('caches' in window) {
          return caches.keys().then((cacheNames) =>
            Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
          );
        }
        return undefined;
      })
      .catch((error) => {
        console.log('ServiceWorker cleanup failed:', error);
      });
  });
}

const rootElement = document.getElementById("root")!;

// Use hydration for pre-rendered pages, normal render for development
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  );
} else {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  );
}
