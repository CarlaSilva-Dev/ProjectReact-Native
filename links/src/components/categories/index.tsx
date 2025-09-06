import { FlatList } from "react-native"; //FlatList componente do React Native para renderizar listas


import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";


type  Props = {
  selected: string
  onChange: (category: string) => void
}

export function Categories({ selected, onChange}: Props){
    return (
    <FlatList
    data={categories}
    keyExtractor={(item) => item.id} //Chave para identificar de forma única os itens
    renderItem={({item}) => (
      <Category 
      name={item.name} 
      icon={item.icon} 
      isSelected={item.name === selected} //Para renderizar os itens da lista
      onPress={() => onChange(item.name)}
      />
    )}
    horizontal
    style={styles.container} //Estlizar o container da FastList
    contentContainerStyle={styles.content} //Estilizar dentro da FlatList
    showsHorizontalScrollIndicator={false}
    />
  )
}