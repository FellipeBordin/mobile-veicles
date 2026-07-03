import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { validateResetPassword } from "@/src/utils/authValidators";
import { apiFetch } from "../src/lib/api";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    const error = validateResetPassword(
      email,
      newPassword,
      confirmPassword,
    );

    if (error) {
      Alert.alert("Atenção", error);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const password = newPassword.trim();

    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: normalizedEmail,
          newPassword: password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        Alert.alert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      Alert.alert("Sucesso", "Senha alterada com sucesso.");
      router.replace("/login");
    } catch (error) {
      console.log("Reset password error", error);
      Alert.alert("Erro", "Não foi possível resetar a senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
        paddingTop: 48,
      }}
    >
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#eff6ff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="lock-reset" size={28} color="#2563eb" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>
              Resetar senha
            </Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              Informe seu e-mail e defina uma nova senha
            </Text>
          </View>
        </View>

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Digite a nova senha"
          secureTextEntry
        />

        <Input
          label="Confirmar nova senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Repita a nova senha"
          secureTextEntry
        />

        <Button
          title="Salvar nova senha"
          loadingTitle="Salvando..."
          loading={loading}
          onPress={handleResetPassword}
        />
      </Card>

      <Button
        title="Voltar para login"
        onPress={() => router.replace("/login")}
      />
    </View>
  );
}