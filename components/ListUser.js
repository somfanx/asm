import React from 'react';
import {View, Text, Button, FlatList, StyleSheet, Image, Alert} from 'react-native';

export function ListUser({route,navigation}){
    const {listUser} = route.params;

    const deleteUser = (idUser)=>{
        const url = "https://labmo402.herokuapp.com/DeleteUser";
        // const formData = new FormData();
        // formData.append("idUser",idUser );

        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idUser
            })
        };
        console.log(idUser);
        fetch(url,config).catch((error)=>console.log(error));
    }
    const _renderItem = ({item,index}) =>{
        var img = 'https://labmo402.herokuapp.com/img/' + item.avatar;
        return(
            <View style={styles.itemContainer}>
                <Image source={{uri : img}} style={{width:150,height:100}}/>
                <Text>
                   Name: {item.name}
                </Text>
                <Text>
                    Age: {item.age}
                </Text>
                <Text>
                    Address : {item.address}
                </Text>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Button title={'Edit'} onPress={()=>navigation.navigate('UpdateUser',{item : item})}/>
                    <Button title={'Delete'} onPress={()=>{
                        deleteUser(item._id);
                        navigation.navigate('Home');
                    }}/>
                </View>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={listUser}
                // renderItem={({item}) =>
                // <View style={styles.itemContainer}>
                //     <Image source={{uri:img}}/>
                //     <Text>{item.name}</Text>
                // </View>
                // }
                renderItem={_renderItem}
                keyExtractor={item => item._id}

            />
        </View>
    );



}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:8,
    },
    itemContainer:{
        flex: 1,
        paddingBottom:10,
        paddingTop:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    }
});
