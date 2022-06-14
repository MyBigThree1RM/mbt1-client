import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Splash from '../screens/home/splash';

import AuthStackNavigator from './AuthStackNavigator';
import HomeBottomNavigator from './HomeBottomNavigator';

export default ()=> {

    const Stack = createStackNavigator()    

    const [isSignedIn, setIsSignedIn] = React.useState(false);

    return (
        <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            
            {isSignedIn ? (
              // 로그인되어있음, main 화면으로
              <Stack.Screen name="HomeBottomNavigator" component={HomeBottomNavigator} />
            ) : (
              <Stack.Screen
                name="AuthStackNavigator"
                component={AuthStackNavigator}
                /*options={{
                  title: 'Sign in',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}*/
              />
            ) 
            }
        </Stack.Navigator>
    )
}