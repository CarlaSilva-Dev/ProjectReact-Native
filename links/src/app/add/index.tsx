import { View, Text, TouchableOpacity } from "react-native"

import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"
import { colors } from "@/app/styles/colors"
import { router } from "expo-router"

import { Input }  from "@/components/input"
import {Button } from "@/components/button"
import { Categories } from "@/components/categories"

export default function Add(){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back ()}> //Para voltar para a tela inicial
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]}/>
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>
            <Text style={styles.label}>Selecione uma categoria </Text>
            <Categories />
            <View style={styles.form}>
            <Input placeholder="Nome" />
            <Input placeholder="Url" />
            <Button title="Adicionar"/>
            </View>
        </View>
    )
}