import React, { useRef } from 'react';
import {
  View, Image, Text, StyleSheet,
  TouchableOpacity, Alert, Dimensions,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 40;

export default function MemeCanvas({ imageUri, topText, bottomText }) {
  const viewShotRef = useRef(null);

  const saveToGallery = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Active la permission galerie dans les réglages.');
        return;
      }
      const uri = await viewShotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('✅ Sauvegardé !', 'Ton mème est dans la galerie.');
    } catch (e) {
      Alert.alert('Erreur', e.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.95 }}>
        <View style={[styles.canvas, { width: CANVAS_SIZE, height: CANVAS_SIZE }]}>
          <Image
            source={{ uri: imageUri }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          {topText ? (
            <Text style={[styles.memeText, styles.top]}>{topText}</Text>
          ) : null}
          {bottomText ? (
            <Text style={[styles.memeText, styles.bottom]}>{bottomText}</Text>
          ) : null}
        </View>
      </ViewShot>

      <TouchableOpacity style={styles.saveBtn} onPress={saveToGallery}>
        <Text style={styles.saveBtnText}>💾  Sauvegarder dans la galerie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', marginTop: 24 },
  canvas: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#000' },
  memeText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    paddingHorizontal: 12,
  },
  top: { top: 14 },
  bottom: { bottom: 14 },
  saveBtn: {
    marginTop: 16,
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
