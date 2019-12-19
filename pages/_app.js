import React from 'react';

import App from 'next/app';
import Head from 'next/head';

import {createGlobalStyle, ThemeProvider} from 'styled-components';
import { normalize } from 'styled-normalize';

const theme = {
    colors: {
        text: '#111',
        background: '#fff',
        primary: '#07c',
        secondary: '#05a',
        accent: '#609',
        muted: '#f6f6f6f',
    },
    fonts: {
        body: "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif",
        heading: "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif",
        monospace: 'Menlo, monospace',
    },
    fontSizes: ['12px', '14px', '16px', '20px', '24px', '32px', '48px', '64px'],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125,
    }
  }

const GlobalStyle = createGlobalStyle`
    ${normalize}

    body {
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        font-family: ${props => props.theme.fonts.body};
        font-size: ${props => props.theme.fontSizes[2]};
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
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
        )
    }
}