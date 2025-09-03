import { MaterialIcons } from "@expo/vector-icons";

type Category = {
    id: string
    name: string
    icon: keyof typeof MaterialIcons.glyphMap //A lista de ícones é extraída com o typeof de MaterialIcons e dentro da propriedade glyphMap estão todos os ícones
}


export const categories: Category[] = [ //Category[] define que isso é uma lista de categorias
    { id: "1", name: "Curso", icon: "code"},
    { id: "2", name: "Projeto", icon: "folder"},
    { id: "3", name: "Site", icon: "language"},
    { id: "4", name: "Artigo", icon: "newspaper"},
    { id: "5", name: "Vídeo", icon: "movie"},
    { id: "6", name: "Documentação", icon: "content-paste"},
]


