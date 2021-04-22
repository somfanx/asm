import React, {useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export function UpdataUser({route,navigation}){
    const {item} = route.params;

    const [email,setEmail] = useState(item.email);
    const [password,setPassword] = useState(item.password);
    const [name,setName] = useState(item.name);
    const [address,setAdress] = useState(item.address);
    const [age,setAge] = useState(item.age);
    const [phoneNumber,setPhoneNumber] = useState(item.number_phone);
    const [avatar,setAvatar] = useState('https://labmo402.herokuapp.com/img/'+item.avatar);
    const [description,setDescription] = useState(item.description);

    const [picture,setPicture] = useState(null);

    const pickFromGallery = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data =  await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                setPicture(data);
                setAvatar(data.uri);
            }
        }else{
            Alert.alert("you need to give up permission to work")
        }
    }
    const submit = ()=>{
        console.log(picture)
        const url = "https://labmo402.herokuapp.com/updateUser";
        const formData = new FormData();
        formData.append("idUser",item._id );
        formData.append("email",email );
        formData.append("password",password );
        formData.append("name",name );
        formData.append("address",address );
        formData.append("age",age );
        formData.append("phone",phoneNumber );
        formData.append("description",description );

        formData.append("avatar", {
            uri:picture.uri,
            name:picture.uri.split('/').pop(),
            type:'image/jpg',
        });

        const config = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            },
            body: formData
        };
        fetch(url,config).catch((error)=>console.log(error));
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>pickFromGallery()}>
                <Text>Avatar:</Text>
                <Image source={{uri : avatar}} style={{width:100,height:100}}/>
            </TouchableOpacity>
            <View style={styles.inputGroup}>
                <Text>Email: </Text>
                <TextInput style={styles.textInput}
                           value={email}
                           onChangeText={(txt)=>setEmail(txt)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Password: </Text>
                <TextInput style={styles.textInput}
                           value={password}
                           onChangeText={(txt)=>setPassword(txt)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Name: </Text>
                <TextInput style={styles.textInput}
                           value={name}
                           onChangeText={(txt)=>setName(txt)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Address: </Text>
                <TextInput style={styles.textInput}
                           value={address}
                           onChangeText={(txt)=>setAdress(txt)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Age: </Text>
                <TextInput style={styles.textInput}
                           value={age}
                           onChangeText={(txt)=>setAge(txt)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Phone: </Text>
                <TextInput style={styles.textInput}
                           value={phoneNumber}
                           onChangeText={(txt)=>setPhoneNumber(txt)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Description: </Text>
                <TextInput style={styles.textInput}
                           value={description}
                           onChangeText={(txt)=>setDescription(txt)}
                />
            </View>
            <View style={{marginTop:10}}>
                <Button title={"Update"} onPress={()=>{
                    submit();
                    navigation.navigate("Home");
                }}/>
            </View>
        </View>
    );



}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:8,
       alignItems:'center'

    },
    inputGroup :{
      flexDirection:'row',
        marginTop:5,
    },
    textInput:{
      width:200,
      borderWidth:0.5,
        height:20,
        marginLeft:8
    }
});
