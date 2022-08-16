import {AppProps} from 'next/dist/shared/lib/router/router';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import '../styles/globals.css';
import Head from 'next/head';

const progress = new ProgressBar({
  size: 2,
  color: '#7351F5',
  className: 'progressBar',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({Component, pageProps, router}: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>OWL Top - наш лучший топ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
