import '../styles/globals.css';
import '../styles/github-btn.css';
import Head from 'next/head';
import { UnsplashSearchProvider } from '@contexts/search-context';

function UnsplashApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Beautiful Free Images & Photos | Unsplash</title>
      </Head>
      <UnsplashSearchProvider>
        <Component {...pageProps} />
      </UnsplashSearchProvider>
    </>
  );
}

export default UnsplashApp;
