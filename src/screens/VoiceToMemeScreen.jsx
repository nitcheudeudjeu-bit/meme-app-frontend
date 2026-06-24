import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VoiceToMemeScreen() {
  const navigation = useNavigation();
  
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        setSeconds(0);
        
        // Redirection avec paramètres en JavaScript classique
        navigation.navigate('Éditeur', {
          imageUrl: 'https://unsplash.com',
          aiTextTop: "QUAND LA NOTE VOCALE",
          aiTextBottom: "S'EXÉCUTE SANS AUCUNE ERREUR EN JSX 🚀",
        });
      }, 2500);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Voice-to-Meme</Text>
        <Text style={styles.subtitle}>
          Enregistrez votre voix pour générer instantanément un mème personnalisé par IA
        </Text>

        <View style={styles.mainCard}>
          <Text style={styles.timer}>{formatTime(seconds)}</Text>
          
          <TouchableOpacity 
            style={[styles.micOuterCircle, isRecording && styles.micOuterActive]}
            onPress={handleToggleRecording}
            disabled={loading}
          >
            <View style={[styles.micInnerCircle, isRecording && styles.micInnerActive]}>
              <Text style={styles.micEmoji}>{isRecording ? "⏹️" : "🎙️"}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.statusText}>
            {isRecording ? "Enregistrement en cours... Appuyez pour analyser" : "Cliquez sur le micro pour parler"}
          </Text>
        </View>

        {loading && (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color="#4eaaff" />
            <Text style={styles.loaderText}>Analyse sémantique de l'audio en cours…</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d0d14' },
  container: { padding: 20, paddingBottom: 40, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: '#e8e6ff', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 13, color: '#afa9ec', textAlign: 'center', marginBottom: 35, marginTop: 5, paddingHorizontal: 15, lineHeight: 18 },
  mainCard: { backgroundColor: '#18182a', borderRadius: 20, width: '100%', padding: 30, alignItems: 'center', borderWidth: 1.5, borderColor: '#3c3489' },
  timer: { fontSize: 36, fontWeight: '800', color: '#e8e6ff', fontFamily: 'monospace', marginBottom: 25 },
  micOuterCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#22223b', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#3c3489' },
  micOuterActive: { borderColor: '#4eaaff', backgroundColor: '#132237' },
  micInnerCircle: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#534ab7', alignItems: 'center', justifyContent: 'center' },
  micInnerActive: { backgroundColor: '#ff4e4e' },
  micEmoji: { fontSize: 32, color: '#FFF' },
  statusText: { color: '#afa9ec', fontSize: 14, fontWeight: '600', marginTop: 25 },
  loaderBox: { marginTop: 40, alignItems: 'center', gap: 12 },
  loaderText: { color: '#4eaaff', fontSize: 14, fontWeight: '600', textAlign: 'center' }
});
