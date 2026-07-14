import { useRouter } from "expo-router";
import { useState } from "react";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { validateResetPassword } from "@/src/utils/authValidators";
import { apiFetch } from "@/src/lib/api";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { showAlert } from "@/src/utils/alert";
import { ScreenHeader } from "@/src/components/common/ScreenHeader";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    const error = validateResetPassword(email, newPassword, confirmPassword);

    if (error) {
      showAlert("Atenção", error);
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
        showAlert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      showAlert("Sucesso", "Senha alterada com sucesso.");
      router.replace("/login");
    } catch (error) {
      console.log("Reset password error", error);
      showAlert("Erro", "Não foi possível resetar a senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <Card>
        <ScreenHeader
          icon="lock-reset"
          title="Resetar senha"
          subtitle="Informe seu e-mail e defina uma nova senha"
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
    </ScreenContainer>
  );
}
