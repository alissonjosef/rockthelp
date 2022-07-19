import {NavigationContainer } from '@react-navigation/native'

import { SignIn } from 'phosphor-react-native'
import { AppRoutes } from './app.routes'

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}