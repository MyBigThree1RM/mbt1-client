import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';

import { Camera } from 'expo-camera';
import { WebView } from 'react-native-webview';

import { theme } from "../../../styles/colors.js";
import { UserInfo } from "../../../App.js";

const PORT = 8000
const defURL = `http://localhost:${PORT}`

export default function Challenge({navigation,route}){

    const ex_event = route.params.ex_event
    const infos = React.useContext(UserInfo);
  
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [username, setUsername] = useState(infos.userID);
    const [code,setCode] = useState(0);
    const [isCodeSubmitted,setCodeSubmitted] = useState(false);

    const paintCode = () =>{
      paintWeight();
      setCodeSubmitted(true);
    }

    const onChangeCode = (w) => setCode(w);

    const paintWeight = async () => {
      try{
        const response = await fetch(`${defURL}/profile/Total/${username}`);
        const json = await response.json();
        if(ex_event == 'Squat') {
          setWeight(json.data.S);
          if(json.data.S > 0) {
            setIsSubmitted(true);
          }
        } else if(ex_event == 'BenchPress') {
          setWeight(json.data.B);
          if(json.data.B > 0) {
            setIsSubmitted(true);
          }
        } else if(ex_event == 'Deadlift') {
          setWeight(json.data.D);
          if(json.data.D > 0) {
            setIsSubmitted(true);
          }
        }

      } catch (error){
        console.log(error);
      }
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

    const goBack = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Select' }],
      });
    }

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;
        const req_reps = setInterval(getReps,500)
        return () => {
          clearInterval(req_reps)
          isActive = false;
        };
      }, [])
    );

    return(
      <View style={styles.container}>
        {isSubmitted ? (
          <WebView
            source={{uri:`${defURL}/${ex_event}`}}
            onMessage={handleOnMessage}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={false}
            scrollEnabled={false}
            style={{flex:1,width:400}}
          /> ) 
          : (<View style = {{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text style={{textAlign:"center"}}>측정 기록이 없습니다.{"\n"} 측정을 먼저 진행해 주세요.{"\n"}</Text>
            <TouchableOpacity
              onPress={()=>goBack()}
            >
              <Text>
                돌아가기
              </Text>
            </TouchableOpacity>
          </View>) 
        }
        <View style={styles.repBox}>
          <View style={{flex:0.7, flexDirection:"row",alignItems:"center"}}>
          <Text style={styles.repText}>Gym Code : </Text>
            <TextInput 
              onSubmitEditing={paintCode}
              onChangeText={onChangeCode}
              editable = {!isCodeSubmitted}
              style={styles.repInput} 
              returnKeyType="done" />
          </View>
          <Text style={styles.repText}>Weight : {weight}</Text>
        </View>
        <TouchableOpacity 
          style={styles.submit} 
          onPress={()=>{
            if(weight == 0) {alert("측정 기록이 없습니다."); return;}
            // if(reps>=2) {alert("챌린지 모드에서 동작은 한 번만 진행합니다.\n 다시 측정해 주십시오");setReps(0);return;}
            // if(reps<=0) {alert("한 번의 운동동작을 진행해야 합니다."); setReps(0); return;}
            navigation.navigate('Result',{ex_event:ex_event,weight:weight,gym_code : code})
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
  