import { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import RoomCard from "../ui/RoomCard";
import TextField from "../ui/TextField";

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);

  return (
    <AuthContainer>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
          {calendar === "checkin" && (
            <DateSelector
              onSelectDate={(date) => {
                setCheckIn(date);
                setCalendar(null);
              }}
            />
          )}
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
          {calendar === "checkout" && (
            <DateSelector
              onSelectDate={(date) => {
                setCheckOut(date);
                setCalendar(null);
              }}
            />
          )}
        </View>
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
    </AuthContainer>
  );
};

export default RenderExplorer;