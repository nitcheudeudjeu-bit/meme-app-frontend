import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/AppNavigator.tsx';
import SplashScreen from './src/screens/SplashScreen.tsx';

function App(): React.JSX.Element {
  // Variable d'état pour savoir si l'animation de démarrage est finie
  const [isSplashFinished, setIsSplashFinished] = useState<boolean>(false);

  return (
    <SafeAreaProvider style={styles.container}>
      {isSplashFinished ? (
        // Une fois fini, on affiche le Hub et les Onglets de l'application
        <AppNavigator />
      ) : (
        // Au tout premier clic sur l'icône, on affiche la page d'attente animée
        <SplashScreen onFinish={() => setIsSplashFinished(true)} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d14', // Synchronisé avec la couleur de fond de votre Splash
  },
});

export default App;
