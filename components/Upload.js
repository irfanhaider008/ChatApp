import React, { useLayoutEffect, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StatusBar, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase'


const Upload = ({navigation}) => {

    const [active , setactive] = useState(false);
    const [input, setInput]= useState("");
    const [messages, setMessages]= useState([]);
    // const [review, addReview]= useState([]);

    useLayoutEffect(() => {
      const unsubscribe = db
        .collection("Review")
        
              .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
              
              
            }))
          
  
          )
  
        );
      return unsubscribe;
      
  
      
    }, []);

    const addReview= ()=>
    {

      if(input===""){
        return alert("Please enter message")
      }

      db.collection('Review').add({

            
        review: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
  
  
  
    })
    setInput("")
    setactive(!active)
    }
    
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <StatusBar barStyle="default" hidden={false}
                />
            
          
            { messages.map(({ id, data }) =>
		    
			<View key={id}>

			
<Text   style={{ alignSelf: 'center', fontSize: 18, marginTop: 30, color: 'red' }}>{data.review}</Text>
			 
		</View>
			
							)}
                





          
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>

            <Modal
              presentationStyle="overFullScreen"
        animationType="slide"
        transparent={true}
        visible={active}
        onRequestClose={() => {
          console.warn("closed");
        }}
        >
          <View style={styles.container}>
            <View style={styles.View}>
            <TextInput style = {styles.input}
               value={input}
               onChangeText={(text)=> setInput(text)}
               placeholder = "Add Review"
              />
            

 


                <TouchableOpacity onPress={addReview}
                    style={{
                        width: "75%", height: 44, borderRadius: 7, alignSelf: "center", position: "relative",
                        backgroundColor: '#0174B7', justifyContent: "center"
                    }}>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Add Review</Text>
                </TouchableOpacity>

            </View>
          </View>
        </Modal>
                <TouchableOpacity  onPress={()=>{setactive(!active)}}
                    style={{
                        width: "75%", height: 44, borderRadius: 7, alignSelf: "center", position: "absolute",
                        backgroundColor: '#0174B7', justifyContent: "center", bottom: 30
                    }}>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Add Review</Text>
                </TouchableOpacity>


               
       
        
    
                
            </View>
        </SafeAreaView>
    );
}
export default Upload;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : "white",
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        margin: 15,
        height: 40,
       
       
     },
    View : {
      backgroundColor : "white" ,
      height : 140 ,
      width : 250,
      borderRadius : 15,
      alignItems : "center",
      justifyContent : "center",
      
      borderWidth:2,
    },
   
   
  });
