import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Icon, Input} from 'react-native-elements'
import icon from 'react-native-vector-icons/FontAwesome'
import { auth, db } from '../firebase'
const AddChatScreen = ({navigation}) => {

    const[input, setInput]=useState("");
useLayoutEffect(() => {
    navigation.setOptions({
        title:"Add New Chat",
        headerBackTitle:"Chats",

    })
}, [navigation])


const createchat= async ()=>{
    
await db.collection('chats').add({
    chatName:input
}).then(()=>{
    navigation.goBack();
})
.catch((error)=>alert(error));
}



    return (
        <View style={styles.container}>
       <Input
       
       placeholder="Enter a Chat name"
       value={input}
       onChangeText={(text)=>setInput(text)}

        leftIcon={
            <Icon name="wechat" type="antdesign" size={24} color="black"/>
        }

       />

       <Button disabled={!input} onPress={createchat} title="Create new Chat" buttonStyle={{ backgroundColor: '#49C958ed',}}  />
       
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%",
    },

})
