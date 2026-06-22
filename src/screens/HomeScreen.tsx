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
  const navigation = useNavigation<any>(); // Hook pour changer d'écran
  const [textContext, setTextContext] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 🎙️ Fonction pour le Mode Audio (Voice-to-Meme)
  const handleToggleRecording = (): void => {
    if (!isRecording) {
      setIsRecording(true);
      console.log("Enregistrement audio démarré...");
    } else {
      setIsRecording(false);
      Alert.alert("Voice-to-Meme 🎙️", "Audio capturé en mode simulation ! Prêt pour le Speech-to-Text.");
    }
  };

  // 🖼️ Fonction pour le Mode Image (Status Remixer)
  const handleSelectImage = (): void => {
    setSelectedImage("chemin/vers/image_temporaire.jpg");
    Alert.alert("Status Remixer 📸", "Image sélectionnée depuis la galerie (Simulation) !");
  };

  // 🚀 BOUTON GLOBAL : Simulation de la génération IA sans serveur backend
  const handleGlobalGenerate = (): void => {
    if (!textContext.trim() && !isRecording && !selectedImage) {
      Alert.alert("Attention", "Veuillez remplir au moins une méthode d'entrée (Saisir un texte, enregistrer un audio ou choisir une image).");
      return;
    }

    setIsLoading(true); // Démarre le rouet de chargement

    // On simule une attente de 2 secondes (le temps que l'IA fictive génère le mème)
    setTimeout(() => {
      setIsLoading(false); // Arrête le chargement
      
      // Navigation automatique vers l'onglet Éditeur avec les données simulées
      navigation.navigate('Éditeur', {
        imageUrl: 'https://unsplash.com', // Image générée par l'IA
        aiTextTop: "QUAND TOUT EST EN MODE SIMULATION",
        aiTextBottom: "MAIS QUE ÇA FONCTIONNE PARFAITEMENT",
      });
    }, 2000);
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
            editable={!isLoading}
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
            disabled={isLoading}
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
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSelectImage} disabled={isLoading}>
            <Text style={styles.secondaryButtonText}>
              {selectedImage ? "✅ Image sélectionnée" : "📸 Importer depuis la galerie"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOUTON GLOBAL DE GÉNÉRATION AVEC CHARGEMENT ANIMÉ */}
        <TouchableOpacity 
          style={[styles.generateButton, isLoading && styles.disabledButton]} 
          onPress={handleGlobalGenerate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <Text style={styles.generateButtonText}>GÉNÉRER LE MÈME FINAL ⚡</Text>
          )}
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
  generateButton: { backgroundColor: '#00E676', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, minHeight: 55, justifyContent: 'center' },
  disabledButton: { backgroundColor: '#00A353', opacity: 0.7 },
  generateButtonText: { color: '#121212', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
});
