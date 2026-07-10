import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { validateRegister } from "@/src/utils/authValidators";
import { apiFetch } from "../src/lib/api";
import { setToken, setUser } from "../src/lib/session";
import {showAlert} from "../src/utils/alert";


export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    const error = validateRegister(name, email, password);

    if (error) {
      showAlert("Atenção", error);
      return;
    }

    const nameFormatted = name.trim();
    const emailFormatted = email.trim().toLowerCase();
    const passwordFormatted = password.trim();

    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: nameFormatted,
          email: emailFormatted,
          password: passwordFormatted,
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
      console.log("Register error:", error);
      showAlert("Erro", "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  function goToLogin() {
    router.replace("/login");
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
            <MaterialIcons name="person-add" size={28} color="#2563eb" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>Criar conta</Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              Cadastre seu usuário para separar seus veículos
            </Text>
          </View>
        </View>

        <Input
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
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
          placeholder="Crie uma senha"
          secureTextEntry
        />

        <Button
          title="Criar conta"
          loadingTitle="Criando..."
          loading={loading}
          onPress={handleRegister}
        />
      </Card>

      <Button title="Já tenho conta" onPress={goToLogin} />
    </View>
  );
}
