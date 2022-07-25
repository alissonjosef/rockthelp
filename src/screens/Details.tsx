import { useEffect, useState } from 'react';
import { VStack, useTheme, HStack, Text, ScrollView, Box } from 'native-base';
import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OrderProps } from '../components/Order';
import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFiramat';
import { Loading } from '../components/Loading';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

type RouterParams = {
  orderId: string
}

type OrderDetails = OrderProps & {
  description: string
  solution: string
  closed: string
}


export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const { colors } = useTheme()
  const navigation = useNavigation()

  const route = useRoute()
  const { orderId } = route.params as RouterParams

  function handleOrderClose() {
    if (!solution) {
      return Alert.alert('Solicitção', 'Informa a solução para encerrar a solicitação')
    }
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada.')
        navigation.goBack
      })
      .catch((erros) => {
        console.log("🚀 ~ erros", erros)
        Alert.alert('Solicitação', 'Não doi possivel encerrar a solicitação')
      })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data()

        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })

        console.log({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })

        setIsLoading(false)
      })
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg='gray.700'>
      <Box px={6} bg='gray.600'>
        <Header title='solicitação' />
      </Box>
      <HStack bg='gray.500' justifyContent='center' p={4}>
        {
          order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }

        <Text
          fontSize='sm'
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform='uppercase'
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title='equipamento'
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetails
          title='descrição do problema'
          description={order.description}
          icon={Clipboard}
        />

        <CardDetails
          title='solução'
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {
            order.status === 'open' &&
            <Input placeholder='Descrição da solução'
              onChangeText={setSolution}
              h={24}
              textAlignVertical='top'
              multiline
            />}
        </CardDetails>

      </ScrollView>
      {order.status === 'open' && <Button title='Encerrar solução' m={5} onPress={handleOrderClose} isLoading={isLoading} />}

    </VStack>
  );
}


