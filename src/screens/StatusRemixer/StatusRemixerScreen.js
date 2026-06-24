import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { pickImageFromGallery, pickImageFromCamera } from './ImageSelector';
import { uploadImageAndAnalyze } from '../../services/imageApi';
import MemeCanvas from './MemeCanvas';

export default function StatusRemixerScreen() {
  const [imageAsset, setImageAsset] = useState(null);
  const [memeData, setMemeData]     = useState(null);
  const [loading, setLoading]       = useState(false);

  // 📸 Sélection d'image (Galerie ou Caméra)
  const handlePick = async (source) => {
    try {
      setMemeData(null);
      
      // Appel des fonctions logiques du fichier ImageSelector.js
      const asset = source === 'gallery'
        ? await pickImageFromGallery()
        : await pickImageFromCamera();
        
      if (!asset) return; // Si l'utilisateur annule
      
      setImageAsset(asset);
      setLoading(true);
      
      // Appel de la fonction de simulation du fichier imageApi.js
      const result = await uploadImageAndAnalyze(asset);
      setMemeData(result);
    } catch (e) {
      Alert.alert('Erreur Système', e.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Mode Simulation : Régénérer une punchline aléatoire sur la même image
  const handleRetry = async () => {
    if (!imageAsset) return;
    try {
      setLoading(true);
      setMemeData(null);
      const result = await uploadImageAndAnalyze(imageAsset);
      setMemeData(result);
    } catch (e) {
      Alert.alert('Erreur', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Status Remixer</Text>
        <Text style={styles.subtitle}>
          Sélectionnez un média source pour générer une punchline par Intelligence Artificielle
        </Text>

        {/* CARTES DE COMMANDE : BOUTONS GALERIE & CAMÉRA HARMONISÉS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnGallery]}
            onPress={() => handlePick('gallery')}
            disabled={loading}
          >
            <Text style={styles.btnText}>📁  Ouvrir la Galerie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnCamera]}
            onPress={() => handlePick('camera')}
            disabled={loading}
          >
            <Text style={styles.btnText}>📷  Appareil Photo</Text>
          </TouchableOpacity>
        </View>

        {/* DECK DE CHARGEMENT FUTURISTE STYLE LOGO SPLASH */}
        {loading && (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color="#4eaaff" />
            <Text style={styles.loaderText}>Analyse neuronale de l'image en cours…</Text>
          </View>
        )}

        {/* RENDU TECHNIQUE : AFFICHAGE DU CANVAS DU MÈME FINI */}
        {imageAsset && memeData && !loading && (
          <View style={styles.resultContainer}>
            <MemeCanvas
              imageUri={imageAsset.uri}
              topText={memeData.topText}
              bottomText={memeData.bottomText}
            />
            
            <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
              <Text style={styles.retryText}>🔄  Régénérer une punchline IA</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ÉCRAN DE VEILLE / PLACEHOLDER QUAND AUCUN MÉDIA N'EST CHARGÉ */}
        {!imageAsset && !loading && (
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderIcon}>🖼️</Text>
            <Text style={styles.placeholderText}>
              Aucun support visuel détecté. S'il vous plaît, importez une image ou un sticker pour démarrer l'analyse de contexte.
            </Text>
            <View style={styles.badgeSimul}>
              <Text style={styles.badgeText}>🤖 MODE SIMULATION ACTIF</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#0d0d14' // Fond noir/violet profond de votre SplashScreen
  },
  container: {
    padding: 20, 
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#e8e6ff', // Couleur textPrimary de votre Splash
    textAlign: 'center', 
    marginTop: 10, 
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#afa9ec', // Couleur textMuted de votre Splash
    textAlign: 'center', 
    marginBottom: 25, 
    marginTop: 5, 
    paddingHorizontal: 15,
    lineHeight: 18,
  },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  btn: { 
    flex: 0.48,
    paddingVertical: 15, 
    borderRadius: 14, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  btnGallery: { 
    backgroundColor: '#534ab7', // Couleur violetDark de votre Splash
    shadowColor: '#534ab7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  btnCamera: { 
    backgroundColor: '#18182a', // Couleur surface de votre Splash
    borderWidth: 1.5, 
    borderColor: '#3c3489' // Bordure indigo
  },
  btnText: { 
    color: '#e8e6ff', 
    fontWeight: '700', 
    fontSize: 14 
  },
  loaderBox: { 
    marginTop: 60, 
    alignItems: 'center', 
    gap: 12 
  },
  loaderText: { 
    color: '#4eaaff', // Accentuation Cyan éclatante du Splash
    fontSize: 15, 
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
  },
  retryBtn: {
    marginTop: 20, 
    borderWidth: 1.5, 
    borderColor: '#3c3489',
    paddingVertical: 14, 
    width: '100%',
    borderRadius: 14, 
    backgroundColor: '#18182a',
    alignItems: 'center',
  },
  retryText: { 
    color: '#afa9ec', 
    fontWeight: '700', 
    fontSize: 15 
  },
  placeholderCard: { 
    marginTop: 40, 
    backgroundColor: '#18182a',
    borderRadius: 16,
    padding: 25,
    width: '100%',
    alignItems: 'center', 
    borderWidth: 1.5,
    borderColor: '#3c3489',
    gap: 15 
  },
  placeholderIcon: { 
    fontSize: 54, 
    opacity: 0.7 
  },
  placeholderText: { 
    color: '#afa9ec', 
    fontSize: 14, 
    textAlign: 'center', 
    lineHeight: 22 
  },
  badgeSimul: {
    backgroundColor: '#1e1e30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3c3489',
    marginTop: 5,
  },
  badgeText: {
    color: '#4eaaff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  }
});
