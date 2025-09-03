import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

type OptionProps = {
  name: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  variant?: "primary" | "secondary";
  onPress?: () => void;
};

export function Option({ name, icon, variant = "primary", onPress }: OptionProps) {
  const textStyle = variant === "secondary" ? styles.secondaryTitle : styles.primaryTitle;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Ícone e texto usando a mesma cor */}
      <MaterialIcons
        name={icon}
        size={20}
        color={textStyle.color}   
      />
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
}
