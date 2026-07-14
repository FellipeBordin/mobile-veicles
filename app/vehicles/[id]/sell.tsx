import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import { Button } from "@/src/components/common/Button";
import { Card } from "@/src/components/common/Card";
import { Input } from "@/src/components/common/Input";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { ScreenHeader } from "@/src/components/common/ScreenHeader";
import { sellVehicleById } from "@/src/service/vehicleService";
import { showAlert } from "@/src/utils/alert";
import { parseCurrency } from "@/src/utils/expenseHelpers";

type ApiResponse = {
  error?: string;
};

export default function SellVehicleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [soldPrice, setSoldPrice] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function confirmSale() {
    if (!id) {
      showAlert("Erro", "Veículo não encontrado.");
      return;
    }

    const payload = {
      soldPrice: parseCurrency(soldPrice),
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
    };

    if (!Number.isFinite(payload.soldPrice) || payload.soldPrice <= 0) {
      showAlert("Atenção", "Digite um valor de venda válido.");
      return;
    }

    try {
      setLoading(true);

      const res = await sellVehicleById(id, payload);
      const data = (await res.json().catch(() => ({}))) as ApiResponse;

      if (res.status === 401) {
        showAlert("Sessão expirada", "Faça login novamente.");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        showAlert("Erro", data.error ?? `Falha (${res.status})`);
        return;
      }

      showAlert("Sucesso", "Veículo marcado como vendido.");
      router.replace(`/vehicles/${id}`);
    } catch (error) {
      console.error("Sell vehicle error:", error);
      showAlert("Erro", "Não foi possível concluir a venda.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <Card>
        <ScreenHeader
          icon="sell"
          title="Marcar como vendido"
          subtitle="Informe o valor final e os dados do comprador"
        />

        <Input
          label="Valor de venda"
          value={soldPrice}
          onChangeText={(text) => {
            const currencyCharacters = text.replace(/[^0-9.,]/g, "");
            setSoldPrice(currencyCharacters);
          }}
          placeholder="Ex: 35.000,00"
          keyboardType="decimal-pad"
        />

        <Input
          label="Nome do comprador"
          value={buyerName}
          onChangeText={setBuyerName}
          placeholder="Digite o nome do comprador"
        />

        <Input
          label="Telefone do comprador"
          value={buyerPhone}
          onChangeText={setBuyerPhone}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
        />

        <Button
          title="Confirmar venda"
          loadingTitle="Confirmando..."
          loading={loading}
          onPress={confirmSale}
          variant="success"
        />
      </Card>

      <Button
        title="Cancelar"
        onPress={() => router.replace(`/vehicles/${id}`)}
      />
    </ScreenContainer>
  );
}
