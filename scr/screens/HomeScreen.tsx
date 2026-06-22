import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';

export default function HomeScreen(): React.JSX.Element {
  const [textContext, setTextContext] = useState<string>('');

  const handleGenerateMeme = (): void => {
    if (!textContext.trim()) {
      Alert.alert("Attention", "Veuillez saisir un texte avant de générer.");
      return;
    }
    Alert.alert("⚡ Génération", "Envoi du texte au serveur backend Node.js pour analyse...");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Générateur de Mèmes</Text>
        <Text style={styles.subtitle}>Saisissez le contexte de votre discussion</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>💬</Text>
            <Text style={styles.cardTitle}>Context Reader (Texte)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Saisissez ou collez un extrait de discussion ici..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={6}
            value={textContext}
            onChangeText={setTextContext}
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateMeme}>
          <Text style={styles.generateButtonText}>GÉNÉRER LE MÈME ⚡</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#AAA', textAlign: 'center', marginBottom: 25, marginTop: 5 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 25, borderWidth: 1, borderColor: '#2D2D2D' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  cardEmoji: { fontSize: 22, marginRight: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  input: { backgroundColor: '#2A2A2A', color: '#FFF', borderRadius: 8, padding: 12, textAlignVertical: 'top', fontSize: 14, height: 120 },
  generateButton: { backgroundColor: '#00E676', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  generateButtonText: { color: '#121212', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
});
