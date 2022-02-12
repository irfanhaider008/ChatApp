import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Share, Button, Image } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'
import firebase from '../firebase'
import {db, auth, Storage} from '../firebase'
import firestore from 'firebase/firestore'

import ImgToBase64 from 'react-native-image-base64'
import * as ImagePicker from 'expo-image-picker';
import Upload from '../components/Upload'




const ChatScreen = ({navigation, route}) => {



	
	const [photo, setPhoto] = useState([]);

    const pickImage = async () => {

     
          

		const { base64 } = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true, 
		  });
	
	const base64ToUpload = `data:image/jpeg;base64,${base64}`;
        

       

      db.collection('chats').doc(route.params.id).collection('picture').add({
		  
        displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            
      imageurl:base64ToUpload, 
        
        
    });

   
    
    };


	

		
		
	  //Heello





	useLayoutEffect(() => {
		const unsubscribeimage = db
			.collection("chats")
			.doc(route.params.id)
			.collection("picture") 
            .onSnapshot((snapshot) =>
				setPhoto(
					snapshot.docs.map((doc) => ({
						idimg: doc.id,
						dataimg: doc.data(),
						
						
					}))
				

				)

			);
		return unsubscribeimage;
		

		
	}, [route]);







 
    const [input, setInput]= useState("");
    const [messages, setMessages]= useState([]);
	
    




    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }} 
                >

 <Avatar rounded source={{ uri: messages[0]?.data.photoURL || "data:image/png;base64,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" }} />
                    <Text style={{color: "white", marginLeft: 10, fontWeight: "700"}}>{route.params.chatName}</Text>
                </View>
            ),
            // headerLeft: () => (
            //     <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
            //          <AntDesign name="arrowleft" size={24} color="white" />
            //     </TouchableOpacity>
            // ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity >
                        <FontAwesome name="video-camera"  onPress={()=>navigation.navigate("Upload")} size={24} color="white" />
                    </TouchableOpacity>

				
                   
					<TouchableOpacity >
                        <FontAwesome name="camera"  size={24} color="white" />
                    </TouchableOpacity>
                   
					
                </View>
            )
        })
    },[navigation])

    const sendMessage = () => {

		if(input===""){
			return alert("Please enter message")
		}
        Keyboard.dismiss();
		
		
		
        db.collection('chats').doc(route.params.id).collection('messages').add({

            
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
			
			
			
        })
        setInput("")
    };

    useLayoutEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(route.params.id)
			.collection("messages") 
            .onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
						
						
					}))
				

				)

			);
		return unsubscribe;
		

		
	}, [route]);

	
    

	
	
	
	
    
    return (
		
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <StatusBar style="light"/>
            
			
            <KeyboardAvoidingView style={styles.container}>
			
				
				
				            
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
			
				
			{ photo.map(({ idimg, dataimg }) =>
		    dataimg.email === auth.currentUser.email ? (
			<View key={idimg} style={styles.sender}>
			<Image source={{uri:dataimg.imageurl}} style={{ width: 200, height: 200 }} />
                       

		
				
			


				

			
			</View>
			
			):(

				
				
				<View key={idimg} style={styles.reciever}>
				<Image source={{uri:dataimg.imageurl}} style={{ width: 200, height: 200 }}  />
				</View>
			)					
			
							)} 

				
			{ messages.map(({ id, data }) =>
		    data.email === auth.currentUser.email ? (
			<View key={id} style={styles.sender}>

			<Avatar rounded position="absolute"
			
			containerStyle={{position: "absolute", right: -5, bottom: -10,}}
			size={20} bottom={-10} right={-5} source={{ uri: data.photoURL }} /> 

			
			 
		    <Text style={styles.senderText}>{data.message}   <TouchableOpacity style={{marginLeft: 10}} onPress={()=> db
			.collection("chats")
			.doc(route.params.id)
			.collection("messages").doc(id).delete()} >
                     <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
				
				<TouchableOpacity style={{marginLeft: 10}} onPress={()=> {
		
		const result =  Share.share({
		  message: data.message
		});
		console.log(data.message)
	  }}
	              
	>
		
     <AntDesign name="sharealt" size={24} color="white" />
                </TouchableOpacity>

				</Text>
				
			</View>
			) : (
									
		<View key={id} style={styles.reciever} key={id}>

		<Avatar rounded	position="absolute"
			
		containerStyle={{
		position: "absolute",
		left: -5,
		bottom: -10,
			}}
			size={20}
			bottom={-10}
			left={-5}
			source={{ uri: data.photoURL }}
			/>
              
			<Text style={styles.recieverText}>{data.message}
			
			<TouchableOpacity style={{marginLeft: 10}} onPress={()=> db
			.collection("chats")
			.doc(route.params.id)
			.collection("messages").doc(id).delete()} >
                     <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>

				<TouchableOpacity style={{marginLeft: 10}} onPress={()=> {
		
		const result =  Share.share({
		  message: data.message
		});
		console.log(data.message)
	  
	}}>
                      <AntDesign name="sharealt" size={24} color="white" />
                </TouchableOpacity>

			</Text>
			<Text style={styles.recieverName}>{data.displayName}</Text>
			
									</View>
								)
							)}
						</ScrollView>


						
            <View style={styles.footer}>
			
			
			
    
            <TextInput 
            value={input}
            onChangeText={(text)=> setInput(text)}
            placeholder="Please Enter Message"
            onSubmitEditing={sendMessage} 
            style={styles.textInput}
			
            />

            <TouchableOpacity disabled={!input} onPress={sendMessage}
            activeOpacity={0.5}
            >
               <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>

			<Button 
                raised title="Upload Image"   onPress={pickImage} />
            </View>
            </KeyboardAvoidingView>
			

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({

    container: {
		flex: 1,
	},
	reciever: {
		padding: 15,
		backgroundColor: "orange",
		alignSelf: "flex-start",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	recieverText: {
		color: "black",
		fontWeight: "500",
		marginLeft: 10,
	},
	sender: {
		padding: 15,
		backgroundColor: "#2b68e6",
		alignSelf: "flex-end",
		borderRadius: 20,
		margin: 15,
		maxWidth: "80%",
		position: "relative",
	},
	senderText: {
		color: "white",
		fontWeight: "500",
		marginLeft: 10,
		marginBottom: 15,
	},
	recieverName: {
		left: 10,
		fontSize: 10,
		color: "white",
		fontSize: 12,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: "#ECECEC",
		padding: 10,
		color: "grey",
		borderRadius: 30,
	},
})
