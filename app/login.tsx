import { useRouter } from "expo-router";
import { useState } from "react";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { apiFetch } from "@/src/lib/api";
import { setToken, setUser } from "@/src/lib/session";
import { validateLogin } from "@/src/utils/authValidators";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { showAlert } from "@/src/utils/alert";
import { ScreenHeader } from "@/src/components/common/ScreenHeader";

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
        <ScreenHeader
          icon="lock"
          title="Entrar"
          subtitle="Acesse sua conta para ver seus veículos"
        />

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
