import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';

import { Camera } from 'expo-camera';
import { WebView } from 'react-native-webview';

import { theme } from "./../../styles/colors.js";

const PORT = 8000
const defURL = `http://localhost:${PORT}`

export default function Measure({navigation,route}){

    const ex_event = route.params.ex_event
  
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    //const [hasPermission, setHasPermission] = useState(null);
    //const [type, setType] = useState(Camera.Constants.Type.back);
  
    //camera permission
    /*useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    */
    const paintWeight = () => {
      if (weight<=0) {
        alert("The weight must be greater than zero.")
        setWeight(0);
        return;
      }
      else if (weight % 5 !== 0){
        alert("The weight must be multiple of 5.")
        setWeight(0);
        return;
      }
      setIsSubmitted(true);
    }
    const onChangeWeight = (w) => setWeight(w);
  
    const handleOnMessage = (e)=>{
      console.log(e.nativeEvent.data);
    };
  
    const getReps = async () => {
      try{
        const response = await fetch(`${defURL}/reps/${ex_event}`);
        const json = await response.json();
        setReps(json.data);
      } catch (error) {
        console.log(error);
      }
    }

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;
        const req_reps = setInterval(getReps,2000)
        return () => {
          clearInterval(req_reps)
          isActive = false;
        };
      }, [])
    );
  
    return(
      <View style={styles.container}>
        {/*
        <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
        </Camera>
        */}
        {isSubmitted ? (
          <WebView
            source={{uri:`${defURL}/${ex_event}`}}
            onMessage={handleOnMessage}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={false}
            scrollEnabled={false}
            style={{flex:1,width:400}}
          /> ) 
          : <ActivityIndicator style={{flex:1}} size='large'/>
        }
        <View style={styles.repBox}>
          <View style={{flex:0.7, flexDirection:"row",alignItems:"center"}}>
            <Text style={styles.repText}>Weight : </Text>
            <TextInput 
              onSubmitEditing={paintWeight}
              onChangeText={onChangeWeight}
              editable = {!isSubmitted}
              style={styles.repInput} 
              keyboardType="number-pad" 
              returnKeyType="done" />
          </View>
          <Text style={styles.repText}>REPS : {reps}</Text>
        </View>
  
        <TouchableOpacity 
          style={styles.submit} 
          onPress={()=>{
            navigation.navigate('Result',{ex_event:ex_event,weight:weight,reps:reps})
          }}>
          <Text style={styles.submit__text}>COMPLETE</Text>
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
      justifyContent:"center",
      alignItems:"flex-start",
      padding:20,
      marginVertical:20,
      backgroundColor: theme.grey
    },
    repText:{
      fontSize:18,
    },
    repInput:{
      flex:1,
      height:"50%",
      backgroundColor:"white",
      fontSize:18
    },
    submit:{
      flex:0.05,
      width:"90%",
      alignItems:"center",
      justifyContent:"center",
      paddingVertical:20,
      marginBottom:20,
      borderRadius:20,
      backgroundColor:"navy"
    },
    submit__text:{
      fontSize:20,
      color:"white",
      fontWeight:"600",
    },
    camera: {
      width:"100%",
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });
  