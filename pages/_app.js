import Head from 'next/head';
import { StoreProvider } from 'easy-peasy';
import PlayerLayout from '../components/playerLayout';
import 'reset-css';
import { store } from '../lib/store';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no"
        />
      </Head>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </>
  );
};

export default MyApp;
