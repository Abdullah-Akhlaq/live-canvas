// import "../styles/globals.css";
import { AppProps } from "next/app";
import "./styleSheet/index.scss";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
