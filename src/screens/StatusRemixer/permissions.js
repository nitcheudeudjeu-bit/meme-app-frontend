import { Platform, PermissionsAndroid } from 'react-native';

export async function requestGalleryPermission() {
  if (Platform.OS !== 'android') return; // iOS géré automatiquement

  const androidVersion = Platform.Version;

  // Android 13+ (API 33+)
  if (androidVersion >= 33) {
    const results = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
    ]);

    const granted =
      results[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === 'granted' ||
      results[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === 'granted';

    if (!granted) throw new Error('Permission galerie refusée');

  } else {
    // Android 12 et moins
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (result !== 'granted') throw new Error('Permission galerie refusée');
  }
}

export async function requestCameraPermission() {
  if (Platform.OS !== 'android') return; // iOS géré automatiquement

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'Permission caméra',
      message: "L'app a besoin d'accéder à ta caméra",
      buttonPositive: 'Autoriser',
      buttonNegative: 'Refuser',
    }
  );

  if (result !== 'granted') throw new Error('Permission caméra refusée');
}
