import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

export default function Select({navigation}){
    return(
      <View style={{flex:1, paddingHorizontal:20, justifyContent:"space-evenly"}}>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Measurement',{ex_event:"Squat",})}>
          <Text style={styles.btnText}>Squat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Measurement',{ex_event:"BenchPress",})}>
          <Text style={styles.btnText}>BenchPress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Measurement',{ex_event:"Deadlift",})}>
          <Text style={styles.btnText}>Deadlift</Text>
        </TouchableOpacity>
      </View>
    )
  }
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:{
      flex:0.2,
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:50,
    },
    btnText:{
      fontSize:38,
      fontWeight:"500"
    },
  });
  