import react,{useState, useEffect} from 'react';


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import AddChatScreen from './Screens/AddChatScreen';
import ChatScreen from './Screens/ChatScreen';
import Notification from './components/Notification';
import Upload from './components/Upload';
import Profile from './Screens/Profile';




const Stack = createNativeStackNavigator();
const globalScreenOption={
headerStyle:{backgroundColor:"#49C958"},
headerTitleStyle:{color:"white"},
headerTintColor:"white",
}

export default function App() {


  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOption}>
      <Stack.Screen  name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddChat" component={AddChatScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Notifications" component={Notification} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="Profile" component={Profile} />

    
     
       

      

    
      </Stack.Navigator>
    </NavigationContainer>
  );
}


