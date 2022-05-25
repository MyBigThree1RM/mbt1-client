import React from "react";
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

export default function Splash(){
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/fitness.png")} />
            <Text style={styles.title}>My Big Three 1RM</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.blue,
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
        resizeMode:"center",
        margin:-150,
    },
    title:{
        fontSize:30,
        fontWeight:"200",
        color:"#fff"
    }
  });