import "../injectWindowEnv";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@/css/global.css";
import "@/css/App.scss";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
