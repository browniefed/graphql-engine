import type { AppProps } from "next/app";
import "../css/global.css";
import "../css/reset.css";
import "@/css/App.scss";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store} key="provider">
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
