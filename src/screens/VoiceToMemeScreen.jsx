import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { analyzeAudio } from '../services/api.service';

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceToMemeScreen = () => {
  // ── États ──────────────────────────────────────────────────────────────────
  const [isRecording, setIsRecording]   = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [recordTime, setRecordTime]     = useState('00:00');
  const [audioPath, setAudioPath]       = useState(null);
  const [transcription, setTranscription] = useState('');
  const [memeImageUrl, setMemeImageUrl] = useState(null);
  const [error, setError]               = useState('');

  // ── Permissions microphone ─────────────────────────────────────────────────
  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permission Microphone',
          message: 'MemeApp a besoin d\'accéder à votre microphone pour enregistrer.',
          buttonPositive: 'Autoriser',
          buttonNegative: 'Refuser',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS gère les permissions automatiquement
  };

  // ── Démarrer l'enregistrement ──────────────────────────────────────────────
  const startRecording = async () => {
    setError('');
    setMemeImageUrl(null);
    setTranscription('');

    const hasPermission = await requestMicPermission();
    if (!hasPermission) {
      Alert.alert('Permission refusée', 'Vous devez autoriser le microphone pour utiliser cette fonctionnalité.');
      return;
    }

    try {
      const path = await audioRecorderPlayer.startRecorder();
      setAudioPath(path);
      setIsRecording(true);

      // Mise à jour du timer toutes les secondes
      audioRecorderPlayer.addRecordBackListener((e) => {
        const seconds = Math.floor(e.currentPosition / 1000);
        const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
        const ss = String(seconds % 60).padStart(2, '0');
        setRecordTime(`${mm}:${ss}`);
      });
    } catch (err) {
      setError('Erreur lors du démarrage de l\'enregistrement.');
      console.error(err);
    }
  };

  // ── Arrêter l'enregistrement et envoyer ────────────────────────────────────
  const stopAndGenerate = async () => {
    try {
      const path = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setIsLoading(true);
      setError('');

      // Envoi au backend
      const result = await analyzeAudio(path);

      setTranscription(result.transcription);
      setMemeImageUrl(result.imageUrl);
    } catch (err) {
      setError('Erreur lors de la génération du mème. Réessaie.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Réinitialiser ──────────────────────────────────────────────────────────
  const reset = () => {
    setAudioPath(null);
    setTranscription('');
    setMemeImageUrl(null);
    setRecordTime('00:00');
    setError('');
  };

  // ── Rendu ──────────────────────────────────────────────────────────────────
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Titre */}
      <Text style={styles.title}>🎙️ Voice-to-Meme</Text>
      <Text style={styles.subtitle}>Parle, et l'IA crée ton mème !</Text>

      {/* Bouton d'enregistrement */}
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordButtonActive]}
        onPress={isRecording ? stopAndGenerate : startRecording}
        disabled={isLoading}
      >
        <Text style={styles.recordIcon}>{isRecording ? '⏹' : '🎙️'}</Text>
        <Text style={styles.recordButtonText}>
          {isRecording ? 'Arrêter et générer' : 'Appuyer pour enregistrer'}
        </Text>
      </TouchableOpacity>

      {/* Timer */}
      {isRecording && (
        <View style={styles.timerContainer}>
          <View style={styles.timerDot} />
          <Text style={styles.timerText}>{recordTime}</Text>
        </View>
      )}

      {/* Chargement */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Transcription et génération en cours...</Text>
        </View>
      )}

      {/* Erreur */}
      {error !== '' && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Résultat : image + transcription */}
      {memeImageUrl && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Ton mème :</Text>

          {/* Image du mème */}
          <View style={styles.memeWrapper}>
            <Image
              source={{ uri: memeImageUrl }}
              style={styles.memeImage}
              resizeMode="cover"
            />
            {/* Transcription en sous-titre sur l'image */}
            <View style={styles.captionContainer}>
              <Text style={styles.captionText}>{transcription}</Text>
            </View>
          </View>

          {/* Transcription lisible en dessous */}
          <View style={styles.transcriptionBox}>
            <Text style={styles.transcriptionLabel}>📝 Transcription :</Text>
            <Text style={styles.transcriptionText}>{transcription}</Text>
          </View>

          {/* Bouton recommencer */}
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={styles.resetButtonText}>🔄 Recommencer</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 36,
  },

  // Bouton enregistrement
  recordButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 80,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 24,
  },
  recordButtonActive: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
  },
  recordIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 12,
  },

  // Timer
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  timerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DC2626',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    fontVariant: ['tabular-nums'],
  },

  // Chargement
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },

  // Erreur
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    width: '100%',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    textAlign: 'center',
  },

  // Résultat
  resultContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  memeWrapper: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  memeImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#E5E7EB',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.62)',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  captionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  // Transcription lisible
  transcriptionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  transcriptionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  transcriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Bouton reset
  resetButton: {
    marginTop: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
});

export default VoiceToMemeScreen;
