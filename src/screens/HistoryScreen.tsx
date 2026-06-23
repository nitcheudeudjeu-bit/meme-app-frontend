import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, Dimensions } from 'react-native';

interface MemeItem { id: string; url: string; title: string; date: string; }

const MOCK_MEMES: MemeItem[] = [
  { id: '1', url: 'https://unsplash.com', title: 'Meme Tech Discussion', date: 'Aujourd\'hui' },
  { id: '2', url: 'https://unsplash.com', title: 'Erreur Compilation', date: 'Hier' },
  { id: '3', url: 'https://unsplash.com', title: 'Réunion d\'Équipe', date: 'Il y a 3 jours' },
];

const CARD_SIZE = (Dimensions.get('window').width - 50) / 2;

export default function HistoryScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>La Mémothèque</Text>
        <Text style={styles.subtitle}>Consultez votre catalogue d'archives multimodales</Text>

        <FlatList
          data={MOCK_MEMES}
          renderItem={({ item }) => (
            <View style={styles.memeCard}>
              <Image source={{ uri: item.url }} style={styles.memeImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardText} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d0d14' },
  container: { flex: 1, paddingHorizontal: 15 },
  title: { fontSize: 26, fontWeight: '700', color: '#e8e6ff', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 13, color: '#afa9ec', textAlign: 'center', marginBottom: 25, marginTop: 5 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  memeCard: { width: CARD_SIZE, backgroundColor: '#18182a', borderRadius: 14, overflow: 'hidden', borderWidth: 1.5, borderColor: '#3c3489' },
  memeImage: { width: '100%', height: CARD_SIZE - 20, resizeMode: 'cover' },
  cardInfo: { padding: 10 },
  cardText: { color: '#e8e6ff', fontSize: 13, fontWeight: '700' },
  cardDate: { color: '#7f77dd', fontSize: 10, marginTop: 4, fontWeight: '600' },
});
