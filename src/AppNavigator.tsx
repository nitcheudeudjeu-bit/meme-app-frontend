import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import HistoryScreen from './screens/HistoryScreen';
import StatusRemixerScreen from './screens/StatusRemixer/StatusRemixerScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator(): React.JSX.Element {
  
  const showHelpDialog = () => {
    Alert.alert(
      "💡 Guide d'utilisation",
      "Bienvenue sur le Générateur Multimodal !\n\n" +
      "1️⃣ Saisissez un texte dans Créer.\n" +
      "2️⃣ Importez une image dans Remixer.\n" +
      "⚡ Laissez l'IA générer votre mème !",
      [{ text: "J'ai compris", style: "default" }]
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Créer') return <Text style={{ fontSize: 20 }}>⚡</Text>;
          if (route.name === 'Remixer') return <Text style={{ fontSize: 20 }}>🖼️</Text>;
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
          headerRight: () => (
            <TouchableOpacity style={styles.helpButton} onPress={showHelpDialog}>
              <Text style={styles.helpIcon}>ℹ️</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Remixer" component={StatusRemixerScreen} />
      <Tab.Screen name="Éditeur" component={ResultScreen} />
      <Tab.Screen name="Historique" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  helpButton: { marginRight: 15, padding: 5, borderRadius: 20, backgroundColor: '#18182a', borderWidth: 1.5, borderColor: '#3c3489', width: 35, height: 35, alignItems: 'center', justifyContent: 'center' },
  helpIcon: { fontSize: 16 },
});
