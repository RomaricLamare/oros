// src/pages/_app.tsx
import "@/styles/globals.css";
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/700.css"; // Bold
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MainNav from "@/components/MainNav/MainNav";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import fetch from "cross-fetch";
import theme from "@/theme"; // Import du thème personnalisé
import AuthProvider from "@/context/authProvider";
import Head from "next/head";
import Link from "next/link";

export const client = new ApolloClient({
  uri: "http://localhost:4005/",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  credentials: "include",
});

function App({ Component, pageProps, ...props }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Oros</title> 
      </Head>
      <AppCacheProvider {...props}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <div className="app-container">
                <MainNav />
                <main className="main-content">
                  <Component {...pageProps} />
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      </AppCacheProvider>
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
