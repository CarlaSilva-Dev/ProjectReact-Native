import { useState } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"

import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"
import { colors } from "@/app/styles/colors"
import { linkStorage } from "@/storage/link-storage"
import { router } from "expo-router"

import { Input }  from "@/components/input"
import {Button } from "@/components/button"
import { Categories } from "@/components/categories"

export default function Add(){

    const [category, setCategory] = useState("")
    const [name, setName  ] = useState("") //setName é a função que atualiza o estado, e name é o estado em si
    const [url, setUrl] = useState("")

    async function handleAdd(){ //Indentificar funções disparadas em relação com a interação do usuário. ex: toque no botão 
        try{
        if(!category){
            return Alert.alert("Categoria", "Selecione a categoria")
        }

        if(!name.trim()){ //.trim para remover os espaços
            return Alert.alert("Nome", "Adicione um nome de endereço válido!")
        }

        if(!url.trim()){ //.trim para remover os espaços
            return Alert.alert("URL", "Adicione uma URL!")
        }

        await linkStorage.save({
            id: new Date().getTime().toString(),
            name,
            url,
            category,
        })
        
        Alert.alert("Sucesso", "Novo link adicionado com sucesso!", [ 
        {text: "OK", 
            onPress: () => router.back()
        },
        ])
     }  catch(error){
        Alert.alert("Erro", "Não foi possível salver o link")
        console.log(error)
     }
   }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back ()}> {/*Para voltar para a tela inicial*/}
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]}/>
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>
            <Text style={styles.label}>Selecione uma categoria </Text>
            <Categories onChange={setCategory} selected={category}/>
            <View style={styles.form}>
            <Input
             placeholder="Nome"
             onChangeText={setName} 
             /> {/*Função para mostar tudo o que é digitado no input aparecer no console*/}
            <Input 
            placeholder="URL" 
            onChangeText={setUrl}
            autoCorrect={false}
            autoCapitalize="none"
             />
            <Button 
            title="Adicionar" 
            onPress={handleAdd}/>
            </View>

            
        </View>
    )
}