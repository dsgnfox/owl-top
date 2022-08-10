import {AppProps} from '../node_modules/next/dist/shared/lib/router/router';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({Component, pageProps, router}: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>OWL Top - наш лучший топ</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
                <meta property="og:locale" content="ru_RU"/>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
