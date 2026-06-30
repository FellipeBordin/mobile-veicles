import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  label: string;
};

export function Input({ label, style, ...inputProps }: InputProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontWeight: "700", color: "#333" }}>{label}</Text>

      <TextInput
        {...inputProps}
        placeholderTextColor="#999"
        style={[
          {
            borderWidth: 1,
            borderColor: "#e5e5e5",
            borderRadius: 14,
            paddingHorizontal: 12,
            paddingVertical: 12,
            backgroundColor: "#f9fafb",
          },
          style,
        ]}
      />
    </View>
  );
}
