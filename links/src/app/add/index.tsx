import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/app/styles/colors";
import { linkStorage } from "@/storage/link-storage";
import { router } from "expo-router";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Categories } from "@/components/categories";

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  // Função para validar URL
  function isValidUrl(url: string): boolean {
    try {
      const validUrl = new URL(url); // verifica se é uma URL válida
      // opcional: garantir que seja http ou https
      return validUrl.protocol === "http:" || validUrl.protocol === "https:";
    } catch {
      return false;
    }
  }

  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione a categoria");
      }

      if (!name.trim()) {
        return Alert.alert("Nome", "Adicione um nome de endereço válido!");
      }

      if (!url.trim()) {
        return Alert.alert("URL", "Adicione uma URL!");
      }

      if (!isValidUrl(url.trim())) {
        return Alert.alert("URL Inválida", "Digite uma URL válida (ex: https://exemplo.com)");
      }

      await linkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url: url.trim(),
        category,
      });

      Alert.alert("Sucesso", "Novo link adicionado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>
        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} />
        <Input placeholder="URL" onChangeText={setUrl} autoCorrect={false} autoCapitalize="none" />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
