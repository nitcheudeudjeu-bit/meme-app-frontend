import * as ImagePicker from 'expo-image-picker';

export async function requestGalleryPermission() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission galerie refusée. Active-la dans les réglages.');
  }
}

export async function requestCameraPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission caméra refusée. Active-la dans les réglages.');
  }
}
