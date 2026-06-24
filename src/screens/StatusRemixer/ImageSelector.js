import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { requestGalleryPermission, requestCameraPermission } from './permissions';

// Options communes
const IMAGE_OPTIONS = {
  mediaType: 'photo',
  quality: 0.8,
  includeBase64: false,
};

// Sélection depuis la galerie
export async function pickImageFromGallery() {
  await requestGalleryPermission();

  return new Promise((resolve, reject) => {
    launchImageLibrary(IMAGE_OPTIONS, (response) => {
      if (response.didCancel) {
        resolve(null);
      } else if (response.errorCode) {
        reject(new Error(response.errorMessage));
      } else {
        resolve(response.assets[0]); // { uri, width, height, ... }
      }
    });
  });
}

// Sélection depuis la caméra
export async function pickImageFromCamera() {
  await requestCameraPermission();

  return new Promise((resolve, reject) => {
    launchCamera(IMAGE_OPTIONS, (response) => {
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
