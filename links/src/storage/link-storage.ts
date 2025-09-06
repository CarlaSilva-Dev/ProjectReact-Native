import AsyncStorage from "@react-native-async-storage/async-storage";


const  LINKS_STORAGE_KEY = "links-storage"

 export type LinkStorage = {
    id: string
    name:string
    url: string
    category: string
}
 // Método para listar os links salvos
async function get(): Promise<LinkStorage[]> { //Função pra recuperar dados do dispositivo,ou seja, os links armazenados
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY) // O método getItem recupera os itens armazenados no dispositivo
    const response = storage ? JSON.parse(storage) : []

    return response
}

 // Método para salvar os links
async function save(newLink: LinkStorage) { //Função de adicionar
    try{
        const storage = await get()
        const updated = JSON.stringify([...storage, newLink]) //stringify transforma objetos em texto para salvar, enviar ou armazenar.

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated)

    } catch (error) {
        throw error
    }
}

async function remove(id: string){
    try{
        const storage = await get()

        const updated = storage.filter((link) => link.id !== id) 

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated))
    }catch(error) {
        throw error
    }
}

export const linkStorage = { get, save, remove }