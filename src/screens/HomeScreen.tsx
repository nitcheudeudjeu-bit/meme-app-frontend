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
} from 'react-native';

export default function HomeScreen(): React.JSX.Element {
  const [textContext, setTextContext] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 💬 Fonction pour le Mode Texte (Context Reader)
  const handleGenerateFromText = (): void => {
    if (!textContext.trim()) {
      Alert.alert("Attention", "Veuillez saisir un texte pour l'analyse de contexte.");
      return;
    }
    Alert.alert("Context Reader ⚡", "Envoi du texte au serveur backend...");
  };

  // 🎙️ Fonction pour le Mode Audio (Voice-to-Meme)
  const handleToggleRecording = (): void => {
    if (!isRecording) {
      setIsRecording(true);
      console.log("Enregistrement audio démarré...");
    } else {
      setIsRecording(false);
      Alert.alert("Voice-to-Meme 🎙️", "Audio capturé ! Prêt pour la transcription Speech-to-Text.");
    }
  };

  // 🖼️ Fonction pour le Mode Image (Status Remixer)
  const handleSelectImage = (): void => {
    // Cette fonction sera complétée par le membre chargé du traitement d'image
    setSelectedImage("chemin/vers/image_temporaire.jpg");
    Alert.alert("Status Remixer 📸", "Image sélectionnée depuis la galerie !");
  };

  // 🚀 Bouton central de génération globale
  const handleGlobalGenerate = (): void => {
    Alert.alert("Générateur Multimodal", "Traitement global des données par l'IA...");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Générateur Multimodal</Text>
        <Text style={styles.subtitle}>Sélectionnez votre méthode d'entrée pour créer un mème</Text>

        {/* 1. SECTION CONTEXT READER (TEXTE) */}
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
            numberOfLines={4}
            value={textContext}
            onChangeText={setTextContext}
          />
        </View>

        {/* 2. SECTION VOICE-TO-MEME (AUDIO) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>🎙️</Text>
            <Text style={styles.cardTitle}>Voice-to-Meme (Audio)</Text>
          </View>
          <Text style={styles.cardDescription}>
            Enregistrez un message vocal ou un extrait audio pour l'analyser.
          </Text>
          
          <TouchableOpacity 
            style={[styles.micButton, isRecording && styles.micButtonActive]} 
            onPress={handleToggleRecording}
          >
            <Text style={[styles.micButtonText, isRecording && styles.micButtonTextActive]}>
              {isRecording ? "🟢 Enregistrement... (Cliquez pour stopper)" : "🔴 Lancer l'enregistrement"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. SECTION STATUS REMIXER (IMAGE) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>🖼️</Text>
            <Text style={styles.cardTitle}>Status Remixer (Image)</Text>
          </View>
          <Text style={styles.cardDescription}>
            Téléchargez une image pour lui ajouter du texte ou des modifications IA.
          </Text>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSelectImage}>
            <Text style={styles.secondaryButtonText}>
              {selectedImage ? "✅ Image sélectionnée" : "📸 Importer depuis la galerie"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOUTON GLOBAL DE GÉNÉRATION */}
        <TouchableOpacity style={styles.generateButton} onPress={handleGlobalGenerate}>
          <Text style={styles.generateButtonText}>GÉNÉRER LE MÈME FINAL ⚡</Text>
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
  card: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#2D2D2D' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardEmoji: { fontSize: 22, marginRight: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  cardDescription: { color: '#AAA', fontSize: 14, marginBottom: 15 },
  input: { backgroundColor: '#2A2A2A', color: '#FFF', borderRadius: 8, padding: 12, textAlignVertical: 'top', fontSize: 14, height: 90 },
  secondaryButton: { backgroundColor: '#2A2A2A', paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#444' },
  secondaryButtonText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  micButton: { backgroundColor: '#3A1E1E', paddingVertical: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E53935' },
  micButtonText: { color: '#E53935', fontWeight: 'bold', fontSize: 15 },
  micButtonActive: { backgroundColor: '#1E3A1E', borderColor: '#00E676' },
  micButtonTextActive: { color: '#00E676' },
  generateButton: { backgroundColor: '#00E676', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, elevation: 4 },
  generateButtonText: { color: '#121212', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
});
