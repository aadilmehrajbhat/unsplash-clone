import Head from 'next/head';
import { UnsplashSearchProvider } from '@contexts/search-context';
import ThemeProvider from '@styles/index';
import { QueryClientProvider, ReactQueryDevtools } from '@lib/query-client';

function UnsplashApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Beautiful Free Images & Photos | Unsplash</title>
      </Head>
      <QueryClientProvider>
        <ThemeProvider>
          <UnsplashSearchProvider>
            <Component {...pageProps} />
          </UnsplashSearchProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default UnsplashApp;
