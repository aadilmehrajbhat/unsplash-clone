import '../styles/globals.css';
import '../styles/github-btn.css';
import { UnsplashSearchProvider } from '@contexts/search-context';

function UnsplashApp({ Component, pageProps }) {
  return (
    <UnsplashSearchProvider>
      <Component {...pageProps} />
    </UnsplashSearchProvider>
  );
}

export default UnsplashApp;
