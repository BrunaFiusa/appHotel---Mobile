import { useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import AuthContainer from '../ui/AuthContainer';
import TextField from '../ui/TextField';
import DateSelector from '../ui/DateSelector';
 
const RenderExplorer = () => {
    const { width, height } = Dimensions.get("window");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setcheckOut] = useState("");
    const [calendar, setCalendar] = useState<"checkin" | "checkout">();

   return (
        <AuthContainer>
            <View>
                <TouchableOpacity onPress={() => setCalendar("checkin")}>
                    <TextField
                        label="Check-in"
                        icon={{ lib: "FontAwesome5", name: "calendar-alt"}}
                        placeholder="Selecione a data"
                        value={checkIn}
                        />
                </TouchableOpacity>
                {calendar === "checkin" && (
                    <DateSelector
                        onSelectDate={(date) => {
                            setCheckIn(date)
                        }
                    }/>
                )}

                <TouchableOpacity onPress={() => setCalendar("checkout")}>
                    <TextField
                        label="Check-out"
                        icon={{ lib: "FontAwesome5", name: "calendar-alt"}}
                        placeholder="Selecione a data"
                        value={checkOut}
                        />
                </TouchableOpacity>
                {calendar === "checkout" && (
                    <DateSelector
                        onSelectDate={(date) => {
                            setcheckOut(date)
                        }
                    }/>
                )}
            </View>
        </AuthContainer>
   );
}  

export default RenderExplorer;