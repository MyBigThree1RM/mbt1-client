import React from "react"

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MeasureNavigator from "./MeasureNavigator";
import ChallengeNavigator from "./ChallengeNavigator";

const Tab = createMaterialTopTabNavigator();

export default () => {
    return(
        <Tab.Navigator initialRouteName="Measurement" screenOptions={{headerLeft:null}}>
            <Tab.Screen name="Measurement" component={MeasureNavigator}/>
            <Tab.Screen name="Challenge" component={ChallengeNavigator}/>
        </Tab.Navigator>
    )
}
    