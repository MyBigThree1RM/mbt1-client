import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
//import { signIn } from "../../lib/auth";
 
export default function SignIn({navigation}) {

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const signInSubmit = async () => { // 로그인 함수
    const {email, password} = form;
    const info = {email, password};
    try {
      const {user} = await signIn(info);
      console.log(info);
    } catch (e) {
      Alert.alert("로그인에 실패하였습니다.");
    }
  }

  // const signInSubmit = async () =>{
  //   console.log("hi");
  // }

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
 
      <TouchableOpacity style={styles.loginBtn} onPress={signInSubmit}>
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