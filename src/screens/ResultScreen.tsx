import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Share from 'react-native-share';

export default function ResultScreen(): React.JSX.Element {
  const route = useRoute<any>();
  const defaultImage = 'https://unsplash.com';
  
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);
  const [topText, setTopText] = useState<string>('QUAND LE CODE COMPILE');
  const [bottomText, setBottomText] = useState<string>('DU PREMIER COUP');

  useEffect(() => {
    if (route.params) {
      if (route.params.imageUrl) setImageUrl(route.params.imageUrl);
      if (route.params.aiTextTop) setTopText(route.params.aiTextTop);
      if (route.params.aiTextBottom) setBottomText(route.params.aiTextBottom);
    }
  }, [route.params]);

  // 📤 PARTAGE 1 : Envoi ciblé sur WhatsApp
  const handleShareToWhatsApp = async () => {
    const shareOptions = {
      title: 'Mon Mème Multimodal',
      message: `*${topText.toUpperCase()}*\n\n[Généré par IA]\n\n*${bottomText.toUpperCase()}*`,
      url: imageUrl, 
      social: Share.Social.WHATSAPP, 
    } as any;

    try {
      await Share.shareSingle(shareOptions);
    } catch (error: any) {
      handleGlobalShare(); // En cas d'échec, on bascule sur le partage général
    }
  };

  // 🌐 PARTAGE 2 : Fonction avancée de partage global sur Internet / Toutes Applications
  const handleGlobalShare = async () => {
    const globalOptions = {
      title: 'Regarde mon mème IA !',
      message: `${topText.toUpperCase()} \n\n[Créé avec MemeApp Multimodale] \n\n${bottomText.toUpperCase()}`,
      url: imageUrl, // Envoie le lien de l'image sur internet ou le fichier local
    };

    try {
      // Cette méthode ouvre la feuille de partage native du téléphone (Android Chooser)
      const ShareResponse = await Share.open(globalOptions);
      console.log("Partage réussi :", ShareResponse);
    } catch (error) {
      console.log("Partage annulé ou en échec :", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.title}>Laboratoire d'Édition</Text>
        <Text style={styles.subtitle}>Ajustez les punchlines générées par le modèle d'IA</Text>

        {/* CONTENEUR DU MÈME */}
        <View style={styles.memeContainer}>
          <Image source={{ uri: imageUrl }} style={styles.memeImage} />
          <Text style={[styles.memeText, styles.topMemeText]}>{topText.toUpperCase()}</Text>
          <Text style={[styles.memeText, styles.bottomMemeText]}>{bottomText.toUpperCase()}</Text>
        </View>

        {/* FORMULAIRE */}
        <View style={styles.editCard}>
          <Text style={styles.cardTitle}>✍️ Personnalisation des Calques</Text>
          
          <Text style={styles.label}>TEXTE SUPÉRIEUR</Text>
          <TextInput style={styles.input} value={topText} onChangeText={setTopText} placeholderTextColor="#6d6a94" />

          <Text style={styles.label}>TEXTE INFÉRIEUR</Text>
          <TextInput style={styles.input} value={bottomText} onChangeText={setBottomText} placeholderTextColor="#6d6a94" />
        </View>

        {/* ZONE DES BOUTONS DE PARTAGE DE VOTRE RÔLE (MEMBRE 5) */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionButton, styles.whatsappBtn]} onPress={handleShareToWhatsApp}>
            <Text style={styles.whatsappBtnText}>💬 WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.internetBtn]} onPress={handleGlobalShare}>
            <Text style={styles.internetBtnText}>🌐 Partager sur Internet</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d0d14' },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '700', color: '#e8e6ff', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 13, color: '#afa9ec', textAlign: 'center', marginBottom: 25, marginTop: 5 },
  memeContainer: { position: 'relative', width: '100%', height: 340, borderRadius: 20, overflow: 'hidden', backgroundColor: '#18182a', borderWidth: 2, borderColor: '#3c3489', marginBottom: 25 },
  memeImage: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.8 },
  memeText: { position: 'absolute', left: 15, right: 15, color: '#FFF', fontSize: 22, fontWeight: '900', textAlign: 'center', textShadowColor: '#000', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 },
  topMemeText: { top: 20 },
  bottomMemeText: { bottom: 20 },
  editCard: { backgroundColor: '#18182a', borderRadius: 16, padding: 18, borderWidth: 1.5, borderColor: '#3c3489', marginBottom: 25 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#e8e6ff', marginBottom: 18 },
  label: { color: '#7f77dd', fontSize: 11, marginBottom: 6, fontWeight: '700', letterSpacing: 1 },
  input: { backgroundColor: '#0d0d14', color: '#e8e6ff', borderRadius: 10, padding: 12, fontSize: 14, marginBottom: 15, borderWidth: 1, borderColor: '#22223b' },
  
  // Alignement des boutons côte à côte
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  actionButton: { flex: 0.48, paddingVertical: 15, borderRadius: 14, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  
  // Style bouton WhatsApp (Cyan)
  whatsappBtn: { backgroundColor: '#2a2a3a', borderWidth: 1.5, borderColor: '#4eaaff' },
  whatsappBtnText: { color: '#4eaaff', fontWeight: '800', fontSize: 14 },
  
  // Style bouton Internet (Violet/Indigo éclatant tiré du Splash)
  internetBtn: { backgroundColor: '#534ab7', shadowColor: '#534ab7', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6 },
  internetBtnText: { color: '#e8e6ff', fontWeight: '800', fontSize: 14 },
});
