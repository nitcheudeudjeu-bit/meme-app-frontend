import { Platform, PermissionsAndroid } from 'react-native';

// Demande la permission galerie selon la version Android
export async function requestGalleryPermission() {
  if (Platform.OS === 'android') {
    // 💡 SÉCURITÉ : On force la conversion en nombre entier pour éviter les bugs de comparaison
    const androidVersion = parseInt(Platform.Version, 10);

    // Android 13+ (API 33+) utilise impérativement READ_MEDIA_IMAGES
    const permission =
      androidVersion >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const result = await PermissionsAndroid.request(permission, {
      title: 'Permission Galerie 🖼️',
      message: "L'application a besoin d'accéder à vos photos pour générer des mèmes par IA.",
      buttonPositive: 'Autoriser',
      buttonNegative: 'Refuser',
    });

    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Permission galerie refusée');
    }
  }
}

// Demande la permission caméra
export async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permission Caméra 📷',
        message: "L'application a besoin d'accéder à votre appareil photo.",
        buttonPositive: 'Autoriser',
        buttonNegative: 'Refuser',
      }
    );

    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Permission caméra refusée');
    }
  }
}
