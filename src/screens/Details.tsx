import { VStack, Text } from 'native-base';
import { Header } from '../components/Header';
import { useRoute } from '@react-navigation/native';

type RouterParams = {
  orderId: string
}

export function Details() {
  const route = useRoute()
  const { orderId } = route.params as RouterParams
  return (
    <VStack flex={1} bg='gray.700'>
        <Header title='solicitação'/>
        <Text color='white'>{orderId}</Text>
    </VStack>
  );
}