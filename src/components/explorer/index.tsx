import { View, Text } from 'react-native';
import AuthContainer from '../ui/AuthContainer';
import DateSelector from '../ui/DateSelector';
 
const RenderExplorer = () => {
   return (
        <AuthContainer>
            <View>
                <DateSelector />
            </View>
        </AuthContainer>
   );
}  

export default RenderExplorer;