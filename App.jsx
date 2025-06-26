import Index from './src';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { injectStore } from './src/utils/authorizeAxios';

const App = () => {
  injectStore(store);
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
