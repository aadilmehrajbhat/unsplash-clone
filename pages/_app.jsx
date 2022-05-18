import Head from 'next/head';
import { UnsplashSearchProvider } from '@contexts/search-context';
import ThemeProvider from '@styles/index';

function UnsplashApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Beautiful Free Images & Photos | Unsplash</title>
      </Head>
      <ThemeProvider>
        <UnsplashSearchProvider>
          <Component {...pageProps} />
        </UnsplashSearchProvider>
      </ThemeProvider>
    </>
  );
}

export default UnsplashApp;
