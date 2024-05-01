import * as React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';
import AppRoutes from './routes';
import AppProvider from './routes/AppProvider';
import './assets/globalStyles/mainStyles.scss';

export default function App() {
  const { store, persistor } = reduxStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </Router>
      </PersistGate>
    </Provider>
  )
}