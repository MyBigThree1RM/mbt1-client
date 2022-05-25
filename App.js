import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

import HomeBottomNavigator from'./routes/HomeBottomNavigator';
import MainNavigator from './routes/MainNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <MainNavigator />
       <StatusBar style="auto" />
    </NavigationContainer>
  );
}
