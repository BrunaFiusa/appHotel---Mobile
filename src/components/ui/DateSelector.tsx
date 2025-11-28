import { Dimensions, View } from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";

type Props = { onSelectDate: (date: string) => void; };
 
const DateSelector = ({ onSelectDate }: Props) => {
  const { width, height } = Dimensions.get("window");
  const today = getToday();
  return (
    <View>
      <DatePicker
        mode="calendar"
        options={{
          backgroundColor: '#f0f0f0ff',
          textHeaderColor: '#9e62acff',
          textDefaultColor: '#420350ff',
          selectedTextColor: '#fff',
          mainColor: '#9e62acff',
          textSecondaryColor: '#420350ff',
          borderColor: '#9e62acff',
          textFontSize: 14,
          textHeaderFontSize: 15,
        }}
        style={{borderRadius: 15, width: width * 0.65, height: height * 0.35}}
        isGregorian={true}
        minimumDate={today}
        onSelectedChange={(date) => { onSelectDate(date); }}
      />
    </View>
  );
};

export default DateSelector;