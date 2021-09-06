import { store } from '../src/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store} key="provider">
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
