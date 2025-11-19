import RenderExplorer from '@/components/explorer';
import { View } from "react-native";
import RenderDatePicker from '@/components/ui/datePicker';
 
const Explorer = () => {
  return (
    <View>
      <RenderExplorer/>
      <RenderDatePicker/>
    </View>
  )
}  
export default Explorer;