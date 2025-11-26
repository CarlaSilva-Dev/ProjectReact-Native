import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useRouter } from "expo-router"
import { colors } from "@/app/styles/colors"

export default function Index() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Bem-vindo ao Links+</Text>

      <Text style={styles.description}>
       

        Organize seus links favoritos de forma rápida, prática e segura.🚀
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/main' } as any)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[900],
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 24,
  },
  description: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    alignSelf: 'center',
    maxWidth: 520,
  },
  logo: {
    width: 140,
    height: 80,
    marginBottom: 18,
    opacity: 0.95,
  },
  button: {
    backgroundColor: '#2DD4BF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#072113',
    fontWeight: '600',
    fontSize: 16,
  },
})
