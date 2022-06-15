import React, { useEffect, useState } from 'react';
import {StyleSheet ,View, Text} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import PureChart from 'react-native-pure-chart';

import { theme } from "./../../styles/colors.js"; 

import { UserInfo } from '../../App.js';

const PORT = 8000
const defURL = `http://localhost:${PORT}`

export default function User() {

    const infos = React.useContext(UserInfo);

    const [username, setUsername] = useState(infos.userID);
    const [total, setTotal] = useState(0);
    const [squat1RM, setSquat1RM] = useState(0);
    const [dead1RM, setDead1RM] = useState(0);
    const [bench1RM, setBench1RM] = useState(0);

    const getBaseinfo = async () => {
        try{
          const response = await fetch(`${defURL}/profile/Total/${username}`);
          const json = await response.json();
          setUsername(json.data.User);
          setTotal(json.data.Total);
          setSquat1RM(json.data.S);
          setBench1RM(json.data.B);
          setDead1RM(json.data.D);
        } catch (error) {
          console.log(error);
        }
    }

    const [squatRecords, setSquatRecords] = useState([]);

    const getSquatRecords = async () =>{
        try{
            const response = await fetch(`${defURL}/profile/Squat/${username}`);
            const json = await response.json();
            const datas = json.data;
            const ret = [];
            Object.entries(datas).forEach(([key,value])=>{
                ret.push({x:key, y:value})
            });
            setSquatRecords(ret)
          } catch (error) {
            console.log(error);
          }
    }

    const [benchRecords, setBenchRecords] = useState([]);

    const getBenchRecords = async () =>{
        try{
            const response = await fetch(`${defURL}/profile/BenchPress/${username}`);
            const json = await response.json();
            const datas = json.data;
            const ret = [];
            Object.entries(datas).forEach(([key,value])=>{
                ret.push({x:key, y:value})
            });
            setBenchRecords(ret)
          } catch (error) {
            console.log(error);
          }
    }
    const [deadRecords, setDeadRecords] = useState([]);

    const getDeadRecords = async () =>{
        try{
            const response = await fetch(`${defURL}/profile/Deadlift/${username}`);
            const json = await response.json();
            const datas = json.data;
            const ret = [];
            Object.entries(datas).forEach(([key,value])=>{
                ret.push({x:key, y:value})
            });
            setDeadRecords(ret)
          } catch (error) {
            console.log(error);
          }
    }
    let chartData = [
        {
            seriesName: 'Squat',
            data: squatRecords,
            color: theme.red
        },
        {
            seriesName: 'BenchPress',
            data: benchRecords,
            color: theme.yellow
        },
        {
            seriesName: 'Deadlift',
            data: deadRecords,
            color: theme.blue
        },
    ]

    // useEffect(()=>{
    //     getBaseinfo();
    //     getSquatRecords().then(()=>{
    //         getBenchRecords().then(()=>{
    //             getDeadRecords();
    //         })
    //     });
    // });

    useFocusEffect(
        React.useCallback(() => {
            getBaseinfo();
            getSquatRecords().then(()=>{
                getBenchRecords().then(()=>{
                    getDeadRecords();
                })
            });
        }, [])
    );

    return(
        <View style = {styles.container}>
            <View style = {styles.headerBox}>
                <View>
                    <Text style={styles.name__font}>{username}님, Get In Shape!</Text>
                </View>
                <View>
                    <Text style={styles.total__font}>Total {total}</Text>
                </View>
            </View>
            <View style = {styles.bodyBox}>
                <View style = {{...styles.container, ...styles.bodyBox__container, backgroundColor: theme.red}}>
                    <Text style={styles.event__font}>Squat</Text>
                    <Text style={styles.oneRM__font}>{squat1RM}</Text>
                </View>
                <View style = {{...styles.container, ...styles.bodyBox__container, backgroundColor:theme.yellow}}>
                    <Text style={styles.event__font}>BenchPress</Text> 
                    <Text style={styles.oneRM__font}>{bench1RM}</Text>
                </View>
                <View style = {{...styles.container, ...styles.bodyBox__container, backgroundColor:theme.blue}}>
                    <Text style={styles.event__font}>Deadlift</Text>
                    <Text style={styles.oneRM__font}>{dead1RM}</Text>
                </View>
            </View>             
            {/* <View style={styles.footerBox}>
                <PureChart 
                    data={chartData} 
                    type='line'
                    width={'100%'}
                />
            </View>  */}
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
    headerBox:{
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
    bodyBox:{
        flex:1,
        flexDirection:'row',
    },
    bodyBox__container:{
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
    footerBox:{
        flex:2,
        width:'100%',
        padding:20,
        justifyContent:'center'
    }
  });