import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

import HomeBottomNavigator from'./routes/HomeBottomNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HomeBottomNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
