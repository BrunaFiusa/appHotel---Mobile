import { useState } from "react";
import { View, Text } from "react-native";
import DatePicker, { getFormatedDate, getToday } from 'react-native-modern-datepicker';

type Props = {
  label?: string;
};
 
const DateSelector = ({ label }: Props) => {
  const today = new Date()
  getToday();
  getFormatedDate(new Date(), "YYYY-MM-DD h:m");

  const [selectData, setSelectedDate] = useState("");
  return (
    <View>
      {!!label && <Text>{label}</Text>}
      <DatePicker
        mode="calendar"
        options={{
          backgroundColor: '#090C08',
          textHeaderColor: '#FFA25B',
          textDefaultColor: '#F6E7C1',
          selectedTextColor: '#fff',
          mainColor: '#F4722B',
          textSecondaryColor: '#D6C7A1',
          borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      style={{borderRadius: 15}}
      isGregorian={true}

      />
      </View>
  );
};
 
export default DateSelector;