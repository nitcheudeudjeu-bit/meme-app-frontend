import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import HistoryScreen from './screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator(): React.JSX.Element {
  
  // ℹ️ Fonction qui affiche le guide d'utilisation de l'application
  const showHelpDialog = () => {
    Alert.alert(
      "💡 Guide d'utilisation",
      "Bienvenue sur le Générateur Multimodal ! Voici comment créer votre mème :\n\n" +
      "1️⃣ Context Reader : Collez un extrait de texte ou une discussion (ex: depuis WhatsApp).\n\n" +
      "2️⃣ Voice-to-Meme : Cliquez sur le bouton micro pour enregistrer une note vocale.\n\n" +
      "3️⃣ Status Remixer : Importez une image depuis votre galerie.\n\n" +
      "⚡ Cliquez enfin sur le gros bouton vert pour laisser l'IA générer votre mème ! Vous pourrez ensuite modifier ses textes dans l'Éditeur.",
      [{ text: "J'ai compris", style: "default" }]
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            if (route.name === 'Créer') return <Text style={{ fontSize: 20 }}>⚡</Text>;
            if (route.name === 'Éditeur') return <Text style={{ fontSize: 20 }}>🎨</Text>;
            if (route.name === 'Historique') return <Text style={{ fontSize: 20 }}>📦</Text>;
            return <Text style={{ fontSize: 20 }}>❓</Text>;
          },
          tabBarActiveTintColor: '#00E676',
          tabBarInactiveTintColor: '#888',
          headerStyle: { backgroundColor: '#0d0d14' },
          headerTintColor: '#FFF',
          tabBarStyle: { backgroundColor: '#0d0d14', borderTopColor: '#18182a', height: 60, paddingBottom: 5 },
        })}
      >
        <Tab.Screen 
          name="Créer" 
          component={HomeScreen} 
          options={{
            // Rajoute le bouton d'aide en haut à droite de l'écran d'accueil
            headerRight: () => (
              <TouchableOpacity style={styles.helpButton} onPress={showHelpDialog}>
                <Text style={styles.helpIcon}>ℹ️</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Éditeur" component={ResultScreen} />
        <Tab.Screen name="Historique" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  helpButton: {
    marginRight: 15,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    fontSize: 16,
  },
});
