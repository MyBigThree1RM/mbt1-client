import React from "react"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import User from '../screens/profile/user';
import TmpRank from '../screens/rank/rank';

import MeasureNavigator from './MeasureNavigator';    


const Tab = createBottomTabNavigator();

export default () => {
    return(
        <Tab.Navigator initialRouteName="Profile">
            <Tab.Screen name="Rank" component={TmpRank}/>
            <Tab.Screen name="Profile" component={User}/>
            <Tab.Screen options={{headerShown:false}} name="Measure" component={MeasureNavigator}/>
        </Tab.Navigator>
    )
}
    