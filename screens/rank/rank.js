import React, {useEffect,useState, useRef} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList,ActivityIndicator, Button} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import {WebView} from 'react-native-webview';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";

import { theme } from '../../styles/colors';
import { render } from 'react-dom';

const PORT = 8000
const defURL = `http://localhost:${PORT}`

export default function Rank() {
    const [rank, setRank] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const getRank = async () => {
        try{
          const response = await fetch(`${defURL}/rank`);
          const json = await response.json();
          const ret = [];
          let idx = 0;
          Object.entries(json.data).forEach(([key,value])=>{
            ret.push({name:key, score:value, idx:idx})
            idx++;
          });
          let ranking = ret.sort((a,b)=>{return b.score - a.score;}) //sort array
          setRank(ranking)
        } catch (error) {
          console.log(error);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getRank().then(()=>{
                setIsLoading(false);
            })
        }, [])
    );
    const renderItem = ({item}) =>{
        return (
            <View style={styles.rankBlk}>
                <Text style={styles.rankBlk__txt}>{item.name}</Text>
                <Text style={styles.rankBlk__txt}>{item.score}</Text>
            </View> 
        )
    }
    return (
        <View style={styles.container}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <WebView
                    source={{uri:`http://localhost:8080/map`}}
                    style={{flex:1,width:680}}
                />
            </View>
            <Text style={{fontSize:20}}>Ranking</Text>
            {
            isLoading ? <ActivityIndicator/> :(
                <FlatList
                    style={styles.rankBox}
                    data = {rank}
                    renderItem={renderItem}
                />
            )}            
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
    rankBox:{
        flex:1,
        backgroundColor: 'white',
        width:'100%',
        height:'100%',
    },
    rankBlk:{
        flex:1,
        flexDirection:'row',
        height:'100%',
        backgroundColor:'white',
        marginTop:15,
        marginHorizontal:15,
        padding:20,
        justifyContent:'space-between',
        borderRadius:10,
        shadowOffset:{width:5,height:5},
        shadowOpacity:5,
    },
    rankBlk__txt:{
        fontSize:30
    }
})