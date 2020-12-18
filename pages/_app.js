import React from 'react';

import App from 'next/app';
import Head from 'next/head';

// import "tailwindcss/tailwind.css";
import '../styles/globals.css';

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
            <>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                </Head>
                <Component {...pageProps} />
            </>
        )
    }
}