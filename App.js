import React from "react";
import { Provider } from 'react-redux';
import { store } from "./src/state/store";
import Login from "./src/views/auth/Login";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme

let persistor = persistStore(store)

const App = () => {

  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Login />
        </PersistGate>
      </Provider>
    </GluestackUIProvider>
  )
}

export default App;