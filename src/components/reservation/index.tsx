import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";

import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

const RenderReservation = () => {
  const { width } = Dimensions.get("window");

  const [phone, setPhone] = useState("");
  const [promoModal, setPromoModal] = useState(false);

  return (
    <AuthContainer title="Checkout">
      {/* HOTEL CARD */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 12,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../../assets/images/hotel.jpg")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 10,
          }}
        />

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            The Aston Vill Hotel
          </Text>

          <Text style={{ color: "#777", fontSize: 13 }}>
            Veum Point, Michikoton
          </Text>

          <Text style={{ marginTop: 6 }}>
             <Text style={{ fontWeight: "bold" }}>4.7</Text>
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontWeight: "bold",
              color: "#2f5bea",
            }}
          >
            $120 <Text style={{ color: "#777" }}>/ night</Text>
          </Text>
        </View>
      </View>

      {/* YOUR BOOKING */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <Text style={[global.label, { marginBottom: 12 }]}>
          Your Booking
        </Text>

        <Text style={global.item}>📅 Dates: 12 – 14 Nov 2024</Text>
        <Text style={global.item}>👤 Guest: 2 Guests (1 Room)</Text>
        <Text style={global.item}>🛏 Room type: Queen Room</Text>

        <TextField
          label="Phone"
          icon={{ lib: "MaterialIcons", name: "call" }}
          placeholder="Telefone"
          isMasked={true}
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* PRICE DETAILS */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <Text style={[global.label, { marginBottom: 12 }]}>
          Price Details
        </Text>

        <View style={global.priceRow}>
          <Text>Price</Text>
          <Text>$139.00</Text>
        </View>

        <View style={global.priceRow}>
          <Text>Admin fee</Text>
          <Text>$2.50</Text>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#eee",
            marginVertical: 10,
          }}
        />

        <View style={global.priceRow}>
          <Text style={{ fontWeight: "bold" }}>Total price</Text>
          <Text style={{ fontWeight: "bold" }}>$141.50</Text>
        </View>
      </View>

      {/* PROMO */}
      <TouchableOpacity
        onPress={() => setPromoModal(true)}
        style={{
          backgroundColor: "#f3f6ff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 25,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#2f5bea", fontWeight: "bold" }}>
          Promo
        </Text>
        <Text style={{ color: "#2f5bea" }}>Select</Text>
      </TouchableOpacity>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity style={global.primaryButton}>
        <Text style={global.primaryButtonText}>
          Confirm Booking
        </Text>
      </TouchableOpacity>

      {/* PROMO MODAL */}
      <Modal transparent animationType="fade" visible={promoModal}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setPromoModal(false)}
        >
          <Pressable
            style={{
              width: width * 0.85,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text style={[global.label, { marginBottom: 15 }]}>
              Promo Codes
            </Text>

            <Text style={{ color: "#777" }}>
              Nenhum cupom disponível no momento.
            </Text>

            <TouchableOpacity
              style={[global.primaryButton, { marginTop: 20 }]}
              onPress={() => setPromoModal(false)}
            >
              <Text style={global.primaryButtonText}>Fechar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </AuthContainer>
  );
};

export default  RenderReservation;;
