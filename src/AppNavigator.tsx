import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import HistoryScreen from './screens/HistoryScreen';
import StatusRemixerScreen from './screens/StatusRemixer/StatusRemixerScreen';
import VoiceToMemeScreen from './screens/VoiceToMemeScreen'; // L'écran audio importé

const Tab = createBottomTabNavigator();

export default function AppNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Créer') return <Text style={{ fontSize: 20 }}>⚡</Text>;
          if (route.name === 'Audio') return <Text style={{ fontSize: 20 }}>🎙️</Text>;
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
      <Tab.Screen name="Créer" component={HomeScreen} />
      <Tab.Screen name="Audio" component={VoiceToMemeScreen} />
      <Tab.Screen name="Remixer" component={StatusRemixerScreen} />
      <Tab.Screen name="Éditeur" component={ResultScreen} />
      <Tab.Screen name="Historique" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
