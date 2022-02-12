import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import {auth, db} from '../firebase'
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native'

 


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(null);
    

        


    const pickImage = async () => {


        // No permissions request is necessary for launching the image library
        let result = await   ImagePicker.launchImageLibraryAsync({
            
  
  
          
  
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
  
     
 
        
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
          
          
        }
      
      };







    useLayoutEffect(()=>{

        navigation.setOptions({
            headerBackTitle:"Back to Login"

        });

    },[navigation]);

    const register = () => {

        
        auth.createUserWithEmailAndPassword(email, password)
       
       

        .then((authUser) => {

           
            

           
                       
            
            authUser.user.updateProfile({
                displayName: name,
                photoURL: image
            })


            db.collection('users').doc(auth?.currentUser?.uid).set({
                displayName: name,
                photoURL: image,
                password: password,
                email: email,
    
            });
           
        })


        
        .catch(error => alert(error.message));


        
    }


    
    return (

        
        <KeyboardAvoidingView behavior='padding' style={styles.container}>

            <ScrollView>
        
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />




              
            </View>
            
            <Button buttonStyle={{ backgroundColor: '#49C958ed',}} 
                containerStyle={styles.button}
        
                raised title="Upload Image"   onPress={pickImage} />
            
            <Button  buttonStyle={{ backgroundColor: '#49C958ed',}} 
                containerStyle={styles.button}
                raised title="Register" 
                onPress={register} 
            />

</ScrollView>    
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
    }
})