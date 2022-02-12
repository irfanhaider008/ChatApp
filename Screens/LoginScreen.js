import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Image, Button, Input } from 'react-native-elements'
import {auth, provider} from '../firebase'




export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
             if(authUser) {
                 navigation.replace("Home");
             }
        })
        return () => {
            unsubscribe();
        }
    }, [])
        

    // const google = () => {
    //     auth
    //         .signInWithPopup(provider)
    //         .then((result) => {
    //             //dispatch
    //             ({
    //                 // type: actionTypes.SET_USER,
    //                 user: result.user,
    //             })
    //         })
    //         .catch((error) => alert(error.message));
    // }


    const signIn = () => {
        
    

        auth.signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error));
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image 
                source={{
                uri: 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png",

                }}
                style={{ width: 200, height: 200}} 
            />
         

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button  buttonStyle={{ backgroundColor: '#49C958ed',}} 
            title="Login" onPress={signIn} containerStyle={styles.button} />
            <Button buttonStyle={{ backgroundColor: '#49C958ed', }}
             title="Register" onPress={() => navigation.navigate("Register")}   containerStyle={styles.button}/>
            <View style={{ height: 100}} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
  
    button: {
        width: 200,
        marginTop: 10,
        
       
        
        
    },
   
})