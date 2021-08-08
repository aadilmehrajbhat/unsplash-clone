import '@styles/globals.css';
import '@styles/github-btn.css';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { UnsplashSearchProvider } from '@contexts/search-context';
import { GlobalStyle, theme } from '@styles/index';

function UnsplashApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Beautiful Free Images & Photos | Unsplash</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UnsplashSearchProvider>
          <Component {...pageProps} />
        </UnsplashSearchProvider>
      </ThemeProvider>
    </>
  );
}

export default UnsplashApp;
