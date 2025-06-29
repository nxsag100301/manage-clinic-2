import Index from './src';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { injectStore } from './src/utils/authorizeAxios';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

const App = () => {
  injectStore(store);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
