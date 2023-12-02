import React from 'react';
import { AppProps } from 'next/app';

import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-right" />
    </>
  );
}

export default MyApp;
