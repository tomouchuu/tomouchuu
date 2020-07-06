import React from 'react';

import App from 'next/app';
import Head from 'next/head';

import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {normalize} from 'styled-normalize';

import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const theme = {
    borderRadius: ['4px', '50%'],
    breakpoints: ['620px'],
    colors: {
        text: '#fff',
        altText: '#333',
        background: '#1eb8d2',
        altBackground: '#ff4136',
    },
    containerSize: '550px',
    fonts: {
        body: "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif",
        heading: "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif",
        monospace: 'Menlo, monospace',
    },
    fontSizes: ['0.8rem', '1rem', '1.3rem', '2rem', '2.75rem'],
    fontWeights: {
        light: 200,
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 2,
        intro: 1.5,
        socials: 3
    },
    spacings: ['10px', '15px', '20px', '30px']
}

const GlobalStyle = createGlobalStyle`
    ${normalize}

    body {
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        font-family: ${props => props.theme.fonts.body};
        font-size: 16px;
        font-weight: ${props => props.theme.fontWeights.body};
    }

    a,
    a:hover {
        transition: all .2s;
    }

    img {
        max-width: 100%;
    }
`;

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
        <ThemeProvider theme={theme}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
        )
    }
}