import React,{useState,useEffect,createContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

import HomeBottomNavigator from'./routes/HomeBottomNavigator';
import MainNavigator from './routes/MainNavigator';

const Stack = createStackNavigator();
export const UserInfo = createContext({
  userID:"",
  isSignedIn:false,
  gymCode:""
});

export default function App() {
  return (
    <UserInfo.Provider value={{userID:"unknown",isSignedIn:false,gymCode:"unknown"}}>
      <NavigationContainer> 
        <MainNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserInfo.Provider>
  );
}
