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
            <View style={{display: "flex", flexDirection: "row", gap: width * 0.1, justifyContent:"center",}}>

                <View style={{display: "flex", flexDirection: "column"}}>
                    <TouchableOpacity onPress={() => setCalendar("checkin")}>
                        <View style={{width: width * 0.42}}>
                            <TextField 
                                label="Check-in"
                                icon={{ lib: "FontAwesome5", name: "calendar-alt"}}
                                placeholder="Selecione a data"
                                value={checkIn}
                            />
                        </View>
                    </TouchableOpacity>
                    {calendar === "checkin" && (
                        <DateSelector onSelectDate={(date) => { setCheckIn(date)}}/>
                    )}
                </View>

                <View style={{display: "flex", flexDirection: "column"}}>
                    <TouchableOpacity onPress={() => setCalendar("checkout")}>
                        <View style={{width: width * 0.42}}>
                            <TextField
                                label="Check-out"
                                icon={{ lib: "FontAwesome5", name: "calendar-alt"}}
                                placeholder="Selecione a data"
                                value={checkOut}
                            />
                        </View>
                    </TouchableOpacity>
                    {calendar === "checkout" && (
                        <DateSelector onSelectDate={(date) => { setcheckOut(date)}}/>
                    )}
                </View>
            </View>
        </AuthContainer>
   );
}  

export default RenderExplorer;