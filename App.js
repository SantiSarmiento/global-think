import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from "./src/state/store";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import AppNavigator from "./src/navigation/AppNavigator";
import { Platform } from "react-native";
import { handleAndroidPermissions, handleIOSPermissions } from "./src/utils/handlePermissions";

let persistor = persistStore(store)

const App = () => {

  useEffect(() => {
    if (Platform.OS === 'ios') {
      handleIOSPermissions();
    } else {
      handleAndroidPermissions();
    }
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              <AppNavigator />
        </PersistGate>
      </Provider>
    </GluestackUIProvider>
  )
}

export default App;