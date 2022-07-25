import { useState } from 'react';
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native'

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function SingIn() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { colors } = useTheme()

    function handleSignIn() {
        if (!email || !password) {
            return Alert.alert('Entrar', 'Informe email e senha')
        }

        setIsLoading(true)
        auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log("🚀 ~ error", error)
                setIsLoading(false)

                if(error.code === 'auth/invalid-email'){
                    return Alert.alert('Entrar', 'Email inválido.')
                }

                if(error.code === 'auth/wrong-password'){
                    return Alert.alert('Entrar', 'Email ou senha inválido.')
                }

                if(error.code === 'auth/user-not-found'){
                    return Alert.alert('Entrar', 'Email ou senha inválido')
                }

                return Alert.alert('Entrar', 'Não foi possível acessar')

                
            })

    }

    return (
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <Logo />
            <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                placeholder='Email'
                mb={4}
                InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} />} />}
                onChangeText={setEmail}
            />
            <Input
                placeholder='Senha'
                InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
                secureTextEntry
                mb={8}
                onChangeText={setPassword}
            />

            <Button
                title='Entrar'
                w='full'
                color='white'
                isLoading={isLoading}
                onPress={handleSignIn} />
        </VStack>
    )
}