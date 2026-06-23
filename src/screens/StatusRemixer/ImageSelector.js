import * as ImagePicker from 'expo-image-picker';
import { requestGalleryPermission, requestCameraPermission } from './permissions';

export async function pickImageFromGallery() {
  await requestGalleryPermission();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });
  if (!result.canceled) return result.assets[0];
  return null;
}

export async function pickImageFromCamera() {
  await requestCameraPermission();
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.8,
  });
  if (!result.canceled) return result.assets[0];
  return null;
}
