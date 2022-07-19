import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
    const navigation = useNavigation()

    function handleDetailsOrder(){
        navigation.navigate('details')
    }
    return (
        <VStack flex={1} p={6} bg='gray.600'>
            <Header title='Nova Solicitação' />

            <Input placeholder='Número do Patrimônio' mt={4} />
            <Input placeholder='Descrição do problema' flex={1} mt={5} multiline textAlignVertical='top' />
            <Button onPress={handleDetailsOrder} title='Cadastrar' mt={5}/>
        </VStack>
    );
}