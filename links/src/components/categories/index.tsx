import { FlatList } from "react-native"; //FlatList componente do React Native para renderizar listas


import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";


export function Categories(){
    return (
    <FlatList
    data={categories}
    keyExtractor={(item) => item.id} //Chave para identificar de forma única os itens
    renderItem={({item}) => (
      <Category name={item.name} icon={item.icon} isSelected={false}/> //Para renderizar os itens da lista
    )}
    horizontal
    style={styles.container} //Estlizar o container da FastList
    contentContainerStyle={styles.content} //Estilizar dentro da FlatList
    showsHorizontalScrollIndicator={false}
    />
  )
}