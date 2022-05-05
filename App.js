import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

import MeasureNavigator from'./routes/MeasureNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MeasureNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
