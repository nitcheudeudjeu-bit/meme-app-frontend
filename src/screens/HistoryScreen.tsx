import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, Dimensions } from 'react-native';

interface MemeItem { id: string; url: string; title: string; }
const MOCK_MEMES: MemeItem[] = [
  { id: '1', url: 'https://unsplash.com', title: 'Meme Discussion Projet' },
  { id: '2', url: 'https://unsplash.com', title: 'Meme Bug en Production' },
];
const CARD_SIZE: number = (Dimensions.get('window').width - 50) / 2;

export default function HistoryScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>La Mémothèque</Text>
        <Text style={styles.subtitle}>Historique de vos mèmes générés par texte</Text>
        <FlatList
          data={MOCK_MEMES}
          renderItem={({ item }) => (
            <View style={styles.memeCard}>
              <Image source={{ uri: item.url }} style={styles.memeImage} />
              <View style={styles.cardFooter}>
                <Text style={styles.cardText} numberOfLines={1}>{item.title}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 15 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#AAA', textAlign: 'center', marginBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  memeCard: { width: CARD_SIZE, height: CARD_SIZE + 40, backgroundColor: '#1E1E1E', borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#2D2D2D' },
  memeImage: { width: '100%', height: CARD_SIZE, resizeMode: 'cover' },
  cardFooter: { padding: 8, justifyContent: 'center' },
  cardText: { color: '#FFF', fontSize: 13, fontWeight: '600', textAlign: 'center' },
});
