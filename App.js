import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

import { Camera } from 'expo-camera';
import { WebView } from 'react-native-webview';

import { theme } from "./colors";

const Stack = createStackNavigator();
const PORT = 8000
const defURL = `http://localhost:${PORT}`

function Measure({navigation,route}){

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
      const response = await fetch(`${defURL}/reps`);
      const json = await response.json();
      setReps(json.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{setInterval(()=>{
    getReps(),1000
  })}
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
          source={{uri:`${defURL}/video_feed`}}
          onMessage={handleOnMessage}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={false}
          style={{flex:1,width:400}}
        /> ) 
        : <ActivityIndicator/>
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

      <TouchableOpacity style={styles.submit} onPress={()=>navigation.navigate('Result',{ex_event:ex_event,weight:weight,reps:reps})}>
        <Text style={styles.submit__text}>COMPLETE</Text>
      </TouchableOpacity>
    </View>
  )
}

function Result({navigation,route}){
  const data = route.params

  const oneRM = (w,r) => {
    let best = 0
    
    if (r >= 12)  
        best = w / (0.7)
    else if (r === 11)
        best = w / (0.73)
    else if (r == 10)
        best = w / (0.75)
    else if (r == 9
)        best = w / (0.77)
    else if (r == 8
)        best = w / (0.80)
    else if (r == 7
)        best = w / (0.83)
    else if (r == 6
)        best = w / (0.85)
    else if (r == 5
)        best = w / (0.87)
    else if (r == 4
)        best = w / (0.90)
    else if (r == 3
)        best = w / (0.93)
    else if (r == 2
)        best = w / (0.95)
    else if (r == 1
)        best = w

    return Math.round(best)
  }

  const jsonToServer = () => {
    const result = {
      event : data.ex_event,
      weight : data.weight,
      reps : data.reps,
      volume : data.weight * data.reps,
      oneRM : oneRM(data.weight, data.reps)
    }
    json = JSON.stringify(result);

    fetch(`${defURL}/result`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: json
    });
  }

  return(
    <View style={styles.container}>
      <View style = {{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>UserName</Text>
      </View>
      <View style={{...styles.repBox,flex:1}}>
        <Text style={styles.repText}>Event : {data.ex_event}</Text>
        <Text style={styles.repText}>Weight : {data.weight}</Text>
        <Text style={styles.repText}>REPS : {data.reps}</Text>
        <Text style={styles.repText}>Volume : {data.weight * data.reps}</Text>
        <Text style={styles.repText}>Estimated 1RM : {oneRM(data.weight,data.reps)}</Text>
      </View>
      <TouchableOpacity style={styles.submit} onPress={jsonToServer()}>
        <Text style={styles.submit__text}>SAVE</Text>
      </TouchableOpacity>
    </View>
  )
}

function Select({navigation}){
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Select" component={Select}/>
        <Stack.Screen name = "Measurement" component={Measure} />
        <Stack.Screen name = "Result" component={Result} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
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
