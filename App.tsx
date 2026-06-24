import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/AppNavigator.tsx';
import SplashScreen from './src/screens/SplashScreen.tsx';

function App(): React.JSX.Element {
  const [isSplashFinished, setIsSplashFinished] = useState<boolean>(false);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d14" />
      
      {/* 🚀 SOLUTION : Le conteneur enveloppe TOUTE l'application dès le départ */}
      <NavigationContainer>
        {isSplashFinished ? (
          <AppNavigator />
        ) : (
          <SplashScreen onFinish={() => setIsSplashFinished(true)} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d14',
  },
});

export default App;
