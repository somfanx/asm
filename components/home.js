import React, { useState, useEffect, useRef } from "react";
import {StyleSheet, View, Alert, Text, Button, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Swipes from "./Swipes";


export function home  ({navigation})  {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const swipesRef = useRef(null);

  const fetchUser = async () => {
    try {
      let response = await fetch(
        'https://labmo402.herokuapp.com/getUsers'
      );
      let json = await response.json();
      setUsers(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLike = () => {
    console.log("like");
    nextUser();
  };

  const handlePass = () => {
    console.log("pass\n");
    console.log("data : "+users.length);
    nextUser();
  };

  const nextUser = () => {
    const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const handleLikePress = () => {
    swipesRef.current.openLeft();
  }
  const handlePassPress = () => {
    swipesRef.current.openRight();
  }

  return (
    <View style={styles.container}>
      <View>
      <Button title={"List User"} onPress={()=>navigation.navigate('ListUser',{listUser : users})}/>
      <Button title={"Add User"} onPress={()=>navigation.navigate('AddUser')}/>
      <Button title={"Refesh"} onPress={()=>{
        fetchUser();
        console.log(users.length);
      }}/>
      </View>
      <View style={styles.swipes}>
        {users.length > 1 &&
          users.map(
            (u, i) =>
              currentIndex === i && (
                <Swipes
                  key={i}
                  ref={swipesRef}
                  users={users}
                  currentIndex={currentIndex}
                  handleLike={handleLike}
                  handlePass={handlePass}
                ></Swipes>
              )
          )}
      </View>
      <BottomBar handleLikePress={handleLikePress} handlePassPress={handlePassPress}/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipes: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
