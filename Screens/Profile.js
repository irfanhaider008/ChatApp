import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { ScrollView } from 'react-native'
import {auth, db, storage} from '../firebase'
import * as ImagePicker from 'expo-image-picker';

import { Avatar } from 'react-native-elements/dist/avatar/Avatar'


const Profile = () => {

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




      const openCamera = async () => {
          // Ask the user for the permission to access the camera
          const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
          if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
          }
      
          const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              base64: true, 
              aspect: [4, 3],
              quality: 1,
              
            });
      
          // Explore the result
          console.log(result);
          if (!result.cancelled) {
            setImage(result.uri);
            
            
          }
          
        }




    function update (){

    
       

        auth.currentUser.updateProfile({
            displayName: name,
            photoURL: image,
            
          });
       
    
      

        
    };



    return (
        <View style={{marginLeft:20}}>
                 
         


                  <ScrollView>
        
        <StatusBar style="light" />
        <Text h3 style={{ marginBottom: 50 }}>
            Update your Profile        
            
            
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
           
          
        </View>
        
        <Button buttonStyle={{ backgroundColor: '#49C958ed',}} 
            containerStyle={styles.button}
    
            raised title="Upload Image"   onPress={pickImage} />
       

       <Button buttonStyle={{ backgroundColor: '#49C958ed',}} 
            containerStyle={styles.button}
    
            raised title="Open Camera"   onPress={openCamera} />
       

        <Button  buttonStyle={{ backgroundColor: '#49C958ed',}} 
            containerStyle={styles.button}
            raised title="update" 
            onPress={update}
          
            
        />

</ScrollView>    
                 

              </View>
    )
    }

export default Profile

const styles = StyleSheet.create({})
