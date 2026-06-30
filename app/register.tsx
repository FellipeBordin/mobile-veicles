import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { apiFetch } from "../src/lib/api";
import { setToken, setUser } from "../src/lib/session";
import { Input } from "@/src/components/common/Input";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    const nameFormatted = name.trim();
    const emailFormatted = email.trim().toLowerCase();
    const passwordFormatted = password.trim();

    if (!nameFormatted || !emailFormatted || !passwordFormatted) {
      Alert.alert("Atenção", "Preencha nome, e-mail e senha.");
      return;
    }

    if (!isValidEmail(emailFormatted)) {
      Alert.alert("Erro", "E-mail inválido.");
      return;
    }

    if (passwordFormatted.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

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
        Alert.alert("Erro", data?.error ?? `Falha (${res.status})`);
        return;
      }

      await setToken(data.token);
      await setUser(data.user);

      router.replace("/");
    } catch (error) {
      console.log("Register error:", error);
      Alert.alert("Erro", "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  function isValidEmail(email: string) {
    const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRagex.test(email);
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

        <Pressable
          onPress={handleRegister}
          disabled={loading}
          style={{
            marginTop: 4,
            backgroundColor: "#111",
            paddingVertical: 12,
            borderRadius: 14,
            opacity: loading ? 0.6 : 1,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>
            {loading ? "Criando..." : "Criar conta"}
          </Text>
        </Pressable>
      </View>

      <Link href="/login" asChild>
        <Pressable
          style={{ paddingVertical: 14, alignItems: "center", marginTop: 14 }}
        >
          <Text style={{ color: "#111", fontWeight: "700" }}>
            Já tenho conta
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
