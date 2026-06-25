// ============================================================
// MODE SIMULATION PURE — aucun appel serveur
// ============================================================

const MOCK_RESPONSES = [
  { topText: 'MOI LE LUNDI MATIN', bottomText: 'VS MOI APRÈS LE CAFÉ ☕' },
  { topText: 'QUAND LE PROF DIT', bottomText: '"QUESTION FACILE" 💀' },
  { topText: 'MON CERVEAU À 3H DU MAT', bottomText: 'EN TRAIN DE RÉSOUDRE LA VIE' },
  { topText: "POV : T'AS OUBLIÉ DE COMMIT", bottomText: 'DEPUIS 3 JOURS 😭' },
  { topText: 'QUAND ÇA COMPILE', bottomText: 'DU PREMIER COUP 🚀' },
  { topText: 'MOI AVANT LE PROJET', bottomText: 'VS MOI APRÈS 💀' },
];

function getRandomMock() {
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simule une analyse IA sans appel réseau
export async function uploadImageAndAnalyze(imageAsset) {
  await delay(1500); // simule le temps de traitement
  return getRandomMock();
}

// Quand le backend sera prêt (port 5000), décommenter ceci :
// export async function uploadImageAndAnalyze(imageAsset) {
//   const formData = new FormData();
//   formData.append('image', {
//     uri: imageAsset.uri,
//     name: 'photo.jpg',
//     type: imageAsset.type || 'image/jpeg',
//   });
//   const response = await fetch('http://192.168.x.x:5000/api/analyze-image', {
//     method: 'POST',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     body: formData,
//   });
//   return response.json();
// }
