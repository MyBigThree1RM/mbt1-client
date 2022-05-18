import React, { useEffect, useState } from 'react';
import {StyleSheet ,View, Text} from 'react-native';
import PureChart from 'react-native-pure-chart';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import { theme } from "./../../styles/colors.js"; 

export default function User() {
    const [username, setUsername] = useState("undefined");
    const [total, setTotal] = useState(0);
    const [squat1RM, setSquat1RM] = useState(0);
    const [dead1RM, setDead1RM] = useState(0);
    const [bench1RM, setBench1RM] = useState(0);
    
    let sampleData = [
        {
            seriesName: 'Squat',
            data: [
                {x: '22-05-05', y: 21},
                {x: '22-05-07', y: 84},
                {x: '22-05-13', y: 32},
                {x: '22-05-15', y: 100},
                {x: '22-05-18', y: 108},
                {x: '22-05-21', y: 44},
                {x: '22-05-26', y: 58},
            ],
            color: theme.red
        },
        {
            seriesName: 'BenchPress',
            data: [
                {x: '22-05-02', y: 10},
                {x: '22-05-09', y: 32},
                {x: '22-05-17', y: 44},
                {x: '22-05-18', y: 215},
                {x: '22-05-28', y: 21},
            ],
            color: theme.yellow
        },
        {
            seriesName: 'Deadlift',
            data: [
                {x: '22-05-03', y: 10},
                {x: '22-05-07', y: 71},
                {x: '22-05-10', y: 44},
                {x: '22-05-14', y: 21},
                {x: '22-05-16', y: 58},
                {x: '22-05-18', y: 316},
                {x: '22-05-21', y: 32},
            ],
            color: theme.blue
        },
    ]

    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <View>
                    <Text style={styles.name__font}>{username}님, Get In Shape!</Text>
                </View>
                <View>
                    <Text style={styles.total__font}>Total {total}</Text>
                </View>
            </View>
            <View style = {styles.body}>
                <View style = {{...styles.container, ...styles.body__container, backgroundColor: theme.red}}>
                    <Text style={styles.event__font}>Squat</Text>
                    <Text style={styles.oneRM__font}>{squat1RM}</Text>
                </View>
                <View style = {{...styles.container, ...styles.body__container, backgroundColor:theme.yellow}}>
                    <Text style={styles.event__font}>BenchPress</Text> 
                    <Text style={styles.oneRM__font}>{bench1RM}</Text>
                </View>
                <View style = {{...styles.container, ...styles.body__container, backgroundColor:theme.blue}}>
                    <Text style={styles.event__font}>Deadlift</Text>
                    <Text style={styles.oneRM__font}>{dead1RM}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text>일주일 기록</Text>
                <PureChart 
                    data={sampleData} 
                    type='line'
                    width={'100%'}
                />
            </View>
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
    header:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'flex-start',
        padding:20
    },
    name__font:{
        fontSize:20
    },
    total__font:{
        fontSize:40
    }, 
    body:{
        flex:1,
        flexDirection:'row',
    },
    body__container:{
        borderRadius:20,
        margin:5,
    },
    event__font:{
        fontSize:20,
        color:'white'
    },
    oneRM__font:{
        fontSize:30,
        color:'white'
    }, 
    footer:{
        flex:2,
        width:'100%',
        padding:20,
        justifyContent:'center'
    }
  });