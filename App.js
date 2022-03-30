import React,{useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { theme } from "./colors";

const Stack = createStackNavigator();

function Measure({navigation}){
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const paintWeight = () => {
    if (weight<=0) {
      alert("The weight must be greater than zero.")
      return;
    }
    setIsSubmitted(true);
  }
  const onChangeWeight = (w) => setWeight(w);

  return(
    <View style={styles.container}>
      <View style={{...styles.container,flex:3,width:"100%",backgroundColor:"black"}}>
        <Text style={{color:"white"}}>Video Stream</Text>
      </View>

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

      <TouchableOpacity style={styles.submit}>
        <Text style={styles.submit__text}>COMPLETE</Text>
      </TouchableOpacity>
    </View>
  )
}

function Select({navigation}){
  return(
    <View style={{flex:1, paddingHorizontal:20, justifyContent:"space-evenly"}}>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Measurement')}>
        <Text style={styles.btnText}>Squat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Measurement')}>
        <Text style={styles.btnText}>BenchPress</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Measurement')}>
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
    flex:0.8,
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
    flex:0.2,
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
});
