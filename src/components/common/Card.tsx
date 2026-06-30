import { ReactNode } from "react";
import { View } from "react-native";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        gap: 14,
      }}
    >
      {children}
    </View>
  );
}
