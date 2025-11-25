import { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, Alert, Modal, Button } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import styles from "../styles/profile"
import { colors } from "@/app/styles/colors"
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile() {
  // dados estáticos conforme solicitado
  const name = "Carla Silva"
  const username = "carlasilva"
  const email = "carla.silva@example.com"
  const [avatarUri, setAvatarUri] = useAvatar()
  const [previewUri, setPreviewUri] = useState<string | null>(null)
  const [isPreviewVisible, setPreviewVisible] = useState(false)

  // handlers (bound to component state)
  async function pickFromCamera() {
    await handlePickFromCameraPreview(setPreviewUri, () => setPreviewVisible(true))
  }

  async function pickFromLibrary() {
    await handlePickFromLibraryPreview(setPreviewUri, () => setPreviewVisible(true))
  }

  function pickPhotoPrompt() {
    Alert.alert('Escolher foto', undefined, [
      { text: 'Câmera', onPress: pickFromCamera },
      { text: 'Galeria', onPress: pickFromLibrary },
      { text: 'Cancelar', style: 'cancel' },
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="chevron-left" size={28} color={colors.gray[200]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity onPress={pickPhotoPrompt} activeOpacity={0.8}>
            <Image source={avatarUri ? { uri: avatarUri } : require("../../../assets/images/icon.png")} style={styles.avatar} />
          </TouchableOpacity>

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.email}>{email}</Text>

          <TouchableOpacity style={styles.changePhoto} onPress={pickPhotoPrompt}>
            <Text style={styles.changePhotoText}>Trocar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.changePhoto, { marginTop: 8 }]} onPress={async () => { setAvatarUri(null); await saveAvatar(null) }}>
            <Text style={[styles.changePhotoText, { color: colors.gray[300] }]}>Remover foto</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Preview Modal */}
      <Modal visible={isPreviewVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}>
          <View style={{ width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' }}>
            {previewUri ? (
              <Image source={{ uri: previewUri }} style={{ width: 300, height: 300, borderRadius: 8 }} />
            ) : null}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              <View style={{ flex: 1, marginHorizontal: 6 }}>
                <Button title="Recortar e salvar" onPress={async () => { if (previewUri) { await cropCenterSquareAndSave(previewUri, setAvatarUri); setPreviewUri(null); setPreviewVisible(false); } }} />
              </View>
              <View style={{ flex: 1, marginHorizontal: 6 }}>
                <Button title="Salvar" onPress={async () => { if (previewUri) { await savePreviewAsIs(previewUri, setAvatarUri); setPreviewUri(null); setPreviewVisible(false); } }} />
              </View>
            </View>
            <View style={{ marginTop: 8 }}>
              <Button title="Cancelar" color="#888" onPress={() => { setPreviewUri(null); setPreviewVisible(false); }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

async function saveAvatar(uri: string | null) {
  try {
    if (uri) await AsyncStorage.setItem('@user:avatar', uri)
    else await AsyncStorage.removeItem('@user:avatar')
  } catch (e) {
    console.log('Erro salvando avatar', e)
  }
}

function useAvatar() {
  const [avatar, setAvatar] = useState<string | null>(null)
  useEffect(() => {
    ;(async () => {
      try {
        const v = await AsyncStorage.getItem('@user:avatar')
        if (v) setAvatar(v)
      } catch (e) {
        console.log('Erro carregando avatar', e)
      }
    })()
  }, [])
  return [avatar, setAvatar] as const
}

async function handlePickFromCamera(setAvatar: (v: string | null) => void) {
  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') return Alert.alert('Permissão', 'Permissão para acessar a câmera negada')

  const result = await ImagePicker.launchCameraAsync({ quality: 0.7, allowsEditing: true, aspect: [1, 1] })
  if (!result.canceled) {
    const uri = result.assets && result.assets[0]?.uri
    if (uri) {
      setAvatar(uri)
      await saveAvatar(uri)
    }
  }
}

async function handlePickFromLibrary(setAvatar: (v: string | null) => void) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== 'granted') return Alert.alert('Permissão', 'Permissão para acessar a galeria negada')

  const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, allowsEditing: true, aspect: [1, 1] })
  if (!result.canceled) {
    const uri = result.assets && result.assets[0]?.uri
    if (uri) {
      setAvatar(uri)
      await saveAvatar(uri)
    }
  }
}

// Preview variants: pick and show preview modal instead of saving directly
async function handlePickFromCameraPreview(setPreview: (v: string | null) => void, onShow: () => void) {
  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') return Alert.alert('Permissão', 'Permissão para acessar a câmera negada')

  const result = await ImagePicker.launchCameraAsync({ quality: 0.7, allowsEditing: false })
  if (!result.canceled) {
    const uri = result.assets && result.assets[0]?.uri
    if (uri) {
      setPreview(uri)
      onShow()
    }
  }
}

async function handlePickFromLibraryPreview(setPreview: (v: string | null) => void, onShow: () => void) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== 'granted') return Alert.alert('Permissão', 'Permissão para acessar a galeria negada')

  const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, allowsEditing: false })
  if (!result.canceled) {
    const uri = result.assets && result.assets[0]?.uri
    if (uri) {
      setPreview(uri)
      onShow()
    }
  }
}

async function getImageSize(uri: string) {
  return new Promise<{ w: number; h: number }>((resolve, reject) => {
    Image.getSize(uri, (w, h) => resolve({ w, h }), (e) => reject(e))
  })
}

async function cropCenterSquareAndSave(uri: string, setAvatar: (v: string | null) => void) {
  try {
    const { w, h } = await getImageSize(uri)
    const size = Math.min(w, h)
    const originX = Math.floor((w - size) / 2)
    const originY = Math.floor((h - size) / 2)
    const actions = [{ crop: { originX, originY, width: size, height: size } }, { resize: { width: 512, height: 512 } }]
    const result = await ImageManipulator.manipulateAsync(uri, actions, { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG })
    setAvatar(result.uri)
    await saveAvatar(result.uri)
  } catch (e) {
    console.log('Erro ao recortar imagem', e)
    Alert.alert('Erro', 'Não foi possível recortar a imagem')
  }
}

async function savePreviewAsIs(uri: string, setAvatar: (v: string | null) => void) {
  setAvatar(uri)
  await saveAvatar(uri)
}

// end of file
