import React from "react"

import { createStackNavigator } from '@react-navigation/stack';

import  Measure  from '../screens/measure/measure_mode/measure'
import  Result  from '../screens/measure/measure_mode/result'
import  Select  from '../screens/measure/measure_mode/select'      


const Stack = createStackNavigator();

export default () => {
    return(
        <Stack.Navigator screenOptions={{headerLeft:null}}>
            <Stack.Screen name = "Select" component={Select}/>
            <Stack.Screen name = "Measurement" component={Measure} />
            <Stack.Screen name = "Result" component={Result} />
        </Stack.Navigator>
    )
}
    