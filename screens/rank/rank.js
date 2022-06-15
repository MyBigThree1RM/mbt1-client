import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList,ActivityIndicator} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import {WebView} from 'react-native-webview';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";

import { theme } from '../../styles/colors';

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

    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};

    return (
        <View style={styles.container}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <WebView
                    source={{uri:`${defURL}/map`}}
                    style={{flex:1,width:400}}
                />
                {/* <NaverMapView style={{width: '100%', height: '100%'}}
                                    showsMyLocationButton={true}
                                    center={{...P0, zoom: 16}}
                                    onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                                    onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                                    onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
                    <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
                    <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
                    <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
                    <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
                    <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
                    <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
                    <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/>
                </NaverMapView>  */}
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