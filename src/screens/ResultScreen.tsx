import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Image } from 'react-native';

export default function ResultScreen(): React.JSX.Element {
  const [topText, setTopText] = useState<string>('QUAND MON CODE COMPILE');
  const [bottomText, setBottomText] = useState<string>('DU PREMIER COUP');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Laboratoire du Mème</Text>
        <Text style={styles.subtitle}>Visualisez et modifiez le mème généré</Text>
        <View style={styles.memeContainer}>
          <Image
            source={{ uri: 'https://unsplash.com' }}
            style={styles.memeImage}
          />
          <Text style={[styles.memeText, styles.topMemeText]}>{topText.toUpperCase()}</Text>
          <Text style={[styles.memeText, styles.bottomMemeText]}>{bottomText.toUpperCase()}</Text>
        </View>
        <View style={styles.editCard}>
          <Text style={styles.cardTitle}>✍️ Ajuster les textes</Text>
          <Text style={styles.label}>Texte supérieur</Text>
          <TextInput style={styles.input} value={topText} onChangeText={setTopText} placeholderTextColor="#666" />
          <Text style={styles.label}>Texte inférieur</Text>
          <TextInput style={styles.input} value={bottomText} onChangeText={setBottomText} placeholderTextColor="#666" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#AAA', textAlign: 'center', marginBottom: 25, marginTop: 5 },
  memeContainer: { position: 'relative', width: '100%', height: 320, borderRadius: 12, overflow: 'hidden', backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2D2D2D', marginBottom: 20 },
  memeImage: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.85 },
  memeText: { position: 'absolute', left: 10, right: 10, color: '#FFF', fontSize: 22, fontWeight: '900', textAlign: 'center', textShadowColor: '#000', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4 },
  topMemeText: { top: 15 },
  bottomMemeText: { bottom: 15 },
  editCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#2D2D2D' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 15 },
  label: { color: '#AAA', fontSize: 12, marginBottom: 6, fontWeight: '600' },
  input: { backgroundColor: '#2A2A2A', color: '#FFF', borderRadius: 8, padding: 12, fontSize: 14, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
});
