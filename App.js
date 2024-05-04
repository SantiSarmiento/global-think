import React from "react";
import { Provider } from 'react-redux';
import { store } from "./src/state/store";
import Login from "./src/views/auth/Login";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Login />
      </PersistGate>
    </Provider>
  )
}

export default App;