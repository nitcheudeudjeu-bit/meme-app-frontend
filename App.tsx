import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// On ajoute l'extension .tsx explicite pour contourner le bug de localisation
import AppNavigator from './src/AppNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.container}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});

export default App;
