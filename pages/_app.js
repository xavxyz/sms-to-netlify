import App, { Container } from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { GlobalStyles } from '../components/_styles';

export default class extends App {
  static async getInitialProps(ctx) {
    const { Component: Page, router } = ctx;

    let pageProps = {};
    if (Page.getInitialProps) {
      pageProps = await Page.getInitialProps(ctx);
    }

    // Run all GraphQL queries in the component tree
    const client = initApollo();
    if (!process.browser) {
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={client}>
            <Page {...pageProps} />
          </ApolloProvider>
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        console.error('Error while running `getDataFromTree`', error);
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
    }

    // Extract query data from the Apollo store
    const data = client.cache.extract();
    return {
      ...pageProps,
      data,
    };
  }

  render() {
    const { Component: Page, pageProps, data } = this.props;
    const client = initApollo(data);

    return (
      <Container>
        <Head>
          <title>SMS to Netlify — by Xavier Cazalot</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="stylesheet" href="https://use.typekit.net/ayh2bbx.css" />
        </Head>
        <ApolloProvider client={client}>
          <Page {...pageProps} />
          <GlobalStyles />
        </ApolloProvider>
      </Container>
    );
  }
}

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

// Polyfill IntersectionObserver on the client for WebKit browsers
if (process.browser) {
  require('intersection-observer');
}

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `https://serve.onegraph.com/dynamic?app_id=${
        publicRuntimeConfig.ONEGRAPH_APP_ID
      }`,
      headers: {
        Authentication: `Bearer ${
          serverRuntimeConfig.ONEGRAPH_BUILD_API_TOKEN
        }`,
      },
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
