import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { wrapper } from "../store/store";
import { UtilContextProvider } from "../context/UtilContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UtilContextProvider>
      <>
        <Navbar />
        <Component {...pageProps} />;
      </>
    </UtilContextProvider>
  );
}

export default wrapper.withRedux(MyApp);
