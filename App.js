import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {home} from './components/home';
import { AddUser } from './components/AddUser';
import {ListUser} from "./components/ListUser";
import OptionsMenu from "react-native-options-menu";
import { StatusBar } from 'expo-status-bar';
import {UpdataUser} from "./components/UpdateUser";

const asd = ({navigation}) =>{
  return(
    <View>
      <Text>asd</Text>
    </View>
  );
}
export default function App() {

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={home}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
        />
        <Stack.Screen
              name="ListUser"
              component={ListUser}
        />
        <Stack.Screen
            name="UpdateUser"
            component={UpdataUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

