import { Platform, PermissionsAndroid, Alert } from 'react-native';

// Demande la permission galerie selon la version Android
export async function requestGalleryPermission() {
  if (Platform.OS === 'android') {
    const androidVersion = Platform.Version;

    // Android 13+ utilise READ_MEDIA_IMAGES
    const permission =
      androidVersion >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const result = await PermissionsAndroid.request(permission, {
      title: 'Permission galerie',
      message: "L'app a besoin d'accéder à ta galerie",
      buttonPositive: 'Autoriser',
      buttonNegative: 'Refuser',
    });

    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Permission galerie refusée');
    }
  }
  // iOS : géré automatiquement par react-native-image-picker
}

// Demande la permission caméra
export async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permission caméra',
        message: "L'app a besoin d'accéder à ta caméra",
        buttonPositive: 'Autoriser',
        buttonNegative: 'Refuser',
      }
    );

    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Permission caméra refusée');
    }
  }
  // iOS : géré automatiquement par react-native-image-picker
        }
