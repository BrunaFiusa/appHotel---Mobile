import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import { global } from "../ui/styles";

const RenderReservation = () => {
  const { width } = Dimensions.get("window");

  return (
    <AuthContainer>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <Text style={[global.label, { marginBottom: 12 }]}>
          Sua reserva
        </Text>

        <Text style={global.item}>📅 Datas: 12 – 14 Nov 2024</Text>
        <Text style={global.item}>👤 Guest: 2 </Text>
        <Text style={global.item}>🛏 Tipo do Quarto: Casal</Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <Text style={[global.label, { marginBottom: 12 }]}>
          Detalhes do Preço
        </Text>

        <View style={global.priceRow}>
          <Text>Preço</Text>
          <Text>$139.00</Text>
        </View>

        <View style={global.priceRow}>
          <Text>Taxa</Text>
          <Text>$2.50</Text>
        </View>

        <View style={global.priceRow}>
          <Text style={{ fontWeight: "bold" }}>Preço Total</Text>
          <Text style={{ fontWeight: "bold" }}>$141.50</Text>
        </View>
      </View>

      <TouchableOpacity style={global.primaryButton}>
        <Text style={global.primaryButtonText}>
          Confirmar Reserva
        </Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};
export default RenderReservation;;
