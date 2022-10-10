import React from "react"

import { createStackNavigator } from '@react-navigation/stack';

import  Challenge  from '../screens/measure/challenge_mode/challenge'
import  Result  from '../screens/measure/challenge_mode/result'
import  Select  from '../screens/measure/challenge_mode/select'      


const Stack = createStackNavigator();

export default () => {
    return(
        <Stack.Navigator screenOptions={{headerLeft:null}}>
            <Stack.Screen name = "Select" component={Select}/>
            <Stack.Screen name = "Challenge" component={Challenge} />
            <Stack.Screen name = "Result" component={Result} />
        </Stack.Navigator>
    )
}
    