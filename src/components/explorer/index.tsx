import { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Modal, Pressable, Text, TouchableOpacity, View, ScrollView } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import BottomSheet from '../ui/BottomSheet';
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const RenderExplorer = () => {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(0);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const closeCalendar = () => setCalendar(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const { searchRoom } = useAuth();
  const [loading, setLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      Alert.alert("ATENÇÃO!", "Selecione as datas de entrada e saída.");
      return;
    }
    setLoading(true);
    setAvailableRooms([]);

    try {
      const rooms = await searchRoom(checkIn, checkOut, qntGuests);
      setAvailableRooms(rooms || []);
      console.log(rooms);
    } catch (error: any) {
      if (!error?.message?.includes("encontrado")) {
        Alert.alert("ERRO", "Ocorreu um problema ao buscar quartos.");
      }
      setAvailableRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer icon="hotel" title="Grand Hotel Royal">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ display: "flex", justifyContent: "center" }}>

          <View style={{ display: "flex", flexDirection: "column" }}>
            <TouchableOpacity onPress={() => setCalendar("checkin")}>
              <View style={{ width: width * 0.8 }}>
                <TextField
                  label="Check-in"
                  icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                  placeholder="Selecione a data"
                  value={checkIn}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ display: "flex", flexDirection: "column" }}>
            <TouchableOpacity onPress={() => setCalendar("checkout")}>
              <View style={{ width: width * 0.8 }}>
                <TextField
                  label="Check-out"
                  icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                  placeholder="Selecione a data"
                  value={checkOut}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Modal
            transparent
            animationType="fade"
            visible={calendar !== null}
            onRequestClose={closeCalendar}
          >
            <Pressable
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
              }}
              onPress={closeCalendar}>

              <Pressable onPress={() => { }}>
                {calendar === "checkin" && (
                  <DateSelector
                    onSelectDate={(date) => {
                      setCheckIn(date);
                      closeCalendar();
                    }}
                  />
                )}
                {calendar === "checkout" && (
                  <DateSelector
                    onSelectDate={(date) => {
                      setCheckOut(date);
                      setCalendar(null);
                    }}
                  />
                )}
              </Pressable>
            </Pressable>
          </Modal>

          <View style={{ alignItems: 'center', marginVertical: 15, marginBottom: 30 }}>
            <Text ></Text>
            <Text style={global.label}>Quantidade de hóspedes</Text>
            <InputSpin
              onSelectSpin={(guests) => {
                setQntGuests(guests);
              }}
            />
          </View>
          
          <TouchableOpacity disabled={loading} onPress={handleSearch} style={global.primaryButton}>
            {loading ? (
              <ActivityIndicator size="small" color="#420350ff" />
            ) : (
              <Text>Consultar disponibilidade</Text>
            )}
          </TouchableOpacity>

        </View>

        <RoomCard
          image={require("../../../assets/images/quarto.jpg")}
          label="Apartamento"
          icon={{
            lib: "FontAwesome5",
            name: "bed",
          }}
          description={{
            title: "Descrição do quarto",
            text: "1 cama de casal\n2 camas de solteiro",
            price: 180.9,
          }}
        />
      </ScrollView>

      <BottomSheet
        visible={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#420350ff', marginBottom: 20 }}>
            Confirmar Reserva
          </Text>

          {selectedRoom && (
            <View>
              <View style={{ backgroundColor: '#f8f8f8', padding: 15, borderRadius: 15, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>{selectedRoom.label}</Text>
                <Text style={{ color: '#666', marginTop: 5 }}>{selectedRoom.text.replace('\n', ' • ')}</Text>
              </View>

              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Check-in:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{checkIn || "--"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Check-out:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{checkOut || "--"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Hóspedes:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {qntGuests > 0 ? qntGuests : "--"}
                  </Text>
                </View>
              </View>

              <View style={[global.separator, { marginVertical: 20 }]} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total:</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#28a745' }}>
                  R$ {selectedRoom.price.toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: '#420350ff',
                  padding: 18,
                  borderRadius: 15,
                  marginTop: 30,
                  alignItems: 'center'
                }}
                onPress={() => router.push("/(tabs)/reservation")}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Confirmar Pedido</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </BottomSheet>
    </AuthContainer>
  );
};

export default RenderExplorer;

