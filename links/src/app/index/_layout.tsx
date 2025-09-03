// Importa o componente Stack do Expo Router para organizar telas em pilha
import { Stack } from "expo-router"

import { colors } from "@/app/styles/colors"


// Componente de layout que envolve todas as telas do Stack
export default function Layout() {

    // Define a cor de fundo das telas
    const backgroundColor = colors.gray[950]

    return (
        <Stack
            screenOptions={{
                // Oculta o cabeçalho padrão da navegação
                headerShown: false,
                //Aplica  a cor de fundo em todas a telas
                contentStyle: { backgroundColor},
            }}
       />
    )
}