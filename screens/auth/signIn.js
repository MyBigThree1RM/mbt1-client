import { StatusBar } from "expo-status-bar";
import React, { useState,useContext } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../styles/colors.js";
import { UserInfo } from "../../App.js";
//import { signIn } from "../../lib/auth";

const PORT = 8000
const defURL = `http://localhost:${PORT}`
 
export default function SignIn({navigation}) {

  const infos = React.useContext(UserInfo);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const signInSubmit = async () => { // 로그인 함수
    const {email, password} = form;
    try {
      const result = await fetch(`${defURL}/login`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({UID:email,UPW:password})
      })
      .then((response)=>{
        console.log(response)
      })
    } catch (e) {
      console.log(e);
    }
  }
  const signInResult = async () => {
    try{
      const response = await fetch(`${defURL}/login`,);
      console.log(response.data);
      const json = await response.text();
      console.log(json)
    } catch (error) {
      //console.log(error);
    }
}

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/fitness.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#fff"
          autoCapitalize = 'none'
          onChangeText={(txt) => setForm((prev)=>({...prev,email:txt}))}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          autoCapitalize = 'none'
          onChangeText={(txt) => setForm((prev)=>({...prev,password:txt}))}
        />
      </View>

      <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
        <Text style={styles.forgot_button}>Sign up?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={()=>{signInSubmit().then(()=>{signInResult()})}}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    resizeMode:"center",
    marginVertical:-150,
    marginTop:-200,
  },
 
  inputView: {
    backgroundColor: theme.blue,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "navy",
  },

  loginText:{
    color:"#fff"
  }
});