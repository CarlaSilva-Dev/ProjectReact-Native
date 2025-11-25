import { Platform, StyleSheet } from "react-native"

const isWeb = Platform.OS === "web"

export const styles = StyleSheet.create({
    container: {
        height: 52,
        maxHeight: 52,
    },
    content: {
        gap: 16, //Espaçamento entre os elementos
        paddingHorizontal: isWeb ? 0 : 24,
        // quando estiver em web, expande o container interno e centraliza os itens
        flexGrow: isWeb ? 1 : 0,
        justifyContent: isWeb ? "center" : "flex-start",
    },
})