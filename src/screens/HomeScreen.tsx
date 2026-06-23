import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<any>();
  const [textContext, setTextContext] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleRecording = (): void => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      Alert.alert("🎙️ Audio Capturé", "Prêt pour l'analyse.");
    }
  };

  const handleSelectImage = (): void => {
    setSelectedImage("image.jpg");
    Alert.alert("📸 Image sélectionnée", "Prête pour le remix.");
  };

  const handleGlobalGenerate = (): void => {
    if (!textContext.trim() && !isRecording && !selectedImage) {
      Alert.alert("Attention", "Veuillez activer au moins une méthode d'entrée.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Éditeur', {
        imageUrl: 'https://unsplash.com',
        aiTextTop: "QUAND LA REFONTE GRAPHIQUE",
        aiTextBottom: "EST TOTALEMENT SURBOOSTÉE",
      });
    }, 2200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.title}>Générateur Multimodal</Text>
        <Text style={styles.subtitle}>Activez vos canaux d'entrée pour concevoir un mème par IA</Text>

        {/* 1. TEXTE (CONTEXT READER) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>💬</Text>
            <View>
              <Text style={styles.cardTitle}>Context Reader</Text>
              <Text style={styles.cardMuted}>Analyse de texte contextuelle</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Collez ou saisissez un extrait de conversation..."
            placeholderTextColor="#6d6a94"
            multiline
            value={textContext}
            onChangeText={setTextContext}
            editable={!isLoading}
          />
        </View>

        {/* 2. AUDIO (VOICE-TO-MEME) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>🎙️</Text>
            <View>
              <Text style={styles.cardTitle}>Voice-to-Meme</Text>
              <Text style={styles.cardMuted}>Transcription audio par IA</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.micButton, isRecording && styles.micButtonActive]} 
            onPress={handleToggleRecording}
            disabled={isLoading}
          >
            <Text style={[styles.micButtonText, isRecording && styles.micButtonTextActive]}>
              {isRecording ? "🟢 Enregistrement actif (Stopper)" : "🎙️ Lancer le microphone"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. IMAGE (STATUS REMIXER) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>🖼️</Text>
            <View>
              <Text style={styles.cardTitle}>Status Remixer</Text>
              <Text style={styles.cardMuted}>Incrustation sur visuel existant</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSelectImage} disabled={isLoading}>
            <Text style={styles.secondaryButtonText}>
              {selectedImage ? "✅ Média chargé avec succès" : "📸 Parcourir la galerie mobile"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOUTON GLOBAL STYLE TIKKER/CYAN */}
        <TouchableOpacity 
          style={[styles.generateButton, isLoading && styles.disabledButton]} 
          onPress={handleGlobalGenerate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#0d0d14" />
          ) : (
            <Text style={styles.generateButtonText}>GÉNÉRER LE MÈME FINAL ⚡</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d0d14' },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', color: '#e8e6ff', textAlign: 'center', marginTop: 10, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#afa9ec', textAlign: 'center', marginBottom: 25, marginTop: 5, paddingHorizontal: 10 },
  card: { backgroundColor: '#18182a', borderRadius: 16, padding: 18, marginBottom: 20, borderWidth: 1.5, borderColor: '#3c3489' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  cardEmoji: { fontSize: 24, marginRight: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#e8e6ff' },
  cardMuted: { fontSize: 12, color: '#afa9ec', marginTop: 2 },
  input: { backgroundColor: '#0d0d14', color: '#e8e6ff', borderRadius: 12, padding: 14, textAlignVertical: 'top', fontSize: 14, height: 100, borderWidth: 1, borderColor: '#22223b' },
  secondaryButton: { backgroundColor: '#534ab7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  secondaryButtonText: { color: '#e8e6ff', fontWeight: '700', fontSize: 14 },
  micButton: { backgroundColor: '#2a1a2e', paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ff4e4e' },
  micButtonText: { color: '#ff4e4e', fontWeight: '700', fontSize: 14 },
  micButtonActive: { backgroundColor: '#1a2e1e', borderColor: '#4eaaff' },
  micButtonTextActive: { color: '#4eaaff' },
  generateButton: { backgroundColor: '#4eaaff', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 10, minHeight: 55, justifyContent: 'center', shadowColor: '#4eaaff', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  disabledButton: { backgroundColor: '#1e3a5f', opacity: 0.6 },
  generateButtonText: { color: '#0d0d14', fontWeight: '800', fontSize: 16, letterSpacing: 0.5 },
});
