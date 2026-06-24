import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  ActivityIndicator, StyleSheet,
  Alert, ScrollView, SafeAreaView,
} from 'react-native';
import { pickImageFromGallery, pickImageFromCamera } from './ImageSelector';
import { uploadImageAndAnalyze } from '../../services/imageApi';
import MemeCanvas from './MemeCanvas';

export default function StatusRemixerScreen() {
  const [imageAsset, setImageAsset] = useState(null);
  const [memeData, setMemeData]     = useState(null);
  const [loading, setLoading]       = useState(false);

  const handlePick = async (source) => {
    try {
      setMemeData(null);
      const asset = source === 'gallery'
        ? await pickImageFromGallery()
        : await pickImageFromCamera();
      if (!asset) return;
      setImageAsset(asset);
      setLoading(true);
      const result = await uploadImageAndAnalyze(asset);
      setMemeData(result);
    } catch (e) {
      Alert.alert('Erreur', e.message);
    } finally {
      setLoading(false);
    }
  };

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
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>🖼️ Status Remixer</Text>
        <Text style={styles.subtitle}>
          Choisis une image · l'IA génère ton mème
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary]}
            onPress={() => handlePick('gallery')}
            disabled={loading}
          >
            <Text style={styles.btnText}>📁  Galerie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => handlePick('camera')}
            disabled={loading}
          >
            <Text style={styles.btnText}>📷  Caméra</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color="#6D28D9" />
            <Text style={styles.loaderText}>Analyse en cours…</Text>
          </View>
        )}

        {imageAsset && memeData && !loading && (
          <>
            <MemeCanvas
              imageUri={imageAsset.uri}
              topText={memeData.topText}
              bottomText={memeData.bottomText}
            />
            <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
              <Text style={styles.retryText}>🔄  Regénérer le texte</Text>
            </TouchableOpacity>
          </>
        )}

        {!imageAsset && !loading && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>🖼️</Text>
            <Text style={styles.placeholderText}>
              Sélectionne une image pour commencer
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F3FF' },
  container: {
    flexGrow: 1, alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 32, paddingBottom: 40,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#1E1B4B', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 28 },
  buttonRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  btn: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12 },
  btnPrimary: { backgroundColor: '#6D28D9' },
  btnSecondary: { backgroundColor: '#4F46E5' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  loaderBox: { marginTop: 48, alignItems: 'center', gap: 12 },
  loaderText: { color: '#6D28D9', fontSize: 15, fontWeight: '600' },
  retryBtn: {
    marginTop: 16, borderWidth: 2, borderColor: '#6D28D9',
    paddingVertical: 12, paddingHorizontal: 28, borderRadius: 12,
  },
  retryText: { color: '#6D28D9', fontWeight: '700', fontSize: 15 },
  placeholder: { marginTop: 80, alignItems: 'center', gap: 12 },
  placeholderIcon: { fontSize: 64 },
  placeholderText: { color: '#9CA3AF', fontSize: 15, textAlign: 'center' },
});
