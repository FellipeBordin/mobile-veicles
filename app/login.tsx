import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { apiFetch } from "../src/lib/api";
import { setToken, setUser } from "../src/lib/session";
import { validateLogin } from "@/src/utils/authValidators";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { showAlert } from "@/src/utils/alert";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const error = validateLogin(email, password);

    if (error) {
      showAlert("Erro", error);
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showAlert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      await setToken(data.token);
      await setUser(data.user);

      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
      showAlert("Erro", "Não foi possível fazer login.");
    } finally {
      setLoading(false);
    }
  }

  function goToForgotPassword() {
    router.replace("/forgot-password");
  }

  function goToRegister() {
    router.replace("/register");
  }

  return (
    <ScreenContainer>
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
            <MaterialIcons name="lock" size={28} color="#2563eb" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>Entrar</Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              Acesse sua conta para ver seus veículos
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
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <Button
          title="Entrar"
          loadingTitle="Entrando..."
          loading={loading}
          onPress={handleLogin}
        />
      </Card>

      <Button
        title="Esqueci minha senha"
        onPress={goToForgotPassword}
        variant="primary"
      />

      <Button title="Criar conta" onPress={goToRegister} variant="success" />
    </ScreenContainer>
  );
}
