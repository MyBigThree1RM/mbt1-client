import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

import { theme } from "../../../styles/colors.js";
import { UserInfo } from "../../../App.js";

const PORT = 8000
const defURL = `http://localhost:${PORT}`

export default function Result({navigation,route}){
    const data = route.params
    const infos = React.useContext(UserInfo);

    const jsonToServer = async () => {
      const result = {
        event : data.ex_event,
        weight : data.weight,
        gym_code : data.gym_code,
        
      }
      json = JSON.stringify(result);
  
      fetch(`${defURL}/result/${infos.userID}`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: json
      });
    }
    const goBack = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Select' }],
      });
    }
    return(
      <View style={styles.container}>
        <View style = {{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:30}}>{infos.userID}님 챌린지 결과</Text>
        </View>
        <View style={{...styles.repBox,flex:1.5}}>
          <Text style={styles.repText}>Event : {data.ex_event}</Text>
          <Text style={styles.repText}>Gym Code : {data.gym_code}</Text>
          <Text style={styles.repText}>Weight : {data.weight}</Text>
        </View>
        <TouchableOpacity 
          style={styles.submit} 
          onPress={()=>{ 
            jsonToServer().then(() => {
                 goBack();
            })
            .catch(error => console.log(error))
          }} 
          >
          <Text style={styles.submit__text}>SAVE</Text>
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
    repBox:{
      flex:0.2,
      width:"90%",
      borderRadius:20,
      justifyContent:"space-evenly",
      alignItems:"flex-start",
      padding:20,
      marginVertical:20,
      backgroundColor: theme.grey
    },
    repText:{
      fontSize:20,
    },
    submit:{
      flex:0.35,
      width:"90%",
      alignItems:"center",
      justifyContent:"center",
      paddingVertical:-10,
      marginBottom:20,
      borderRadius:20,
      backgroundColor:"navy"
    },
    submit__text:{
      fontSize:20,
      color:"white",
      fontWeight:"600",
    },
  });
  