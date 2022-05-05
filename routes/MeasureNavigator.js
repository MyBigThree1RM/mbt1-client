import React from "react"

import { createStackNavigator } from '@react-navigation/stack';

import  Measure  from '../screens/measure/measure'
import  Result  from '../screens/measure/result'
import  Select  from '../screens/measure/select'      


const Stack = createStackNavigator();

export default () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Select" component={Select}/>
            <Stack.Screen name = "Measurement" component={Measure} />
            <Stack.Screen name = "Result" component={Result} />
        </Stack.Navigator>
    )
}
    