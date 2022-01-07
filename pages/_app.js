import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { StoreProvider } from 'easy-peasy';
import PlayerLayout from '../components/playerLayout';
import 'reset-css';
import { store } from '../lib/store';

const theme = extendTheme({
  colors: {
    gray: {
      100: '#F5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

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
