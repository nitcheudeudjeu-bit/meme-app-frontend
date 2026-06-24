// ============================================================
// MODE SIMULATION — met SIMULATION_MODE à false
// quand M1 a branché le vrai backend
// ============================================================
const SIMULATION_MODE = true;

const BACKEND_URL = 'http://192.168.x.x:3000';
// ⚠️ Remplace l'IP par celle de M1 quand le backend est prêt

const MOCK_RESPONSES = [
  { topText: 'MOI LE LUNDI MATIN', bottomText: 'VS MOI APRÈS LE CAFÉ ☕' },
  { topText: 'QUAND LE PROF DIT', bottomText: '"QUESTION FACILE" 💀' },
  { topText: 'MON CERVEAU À 3H DU MAT', bottomText: 'EN TRAIN DE RÉSOUDRE LA VIE' },
  { topText: "POV : T'AS OUBLIÉ DE COMMIT", bottomText: 'DEPUIS 3 JOURS 😭' },
  { topText: 'QUAND ÇA COMPILE', bottomText: 'DU PREMIER COUP 🚀' },
];

function getRandomMock() {
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function uploadImageAndAnalyze(imageAsset) {
  // MODE SIMULATION
  if (SIMULATION_MODE) {
    await delay(1500);
    return getRandomMock();
  }

  // MODE RÉEL
  const formData = new FormData();
  formData.append('image', {
    uri: imageAsset.uri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  const response = await fetch(`${BACKEND_URL}/api/analyze-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Erreur backend : ${err}`);
  }

  return response.json();
}
