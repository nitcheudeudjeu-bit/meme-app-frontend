import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

// Options pour photos ET vidéos
const MEDIA_OPTIONS = {
  mediaType: 'mixed', // photo + vidéo
  quality: 0.8,
  videoQuality: 'high',
  includeBase64: false,
  presentationStyle: 'pageSheet',
};

// Sélection depuis la galerie
export function pickImageFromGallery() {
  return new Promise((resolve, reject) => {
    launchImageLibrary(MEDIA_OPTIONS, (response) => {
      if (response.didCancel) {
        resolve(null);
      } else if (response.errorCode) {
        reject(new Error(response.errorMessage));
      } else {
        resolve(response.assets[0]);
      }
    });
  });
}

// Sélection depuis la caméra
export function pickImageFromCamera() {
  return new Promise((resolve, reject) => {
    launchCamera(MEDIA_OPTIONS, (response) => {
      if (response.didCancel) {
        resolve(null);
      } else if (response.errorCode) {
        reject(new Error(response.errorMessage));
      } else {
        resolve(response.assets[0]);
      }
    });
  });
    }
