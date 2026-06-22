import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import HistoryScreen from './screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Correction ici : on extrait "route" depuis screenOptions
          // et on utilise une fonction simple pour l'icône
          tabBarIcon: () => {
            if (route.name === 'Créer') return <Text style={{ fontSize: 20 }}>⚡</Text>;
            if (route.name === 'Éditeur') return <Text style={{ fontSize: 20 }}>🎨</Text>;
            if (route.name === 'Historique') return <Text style={{ fontSize: 20 }}>📦</Text>;
            return <Text style={{ fontSize: 20 }}>❓</Text>;
          },
          tabBarActiveTintColor: '#00E676',
          tabBarInactiveTintColor: '#888',
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#FFF',
          tabBarStyle: { backgroundColor: '#121212', borderTopColor: '#222', height: 60, paddingBottom: 5 },
        })}
      >
        <Tab.Screen name="Créer" component={HomeScreen} />
        <Tab.Screen name="Éditeur" component={ResultScreen} />
        <Tab.Screen name="Historique" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
