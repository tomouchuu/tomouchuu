import React from 'react';
import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Personal/Portfolio site for Thomas Moore. Frontend Developer from Chelmsford, UK" />
                <title>Thomas Moore</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
};

export default MyApp;
